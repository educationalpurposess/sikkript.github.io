const e = {
    "Amazon Silk": "amazon_silk",
    "Android Browser": "android",
    Bada: "bada",
    BlackBerry: "blackberry",
    Chrome: "chrome",
    Chromium: "chromium",
    Electron: "electron",
    Epiphany: "epiphany",
    Firefox: "firefox",
    Focus: "focus",
    Generic: "generic",
    "Google Search": "google_search",
    Googlebot: "googlebot",
    "Internet Explorer": "ie",
    "K-Meleon": "k_meleon",
    Maxthon: "maxthon",
    "Microsoft Edge": "edge",
    "MZ Browser": "mz",
    "NAVER Whale Browser": "naver",
    Opera: "opera",
    "Opera Coast": "opera_coast",
    PhantomJS: "phantomjs",
    Puffin: "puffin",
    QupZilla: "qupzilla",
    QQ: "qq",
    QQLite: "qqlite",
    Safari: "safari",
    Sailfish: "sailfish",
    "Samsung Internet for Android": "samsung_internet",
    SeaMonkey: "seamonkey",
    Sleipnir: "sleipnir",
    Swing: "swing",
    Tizen: "tizen",
    "UC Browser": "uc",
    Vivaldi: "vivaldi",
    "WebOS Browser": "webos",
    WeChat: "wechat",
    "Yandex Browser": "yandex",
    Roku: "roku"
}
  , t = {
    amazon_silk: "Amazon Silk",
    android: "Android Browser",
    bada: "Bada",
    blackberry: "BlackBerry",
    chrome: "Chrome",
    chromium: "Chromium",
    electron: "Electron",
    epiphany: "Epiphany",
    firefox: "Firefox",
    focus: "Focus",
    generic: "Generic",
    googlebot: "Googlebot",
    google_search: "Google Search",
    ie: "Internet Explorer",
    k_meleon: "K-Meleon",
    maxthon: "Maxthon",
    edge: "Microsoft Edge",
    mz: "MZ Browser",
    naver: "NAVER Whale Browser",
    opera: "Opera",
    opera_coast: "Opera Coast",
    phantomjs: "PhantomJS",
    puffin: "Puffin",
    qupzilla: "QupZilla",
    qq: "QQ Browser",
    qqlite: "QQ Browser Lite",
    safari: "Safari",
    sailfish: "Sailfish",
    samsung_internet: "Samsung Internet for Android",
    seamonkey: "SeaMonkey",
    sleipnir: "Sleipnir",
    swing: "Swing",
    tizen: "Tizen",
    uc: "UC Browser",
    vivaldi: "Vivaldi",
    webos: "WebOS Browser",
    wechat: "WeChat",
    yandex: "Yandex Browser"
}
  , r = {
    tablet: "tablet",
    mobile: "mobile",
    desktop: "desktop",
    tv: "tv"
}
  , s = {
    WindowsPhone: "Windows Phone",
    Windows: "Windows",
    MacOS: "macOS",
    iOS: "iOS",
    Android: "Android",
    WebOS: "WebOS",
    BlackBerry: "BlackBerry",
    Bada: "Bada",
    Tizen: "Tizen",
    Linux: "Linux",
    ChromeOS: "Chrome OS",
    PlayStation4: "PlayStation 4",
    Roku: "Roku"
}
  , i = {
    EdgeHTML: "EdgeHTML",
    Blink: "Blink",
    Trident: "Trident",
    Presto: "Presto",
    Gecko: "Gecko",
    WebKit: "WebKit"
};
class n {
    static getFirstMatch(e, t) {
        const r = t.match(e);
        return r && r.length > 0 && r[1] || ""
    }
    static getSecondMatch(e, t) {
        const r = t.match(e);
        return r && r.length > 1 && r[2] || ""
    }
    static matchAndReturnConst(e, t, r) {
        if (e.test(t))
            return r
    }
    static getWindowsVersionName(e) {
        switch (e) {
        case "NT":
            return "NT";
        case "XP":
        case "NT 5.1":
            return "XP";
        case "NT 5.0":
            return "2000";
        case "NT 5.2":
            return "2003";
        case "NT 6.0":
            return "Vista";
        case "NT 6.1":
            return "7";
        case "NT 6.2":
            return "8";
        case "NT 6.3":
            return "8.1";
        case "NT 10.0":
            return "10";
        default:
            return
        }
    }
    static getMacOSVersionName(e) {
        const t = e.split(".").splice(0, 2).map((e=>parseInt(e, 10) || 0));
        if (t.push(0),
        10 === t[0])
            switch (t[1]) {
            case 5:
                return "Leopard";
            case 6:
                return "Snow Leopard";
            case 7:
                return "Lion";
            case 8:
                return "Mountain Lion";
            case 9:
                return "Mavericks";
            case 10:
                return "Yosemite";
            case 11:
                return "El Capitan";
            case 12:
                return "Sierra";
            case 13:
                return "High Sierra";
            case 14:
                return "Mojave";
            case 15:
                return "Catalina";
            default:
                return
            }
    }
    static getAndroidVersionName(e) {
        const t = e.split(".").splice(0, 2).map((e=>parseInt(e, 10) || 0));
        if (t.push(0),
        !(1 === t[0] && t[1] < 5))
            return 1 === t[0] && t[1] < 6 ? "Cupcake" : 1 === t[0] && t[1] >= 6 ? "Donut" : 2 === t[0] && t[1] < 2 ? "Eclair" : 2 === t[0] && 2 === t[1] ? "Froyo" : 2 === t[0] && t[1] > 2 ? "Gingerbread" : 3 === t[0] ? "Honeycomb" : 4 === t[0] && t[1] < 1 ? "Ice Cream Sandwich" : 4 === t[0] && t[1] < 4 ? "Jelly Bean" : 4 === t[0] && t[1] >= 4 ? "KitKat" : 5 === t[0] ? "Lollipop" : 6 === t[0] ? "Marshmallow" : 7 === t[0] ? "Nougat" : 8 === t[0] ? "Oreo" : 9 === t[0] ? "Pie" : void 0
    }
    static getVersionPrecision(e) {
        return e.split(".").length
    }
    static compareVersions(e, t, r=!1) {
        const s = n.getVersionPrecision(e)
          , i = n.getVersionPrecision(t);
        let o = Math.max(s, i)
          , a = 0;
        const c = n.map([e, t], (e=>{
            const t = o - n.getVersionPrecision(e)
              , r = e + new Array(t + 1).join(".0");
            return n.map(r.split("."), (e=>new Array(20 - e.length).join("0") + e)).reverse()
        }
        ));
        for (r && (a = o - Math.min(s, i)),
        o -= 1; o >= a; ) {
            if (c[0][o] > c[1][o])
                return 1;
            if (c[0][o] === c[1][o]) {
                if (o === a)
                    return 0;
                o -= 1
            } else if (c[0][o] < c[1][o])
                return -1
        }
    }
    static map(e, t) {
        const r = [];
        let s;
        if (Array.prototype.map)
            return Array.prototype.map.call(e, t);
        for (s = 0; s < e.length; s += 1)
            r.push(t(e[s]));
        return r
    }
    static find(e, t) {
        let r, s;
        if (Array.prototype.find)
            return Array.prototype.find.call(e, t);
        for (r = 0,
        s = e.length; r < s; r += 1) {
            const s = e[r];
            if (t(s, r))
                return s
        }
    }
    static assign(e, ...t) {
        const r = e;
        let s, i;
        if (Object.assign)
            return Object.assign(e, ...t);
        for (s = 0,
        i = t.length; s < i; s += 1) {
            const e = t[s];
            if ("object" == typeof e && null !== e) {
                Object.keys(e).forEach((t=>{
                    r[t] = e[t]
                }
                ))
            }
        }
        return e
    }
    static getBrowserAlias(t) {
        return e[t]
    }
    static getBrowserTypeByAlias(e) {
        return t[e] || ""
    }
}
const o = /version\/(\d+(\.?_?\d+)+)/i
  , a = [{
    test: [/googlebot/i],
    describe(e) {
        const t = {
            name: "Googlebot"
        }
          , r = n.getFirstMatch(/googlebot\/(\d+(\.\d+))/i, e) || n.getFirstMatch(o, e);
        return r && (t.version = r),
        t
    }
}, {
    test: [/opera/i],
    describe(e) {
        const t = {
            name: "Opera"
        }
          , r = n.getFirstMatch(o, e) || n.getFirstMatch(/(?:opera)[\s/](\d+(\.?_?\d+)+)/i, e);
        return r && (t.version = r),
        t
    }
}, {
    test: [/opr\/|opios/i],
    describe(e) {
        const t = {
            name: "Opera"
        }
          , r = n.getFirstMatch(/(?:opr|opios)[\s/](\S+)/i, e) || n.getFirstMatch(o, e);
        return r && (t.version = r),
        t
    }
}, {
    test: [/SamsungBrowser/i],
    describe(e) {
        const t = {
            name: "Samsung Internet for Android"
        }
          , r = n.getFirstMatch(o, e) || n.getFirstMatch(/(?:SamsungBrowser)[\s/](\d+(\.?_?\d+)+)/i, e);
        return r && (t.version = r),
        t
    }
}, {
    test: [/Whale/i],
    describe(e) {
        const t = {
            name: "NAVER Whale Browser"
        }
          , r = n.getFirstMatch(o, e) || n.getFirstMatch(/(?:whale)[\s/](\d+(?:\.\d+)+)/i, e);
        return r && (t.version = r),
        t
    }
}, {
    test: [/MZBrowser/i],
    describe(e) {
        const t = {
            name: "MZ Browser"
        }
          , r = n.getFirstMatch(/(?:MZBrowser)[\s/](\d+(?:\.\d+)+)/i, e) || n.getFirstMatch(o, e);
        return r && (t.version = r),
        t
    }
}, {
    test: [/focus/i],
    describe(e) {
        const t = {
            name: "Focus"
        }
          , r = n.getFirstMatch(/(?:focus)[\s/](\d+(?:\.\d+)+)/i, e) || n.getFirstMatch(o, e);
        return r && (t.version = r),
        t
    }
}, {
    test: [/swing/i],
    describe(e) {
        const t = {
            name: "Swing"
        }
          , r = n.getFirstMatch(/(?:swing)[\s/](\d+(?:\.\d+)+)/i, e) || n.getFirstMatch(o, e);
        return r && (t.version = r),
        t
    }
}, {
    test: [/coast/i],
    describe(e) {
        const t = {
            name: "Opera Coast"
        }
          , r = n.getFirstMatch(o, e) || n.getFirstMatch(/(?:coast)[\s/](\d+(\.?_?\d+)+)/i, e);
        return r && (t.version = r),
        t
    }
}, {
    test: [/opt\/\d+(?:.?_?\d+)+/i],
    describe(e) {
        const t = {
            name: "Opera Touch"
        }
          , r = n.getFirstMatch(/(?:opt)[\s/](\d+(\.?_?\d+)+)/i, e) || n.getFirstMatch(o, e);
        return r && (t.version = r),
        t
    }
}, {
    test: [/yabrowser/i],
    describe(e) {
        const t = {
            name: "Yandex Browser"
        }
          , r = n.getFirstMatch(/(?:yabrowser)[\s/](\d+(\.?_?\d+)+)/i, e) || n.getFirstMatch(o, e);
        return r && (t.version = r),
        t
    }
}, {
    test: [/ucbrowser/i],
    describe(e) {
        const t = {
            name: "UC Browser"
        }
          , r = n.getFirstMatch(o, e) || n.getFirstMatch(/(?:ucbrowser)[\s/](\d+(\.?_?\d+)+)/i, e);
        return r && (t.version = r),
        t
    }
}, {
    test: [/Maxthon|mxios/i],
    describe(e) {
        const t = {
            name: "Maxthon"
        }
          , r = n.getFirstMatch(o, e) || n.getFirstMatch(/(?:Maxthon|mxios)[\s/](\d+(\.?_?\d+)+)/i, e);
        return r && (t.version = r),
        t
    }
}, {
    test: [/epiphany/i],
    describe(e) {
        const t = {
            name: "Epiphany"
        }
          , r = n.getFirstMatch(o, e) || n.getFirstMatch(/(?:epiphany)[\s/](\d+(\.?_?\d+)+)/i, e);
        return r && (t.version = r),
        t
    }
}, {
    test: [/puffin/i],
    describe(e) {
        const t = {
            name: "Puffin"
        }
          , r = n.getFirstMatch(o, e) || n.getFirstMatch(/(?:puffin)[\s/](\d+(\.?_?\d+)+)/i, e);
        return r && (t.version = r),
        t
    }
}, {
    test: [/sleipnir/i],
    describe(e) {
        const t = {
            name: "Sleipnir"
        }
          , r = n.getFirstMatch(o, e) || n.getFirstMatch(/(?:sleipnir)[\s/](\d+(\.?_?\d+)+)/i, e);
        return r && (t.version = r),
        t
    }
}, {
    test: [/k-meleon/i],
    describe(e) {
        const t = {
            name: "K-Meleon"
        }
          , r = n.getFirstMatch(o, e) || n.getFirstMatch(/(?:k-meleon)[\s/](\d+(\.?_?\d+)+)/i, e);
        return r && (t.version = r),
        t
    }
}, {
    test: [/micromessenger/i],
    describe(e) {
        const t = {
            name: "WeChat"
        }
          , r = n.getFirstMatch(/(?:micromessenger)[\s/](\d+(\.?_?\d+)+)/i, e) || n.getFirstMatch(o, e);
        return r && (t.version = r),
        t
    }
}, {
    test: [/qqbrowser/i],
    describe(e) {
        const t = {
            name: /qqbrowserlite/i.test(e) ? "QQ Browser Lite" : "QQ Browser"
        }
          , r = n.getFirstMatch(/(?:qqbrowserlite|qqbrowser)[/](\d+(\.?_?\d+)+)/i, e) || n.getFirstMatch(o, e);
        return r && (t.version = r),
        t
    }
}, {
    test: [/msie|trident/i],
    describe(e) {
        const t = {
            name: "Internet Explorer"
        }
          , r = n.getFirstMatch(/(?:msie |rv:)(\d+(\.?_?\d+)+)/i, e);
        return r && (t.version = r),
        t
    }
}, {
    test: [/\sedg\//i],
    describe(e) {
        const t = {
            name: "Microsoft Edge"
        }
          , r = n.getFirstMatch(/\sedg\/(\d+(\.?_?\d+)+)/i, e);
        return r && (t.version = r),
        t
    }
}, {
    test: [/edg([ea]|ios)/i],
    describe(e) {
        const t = {
            name: "Microsoft Edge"
        }
          , r = n.getSecondMatch(/edg([ea]|ios)\/(\d+(\.?_?\d+)+)/i, e);
        return r && (t.version = r),
        t
    }
}, {
    test: [/vivaldi/i],
    describe(e) {
        const t = {
            name: "Vivaldi"
        }
          , r = n.getFirstMatch(/vivaldi\/(\d+(\.?_?\d+)+)/i, e);
        return r && (t.version = r),
        t
    }
}, {
    test: [/seamonkey/i],
    describe(e) {
        const t = {
            name: "SeaMonkey"
        }
          , r = n.getFirstMatch(/seamonkey\/(\d+(\.?_?\d+)+)/i, e);
        return r && (t.version = r),
        t
    }
}, {
    test: [/sailfish/i],
    describe(e) {
        const t = {
            name: "Sailfish"
        }
          , r = n.getFirstMatch(/sailfish\s?browser\/(\d+(\.\d+)?)/i, e);
        return r && (t.version = r),
        t
    }
}, {
    test: [/silk/i],
    describe(e) {
        const t = {
            name: "Amazon Silk"
        }
          , r = n.getFirstMatch(/silk\/(\d+(\.?_?\d+)+)/i, e);
        return r && (t.version = r),
        t
    }
}, {
    test: [/phantom/i],
    describe(e) {
        const t = {
            name: "PhantomJS"
        }
          , r = n.getFirstMatch(/phantomjs\/(\d+(\.?_?\d+)+)/i, e);
        return r && (t.version = r),
        t
    }
}, {
    test: [/slimerjs/i],
    describe(e) {
        const t = {
            name: "SlimerJS"
        }
          , r = n.getFirstMatch(/slimerjs\/(\d+(\.?_?\d+)+)/i, e);
        return r && (t.version = r),
        t
    }
}, {
    test: [/blackberry|\bbb\d+/i, /rim\stablet/i],
    describe(e) {
        const t = {
            name: "BlackBerry"
        }
          , r = n.getFirstMatch(o, e) || n.getFirstMatch(/blackberry[\d]+\/(\d+(\.?_?\d+)+)/i, e);
        return r && (t.version = r),
        t
    }
}, {
    test: [/(web|hpw)[o0]s/i],
    describe(e) {
        const t = {
            name: "WebOS Browser"
        }
          , r = n.getFirstMatch(o, e) || n.getFirstMatch(/w(?:eb)?[o0]sbrowser\/(\d+(\.?_?\d+)+)/i, e);
        return r && (t.version = r),
        t
    }
}, {
    test: [/bada/i],
    describe(e) {
        const t = {
            name: "Bada"
        }
          , r = n.getFirstMatch(/dolfin\/(\d+(\.?_?\d+)+)/i, e);
        return r && (t.version = r),
        t
    }
}, {
    test: [/tizen/i],
    describe(e) {
        const t = {
            name: "Tizen"
        }
          , r = n.getFirstMatch(/(?:tizen\s?)?browser\/(\d+(\.?_?\d+)+)/i, e) || n.getFirstMatch(o, e);
        return r && (t.version = r),
        t
    }
}, {
    test: [/qupzilla/i],
    describe(e) {
        const t = {
            name: "QupZilla"
        }
          , r = n.getFirstMatch(/(?:qupzilla)[\s/](\d+(\.?_?\d+)+)/i, e) || n.getFirstMatch(o, e);
        return r && (t.version = r),
        t
    }
}, {
    test: [/firefox|iceweasel|fxios/i],
    describe(e) {
        const t = {
            name: "Firefox"
        }
          , r = n.getFirstMatch(/(?:firefox|iceweasel|fxios)[\s/](\d+(\.?_?\d+)+)/i, e);
        return r && (t.version = r),
        t
    }
}, {
    test: [/electron/i],
    describe(e) {
        const t = {
            name: "Electron"
        }
          , r = n.getFirstMatch(/(?:electron)\/(\d+(\.?_?\d+)+)/i, e);
        return r && (t.version = r),
        t
    }
}, {
    test: [/MiuiBrowser/i],
    describe(e) {
        const t = {
            name: "Miui"
        }
          , r = n.getFirstMatch(/(?:MiuiBrowser)[\s/](\d+(\.?_?\d+)+)/i, e);
        return r && (t.version = r),
        t
    }
}, {
    test: [/chromium/i],
    describe(e) {
        const t = {
            name: "Chromium"
        }
          , r = n.getFirstMatch(/(?:chromium)[\s/](\d+(\.?_?\d+)+)/i, e) || n.getFirstMatch(o, e);
        return r && (t.version = r),
        t
    }
}, {
    test: [/chrome|crios|crmo/i],
    describe(e) {
        const t = {
            name: "Chrome"
        }
          , r = n.getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.?_?\d+)+)/i, e);
        return r && (t.version = r),
        t
    }
}, {
    test: [/GSA/i],
    describe(e) {
        const t = {
            name: "Google Search"
        }
          , r = n.getFirstMatch(/(?:GSA)\/(\d+(\.?_?\d+)+)/i, e);
        return r && (t.version = r),
        t
    }
}, {
    test(e) {
        const t = !e.test(/like android/i)
          , r = e.test(/android/i);
        return t && r
    },
    describe(e) {
        const t = {
            name: "Android Browser"
        }
          , r = n.getFirstMatch(o, e);
        return r && (t.version = r),
        t
    }
}, {
    test: [/playstation 4/i],
    describe(e) {
        const t = {
            name: "PlayStation 4"
        }
          , r = n.getFirstMatch(o, e);
        return r && (t.version = r),
        t
    }
}, {
    test: [/safari|applewebkit/i],
    describe(e) {
        const t = {
            name: "Safari"
        }
          , r = n.getFirstMatch(o, e);
        return r && (t.version = r),
        t
    }
}, {
    test: [/.*/i],
    describe(e) {
        const t = -1 !== e.search("\\(") ? /^(.*)\/(.*)[ \t]\((.*)/ : /^(.*)\/(.*) /;
        return {
            name: n.getFirstMatch(t, e),
            version: n.getSecondMatch(t, e)
        }
    }
}];
var c = [{
    test: [/Roku\/DVP/],
    describe(e) {
        const t = n.getFirstMatch(/Roku\/DVP-(\d+\.\d+)/i, e);
        return {
            name: s.Roku,
            version: t
        }
    }
}, {
    test: [/windows phone/i],
    describe(e) {
        const t = n.getFirstMatch(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i, e);
        return {
            name: s.WindowsPhone,
            version: t
        }
    }
}, {
    test: [/windows /i],
    describe(e) {
        const t = n.getFirstMatch(/Windows ((NT|XP)( \d\d?.\d)?)/i, e)
          , r = n.getWindowsVersionName(t);
        return {
            name: s.Windows,
            version: t,
            versionName: r
        }
    }
}, {
    test: [/Macintosh(.*?) FxiOS(.*?)\//],
    describe(e) {
        const t = {
            name: s.iOS
        }
          , r = n.getSecondMatch(/(Version\/)(\d[\d.]+)/, e);
        return r && (t.version = r),
        t
    }
}, {
    test: [/macintosh/i],
    describe(e) {
        const t = n.getFirstMatch(/mac os x (\d+(\.?_?\d+)+)/i, e).replace(/[_\s]/g, ".")
          , r = n.getMacOSVersionName(t)
          , i = {
            name: s.MacOS,
            version: t
        };
        return r && (i.versionName = r),
        i
    }
}, {
    test: [/(ipod|iphone|ipad)/i],
    describe(e) {
        const t = n.getFirstMatch(/os (\d+([_\s]\d+)*) like mac os x/i, e).replace(/[_\s]/g, ".");
        return {
            name: s.iOS,
            version: t
        }
    }
}, {
    test(e) {
        const t = !e.test(/like android/i)
          , r = e.test(/android/i);
        return t && r
    },
    describe(e) {
        const t = n.getFirstMatch(/android[\s/-](\d+(\.\d+)*)/i, e)
          , r = n.getAndroidVersionName(t)
          , i = {
            name: s.Android,
            version: t
        };
        return r && (i.versionName = r),
        i
    }
}, {
    test: [/(web|hpw)[o0]s/i],
    describe(e) {
        const t = n.getFirstMatch(/(?:web|hpw)[o0]s\/(\d+(\.\d+)*)/i, e)
          , r = {
            name: s.WebOS
        };
        return t && t.length && (r.version = t),
        r
    }
}, {
    test: [/blackberry|\bbb\d+/i, /rim\stablet/i],
    describe(e) {
        const t = n.getFirstMatch(/rim\stablet\sos\s(\d+(\.\d+)*)/i, e) || n.getFirstMatch(/blackberry\d+\/(\d+([_\s]\d+)*)/i, e) || n.getFirstMatch(/\bbb(\d+)/i, e);
        return {
            name: s.BlackBerry,
            version: t
        }
    }
}, {
    test: [/bada/i],
    describe(e) {
        const t = n.getFirstMatch(/bada\/(\d+(\.\d+)*)/i, e);
        return {
            name: s.Bada,
            version: t
        }
    }
}, {
    test: [/tizen/i],
    describe(e) {
        const t = n.getFirstMatch(/tizen[/\s](\d+(\.\d+)*)/i, e);
        return {
            name: s.Tizen,
            version: t
        }
    }
}, {
    test: [/linux/i],
    describe: ()=>({
        name: s.Linux
    })
}, {
    test: [/CrOS/],
    describe: ()=>({
        name: s.ChromeOS
    })
}, {
    test: [/PlayStation 4/],
    describe(e) {
        const t = n.getFirstMatch(/PlayStation 4[/\s](\d+(\.\d+)*)/i, e);
        return {
            name: s.PlayStation4,
            version: t
        }
    }
}]
  , d = [{
    test: [/googlebot/i],
    describe: ()=>({
        type: "bot",
        vendor: "Google"
    })
}, {
    test: [/huawei/i],
    describe(e) {
        const t = n.getFirstMatch(/(can-l01)/i, e) && "Nova"
          , s = {
            type: r.mobile,
            vendor: "Huawei"
        };
        return t && (s.model = t),
        s
    }
}, {
    test: [/nexus\s*(?:7|8|9|10).*/i],
    describe: ()=>({
        type: r.tablet,
        vendor: "Nexus"
    })
}, {
    test: [/ipad/i],
    describe: ()=>({
        type: r.tablet,
        vendor: "Apple",
        model: "iPad"
    })
}, {
    test: [/Macintosh(.*?) FxiOS(.*?)\//],
    describe: ()=>({
        type: r.tablet,
        vendor: "Apple",
        model: "iPad"
    })
}, {
    test: [/kftt build/i],
    describe: ()=>({
        type: r.tablet,
        vendor: "Amazon",
        model: "Kindle Fire HD 7"
    })
}, {
    test: [/silk/i],
    describe: ()=>({
        type: r.tablet,
        vendor: "Amazon"
    })
}, {
    test: [/tablet(?! pc)/i],
    describe: ()=>({
        type: r.tablet
    })
}, {
    test(e) {
        const t = e.test(/ipod|iphone/i)
          , r = e.test(/like (ipod|iphone)/i);
        return t && !r
    },
    describe(e) {
        const t = n.getFirstMatch(/(ipod|iphone)/i, e);
        return {
            type: r.mobile,
            vendor: "Apple",
            model: t
        }
    }
}, {
    test: [/nexus\s*[0-6].*/i, /galaxy nexus/i],
    describe: ()=>({
        type: r.mobile,
        vendor: "Nexus"
    })
}, {
    test: [/[^-]mobi/i],
    describe: ()=>({
        type: r.mobile
    })
}, {
    test: e=>"blackberry" === e.getBrowserName(!0),
    describe: ()=>({
        type: r.mobile,
        vendor: "BlackBerry"
    })
}, {
    test: e=>"bada" === e.getBrowserName(!0),
    describe: ()=>({
        type: r.mobile
    })
}, {
    test: e=>"windows phone" === e.getBrowserName(),
    describe: ()=>({
        type: r.mobile,
        vendor: "Microsoft"
    })
}, {
    test(e) {
        const t = Number(String(e.getOSVersion()).split(".")[0]);
        return "android" === e.getOSName(!0) && t >= 3
    },
    describe: ()=>({
        type: r.tablet
    })
}, {
    test: e=>"android" === e.getOSName(!0),
    describe: ()=>({
        type: r.mobile
    })
}, {
    test: e=>"macos" === e.getOSName(!0),
    describe: ()=>({
        type: r.desktop,
        vendor: "Apple"
    })
}, {
    test: e=>"windows" === e.getOSName(!0),
    describe: ()=>({
        type: r.desktop
    })
}, {
    test: e=>"linux" === e.getOSName(!0),
    describe: ()=>({
        type: r.desktop
    })
}, {
    test: e=>"playstation 4" === e.getOSName(!0),
    describe: ()=>({
        type: r.tv
    })
}, {
    test: e=>"roku" === e.getOSName(!0),
    describe: ()=>({
        type: r.tv
    })
}]
  , u = [{
    test: e=>"microsoft edge" === e.getBrowserName(!0),
    describe(e) {
        if (/\sedg\//i.test(e))
            return {
                name: i.Blink
            };
        const t = n.getFirstMatch(/edge\/(\d+(\.?_?\d+)+)/i, e);
        return {
            name: i.EdgeHTML,
            version: t
        }
    }
}, {
    test: [/trident/i],
    describe(e) {
        const t = {
            name: i.Trident
        }
          , r = n.getFirstMatch(/trident\/(\d+(\.?_?\d+)+)/i, e);
        return r && (t.version = r),
        t
    }
}, {
    test: e=>e.test(/presto/i),
    describe(e) {
        const t = {
            name: i.Presto
        }
          , r = n.getFirstMatch(/presto\/(\d+(\.?_?\d+)+)/i, e);
        return r && (t.version = r),
        t
    }
}, {
    test(e) {
        const t = e.test(/gecko/i)
          , r = e.test(/like gecko/i);
        return t && !r
    },
    describe(e) {
        const t = {
            name: i.Gecko
        }
          , r = n.getFirstMatch(/gecko\/(\d+(\.?_?\d+)+)/i, e);
        return r && (t.version = r),
        t
    }
}, {
    test: [/(apple)?webkit\/537\.36/i],
    describe: ()=>({
        name: i.Blink
    })
}, {
    test: [/(apple)?webkit/i],
    describe(e) {
        const t = {
            name: i.WebKit
        }
          , r = n.getFirstMatch(/webkit\/(\d+(\.?_?\d+)+)/i, e);
        return r && (t.version = r),
        t
    }
}];
class h {
    constructor(e, t=!1) {
        if (null == e || "" === e)
            throw new Error("UserAgent parameter can't be empty");
        this._ua = e,
        this.parsedResult = {},
        !0 !== t && this.parse()
    }
    getUA() {
        return this._ua
    }
    test(e) {
        return e.test(this._ua)
    }
    parseBrowser() {
        this.parsedResult.browser = {};
        const e = n.find(a, (e=>{
            if ("function" == typeof e.test)
                return e.test(this);
            if (e.test instanceof Array)
                return e.test.some((e=>this.test(e)));
            throw new Error("Browser's test function is not valid")
        }
        ));
        return e && (this.parsedResult.browser = e.describe(this.getUA())),
        this.parsedResult.browser
    }
    getBrowser() {
        return this.parsedResult.browser ? this.parsedResult.browser : this.parseBrowser()
    }
    getBrowserName(e) {
        return e ? String(this.getBrowser().name).toLowerCase() || "" : this.getBrowser().name || ""
    }
    getBrowserVersion() {
        return this.getBrowser().version
    }
    getOS() {
        return this.parsedResult.os ? this.parsedResult.os : this.parseOS()
    }
    parseOS() {
        this.parsedResult.os = {};
        const e = n.find(c, (e=>{
            if ("function" == typeof e.test)
                return e.test(this);
            if (e.test instanceof Array)
                return e.test.some((e=>this.test(e)));
            throw new Error("Browser's test function is not valid")
        }
        ));
        return e && (this.parsedResult.os = e.describe(this.getUA())),
        this.parsedResult.os
    }
    getOSName(e) {
        const {name: t} = this.getOS();
        return e ? String(t).toLowerCase() || "" : t || ""
    }
    getOSVersion() {
        return this.getOS().version
    }
    getPlatform() {
        return this.parsedResult.platform ? this.parsedResult.platform : this.parsePlatform()
    }
    getPlatformType(e=!1) {
        const {type: t} = this.getPlatform();
        return e ? String(t).toLowerCase() || "" : t || ""
    }
    parsePlatform() {
        this.parsedResult.platform = {};
        const e = n.find(d, (e=>{
            if ("function" == typeof e.test)
                return e.test(this);
            if (e.test instanceof Array)
                return e.test.some((e=>this.test(e)));
            throw new Error("Browser's test function is not valid")
        }
        ));
        return e && (this.parsedResult.platform = e.describe(this.getUA())),
        this.parsedResult.platform
    }
    getEngine() {
        return this.parsedResult.engine ? this.parsedResult.engine : this.parseEngine()
    }
    getEngineName(e) {
        return e ? String(this.getEngine().name).toLowerCase() || "" : this.getEngine().name || ""
    }
    parseEngine() {
        this.parsedResult.engine = {};
        const e = n.find(u, (e=>{
            if ("function" == typeof e.test)
                return e.test(this);
            if (e.test instanceof Array)
                return e.test.some((e=>this.test(e)));
            throw new Error("Browser's test function is not valid")
        }
        ));
        return e && (this.parsedResult.engine = e.describe(this.getUA())),
        this.parsedResult.engine
    }
    parse() {
        return this.parseBrowser(),
        this.parseOS(),
        this.parsePlatform(),
        this.parseEngine(),
        this
    }
    getResult() {
        return n.assign({}, this.parsedResult)
    }
    satisfies(e) {
        const t = {};
        let r = 0;
        const s = {};
        let i = 0;
        if (Object.keys(e).forEach((n=>{
            const o = e[n];
            "string" == typeof o ? (s[n] = o,
            i += 1) : "object" == typeof o && (t[n] = o,
            r += 1)
        }
        )),
        r > 0) {
            const e = Object.keys(t)
              , r = n.find(e, (e=>this.isOS(e)));
            if (r) {
                const e = this.satisfies(t[r]);
                if (void 0 !== e)
                    return e
            }
            const s = n.find(e, (e=>this.isPlatform(e)));
            if (s) {
                const e = this.satisfies(t[s]);
                if (void 0 !== e)
                    return e
            }
        }
        if (i > 0) {
            const e = Object.keys(s)
              , t = n.find(e, (e=>this.isBrowser(e, !0)));
            if (void 0 !== t)
                return this.compareVersion(s[t])
        }
    }
    isBrowser(e, t=!1) {
        const r = this.getBrowserName().toLowerCase();
        let s = e.toLowerCase();
        const i = n.getBrowserTypeByAlias(s);
        return t && i && (s = i.toLowerCase()),
        s === r
    }
    compareVersion(e) {
        let t = [0]
          , r = e
          , s = !1;
        const i = this.getBrowserVersion();
        if ("string" == typeof i)
            return ">" === e[0] || "<" === e[0] ? (r = e.substr(1),
            "=" === e[1] ? (s = !0,
            r = e.substr(2)) : t = [],
            ">" === e[0] ? t.push(1) : t.push(-1)) : "=" === e[0] ? r = e.substr(1) : "~" === e[0] && (s = !0,
            r = e.substr(1)),
            t.indexOf(n.compareVersions(i, r, s)) > -1
    }
    isOS(e) {
        return this.getOSName(!0) === String(e).toLowerCase()
    }
    isPlatform(e) {
        return this.getPlatformType(!0) === String(e).toLowerCase()
    }
    isEngine(e) {
        return this.getEngineName(!0) === String(e).toLowerCase()
    }
    is(e, t=!1) {
        return this.isBrowser(e, t) || this.isOS(e) || this.isPlatform(e)
    }
    some(e=[]) {
        return e.some((e=>this.is(e)))
    }
}
/*!
 * Bowser - a browser detector
 * https://github.com/lancedikson/bowser
 * MIT License | (c) Dustin Diaz 2012-2015
 * MIT License | (c) Denis Demchenko 2015-2019
 */
const l = {
    safari: {
        version: "15.4",
        help: "https://support.apple.com/en-us/HT204416"
    },
    chrome: {
        version: "88",
        help: "https://support.google.com/chrome/answer/95414",
        androidPackage: "com.android.chrome"
    },
    edge: {
        version: "88",
        help: "https://support.microsoft.com/en-us/topic/microsoft-edge-update-settings-af8aaca2-1b69-4870-94fe-18822dbb7ef1",
        androidPackage: "com.microsoft.emmx"
    },
    firefox: {
        version: "103",
        help: "https://support.mozilla.org/kb/update-firefox-latest-release",
        androidPackage: "org.mozilla.firefox"
    }
}
  , p = class {
    static getParser(e, t=!1) {
        if ("string" != typeof e)
            throw new Error("UserAgent should be a string");
        return new h(e,t)
    }
    static parse(e) {
        return new h(e).getResult()
    }
    static get BROWSER_MAP() {
        return t
    }
    static get ENGINE_MAP() {
        return i
    }
    static get OS_MAP() {
        return s
    }
    static get PLATFORMS_MAP() {
        return r
    }
}
.getParser(window.navigator.userAgent);
function g(e) {
    if (sessionStorage.getItem("hide update warning"))
        return;
    const t = "iOS" == e ? {
        help: "https://support.apple.com/en-us/HT204204"
    } : l[e]
      , r = document.createElement("div");
    r.className = "update-popup-wrapper";
    const s = document.createElement("div");
    s.className = "update-popup";
    const i = document.createElement("h2");
    var n;
    i.innerHTML = "Outdated " + ("iOS" == e ? "iOS" : (n = e).charAt(0).toUpperCase() + n.slice(1)) + "!",
    s.appendChild(i);
    const o = document.createElement("p");
    o.innerHTML = ("iOS" == e ? "Update iOS" : "Update your browser") + " for the best SkyCrypt experience.",
    s.appendChild(o);
    const a = document.createElement("div");
    a.className = "button-row";
    const c = document.createElement("button");
    c.innerHTML = "close",
    c.onclick = function() {
        sessionStorage.setItem("hide update warning", "true"),
        r.remove()
    }
    ,
    a.appendChild(c);
    const d = document.createElement("a");
    p.is("android") && t.androidPackage ? (d.href = "https://play.google.com/store/apps/details?id=" + t.androidPackage,
    d.innerHTML = "update now") : (d.href = t.help,
    d.innerHTML = "show me how"),
    d.target = "_blank",
    d.rel = "noreferrer",
    a.appendChild(d),
    s.appendChild(a),
    r.appendChild(s),
    document.body.appendChild(r),
    d.focus()
}
if (p.is("iOS")) {
    parseFloat(p.getOSVersion().split(".").slice(0, 2).join(".")) < 15.4 && g("iOS")
} else
    for (const e in l) {
        const t = {};
        t[e] = "<" + l[e].version,
        p.satisfies(t) && g(e)
    }
//# sourceMappingURL=browser-compat-check.b08671ac.js.map
