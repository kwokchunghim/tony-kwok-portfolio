/**
 * Server-only Spotify helpers.
 *
 * Never import this from client code — these functions read secrets from
 * process.env and call the Spotify API directly on the server.
 */

export const SPOTIFY_SCOPES = [
  "user-top-read",
  "user-read-recently-played",
];

/** Redirect URI registered in the Spotify Developer Dashboard. */
export const SPOTIFY_REDIRECT_URI = "https://tonykwokch.com/api/public/spotify/callback";

function requireCreds() {
  const clientId = process.env["SPOTIFY_CLIENT_ID"];
  const clientSecret = process.env["SPOTIFY_CLIENT_SECRET"];
  if (!clientId || !clientSecret) {
    throw new Error("Spotify Client ID / Secret not configured");
  }
  return { clientId, clientSecret };
}

/**
 * Exchange a stored refresh token for a fresh access token.
 * Called from server functions each time we need live Spotify data.
 */
export async function refreshSpotifyAccessToken(): Promise<string> {
  const { clientId, clientSecret } = requireCreds();
  const refreshToken = process.env["SPOTIFY_REFRESH_TOKEN"];
  if (!refreshToken) {
    throw new Error("Spotify refresh token not configured");
  }

  const body = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: refreshToken,
    client_id: clientId,
    client_secret: clientSecret,
  });

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Spotify token refresh failed (${res.status}): ${text}`);
  }

  const data = (await res.json()) as { access_token: string };
  return data.access_token;
}

export interface SpotifyTrack {
  name: string;
  artist: string;
  album: string;
  image: string;
  url: string;
  playedAt?: string;
}

export type SpotifyTimeRange = "short_term" | "medium_term" | "long_term";

export async function fetchTopTracks(
  limit = 5,
  timeRange: SpotifyTimeRange = "medium_term",
): Promise<SpotifyTrack[]> {
  const token = await refreshSpotifyAccessToken();
  const res = await fetch(
    `https://api.spotify.com/v1/me/top/tracks?limit=${limit}&time_range=${timeRange}`,
    { headers: { Authorization: `Bearer ${token}` } },
  );
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Spotify top tracks failed (${res.status}): ${text}`);
  }
  const data = (await res.json()) as {
    items: Array<{
      name: string;
      artists: Array<{ name: string }>;
      album: { name: string; images: Array<{ url: string }> };
      external_urls: { spotify: string };
    }>;
  };
  return data.items.map((t) => ({
    name: t.name,
    artist: t.artists.map((a) => a.name).join(", "),
    album: t.album.name,
    image: t.album.images[0]?.url ?? "",
    url: t.external_urls.spotify,
  }));
}

export async function fetchRecentlyPlayed(limit = 5): Promise<SpotifyTrack[]> {
  const token = await refreshSpotifyAccessToken();
  const res = await fetch(
    `https://api.spotify.com/v1/me/player/recently-played?limit=${limit}`,
    { headers: { Authorization: `Bearer ${token}` } },
  );
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Spotify recently played failed (${res.status}): ${text}`);
  }
  const data = (await res.json()) as {
    items: Array<{
      played_at: string;
      track: {
        name: string;
        artists: Array<{ name: string }>;
        album: { name: string; images: Array<{ url: string }> };
        external_urls: { spotify: string };
      };
    }>;
  };
  return data.items.map((i) => ({
    name: i.track.name,
    artist: i.track.artists.map((a) => a.name).join(", "),
    album: i.track.album.name,
    image: i.track.album.images[0]?.url ?? "",
    url: i.track.external_urls.spotify,
    playedAt: i.played_at,
  }));
}
