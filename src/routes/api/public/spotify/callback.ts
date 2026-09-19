import { createFileRoute } from "@tanstack/react-router";
import { SPOTIFY_REDIRECT_URI } from "@/lib/spotify.server";

export const Route = createFileRoute("/api/public/spotify/callback")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const code = url.searchParams.get("code");
        const error = url.searchParams.get("error");

        if (error) {
          return new Response(`Spotify auth error: ${error}`, { status: 400 });
        }
        if (!code) {
          return new Response("Missing authorization code", { status: 400 });
        }

        const clientId = process.env["SPOTIFY_CLIENT_ID"];
        const clientSecret = process.env["SPOTIFY_CLIENT_SECRET"];
        if (!clientId || !clientSecret) {
          return new Response("Spotify not configured", { status: 500 });
        }

        const body = new URLSearchParams({
          grant_type: "authorization_code",
          code,
          redirect_uri: SPOTIFY_REDIRECT_URI,
          client_id: clientId,
          client_secret: clientSecret,
        });

        const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body,
        });

        if (!tokenRes.ok) {
          const text = await tokenRes.text();
          return new Response(`Token exchange failed (${tokenRes.status}): ${text}`, {
            status: 500,
          });
        }

        const tokenData = (await tokenRes.json()) as {
          access_token: string;
          refresh_token: string;
          expires_in: number;
        };

        // One-time: display the refresh token for Tony to save as a secret.
        const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><title>Spotify Connected</title></head>
<body style="font-family:system-ui,sans-serif;max-width:640px;margin:48px auto;padding:0 20px;line-height:1.6">
<h1>✅ Spotify connected</h1>
<p>Copy the refresh token below and save it as <code>SPOTIFY_REFRESH_TOKEN</code> in your Lovable project secrets (Settings → Secrets):</p>
<textarea readonly style="width:100%;height:140px;font-family:monospace;font-size:13px;box-sizing:border-box">${tokenData.refresh_token}</textarea>
<p style="color:#666;font-size:14px">Access token (expires in ${tokenData.expires_in}s — for quick testing only):</p>
<textarea readonly style="width:100%;height:60px;font-family:monospace;font-size:13px;box-sizing:border-box">${tokenData.access_token}</textarea>
<p style="color:#999;font-size:13px">You can close this page after saving the refresh token.</p>
</body></html>`;

        return new Response(html, {
          headers: {
            "Content-Type": "text/html; charset=utf-8",
            "Cache-Control": "no-store",
          },
        });
      },
    },
  },
});
