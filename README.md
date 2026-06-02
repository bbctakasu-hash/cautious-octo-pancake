# Solaris Menu — Cloudflare Pages

Deploy **only these files** (tile UI + DUI bridge):

| File | Role |
|------|------|
| `index.html` | Menu shell (sidebar + tiles) |
| `style.css` | Teal tile theme |
| `script.js` | Renders tiles, `solaris:setMenuData`, clipboard bridge to Lua |

Source of truth: `D:\menu\dui\` — copy here before push.

Lua (`Solaris2.lua`):

```lua
duiUrl = "https://cautious-octo-pancake.pages.dev/?v=452"
```
