const e=new Map;function t(e){const t=e.substring(1,7);return`${parseInt(t.substring(0,2),16)}, ${parseInt(t.substring(2,4),16)}, ${parseInt(t.substring(4,6),16)}`}function r(e){return null!==e&&"object"==typeof e}function o(e){return"string"==typeof e&&/^#[0-9A-F]{6}$/i.test(e)}function n(t){const r=e.get(t);if(void 0!==r)return r;{const r=async function(e){const t=new URL(e,document.location.href);"http:"!==t.protocol&&"https:"!==t.protocol||t.searchParams.append("schema","2");const r=await fetch(t.href);return s(await r.json())}(t);return e.set(t,r),r}}function s(e){if(!r(e))throw new Error("Invalid theme: Theme must be an object");if(2!==e.schema)throw new Error(`Unsupported theme schema: ${e.schema}`);if(!("name"in e)||"string"!=typeof e.name)throw new Error("Invalid theme: name must be a string");if(!("author"in e)||"string"!=typeof e.author)throw new Error("Invalid theme: author must be a string");if("light"in e&&"boolean"!=typeof e.light)throw new Error("Invalid theme: light must be a boolean");if("enchanted_glint"in e&&"string"!=typeof e.enchanted_glint)throw new Error("Invalid theme: enchanted_glint must be a string");if("images"in e){if(!r(e.images))throw new Error("Invalid theme: images must be an object");for(const t of Object.values(e.images))if("string"!=typeof t)throw new Error("Invalid theme: images must be an object of strings")}if("backgrounds"in e){if(!r(e.backgrounds))throw new Error("Invalid theme: backgrounds must be an object");for(const t of Object.values(e.backgrounds)){if(!r(t))throw new Error("Invalid theme: backgrounds must be an object of objects");if(!("type"in t))throw new Error("Invalid theme: backgrounds must be an object of objects with a type property");if("color"===t.type){if(!("color"in t)||!o(t.color))throw new Error("Invalid theme: backgrounds of type color must have a valid color property")}else{if("stripes"!==t.type)throw new Error("Invalid theme: backgrounds must be an object of objects with a type property of either color or stripes");if(!("angle"in t)||"string"!=typeof t.angle)throw new Error("Invalid theme: backgrounds of type stripes must have an angle property of type string");if(!("colors"in t)||!Array.isArray(t.colors))throw new Error("Invalid theme: backgrounds of type stripes must have a colors property of type array");if(t.colors.length<2)throw new Error("Invalid theme: backgrounds of type stripes must have at least 2 colors");for(const e of t.colors)if(!o(e))throw new Error("Invalid theme: stripe colors must be valid");if(!("width"in t)||"number"!=typeof t.width)throw new Error("Invalid theme: backgrounds of type stripes must have a width property of type number")}}}if("colors"in e){if(!r(e.colors))throw new Error("Invalid theme: colors must be an object");for(const t of Object.values(e.colors))if(!o(t))throw new Error("Invalid theme: colors must be an object of color strings")}return e}function i(e){const r={light:!!e.light,styles:{},logoURL:"../../resources/img/logo_square.svg"+(e.colors?.logo?.replace("#","?color=")??""),enchantedGlint:e.enchanted_glint??"./resources/img/enchanted-glint.png"};for(const o in e.colors){const n=e.colors[o];r.styles[`--${o}-hex`]=n,["icon","link","text","background","header","grey_background"].includes(o)&&(r.styles[`--${o}-rgb`]=t(n))}for(const t in e.images)r.styles[`--${t}`]=`url(${e.images[t]})`;for(const t in e.backgrounds){const o=e.backgrounds[t];let n;switch(o.type){case"color":n=o.color;break;case"stripes":n=`repeating-linear-gradient( ${o.angle}, ${o.colors.flatMap(((e,t)=>[`${e} ${t*o.width}px`,`${e} ${(t+1)*o.width}px`])).join(", ")})`}r.styles[`--${t}`]=n}return r.styles["--logo"]=`url(${r.logoURL})`,r}async function a(e){const t=await n(e),r=i(t);applyProcessedTheme(r),"function"==typeof redocInit&&redocInit(t.colors?.icon),localStorage.setItem("currentThemeUrl",e),localStorage.setItem("processedTheme",JSON.stringify(r))}window.addEventListener("storage",(e=>{if("currentThemeUrl"===e.key&&null!=e.newValue)for(const t of document.querySelectorAll("theme-list"))t.selected=e.newValue;else"processedTheme"===e.key&&null!=e.newValue&&applyProcessedTheme(JSON.parse(e.newValue))}));const c=JSON.parse(localStorage.getItem("trustedOrigins")??"[]");window.addEventListener("message",(e=>{if(r(e.data)&&"setTheme"===e.data.type){if(!c.includes(e.origin)){if(!confirm(`would you like to allow ${e.origin} to temporarily change your theme?`))return;if(c.push(e.origin),confirm("always this origin?")){const t=JSON.parse(localStorage.getItem("trustedOrigins")??"[]");t.push(e.origin),localStorage.setItem("trustedOrigins",JSON.stringify(t))}}const t=e.source;try{applyProcessedTheme(i(s(e.data.theme))),t.postMessage({success:!0},e.origin)}catch(r){t.postMessage({success:!1,error:String(r)},e.origin)}}}),{capture:!1,passive:!0});{const e=localStorage.getItem("currentTheme");e&&(localStorage.setItem("currentThemeUrl",`/resources/themes/${e}.json`),localStorage.removeItem("currentTheme"));const t=localStorage.getItem("currentThemeUrl");null!=t&&a(t)}export{n as getTheme,a as loadTheme,s as sanitizeTheme,e as themes};
//# sourceMappingURL=themes.c7781fa4.js.map