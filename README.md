# Solaris Menu — Cloudflare Pages

Deploy **all files in this folder together**:

| File | Required |
|------|----------|
| `index.html` | Entry page (Lua loads site root) |
| `style.css` | Styles (linked from index.html) |
| `script.js` | Menu logic + DUI bridge |

Source: `C:\Users\markr\Downloads\interface`

Lua URL (`Solaris2.lua`):

```lua
duiUrl = "https://cautious-octo-pancake.pages.dev/?v=441"
```
