import { createServerFn } from "@tanstack/react-start";
import { fetchTopTracks, fetchRecentlyPlayed, type SpotifyTrack, type SpotifyTimeRange } from "./spotify.server";

export interface SpotifyResult {
  tracks: SpotifyTrack[];
  error: string | null;
}

export const getTopTracks = createServerFn({ method: "GET" })
  .inputValidator((data: { timeRange: SpotifyTimeRange }) => data)
  .handler(async ({ data }): Promise<SpotifyResult> => {
    try {
      const tracks = await fetchTopTracks(5, data.timeRange);
      return { tracks, error: null };
    } catch (e) {
      return { tracks: [], error: e instanceof Error ? e.message : "Spotify unavailable" };
    }
  });

export const getRecentlyPlayed = createServerFn({ method: "GET" }).handler(async (): Promise<SpotifyResult> => {
  try {
    const tracks = await fetchRecentlyPlayed(5);
    return { tracks, error: null };
  } catch (e) {
    return { tracks: [], error: e instanceof Error ? e.message : "Spotify unavailable" };
  }
});
