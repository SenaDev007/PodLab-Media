(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/lib/router.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isRootPath",
    ()=>isRootPath,
    "navigate",
    ()=>navigate,
    "parseHash",
    ()=>parseHash,
    "useHashRoute",
    ()=>useHashRoute
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
const VALID = [
    "accueil",
    "studios",
    "sponsoring",
    "evenements",
    "invitation",
    "admin"
];
function isRootPath() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return window.location.pathname.replace(/\/+$/, "") === "";
}
function parseHash() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const raw = window.location.hash.replace(/^#\/?/, "").split("?")[0];
    return VALID.includes(raw) ? raw : "accueil";
}
function navigate(route) {
    // Sur une page profonde (déploiement Vercel), utiliser les URLs réelles
    if (!isRootPath()) {
        if (route === "accueil" && window.location.pathname === "/") return;
        if (route !== "accueil" && window.location.pathname === `/${route}`) return;
        window.location.href = route === "accueil" ? "/" : `/${route}`;
        return;
    }
    // Sur la page racine : bascule de vue via le hash
    const target = route === "accueil" ? "#/" : `#/${route}`;
    if (window.location.hash === target) {
        window.dispatchEvent(new HashChangeEvent("hashchange"));
        return;
    }
    window.location.hash = target;
}
function useHashRoute() {
    _s();
    const [route, setRoute] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("accueil");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useHashRoute.useEffect": ()=>{
            const update = {
                "useHashRoute.useEffect.update": ()=>{
                    setRoute(parseHash());
                }
            }["useHashRoute.useEffect.update"];
            update();
            window.addEventListener("hashchange", update);
            return ({
                "useHashRoute.useEffect": ()=>window.removeEventListener("hashchange", update)
            })["useHashRoute.useEffect"];
        }
    }["useHashRoute.useEffect"], []);
    return route;
}
_s(useHashRoute, "34L5bLVluIPKYEI/h59zYIrvIzs=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/brand.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// ═══════════════════════════════════════════════════════════════════════════
// PodLab Media — Coordonnées officielles & réseaux sociaux
// ═══════════════════════════════════════════════════════════════════════════
__turbopack_context__.s([
    "BRAND",
    ()=>BRAND,
    "CONTACT",
    ()=>CONTACT,
    "SOCIALS",
    ()=>SOCIALS
]);
const BRAND = {
    name: "PodLab Media",
    tagline: "1er Média Business d'Afrique francophone",
    baseline: "Les interviews qui font l'économie africaine.",
    city1: "Cotonou, Bénin",
    city2: "Abidjan, Côte d'Ivoire"
};
const CONTACT = {
    // 🎬 Contact officiel
    phoneDisplay: "+229 97 10 62 88",
    phoneRaw: "+22997106288",
    telHref: "tel:+22997106288",
    whatsapp: "https://wa.me/22997106288",
    whatsappDisplay: "wa.me/22997106288",
    email: "studiopodlab@gmail.com",
    mailto: "mailto:studiopodlab@gmail.com"
};
const SOCIALS = {
    youtube: "https://www.youtube.com/@podlabmedia",
    youtubeHandle: "@podlabmedia",
    instagram: "https://www.instagram.com/podlab.so",
    instagramHandle: "@podlab.so",
    tiktok: "https://www.tiktok.com/@podlabmedia",
    tiktokHandle: "@podlabmedia",
    facebook: "https://www.facebook.com/podlabmedia",
    facebookHandle: "/podlabmedia"
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/player-store.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "usePlayerStore",
    ()=>usePlayerStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-client] (ecmascript)");
;
const usePlayerStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create"])((set)=>({
        video: null,
        open: (video)=>set({
                video
            }),
        close: ()=>set({
                video: null
            })
    }));
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/videos.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CHANNEL_STATS",
    ()=>CHANNEL_STATS,
    "FEATURED_VIDEO",
    ()=>FEATURED_VIDEO,
    "NOTABLE_GUESTS",
    ()=>NOTABLE_GUESTS,
    "VIDEOS",
    ()=>VIDEOS,
    "VIDEO_THEMES",
    ()=>VIDEO_THEMES
]);
const VIDEO_THEMES = {
    entrepreneuriat: "Entrepreneuriat & Business",
    finance: "Finance & Investissement",
    "success-stories": "Success Stories",
    showbiz: "Musique & Showbiz",
    societe: "Société & Révélations"
};
const VIDEOS = [
    {
        videoId: "ffsMdUO5dqw",
        title: "Sans cette décision, nos entreprises auraient fermé en un an : Stanislas Zézé & Régis Facia",
        theme: "entrepreneuriat",
        youtubeUrl: "https://www.youtube.com/watch?v=ffsMdUO5dqw",
        thumbnail: "https://i.ytimg.com/vi/ffsMdUO5dqw/hqdefault.jpg"
    },
    {
        videoId: "hTCraS5qU34",
        title: "\"Si tu gagnes 1 million, tu devrais mettre 500 000 de côté\" - Stan Zézé",
        theme: "finance",
        youtubeUrl: "https://www.youtube.com/watch?v=hTCraS5qU34",
        thumbnail: "https://i.ytimg.com/vi/hTCraS5qU34/hqdefault.jpg"
    },
    {
        videoId: "v2bdmOuogvY",
        title: "Enfant placé, il refuse 1,3 milliard puis entre en bourse comme Dangote - Richard ODJRADO",
        theme: "success-stories",
        youtubeUrl: "https://www.youtube.com/watch?v=v2bdmOuogvY",
        thumbnail: "https://i.ytimg.com/vi/v2bdmOuogvY/hqdefault.jpg"
    },
    {
        videoId: "5qNXELZfCu0",
        title: "De la mort à la star numéro 1 de la télé — La résurrection de Steve Facia",
        theme: "success-stories",
        youtubeUrl: "https://www.youtube.com/watch?v=5qNXELZfCu0",
        thumbnail: "https://i.ytimg.com/vi/5qNXELZfCu0/hqdefault.jpg"
    },
    {
        videoId: "Fzw4I2M5Nz0",
        title: "Douk Saga, DJ Arafat sont morts à 33 ans, je suis tombé dans le même piège — Quiz Master Danny",
        theme: "showbiz",
        youtubeUrl: "https://www.youtube.com/watch?v=Fzw4I2M5Nz0",
        thumbnail: "https://i.ytimg.com/vi/Fzw4I2M5Nz0/hqdefault.jpg"
    },
    {
        videoId: "MRn9vTGoT74",
        title: "Sans ce licenciement à RFI, je ne serais jamais devenu Claudy Siar Codjovi",
        theme: "success-stories",
        youtubeUrl: "https://www.youtube.com/watch?v=MRn9vTGoT74",
        thumbnail: "https://i.ytimg.com/vi/MRn9vTGoT74/hqdefault.jpg"
    },
    {
        videoId: "IfIhhB_Z5us",
        title: "Le secret pour devenir libre financièrement - Jeanne SISSOKO-ZEZE",
        theme: "finance",
        youtubeUrl: "https://www.youtube.com/watch?v=IfIhhB_Z5us",
        thumbnail: "https://i.ytimg.com/vi/IfIhhB_Z5us/hqdefault.jpg"
    },
    {
        videoId: "x-3JodohGP0",
        title: "Avocate en droit des femmes : Le sexe provoque t-il des divorces ? Huguette BOPKE",
        theme: "societe",
        youtubeUrl: "https://www.youtube.com/watch?v=x-3JodohGP0",
        thumbnail: "https://i.ytimg.com/vi/x-3JodohGP0/hqdefault.jpg"
    },
    {
        videoId: "TSzxqWtgqF4",
        title: "X-Time : Je n'ai rien contre Axel Merryl mais les gens pensent le contraire",
        theme: "showbiz",
        youtubeUrl: "https://www.youtube.com/watch?v=TSzxqWtgqF4",
        thumbnail: "https://i.ytimg.com/vi/TSzxqWtgqF4/hqdefault.jpg"
    },
    {
        videoId: "x37QkXpaVKM",
        title: "TALON, KEREKOU, WADAGNI - Sagbohan DANIALOU fait des révélations chocs sur les présidents",
        theme: "societe",
        youtubeUrl: "https://www.youtube.com/watch?v=x37QkXpaVKM",
        thumbnail: "https://i.ytimg.com/vi/x37QkXpaVKM/hqdefault.jpg"
    },
    {
        videoId: "_ccQXbS71Zs",
        title: "Sans cette trahison, je ne serais jamais devenu SAGBOHAN DANIALOU",
        theme: "success-stories",
        youtubeUrl: "https://www.youtube.com/watch?v=_ccQXbS71Zs",
        thumbnail: "https://i.ytimg.com/vi/_ccQXbS71Zs/hqdefault.jpg"
    },
    {
        videoId: "J04QN8m5gqA",
        title: "J’ai photographié le Pr Patrice TALON pendant 10 ans mais son œil ne rate rien - Rodrigue AKO",
        theme: "societe",
        youtubeUrl: "https://www.youtube.com/watch?v=J04QN8m5gqA",
        thumbnail: "https://i.ytimg.com/vi/J04QN8m5gqA/hqdefault.jpg"
    },
    {
        videoId: "eW08xU1hf1A",
        title: "Arnaqué de 18 millions, il finit par habiller des présidents et des stars d'Afrique : Jerry Sinclair",
        theme: "success-stories",
        youtubeUrl: "https://www.youtube.com/watch?v=eW08xU1hf1A",
        thumbnail: "https://i.ytimg.com/vi/eW08xU1hf1A/hqdefault.jpg"
    },
    {
        videoId: "0_mxbi5pHZY",
        title: "Diffamation, Trahison, Bénin Bouge, Keith Sonon : Stévy WALLACE fait des révélations choquantes",
        theme: "showbiz",
        youtubeUrl: "https://www.youtube.com/watch?v=0_mxbi5pHZY",
        thumbnail: "https://i.ytimg.com/vi/0_mxbi5pHZY/hqdefault.jpg"
    },
    {
        videoId: "_3gZ2IXeg1s",
        title: "Patrice TALON : Ce que vous devez savoir sur l'homme au delà du Président",
        theme: "societe",
        youtubeUrl: "https://www.youtube.com/watch?v=_3gZ2IXeg1s",
        thumbnail: "https://i.ytimg.com/vi/_3gZ2IXeg1s/hqdefault.jpg"
    },
    {
        videoId: "56nmEWSUYMw",
        title: "J’ai géré la com du Pr Patrice TALON pendant 7ans mais on a failli ne jamais travailler ensemble",
        theme: "societe",
        youtubeUrl: "https://www.youtube.com/watch?v=56nmEWSUYMw",
        thumbnail: "https://i.ytimg.com/vi/56nmEWSUYMw/hqdefault.jpg"
    },
    {
        videoId: "ursfTiR8MbE",
        title: "J'ai levé 1 million d'euros mais je me payais 1500€/mois - Leslie Ossete",
        theme: "finance",
        youtubeUrl: "https://www.youtube.com/watch?v=ursfTiR8MbE",
        thumbnail: "https://i.ytimg.com/vi/ursfTiR8MbE/hqdefault.jpg"
    },
    {
        videoId: "H9KzvG32N04",
        title: "Le client n’est pas roi : ce que Coca Cola savait depuis 40 ans - Gilles Atayi",
        theme: "entrepreneuriat",
        youtubeUrl: "https://www.youtube.com/watch?v=H9KzvG32N04",
        thumbnail: "https://i.ytimg.com/vi/H9KzvG32N04/hqdefault.jpg"
    },
    {
        videoId: "M8is_gvx46M",
        title: "De simple imprimeur à milliardaire à succès. L’incroyable ascension de Fred Sympoz",
        theme: "success-stories",
        youtubeUrl: "https://www.youtube.com/watch?v=M8is_gvx46M",
        thumbnail: "https://i.ytimg.com/vi/M8is_gvx46M/hqdefault.jpg"
    },
    {
        videoId: "0XQRGskW-nE",
        title: "Il est devenu milliardaire en vendant des tableaux : l’incroyable histoire de Tchif",
        theme: "success-stories",
        youtubeUrl: "https://www.youtube.com/watch?v=0XQRGskW-nE",
        thumbnail: "https://i.ytimg.com/vi/0XQRGskW-nE/hqdefault.jpg"
    },
    {
        videoId: "JngieFjqOG8",
        title: "Vital : J'ai engagé 22 agents IA, ils font le travail de 100 humains",
        theme: "entrepreneuriat",
        youtubeUrl: "https://www.youtube.com/watch?v=JngieFjqOG8",
        thumbnail: "https://i.ytimg.com/vi/JngieFjqOG8/hqdefault.jpg"
    },
    {
        videoId: "Av7KHSdVEZY",
        title: "Ishowspeed, Ayra Starr, la folie vestimentaire, les critiques : Président Djangoun se confie à nous",
        theme: "showbiz",
        youtubeUrl: "https://www.youtube.com/watch?v=Av7KHSdVEZY",
        thumbnail: "https://i.ytimg.com/vi/Av7KHSdVEZY/hqdefault.jpg"
    },
    {
        videoId: "u5p5v-3XhNc",
        title: "De 400.000F à 4 MILLIARDS : l’histoire d’Aziz Yerima (PayDunya)",
        theme: "success-stories",
        youtubeUrl: "https://www.youtube.com/watch?v=u5p5v-3XhNc",
        thumbnail: "https://i.ytimg.com/vi/u5p5v-3XhNc/hqdefault.jpg"
    },
    {
        videoId: "97Pwlm4pNIY",
        title: "Pour réussir, il faut vivre comme un orphelin – King Mensah",
        theme: "showbiz",
        youtubeUrl: "https://www.youtube.com/watch?v=97Pwlm4pNIY",
        thumbnail: "https://i.ytimg.com/vi/97Pwlm4pNIY/hqdefault.jpg"
    },
    {
        videoId: "kO0pi8plsX8",
        title: "500.000F la minute… et je n’ai même pas le bac – King Mensah",
        theme: "showbiz",
        youtubeUrl: "https://www.youtube.com/watch?v=kO0pi8plsX8",
        thumbnail: "https://i.ytimg.com/vi/kO0pi8plsX8/hqdefault.jpg"
    },
    {
        videoId: "W632rC9VhI0",
        title: "Keith Sonon : J’étais prête à mourir pour mon pays en cuisinant",
        theme: "success-stories",
        youtubeUrl: "https://www.youtube.com/watch?v=W632rC9VhI0",
        thumbnail: "https://i.ytimg.com/vi/W632rC9VhI0/hqdefault.jpg"
    },
    {
        videoId: "3P1oL6ReFJ0",
        title: "J’ai planté 10 hectares de manioc pour en récolter un seul - Valère Tadagbé",
        theme: "entrepreneuriat",
        youtubeUrl: "https://www.youtube.com/watch?v=3P1oL6ReFJ0",
        thumbnail: "https://i.ytimg.com/vi/3P1oL6ReFJ0/hqdefault.jpg"
    },
    {
        videoId: "hqGxOPRhWPY",
        title: "Les vérités brutales sur le métier d’acteur que personne n'ose livrer – Bella Agossou",
        theme: "showbiz",
        youtubeUrl: "https://www.youtube.com/watch?v=hqGxOPRhWPY",
        thumbnail: "https://i.ytimg.com/vi/hqGxOPRhWPY/hqdefault.jpg"
    },
    {
        videoId: "sv3pMXULrSk",
        title: "Meiway : J'ai travaillé pendant 8ans sur le Zoblazo avant de sortir un seul morceau",
        theme: "showbiz",
        youtubeUrl: "https://www.youtube.com/watch?v=sv3pMXULrSk",
        thumbnail: "https://i.ytimg.com/vi/sv3pMXULrSk/hqdefault.jpg"
    },
    {
        videoId: "7Ec0vtM1k98",
        title: "Argent, Vie privée, Showbiz ivoirien : Willy Dumbo brise le silence",
        theme: "showbiz",
        youtubeUrl: "https://www.youtube.com/watch?v=7Ec0vtM1k98",
        thumbnail: "https://i.ytimg.com/vi/7Ec0vtM1k98/hqdefault.jpg"
    },
    {
        videoId: "Ts_NX8YAiKo",
        title: "Jeff Lebeninoa : Je ne tape jamais poteau quand il s'agit de réseauter",
        theme: "entrepreneuriat",
        youtubeUrl: "https://www.youtube.com/watch?v=Ts_NX8YAiKo",
        thumbnail: "https://i.ytimg.com/vi/Ts_NX8YAiKo/hqdefault.jpg"
    },
    {
        videoId: "VLwOCxBu8uU",
        title: "Shado Chris : J'ai produit les Kiff No Beat avec 1 million... personne ne sait ce qui s'est passé",
        theme: "showbiz",
        youtubeUrl: "https://www.youtube.com/watch?v=VLwOCxBu8uU",
        thumbnail: "https://i.ytimg.com/vi/VLwOCxBu8uU/hqdefault.jpg"
    },
    {
        videoId: "33OSU4rh4SA",
        title: "First King x Fanicko règlent leurs différents en live (EP Double Trône)",
        theme: "showbiz",
        youtubeUrl: "https://www.youtube.com/watch?v=33OSU4rh4SA",
        thumbnail: "https://i.ytimg.com/vi/33OSU4rh4SA/hqdefault.jpg"
    },
    {
        videoId: "CDJX4Y7TuNI",
        title: "Blaaz sort enfin du silence et règle ses comptes avec le RAP GAME",
        theme: "showbiz",
        youtubeUrl: "https://www.youtube.com/watch?v=CDJX4Y7TuNI",
        thumbnail: "https://i.ytimg.com/vi/CDJX4Y7TuNI/hqdefault.jpg"
    },
    {
        videoId: "Y6ny6DKFD-8",
        title: "L’humiliation qui a créé Fanicko de Jesus",
        theme: "showbiz",
        youtubeUrl: "https://www.youtube.com/watch?v=Y6ny6DKFD-8",
        thumbnail: "https://i.ytimg.com/vi/Y6ny6DKFD-8/hqdefault.jpg"
    },
    {
        videoId: "Zrn3EHMw4aw",
        title: "Comment Blaaz a rejoint le CCC : Amir fait des révélations chocs",
        theme: "showbiz",
        youtubeUrl: "https://www.youtube.com/watch?v=Zrn3EHMw4aw",
        thumbnail: "https://i.ytimg.com/vi/Zrn3EHMw4aw/hqdefault.jpg"
    },
    {
        videoId: "jllYfJBMLSA",
        title: "Amir : Si l'argent faisait le succès dans la musique, je serais Michael Jackson",
        theme: "showbiz",
        youtubeUrl: "https://www.youtube.com/watch?v=jllYfJBMLSA",
        thumbnail: "https://i.ytimg.com/vi/jllYfJBMLSA/hqdefault.jpg"
    },
    {
        videoId: "KETjRHucqbo",
        title: "Bobo Wê: Je suis l'artiste préféré du fils du Président de la République du Bénin",
        theme: "showbiz",
        youtubeUrl: "https://www.youtube.com/watch?v=KETjRHucqbo",
        thumbnail: "https://i.ytimg.com/vi/KETjRHucqbo/hqdefault.jpg"
    },
    {
        videoId: "_bSXkAnGOmA",
        title: "Bobo Wê : On voulait me voir tomber, mais je suis monté plus haut dans ma carrière",
        theme: "showbiz",
        youtubeUrl: "https://www.youtube.com/watch?v=_bSXkAnGOmA",
        thumbnail: "https://i.ytimg.com/vi/_bSXkAnGOmA/hqdefault.jpg"
    },
    {
        videoId: "n391rT7I1GA",
        title: "Bobo Wê : J’ai trouvé Dieu dans le vodoun et ça m’a permis de survivre dans la musique",
        theme: "showbiz",
        youtubeUrl: "https://www.youtube.com/watch?v=n391rT7I1GA",
        thumbnail: "https://i.ytimg.com/vi/n391rT7I1GA/hqdefault.jpg"
    },
    {
        videoId: "2pc-MCNP4QI",
        title: "J’ai passé la barre du milliard quand j’ai arrêté de travailler seul - Hermann Cakpo",
        theme: "entrepreneuriat",
        youtubeUrl: "https://www.youtube.com/watch?v=2pc-MCNP4QI",
        thumbnail: "https://i.ytimg.com/vi/2pc-MCNP4QI/hqdefault.jpg"
    },
    {
        videoId: "IGET1L2pWRc",
        title: "Eden Food : Je vends +100 plats de crincrin par jour, mais je déprime tout le temps",
        theme: "entrepreneuriat",
        youtubeUrl: "https://www.youtube.com/watch?v=IGET1L2pWRc",
        thumbnail: "https://i.ytimg.com/vi/IGET1L2pWRc/hqdefault.jpg"
    },
    {
        videoId: "MzX4uUpSrzM",
        title: "Axel Merryl : Je ne suis pas un artiste, je suis un vendeur !",
        theme: "showbiz",
        youtubeUrl: "https://www.youtube.com/watch?v=MzX4uUpSrzM",
        thumbnail: "https://i.ytimg.com/vi/MzX4uUpSrzM/hqdefault.jpg"
    },
    {
        videoId: "xmcyahI_d6s",
        title: "Régis Facia : 30 ans d’entrepreneuriat en 30 leçons",
        theme: "entrepreneuriat",
        youtubeUrl: "https://www.youtube.com/watch?v=xmcyahI_d6s",
        thumbnail: "https://i.ytimg.com/vi/xmcyahI_d6s/hqdefault.jpg"
    },
    {
        videoId: "07UPhsoutTk",
        title: "Jet privé, Patrice Talon, Carrière à l'international : Vano Baby fait des révélations chocs !",
        theme: "showbiz",
        youtubeUrl: "https://www.youtube.com/watch?v=07UPhsoutTk",
        thumbnail: "https://i.ytimg.com/vi/07UPhsoutTk/hqdefault.jpg"
    },
    {
        videoId: "FmQp8ShPSZ8",
        title: "Ce que j'ai du sacrifier pour rester l'artiste N*1 de la musique béninoise pendant 10 ans",
        theme: "showbiz",
        youtubeUrl: "https://www.youtube.com/watch?v=FmQp8ShPSZ8",
        thumbnail: "https://i.ytimg.com/vi/FmQp8ShPSZ8/hqdefault.jpg"
    },
    {
        videoId: "Wfy2oKUzqkE",
        title: "De la trahison à l'ascension : Les 5 millions qui ont fait décoller la carrière de Vano Baby",
        theme: "showbiz",
        youtubeUrl: "https://www.youtube.com/watch?v=Wfy2oKUzqkE",
        thumbnail: "https://i.ytimg.com/vi/Wfy2oKUzqkE/hqdefault.jpg"
    },
    {
        videoId: "anFA8KKDkcc",
        title: "Sans cette trahison, Vano Baby n'aurait jamais existé : \"L'histoire de Vano Baby Partie 01\"",
        theme: "showbiz",
        youtubeUrl: "https://www.youtube.com/watch?v=anFA8KKDkcc",
        thumbnail: "https://i.ytimg.com/vi/anFA8KKDkcc/hqdefault.jpg"
    },
    {
        videoId: "27gLHkYqNfA",
        title: "D’ancien voleur de téléphones à superstar de la musique : L’histoire de Tgang",
        theme: "success-stories",
        youtubeUrl: "https://www.youtube.com/watch?v=27gLHkYqNfA",
        thumbnail: "https://i.ytimg.com/vi/27gLHkYqNfA/hqdefault.jpg"
    },
    {
        videoId: "vrMxGPRiFvs",
        title: "First King : Derrière le succès, un cœur brisé !",
        theme: "showbiz",
        youtubeUrl: "https://www.youtube.com/watch?v=vrMxGPRiFvs",
        thumbnail: "https://i.ytimg.com/vi/vrMxGPRiFvs/hqdefault.jpg"
    },
    {
        videoId: "0xocLvQCOgM",
        title: "Ce que j'ai dû briser en moi pour bâtir un empire à plusieurs milliards en Afrique - Hermann Cakpo",
        theme: "entrepreneuriat",
        youtubeUrl: "https://www.youtube.com/watch?v=0xocLvQCOgM",
        thumbnail: "https://i.ytimg.com/vi/0xocLvQCOgM/hqdefault.jpg"
    },
    {
        videoId: "59cWlAws2-U",
        title: "Sèdo Tossou : De victime de racisme à l’un des acteurs africains les plus payés de Hollywood",
        theme: "success-stories",
        youtubeUrl: "https://www.youtube.com/watch?v=59cWlAws2-U",
        thumbnail: "https://i.ytimg.com/vi/59cWlAws2-U/hqdefault.jpg"
    },
    {
        videoId: "LacEC_HFG3A",
        title: "\"Je fais des milliards, mais je n'ai toujours pas de voiture\" Jonathan Morrison se livre enfin",
        theme: "finance",
        youtubeUrl: "https://www.youtube.com/watch?v=LacEC_HFG3A",
        thumbnail: "https://i.ytimg.com/vi/LacEC_HFG3A/hqdefault.jpg"
    },
    {
        videoId: "L5QAmcmeb2w",
        title: "Je n'ai jamais fait 1M de vues mais je suis payé des millions chaque spectacle - Pépé Oleka",
        theme: "showbiz",
        youtubeUrl: "https://www.youtube.com/watch?v=L5QAmcmeb2w",
        thumbnail: "https://i.ytimg.com/vi/L5QAmcmeb2w/hqdefault.jpg"
    },
    {
        videoId: "kM5amDE4Fbk",
        title: "6,7 millions d’abonnés… mais j’étais ruiné – L’histoire cachée de TMA Crush",
        theme: "showbiz",
        youtubeUrl: "https://www.youtube.com/watch?v=kM5amDE4Fbk",
        thumbnail: "https://i.ytimg.com/vi/kM5amDE4Fbk/hqdefault.jpg"
    },
    {
        videoId: "bl7k6PbA9os",
        title: "Des rues d’Akassato au sommet de la musique béninoise : le parcours semé d'embûches de Crisba",
        theme: "success-stories",
        youtubeUrl: "https://www.youtube.com/watch?v=bl7k6PbA9os",
        thumbnail: "https://i.ytimg.com/vi/bl7k6PbA9os/hqdefault.jpg"
    },
    {
        videoId: "cDKKgloOQLA",
        title: "Bovann : De victime de racisme à l’un des influenceurs les plus riches sur TikTok",
        theme: "success-stories",
        youtubeUrl: "https://www.youtube.com/watch?v=cDKKgloOQLA",
        thumbnail: "https://i.ytimg.com/vi/cDKKgloOQLA/hqdefault.jpg"
    },
    {
        videoId: "O-1IeHwz8UM",
        title: "Jojo le comédien, la vie d'influenceurs, le showbiz : The Style brise le silence",
        theme: "showbiz",
        youtubeUrl: "https://www.youtube.com/watch?v=O-1IeHwz8UM",
        thumbnail: "https://i.ytimg.com/vi/O-1IeHwz8UM/hqdefault.jpg"
    },
    {
        videoId: "Cay9Fe3W7IQ",
        title: "Révélation inédite de l'ex-DG de BlackBerry sur leur chute et le chômage en Afrique #DIEP16",
        theme: "entrepreneuriat",
        youtubeUrl: "https://www.youtube.com/watch?v=Cay9Fe3W7IQ",
        thumbnail: "https://i.ytimg.com/vi/Cay9Fe3W7IQ/hqdefault.jpg"
    },
    {
        videoId: "ZOuhkvn66mU",
        title: "Les révélations CHOCS de Ladji K1000 et Saiyan Armand sur les durs réalités des créateurs de contenu",
        theme: "showbiz",
        youtubeUrl: "https://www.youtube.com/watch?v=ZOuhkvn66mU",
        thumbnail: "https://i.ytimg.com/vi/ZOuhkvn66mU/hqdefault.jpg"
    },
    {
        videoId: "QUR66Uv-i90",
        title: "Stéphane Sessegnon révèle tout sur sa carrière, le PSG, ses folies, et les Guépards du Bénin",
        theme: "showbiz",
        youtubeUrl: "https://www.youtube.com/watch?v=QUR66Uv-i90",
        thumbnail: "https://i.ytimg.com/vi/QUR66Uv-i90/hqdefault.jpg"
    },
    {
        videoId: "EhPptDYXMIA",
        title: "Philippe Simo révèle tout sur sa spiritualité, la gestion de ses finances et le business N*1 en 2025",
        theme: "finance",
        youtubeUrl: "https://www.youtube.com/watch?v=EhPptDYXMIA",
        thumbnail: "https://i.ytimg.com/vi/EhPptDYXMIA/hqdefault.jpg"
    },
    {
        videoId: "HjrjO-BhU94",
        title: "Conex et Don révèlent tout sur leur début, les coups bas dans la musique, WeLoveEya, leur ascension",
        theme: "showbiz",
        youtubeUrl: "https://www.youtube.com/watch?v=HjrjO-BhU94",
        thumbnail: "https://i.ytimg.com/vi/HjrjO-BhU94/hqdefault.jpg"
    },
    {
        videoId: "Gn206I4UBPE",
        title: "Stéphanie Montcho révèle tout sur sa grossesse au lycée, sur Willy Dumbo et sur sa carrière.",
        theme: "showbiz",
        youtubeUrl: "https://www.youtube.com/watch?v=Gn206I4UBPE",
        thumbnail: "https://i.ytimg.com/vi/Gn206I4UBPE/hqdefault.jpg"
    },
    {
        videoId: "NG0kX0uRqck",
        title: "Entrepreneuriat vs Parentalité. Avec Boris, Kévin et Basile",
        theme: "entrepreneuriat",
        youtubeUrl: "https://www.youtube.com/watch?v=NG0kX0uRqck",
        thumbnail: "https://i.ytimg.com/vi/NG0kX0uRqck/hqdefault.jpg"
    },
    {
        videoId: "HON6Dup5B_c",
        title: "Fabrice COMLAN : Enfance, parcours et passage dans les grands cabinets de Conseil #EP09",
        theme: "success-stories",
        youtubeUrl: "https://www.youtube.com/watch?v=HON6Dup5B_c",
        thumbnail: "https://i.ytimg.com/vi/HON6Dup5B_c/hqdefault.jpg"
    },
    {
        videoId: "2W0bj2JDmDg",
        title: "“J’ai joué contre Cristiano Ronaldo en league des champions” Mickaël Poté & Mohamed, #EP08",
        theme: "showbiz",
        youtubeUrl: "https://www.youtube.com/watch?v=2W0bj2JDmDg",
        thumbnail: "https://i.ytimg.com/vi/2W0bj2JDmDg/hqdefault.jpg"
    },
    {
        videoId: "RD453L9h_Vo",
        title: "De comédien à artiste chanteur à succès : L'histoire de Axel Merryl. #EP07 @AxelmerrylVrai",
        theme: "showbiz",
        youtubeUrl: "https://www.youtube.com/watch?v=RD453L9h_Vo",
        thumbnail: "https://i.ytimg.com/vi/RD453L9h_Vo/hqdefault.jpg"
    },
    {
        videoId: "YzQxx0O7h7I",
        title: "Le mariage est mauvais pour l’entrepreneuriat avec Richard Odjrado, Adjaratou Lawani & Beni",
        theme: "entrepreneuriat",
        youtubeUrl: "https://www.youtube.com/watch?v=YzQxx0O7h7I",
        thumbnail: "https://i.ytimg.com/vi/YzQxx0O7h7I/hqdefault.jpg"
    },
    {
        videoId: "LPdFb9fUI6w",
        title: "Djo le magicien, OPA & Belove parlent de Patrice Talon, WeLoveEya et du showbiz : PARTIE 2",
        theme: "showbiz",
        youtubeUrl: "https://www.youtube.com/watch?v=LPdFb9fUI6w",
        thumbnail: "https://i.ytimg.com/vi/LPdFb9fUI6w/hqdefault.jpg"
    },
    {
        videoId: "k_6rWpJDsJs",
        title: "Djo le magicien, OPA, Belove & Beni Tossou parlent de Patrice Talon, WeLoveEya et du showbiz",
        theme: "showbiz",
        youtubeUrl: "https://www.youtube.com/watch?v=k_6rWpJDsJs",
        thumbnail: "https://i.ytimg.com/vi/k_6rWpJDsJs/hqdefault.jpg"
    },
    {
        videoId: "VowKTxQyyuA",
        title: "Nabou Fall x Senam Beheton - \"Quand quelqu’un me dit qu’il sait, je ne le regarde même plus\"",
        theme: "entrepreneuriat",
        youtubeUrl: "https://www.youtube.com/watch?v=VowKTxQyyuA",
        thumbnail: "https://i.ytimg.com/vi/VowKTxQyyuA/hqdefault.jpg"
    },
    {
        videoId: "8MO_QzB9T04",
        title: "“On a gagné des millions pendant des années sans travailler”- Nasty Nesta, Olsen, Firmin & Beni",
        theme: "showbiz",
        youtubeUrl: "https://www.youtube.com/watch?v=8MO_QzB9T04",
        thumbnail: "https://i.ytimg.com/vi/8MO_QzB9T04/hqdefault.jpg"
    },
    {
        videoId: "ozrySoegUCA",
        title: "Comment gagner sa vie grâce à internet : Mylène Flicka, Ulrich Sossou, Blevenec et Serge Mahugnon",
        theme: "entrepreneuriat",
        youtubeUrl: "https://www.youtube.com/watch?v=ozrySoegUCA",
        thumbnail: "https://i.ytimg.com/vi/ozrySoegUCA/hqdefault.jpg"
    },
    {
        videoId: "WDpakVcKRY0",
        title: "''Les artistes béninois manquent d'ambition'' - Richard Flash, @naboufallofficiel, @myrilsekou",
        theme: "showbiz",
        youtubeUrl: "https://www.youtube.com/watch?v=WDpakVcKRY0",
        thumbnail: "https://i.ytimg.com/vi/WDpakVcKRY0/hqdefault.jpg"
    }
];
const FEATURED_VIDEO = VIDEOS[0];
const NOTABLE_GUESTS = [
    "STAN ZÉZÉ",
    "RÉGIS FACIA",
    "RICHARD ODJRADO",
    "HERMANN CAKPO",
    "AZIZ YERIMA",
    "JEANNE SISSOKO-ZÉZÉ",
    "SÈDO TOSSOU",
    "MEIWAY",
    "KING MENSAH",
    "TMA CRUSH",
    "VITAL",
    "JERRY SINCLAIR",
    "PHILIPPE SIMO",
    "MYLÈNE FLICKA",
    "BOBO WÊ"
];
const CHANNEL_STATS = {
    subscribers: 128_000,
    totalViews: 18_282_319,
    videos: 894,
    countries: 14
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/episode-highlights.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEFAULT_HIGHLIGHTS",
    ()=>DEFAULT_HIGHLIGHTS,
    "THEME_HIGHLIGHTS",
    ()=>THEME_HIGHLIGHTS,
    "highlightsFor",
    ()=>highlightsFor
]);
const THEME_HIGHLIGHTS = {
    entrepreneuriat: [
        "Les décisions structurantes derrière la trajectoire de l'invité",
        "Méthodes, modèles économiques et leviers de croissance applicables en zone CFA",
        "Erreurs à éviter et conseils opérationnels pour entrepreneurs et dirigeants"
    ],
    finance: [
        "Principes d'argent, d'épargne et d'investissement partagés par l'invité",
        "Réflexes concrets pour bâtir son indépendance financière en Afrique",
        "Pièges financiers courants et comment les contourner"
    ],
    "success-stories": [
        "Le parcours complet : débuts, obstacles et points de bascule",
        "Les leçons de résilience transposables à votre propre projet",
        "Vision et prochaines étapes de l'invité"
    ],
    showbiz: [
        "Les coulisses de la carrière : réalités du métier et rapports à l'argent",
        "Gestion de la notoriété, des critiques et des trahisons",
        "Conseils aux artistes et créateurs de contenu"
    ],
    societe: [
        "Analyses et révélations sur les enjeux de société abordés",
        "Éclairages inédits sur les personnalités et institutions évoquées",
        "Regard contextualisé sur l'actualité béninoise et africaine"
    ]
};
const DEFAULT_HIGHLIGHTS = [
    "Les points clés et décisions structurantes de l'épisode",
    "Les leçons business transposables à votre contexte"
];
function highlightsFor(theme) {
    return THEME_HIGHLIGHTS[theme] ?? DEFAULT_HIGHLIGHTS;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/pdf.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// ─── Générateur PDF minimal (client-side, sans dépendance) ──────────────────
// Produit un PDF A4 monochrome valide : titre, sous-titres, lignes à puces.
// Utilisé pour : Résumés d'épisodes (captation email) et Kit Média B2B.
__turbopack_context__.s([
    "buildPdfBytes",
    ()=>buildPdfBytes,
    "downloadPdf",
    ()=>downloadPdf
]);
function esc(s) {
    return s.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}
function wrap(text, max = 86) {
    const words = text.split(/\s+/);
    const out = [];
    let line = "";
    for (const w of words){
        if ((line + " " + w).trim().length > max) {
            if (line) out.push(line.trim());
            line = w;
        } else {
            line += " " + w;
        }
    }
    if (line.trim()) out.push(line.trim());
    return out;
}
function buildPdfBytes(doc) {
    const pageW = 595;
    const pageH = 842;
    const left = 56;
    let y = 770;
    const parts = [];
    const push = (font, size, text, lead = 16)=>{
        parts.push(`BT /${font} ${size} Tf ${left} ${y} Td 0 0 ${lead} rg ${lead} TL (${esc(text)}) Tj ET`);
    };
    // Marque (petites capitales grises simulées par la taille)
    if (doc.brand) {
        parts.push(`BT /F3 9 Tf ${left} ${y} Td (${esc(doc.brand.toUpperCase())}) Tj ET`);
        y -= 22;
    }
    // Titre principal (retours à la ligne auto)
    for (const [i, line] of wrap(doc.title, 38).entries()){
        parts.push(`BT /F1 ${i === 0 ? 26 : 26} Tf ${left} ${y} Td (${esc(line)}) Tj ET`);
        y -= 30;
    }
    y -= 8;
    if (doc.subtitle) {
        for (const line of wrap(doc.subtitle, 80)){
            parts.push(`BT /F2 12 Tf ${left} ${y} Td (${esc(line)}) Tj ET`);
            y -= 17;
        }
    }
    // Filet de séparation
    parts.push(`0.4 w ${left} ${y} m ${pageW - left} ${y} l S`);
    y -= 28;
    for (const section of doc.sections){
        if (section.heading) {
            parts.push(`BT /F1 13 Tf ${left} ${y} Td (${esc(section.heading)}) Tj ET`);
            y -= 20;
        }
        for (const raw of section.lines){
            const bullet = raw.startsWith("•");
            const text = bullet ? raw.slice(1).trim() : raw;
            for (const [i, line] of wrap(text, bullet ? 80 : 84).entries()){
                const prefix = bullet && i === 0 ? "- " : "  ";
                parts.push(`BT /F2 ${i === 0 && bullet ? 11 : 11} Tf ${left} ${y} Td (${esc(prefix + line)}) Tj ET`);
                y -= 16;
            }
        }
        y -= 14;
        if (y < 120) break; // une seule page : on tronque proprement
    }
    if (doc.footer && y > 80) {
        parts.push(`0.3 w ${left} 96 m ${pageW - left} 96 l S`);
        parts.push(`BT /F2 8 Tf ${left} 80 Td (${esc(doc.footer)}) Tj ET`);
    }
    const content = parts.join("\n");
    const objects = [
        "<< /Type /Catalog /Pages 2 0 R >>",
        "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
        `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageW} ${pageH}] /Resources << /Font << /F1 4 0 R /F2 5 0 R /F3 4 0 R >> >> /Contents 6 0 R >>`,
        "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>",
        "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>",
        `<< /Length ${content.length} >>\nstream\n${content}\nendstream`
    ];
    let pdf = "%PDF-1.4\n";
    const offsets = [];
    objects.forEach((obj, i)=>{
        offsets.push(pdf.length);
        pdf += `${i + 1} 0 obj\n${obj}\nendobj\n`;
    });
    const xrefPos = pdf.length;
    pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
    for (const off of offsets){
        pdf += `${String(off).padStart(10, "0")} 00000 n \n`;
    }
    pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefPos}\n%%EOF`;
    // Encodage latin-1 (WinAnsi couvre les accents français)
    const bytes = new Uint8Array(pdf.length);
    for(let i = 0; i < pdf.length; i++){
        bytes[i] = pdf.charCodeAt(i) & 0xff;
    }
    return new Blob([
        bytes
    ], {
        type: "application/pdf"
    });
}
function downloadPdf(doc, filename) {
    const blob = buildPdfBytes(doc);
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(()=>URL.revokeObjectURL(url), 4000);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/download.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// ═══════════════════════════════════════════════════════════════════════════
// PodLab Media — Téléchargement de fichiers côté client
// Les PDF « métier » (Kit Média, fiches d'épisodes) sont générés par le
// backend (routes /api/pdf/*) : cette aide télécharge leur blob avec repli
// gracieux si l'appel réseau échoue.
// ═══════════════════════════════════════════════════════════════════════════
/** Déclenche le téléchargement navigateur d'un blob. */ __turbopack_context__.s([
    "downloadBackendPdf",
    ()=>downloadBackendPdf,
    "downloadBlob",
    ()=>downloadBlob,
    "fetchPdfBlob",
    ()=>fetchPdfBlob
]);
function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(()=>URL.revokeObjectURL(url), 4000);
}
async function fetchPdfBlob(url) {
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`PDF indisponible (HTTP ${res.status})`);
    }
    const blob = await res.blob();
    if (!blob.size) throw new Error("PDF vide");
    return blob;
}
async function downloadBackendPdf(url, filename) {
    try {
        const blob = await fetchPdfBlob(url);
        downloadBlob(blob, filename);
        return true;
    } catch  {
        return false;
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/data-mock.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BOOKING_SLOTS",
    ()=>BOOKING_SLOTS,
    "BUDGET_OPTIONS",
    ()=>BUDGET_OPTIONS,
    "EVENTS",
    ()=>EVENTS,
    "LEAD_STATUS_LABELS",
    ()=>LEAD_STATUS_LABELS,
    "STUDIOS",
    ()=>STUDIOS,
    "STUDIO_FORMULAS",
    ()=>STUDIO_FORMULAS,
    "formatCFA",
    ()=>formatCFA,
    "formatDateFR",
    ()=>formatDateFR,
    "formatDateShortFR",
    ()=>formatDateShortFR
]);
const STUDIOS = [
    {
        id: "cotonou",
        city: "Cotonou",
        country: "Bénin",
        flag: "BJ",
        address: "Fidjrossè Plage, Boulevard de la Marina",
        capacity: "3 invités + équipe technique",
        features: [
            "Plateau 4K Broadcast 3 caméras",
            "Cabine audio traitée acoustiquement",
            "Régie lumière & fond noir studio",
            "Fibre dédiée pour live streaming"
        ]
    },
    {
        id: "abidjan",
        city: "Abidjan",
        country: "Côte d'Ivoire",
        flag: "CI",
        address: "Cocody Riviera Golf, Rue des Jardins",
        capacity: "4 invités + équipe technique",
        features: [
            "Plateau 4K Broadcast 120 m² double fond",
            "Studio audio double cabine",
            "Traitement acoustique professionnel",
            "Régie complète + station de montage"
        ]
    }
];
const STUDIO_FORMULAS = [
    {
        id: "audio",
        name: "Pack Audio Master",
        description: "Idéal pour les émissions de radio, livres audio et voix off. Isolation phonique studio, microphones Shure SM7B, ingénieur du son dédié.",
        price: 75_000,
        duration: "3 heures",
        features: [
            "Isolation phonique studio",
            "Microphones Shure SM7B",
            "Ingénieur du son dédié",
            "Fichiers WAV + MP3 livrés"
        ]
    },
    {
        id: "video4k",
        name: "Pack Podcasting Vidéo 4K",
        description: "Configuration multi-caméras (3 angles), éclairage cinématique, décor modulable premium, enregistrement live multi-pistes.",
        price: 150_000,
        duration: "3 heures",
        features: [
            "3 caméras 4K · 3 angles",
            "Éclairage cinématique",
            "Décor modulable premium",
            "Enregistrement live multi-pistes"
        ]
    },
    {
        id: "cle-en-main",
        name: "Pack Production Exécutive Clé en Main",
        description: "De l'idée au montage final. Inclus : tournage, habillage sonore, découpe des extraits Shorts/Reels et sous-titrage.",
        price: 350_000,
        duration: "Journée complète",
        features: [
            "Tout le Pack Podcasting Vidéo 4K",
            "Habillage sonore + montage final",
            "Découpe Shorts / Reels incluse",
            "Sous-titrage complet"
        ]
    }
];
const BOOKING_SLOTS = [
    {
        slot: "09:00 – 12:00",
        label: "Matinée"
    },
    {
        slot: "14:00 – 17:00",
        label: "Après-midi"
    },
    {
        slot: "18:00 – 21:00",
        label: "Soirée"
    }
];
const EVENTS = [
    {
        id: "evt-brvm-cotonou",
        title: "Masterclass : Réussir son 1er Investissement BRVM",
        city: "Cotonou",
        venue: "PodLab Studio Cotonou — Fidjrossè",
        date: "2026-11-08",
        time: "09:00 – 13:00",
        price: 25_000,
        seatsLeft: 18,
        description: "Atelier pratique de 4 heures avec analyste sur place : ouverture de compte titres, sélection de valeurs, stratégies de dividendes. Places limitées pour garantir l'interactivité.",
        tag: "Finance"
    },
    {
        id: "evt-live-abidjan",
        title: "Enregistrement Public PodLab Live × Invité Mystère",
        city: "Abidjan",
        venue: "PodLab Studio Abidjan — Cocody Riviera",
        date: "2026-11-15",
        time: "18:00 – 21:00",
        price: 15_000,
        seatsLeft: 42,
        description: "Assistez en direct à l'enregistrement d'un épisode avec un invité mystère de la tech africaine. Networking + cocktail de clôture inclus.",
        tag: "Émission live"
    },
    {
        id: "evt-growth-benin",
        title: "Masterclass : Growth pour PME Africaines",
        city: "Cotonou",
        venue: "Espace Créatif — Ganhi",
        date: "2026-11-22",
        time: "09:00 – 16:00",
        price: 35_000,
        seatsLeft: 9,
        description: "Journée intensive : tunnels de conversion, acquisition mobile money, rétention client. Chaque participant repart avec un plan d'action growth sur mesure.",
        tag: "Business"
    }
];
const BUDGET_OPTIONS = [
    {
        id: "A",
        label: "Option A — Découverte",
        range: "< 500 000 F CFA / mois",
        description: "Testez le média : mentions podcasts, spots newsletter ciblés."
    },
    {
        id: "B",
        label: "Option B — Croissance",
        range: "500 000 – 1 000 000 F CFA / mois",
        description: "Sponsoring d'épisodes récurrents + présence événementielle."
    },
    {
        id: "C",
        label: "Option C — Sur-mesure",
        range: "+ 1 000 000 F CFA / mois",
        description: "Title sponsor, épisodes dédiés, dispositif sur-mesure, priorité commerciale haute."
    }
];
const LEAD_STATUS_LABELS = {
    nouveau: "Nouveau Lead",
    kit_envoye: "Kit Média Envoyé",
    rdv_cale: "RDV Calé",
    devis: "Devis",
    signe: "Signé"
};
function formatCFA(amount) {
    return `${new Intl.NumberFormat("fr-FR").format(amount)} F CFA`;
}
function formatDateFR(iso) {
    const d = new Date(iso);
    if (isNaN(d.getTime())) return iso;
    return d.toLocaleDateString("fr-FR", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });
}
function formatDateShortFR(iso) {
    const d = new Date(iso);
    if (isNaN(d.getTime())) return iso;
    return d.toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/pricing.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PRICES",
    ()=>PRICES,
    "getPrice",
    ()=>getPrice
]);
const PRICES = {
    cotonou: {
        audio: 75_000,
        video4k: 150_000,
        "cle-en-main": 340_000
    },
    abidjan: {
        audio: 85_000,
        video4k: 160_000,
        "cle-en-main": 350_000
    }
};
function getPrice(city, formula) {
    return PRICES[city][formula];
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/invitation-data.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// ═══════════════════════════════════════════════════════════════════════════
// PodLab Media — Données de la page Invitation VIP (/invitation)
// Chiffres d'impact, galerie de prestige (invités réels du catalogue YouTube)
// et guide de préparation de l'invité.
// ═══════════════════════════════════════════════════════════════════════════
// ─── Chiffres d'impact présentés à l'invité VIP ─────────────────────────────
__turbopack_context__.s([
    "PRESTIGE_GUESTS",
    ()=>PRESTIGE_GUESTS,
    "VIP_FAQ",
    ()=>VIP_FAQ,
    "VIP_FORMATS",
    ()=>VIP_FORMATS,
    "VIP_IMPACT",
    ()=>VIP_IMPACT
]);
const VIP_IMPACT = {
    completionRate: 62,
    sectorBenchmark: 45,
    attentionMinutes: 115,
    listenersPerQuarter: 1_000_000,
    audienceProfile: [
        {
            label: "Dirigeants & fondateurs",
            pct: 34
        },
        {
            label: "Cadres & consultants",
            pct: 27
        },
        {
            label: "Investisseurs & finance",
            pct: 17
        },
        {
            label: "Créatifs & artistes",
            pct: 13
        },
        {
            label: "Étudiants & autres",
            pct: 9
        }
    ],
    geographies: [
        {
            label: "Côte d'Ivoire",
            pct: 31
        },
        {
            label: "Bénin",
            pct: 28
        },
        {
            label: "Sénégal & Togo",
            pct: 19
        },
        {
            label: "Reste du monde",
            pct: 22
        }
    ]
};
const PRESTIGE_GUESTS = [
    {
        name: "Stanislas Zézé",
        role: "Homme d'affaires & investisseur — en compagnie de Régis Facia",
        videoId: "ffsMdUO5dqw"
    },
    {
        name: "Richard Odjrado",
        role: "Entrepreneur — de l'enfance placée à la bourse régionale",
        videoId: "v2bdmOuogvY"
    },
    {
        name: "Steve Facia",
        role: "Star du paysage télévisuel ivoirien",
        videoId: "5qNXELZfCu0"
    },
    {
        name: "Claudy Siar Codjovi",
        role: "Voix emblématique — ex-RFI, Canal+ Afrique",
        videoId: "MRn9vTGoT74"
    },
    {
        name: "Jeanne Sissoko-Zézé",
        role: "Finance & liberté financière",
        videoId: "IfIhhB_Z5us"
    },
    {
        name: "Sagbohan Danialou",
        role: "Artiste emblématique du Bénin",
        videoId: "x37QkXpaVKM"
    },
    {
        name: "Aziz Yerima",
        role: "Fondateur PayDunya — de 400 000 F à 4 milliards",
        videoId: "u5p5v-3XhNc"
    },
    {
        name: "Stéphane Sessegnon",
        role: "International — PSG & Guépards du Bénin",
        videoId: "QUR66Uv-i90"
    }
];
const VIP_FORMATS = [
    {
        id: "standard",
        label: "Interview Standard",
        duration: "45 – 60 min de plateau",
        detail: "Le format Discussion Informelle : conversation structurée, sans filtre. Extraits Shorts inclus."
    },
    {
        id: "long",
        label: "Format Long",
        duration: "90 – 120 min de plateau",
        detail: "Pour les parcours complexes : rétrospective approfondie, questions du public Cercle Privé, chapitrage YouTube."
    },
    {
        id: "sur-mesure",
        label: "Ma Demande Spécifique",
        duration: "Défini avec la rédaction",
        detail: "Lancement, promotion d'ouvrage, prise de parole sensible : on construit le déroulé avec vous, en amont."
    }
];
const VIP_FAQ = [
    {
        q: "Combien de temps dure l'interview ?",
        a: "Comptez 45 à 60 minutes de plateau pour le format standard, jusqu'à 2 heures pour le format long. Sur place, prévoyez 2 h au total : accueil, brief de 10 minutes, réglage micro et lumière, tournage, puis débrief autour d'un café. Vous recevez le déroulé approximatif 48 h avant, mais aucune réponse n'est à préparer : l'émission vit de l'imprévu."
    },
    {
        q: "Comment se déroule concrètement la journée ?",
        a: "Notre équipe vous accueille à l'heure exacte de votre créneau au studio (Cotonou ou Abidjan). Un chargé d'accueil vous briefe, la régie ajuste caméras et audio pendant que notre maquilleur(veuse) vous prépare (léger, mat, pensé pour la 4K). Le tournage est interrompu quand vous le souhaitez — pauses, reformulations, reprises sont naturelles."
    },
    {
        q: "Dois-je préparer mes réponses ou arriver avec des notes ?",
        a: "Non — et c'est la promesse de l'émission : sans filtre, sans langue de bois. Les questions sont pensées pour déclencher des récits vrais, pas des communiqués. Si un sujet est sensible, signalez-le simplement au brief : nous l'aborderons autrement, ou pas du tout."
    },
    {
        q: "Tenue, maquillage, image : comment me préparer ?",
        a: "Venez en tenue dans laquelle vous vous sentez puissant. Évitez les micro-motifs (moirage caméra) et les verts criards : notre plateau est pensé pour les tenues sobres et structurées. Le maquillage professionnel est pris en charge sur place, y compris retouches en cours de tournage."
    },
    {
        q: "Que devient la vidéo après l'enregistrement ?",
        a: "Le montage complet est livré sous 7 jours. Vous validez la version finale avant publication : rien ne sort sans votre accord. Nous déclinons ensuite 3 à 5 extraits Shorts/Reels et des visuels de promotion — vous recevez tous les fichiers bruts sur demande."
    },
    {
        q: "Que devient mes données personnelles ?",
        a: "Vos coordonnées servent exclusivement à l'organisation de votre passage (rappels, logistique). Elles sont stockées de manière chiffrée, jamais revendues ni transmises à des annonceurs, et supprimées sur simple demande après votre passage. Le contrat de diffusion vous garantit un contrôle total sur les extraits publiés."
    },
    {
        q: "Puis-je annuler ou déplacer mon créneau ?",
        a: "Oui, gratuitement jusqu'à 48 h avant le tournage : appelez ou écrivez au studio avec votre référence VIP et un créneau équivalent vous est immédiatement réservé. Au-delà, nous nous adaptons au cas par cas — un imprévu de dirigeant reste un imprévu de dirigeant."
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Page
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$podlab$2f$app$2d$shell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/podlab/app-shell.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$podlab$2f$home$2f$home$2d$view$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/podlab/home/home-view.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$podlab$2f$studios$2f$studios$2d$view$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/podlab/studios/studios-view.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$podlab$2f$sponsoring$2f$sponsoring$2d$view$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/podlab/sponsoring/sponsoring-view.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$podlab$2f$evenements$2f$evenements$2d$view$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/podlab/evenements/evenements-view.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$podlab$2f$admin$2f$admin$2d$view$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/podlab/admin/admin-view.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$podlab$2f$invitation$2f$invitation$2d$view$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/podlab/invitation/invitation-view.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$router$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/router.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
function Page() {
    _s();
    const route = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$router$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useHashRoute"])();
    // Remonter en haut à chaque changement de vue
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Page.useEffect": ()=>{
            window.scrollTo({
                top: 0
            });
        }
    }["Page.useEffect"], [
        route
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$podlab$2f$app$2d$shell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AppShell"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
            mode: "wait",
            initial: false,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                initial: {
                    opacity: 0,
                    y: 14
                },
                animate: {
                    opacity: 1,
                    y: 0
                },
                exit: {
                    opacity: 0,
                    y: -10
                },
                transition: {
                    duration: 0.28,
                    ease: "easeOut"
                },
                children: [
                    route === "accueil" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$podlab$2f$home$2f$home$2d$view$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HomeView"], {}, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 32,
                        columnNumber: 35
                    }, this),
                    route === "studios" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$podlab$2f$studios$2f$studios$2d$view$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StudiosView"], {}, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 33,
                        columnNumber: 35
                    }, this),
                    route === "sponsoring" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$podlab$2f$sponsoring$2f$sponsoring$2d$view$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SponsoringView"], {}, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 34,
                        columnNumber: 38
                    }, this),
                    route === "evenements" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$podlab$2f$evenements$2f$evenements$2d$view$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EvenementsView"], {}, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 35,
                        columnNumber: 38
                    }, this),
                    route === "invitation" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$podlab$2f$invitation$2f$invitation$2d$view$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InvitationView"], {}, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 36,
                        columnNumber: 38
                    }, this),
                    route === "admin" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$podlab$2f$admin$2f$admin$2d$view$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AdminView"], {}, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 37,
                        columnNumber: 33
                    }, this)
                ]
            }, route, true, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 25,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 24,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/page.tsx",
        lineNumber: 23,
        columnNumber: 5
    }, this);
}
_s(Page, "ZEpLqVkYOZRdfaFnty3P92CU2hA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$router$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useHashRoute"]
    ];
});
_c = Page;
var _c;
__turbopack_context__.k.register(_c, "Page");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_14724ff6._.js.map