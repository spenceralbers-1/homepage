# spenceralbers-landing

Minimal static landing page for spenceralbers.com.

## Local preview

Open `index.html` directly, or run a static server:

```sh
python3 -m http.server 8080
```

## Live reload (local)

For auto-refresh on save:

```sh
node dev-server.cjs
```

## Deploy on Cloudflare Pages

1. Create a Cloudflare account: https://dash.cloudflare.com/
2. Add your domain to Cloudflare (DNS setup). Update your registrar nameservers when prompted.
3. Create a new Git repo for this folder and push it to GitHub.
4. In Cloudflare Pages, create a new project from that repo.
5. Build settings:
   - Framework preset: None
   - Build command: (leave empty)
   - Output directory: `/`
6. Add a custom domain: `spenceralbers.com`.

## Updating

Edit `index.html`, `styles.css`, `app.js`, then push to GitHub. Cloudflare Pages will redeploy automatically.
