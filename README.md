# Solaris Menu — Cloudflare Pages

Static DUI for the Solaris FiveM menu (`Solaris2.lua`).

## Files

| File | Role |
|------|------|
| `index.html` | Default entry (Pages root URL) |
| `interface.html` | Same UI — use if Lua points to `/interface.html` |
| `styles.css` | All menu styles |
| `script.js` | View + Lua bridge (`handleDuiMessage`) |

## Deploy

Push this entire folder to `main`. Lua should use:

```lua
duiUrl = "https://cautious-octo-pancake.pages.dev/?v=440"
```

All four assets above must be deployed together.
