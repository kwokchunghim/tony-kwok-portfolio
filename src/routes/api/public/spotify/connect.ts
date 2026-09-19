import { createFileRoute } from "@tanstack/react-router";
import { SPOTIFY_SCOPES, SPOTIFY_REDIRECT_URI } from "@/lib/spotify.server";

export const Route = createFileRoute("/api/public/spotify/connect")({
  server: {
    handlers: {
      GET: async () => {
        const clientId = process.env["SPOTIFY_CLIENT_ID"];
        if (!clientId) {
          return new Response("Spotify not configured", { status: 500 });
        }

        const state = crypto.randomUUID();
        const params = new URLSearchParams({
          client_id: clientId,
          response_type: "code",
          redirect_uri: SPOTIFY_REDIRECT_URI,
          scope: SPOTIFY_SCOPES.join(" "),
          state,
        });

        const authUrl = `https://accounts.spotify.com/authorize?${params.toString()}`;

        const res = new Response(null, {
          status: 302,
          headers: { Location: authUrl },
        });
        res.headers.set(
          "Set-Cookie",
          `spotify_state=${state}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=600`,
        );
        return res;
      },
    },
  },
});
