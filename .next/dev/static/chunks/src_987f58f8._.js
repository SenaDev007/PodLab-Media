(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/podlab/logo.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PodLabLogo",
    ()=>PodLabLogo
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
;
;
// ─── Logo PodLab Media ──────────────────────────────────────────────────────
// VRAI logo officiel — wordmark « PodLab » blanc sur fond transparent.
// Fichier : public/logo-podlab.png (181×81 — contenu 168×43 centré verticalement).
// Proposé par l'utilisateur depuis le dépôt officiel :
// github.com/SenaDev007/PodLab-Media/blob/main/public/logo-podlab.png
const SIZES = {
    // Hauteur d'affichage du canevas complet (padding vertical du PNG inclus) ;
    // le lettrage visible fait ~53 % de la hauteur du canevas.
    sm: "h-9",
    md: "h-11",
    lg: "h-16"
};
function PodLabLogo({ size = "md", className, priority = false }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        src: "/logo-podlab.png",
        alt: "PodLab Media",
        width: 181,
        height: 81,
        priority: priority,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(SIZES[size], "w-auto select-none", className)
    }, void 0, false, {
        fileName: "[project]/src/components/podlab/logo.tsx",
        lineNumber: 29,
        columnNumber: 5
    }, this);
}
_c = PodLabLogo;
var _c;
__turbopack_context__.k.register(_c, "PodLabLogo");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
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
"[project]/src/components/ui/button.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button,
    "buttonVariants",
    ()=>buttonVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-slot/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
;
;
;
const buttonVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", {
    variants: {
        variant: {
            default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
            destructive: "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
            outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
            secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
            ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
            link: "text-primary underline-offset-4 hover:underline"
        },
        size: {
            default: "h-9 px-4 py-2 has-[>svg]:px-3",
            sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
            lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
            icon: "size-9"
        }
    },
    defaultVariants: {
        variant: "default",
        size: "default"
    }
});
function Button({ className, variant, size, asChild = false, ...props }) {
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Slot"] : "button";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
        "data-slot": "button",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(buttonVariants({
            variant,
            size,
            className
        })),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/button.tsx",
        lineNumber: 51,
        columnNumber: 5
    }, this);
}
_c = Button;
;
var _c;
__turbopack_context__.k.register(_c, "Button");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/podlab/header.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Header",
    ()=>Header
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/menu.js [app-client] (ecmascript) <export default as Menu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$dashboard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutDashboard$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/layout-dashboard.js [app-client] (ecmascript) <export default as LayoutDashboard>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mic$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/mic.js [app-client] (ecmascript) <export default as Mic>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$podlab$2f$logo$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/podlab/logo.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$router$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/router.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
const NAV = [
    {
        route: "accueil",
        label: "Accueil"
    },
    {
        route: "studios",
        label: "Studios"
    },
    {
        route: "sponsoring",
        label: "Sponsoring"
    },
    {
        route: "evenements",
        label: "Événements"
    }
];
function Header({ active } = {}) {
    _s();
    const hashRoute = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$router$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useHashRoute"])();
    const route = active ?? hashRoute;
    const [scrolled, setScrolled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Header.useEffect": ()=>{
            const onScroll = {
                "Header.useEffect.onScroll": ()=>setScrolled(window.scrollY > 12)
            }["Header.useEffect.onScroll"];
            onScroll();
            window.addEventListener("scroll", onScroll, {
                passive: true
            });
            return ({
                "Header.useEffect": ()=>window.removeEventListener("scroll", onScroll)
            })["Header.useEffect"];
        }
    }["Header.useEffect"], []);
    const go = (r)=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$router$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["navigate"])(r);
        setOpen(false);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("fixed top-0 inset-x-0 z-50 transition-all duration-300", scrolled || open ? "bg-black/85 backdrop-blur-xl border-b border-white/10" : "bg-transparent border-b border-transparent"),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-auto max-w-7xl px-4 sm:px-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex h-16 items-center justify-between gap-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>go("accueil"),
                            className: "flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded-lg px-1",
                            "aria-label": "PodLab Media — retour à l'accueil",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$podlab$2f$logo$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PodLabLogo"], {
                                size: "md",
                                priority: true
                            }, void 0, false, {
                                fileName: "[project]/src/components/podlab/header.tsx",
                                lineNumber: 51,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/podlab/header.tsx",
                            lineNumber: 46,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                            className: "hidden md:flex items-center gap-1",
                            "aria-label": "Navigation principale",
                            children: NAV.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>go(item.route),
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("px-3.5 py-2 rounded-lg text-sm font-medium transition-colors", route === item.route ? "text-white bg-white/10" : "text-zinc-400 hover:text-white hover:bg-white/5"),
                                    "aria-current": route === item.route ? "page" : undefined,
                                    children: item.label
                                }, item.route, false, {
                                    fileName: "[project]/src/components/podlab/header.tsx",
                                    lineNumber: 57,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/components/podlab/header.tsx",
                            lineNumber: 55,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "hidden md:flex items-center gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "flex items-center gap-2 text-xs font-medium text-zinc-500",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mic$3e$__["Mic"], {
                                            className: "size-3.5 animate-pulse-dot"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/podlab/header.tsx",
                                            lineNumber: 75,
                                            columnNumber: 15
                                        }, this),
                                        " Studio live"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/podlab/header.tsx",
                                    lineNumber: 74,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: route === "admin" ? "default" : "outline",
                                    size: "sm",
                                    onClick: ()=>go("admin"),
                                    className: "gap-2 rounded-lg",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$dashboard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutDashboard$3e$__["LayoutDashboard"], {
                                            className: "size-4"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/podlab/header.tsx",
                                            lineNumber: 83,
                                            columnNumber: 15
                                        }, this),
                                        "Espace Admin"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/podlab/header.tsx",
                                    lineNumber: 77,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/podlab/header.tsx",
                            lineNumber: 73,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "md:hidden inline-flex size-10 items-center justify-center rounded-lg text-zinc-300 hover:text-white hover:bg-white/10 transition-colors",
                            onClick: ()=>setOpen((o)=>!o),
                            "aria-expanded": open,
                            "aria-label": open ? "Fermer le menu" : "Ouvrir le menu",
                            children: open ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                className: "size-5"
                            }, void 0, false, {
                                fileName: "[project]/src/components/podlab/header.tsx",
                                lineNumber: 95,
                                columnNumber: 21
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
                                className: "size-5"
                            }, void 0, false, {
                                fileName: "[project]/src/components/podlab/header.tsx",
                                lineNumber: 95,
                                columnNumber: 48
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/podlab/header.tsx",
                            lineNumber: 89,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/podlab/header.tsx",
                    lineNumber: 45,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/podlab/header.tsx",
                lineNumber: 44,
                columnNumber: 7
            }, this),
            open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                className: "md:hidden border-t border-white/10 bg-black/95 backdrop-blur-xl px-4 py-4 space-y-1",
                "aria-label": "Navigation mobile",
                children: [
                    NAV.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>go(item.route),
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("w-full text-left px-3.5 py-3 rounded-lg text-sm font-medium transition-colors", route === item.route ? "text-white bg-white/10" : "text-zinc-400 hover:text-white hover:bg-white/5"),
                            children: item.label
                        }, item.route, false, {
                            fileName: "[project]/src/components/podlab/header.tsx",
                            lineNumber: 107,
                            columnNumber: 13
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        variant: "outline",
                        className: "w-full mt-2 gap-2",
                        onClick: ()=>go("admin"),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$dashboard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutDashboard$3e$__["LayoutDashboard"], {
                                className: "size-4"
                            }, void 0, false, {
                                fileName: "[project]/src/components/podlab/header.tsx",
                                lineNumber: 125,
                                columnNumber: 13
                            }, this),
                            "Espace Admin"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/podlab/header.tsx",
                        lineNumber: 120,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/podlab/header.tsx",
                lineNumber: 102,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/podlab/header.tsx",
        lineNumber: 36,
        columnNumber: 5
    }, this);
}
_s(Header, "sKAX2U8UZRmub08bhaANPbaiFPg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$router$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useHashRoute"]
    ];
});
_c = Header;
var _c;
__turbopack_context__.k.register(_c, "Header");
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
"[project]/src/components/podlab/footer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Footer",
    ()=>Footer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$youtube$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Youtube$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/youtube.js [app-client] (ecmascript) <export default as Youtube>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$instagram$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Instagram$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/instagram.js [app-client] (ecmascript) <export default as Instagram>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$facebook$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Facebook$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/facebook.js [app-client] (ecmascript) <export default as Facebook>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/mail.js [app-client] (ecmascript) <export default as Mail>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-client] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/phone.js [app-client] (ecmascript) <export default as Phone>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$podlab$2f$logo$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/podlab/logo.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$router$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/router.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brand$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/brand.ts [app-client] (ecmascript)");
;
;
;
;
;
/** Icône TikTok (absente de lucide-react) — tracé officiel monochrome. */ function TikTokIcon({ className }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 24 24",
        fill: "currentColor",
        "aria-hidden": true,
        className: className,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.61c.3 0 .6.05.88.13V9.4a6.33 6.33 0 0 0-1-.05A6.34 6.34 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"
        }, void 0, false, {
            fileName: "[project]/src/components/podlab/footer.tsx",
            lineNumber: 15,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/podlab/footer.tsx",
        lineNumber: 9,
        columnNumber: 5
    }, this);
}
_c = TikTokIcon;
const SOCIAL_LINKS = [
    {
        href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brand$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SOCIALS"].youtube,
        label: "PodLab Media sur YouTube (@podlabmedia)",
        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$youtube$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Youtube$3e$__["Youtube"]
    },
    {
        href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brand$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SOCIALS"].instagram,
        label: "PodLab sur Instagram (@podlab.so)",
        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$instagram$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Instagram$3e$__["Instagram"]
    },
    {
        href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brand$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SOCIALS"].tiktok,
        label: "PodLab Media sur TikTok (@podlabmedia)",
        Icon: TikTokIcon
    },
    {
        href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brand$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SOCIALS"].facebook,
        label: "PodLab Media sur Facebook (/podlabmedia)",
        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$facebook$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Facebook$3e$__["Facebook"]
    }
];
function Footer() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
        className: "mt-auto border-t border-white/10 bg-black",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mx-auto max-w-7xl px-4 sm:px-6 py-12 md:py-16",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid gap-10 md:grid-cols-12",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "md:col-span-5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$podlab$2f$logo$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PodLabLogo"], {
                                    size: "md"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/podlab/footer.tsx",
                                    lineNumber: 34,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-4 text-sm leading-relaxed text-zinc-400 max-w-sm",
                                    children: "Le 1er Média Business d'Afrique francophone. L'émission « Discussion Informelle » et ses interviews business — sans filtre, chaque dimanche, depuis nos studios de Cotonou et d'Abidjan."
                                }, void 0, false, {
                                    fileName: "[project]/src/components/podlab/footer.tsx",
                                    lineNumber: 35,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-5 flex items-center gap-3",
                                    children: SOCIAL_LINKS.map(({ href, label, Icon })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: href,
                                            target: "_blank",
                                            rel: "noreferrer",
                                            "aria-label": label,
                                            className: "inline-flex size-9 items-center justify-center rounded-lg border border-white/10 bg-zinc-950/80 text-zinc-400 hover:text-white hover:border-white/30 transition-colors",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                                className: "size-4"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/podlab/footer.tsx",
                                                lineNumber: 51,
                                                columnNumber: 19
                                            }, this)
                                        }, href, false, {
                                            fileName: "[project]/src/components/podlab/footer.tsx",
                                            lineNumber: 43,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/podlab/footer.tsx",
                                    lineNumber: 41,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/podlab/footer.tsx",
                            lineNumber: 33,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                            className: "md:col-span-2",
                            "aria-label": "Média",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500",
                                    children: "Média"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/podlab/footer.tsx",
                                    lineNumber: 59,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    className: "mt-4 space-y-2.5 text-sm",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$router$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["navigate"])("accueil"),
                                                className: "text-zinc-400 hover:text-white transition-colors",
                                                children: "Épisodes"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/podlab/footer.tsx",
                                                lineNumber: 64,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/podlab/footer.tsx",
                                            lineNumber: 63,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$router$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["navigate"])("evenements"),
                                                className: "text-zinc-400 hover:text-white transition-colors",
                                                children: "Masterclasses"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/podlab/footer.tsx",
                                                lineNumber: 69,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/podlab/footer.tsx",
                                            lineNumber: 68,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$router$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["navigate"])("accueil"),
                                                className: "text-zinc-400 hover:text-white transition-colors",
                                                children: "Newsletter"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/podlab/footer.tsx",
                                                lineNumber: 74,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/podlab/footer.tsx",
                                            lineNumber: 73,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$router$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["navigate"])("invitation"),
                                                className: "inline-flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors",
                                                children: [
                                                    "Invitation VIP",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "rounded-full border border-white/15 px-1.5 py-px text-[9px] font-bold uppercase tracking-wider text-zinc-500",
                                                        children: "Privé"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/podlab/footer.tsx",
                                                        lineNumber: 81,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/podlab/footer.tsx",
                                                lineNumber: 79,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/podlab/footer.tsx",
                                            lineNumber: 78,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/podlab/footer.tsx",
                                    lineNumber: 62,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/podlab/footer.tsx",
                            lineNumber: 58,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                            className: "md:col-span-2",
                            "aria-label": "Studios",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500",
                                    children: "Studios"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/podlab/footer.tsx",
                                    lineNumber: 90,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    className: "mt-4 space-y-2.5 text-sm",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$router$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["navigate"])("studios"),
                                                className: "text-zinc-400 hover:text-white transition-colors",
                                                children: "Réserver un studio"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/podlab/footer.tsx",
                                                lineNumber: 95,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/podlab/footer.tsx",
                                            lineNumber: 94,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "flex items-center gap-1.5 text-zinc-500",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                                    className: "size-3.5"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/podlab/footer.tsx",
                                                    lineNumber: 100,
                                                    columnNumber: 17
                                                }, this),
                                                " Cotonou, Bénin"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/podlab/footer.tsx",
                                            lineNumber: 99,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "flex items-center gap-1.5 text-zinc-500",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                                    className: "size-3.5"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/podlab/footer.tsx",
                                                    lineNumber: 103,
                                                    columnNumber: 17
                                                }, this),
                                                " Abidjan, Côte d'Ivoire"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/podlab/footer.tsx",
                                            lineNumber: 102,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/podlab/footer.tsx",
                                    lineNumber: 93,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/podlab/footer.tsx",
                            lineNumber: 89,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                            className: "md:col-span-3",
                            "aria-label": "Contact",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500",
                                    children: "Contact"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/podlab/footer.tsx",
                                    lineNumber: 109,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    className: "mt-4 space-y-2.5 text-sm",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$router$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["navigate"])("sponsoring"),
                                                className: "text-zinc-400 hover:text-white transition-colors",
                                                children: "Devenir annonceur"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/podlab/footer.tsx",
                                                lineNumber: 114,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/podlab/footer.tsx",
                                            lineNumber: 113,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brand$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CONTACT"].mailto,
                                                className: "flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__["Mail"], {
                                                        className: "size-3.5 shrink-0"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/podlab/footer.tsx",
                                                        lineNumber: 123,
                                                        columnNumber: 19
                                                    }, this),
                                                    " ",
                                                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brand$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CONTACT"].email
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/podlab/footer.tsx",
                                                lineNumber: 119,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/podlab/footer.tsx",
                                            lineNumber: 118,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brand$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CONTACT"].whatsapp,
                                                target: "_blank",
                                                rel: "noreferrer",
                                                className: "flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__["Phone"], {
                                                        className: "size-3.5 shrink-0"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/podlab/footer.tsx",
                                                        lineNumber: 133,
                                                        columnNumber: 19
                                                    }, this),
                                                    " ",
                                                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brand$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CONTACT"].phoneDisplay
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/podlab/footer.tsx",
                                                lineNumber: 127,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/podlab/footer.tsx",
                                            lineNumber: 126,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/podlab/footer.tsx",
                                    lineNumber: 112,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/podlab/footer.tsx",
                            lineNumber: 108,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/podlab/footer.tsx",
                    lineNumber: 31,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-white/10 pt-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs text-zinc-600",
                            children: [
                                "© ",
                                new Date().getFullYear(),
                                " PodLab Media — Tous droits réservés."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/podlab/footer.tsx",
                            lineNumber: 141,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-600",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brand$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SOCIALS"].youtube,
                                    target: "_blank",
                                    rel: "noreferrer",
                                    className: "hover:text-zinc-300 transition-colors",
                                    children: [
                                        "YouTube ",
                                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brand$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SOCIALS"].youtubeHandle
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/podlab/footer.tsx",
                                    lineNumber: 145,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brand$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SOCIALS"].instagram,
                                    target: "_blank",
                                    rel: "noreferrer",
                                    className: "hover:text-zinc-300 transition-colors",
                                    children: [
                                        "Instagram ",
                                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brand$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SOCIALS"].instagramHandle
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/podlab/footer.tsx",
                                    lineNumber: 148,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brand$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SOCIALS"].tiktok,
                                    target: "_blank",
                                    rel: "noreferrer",
                                    className: "hover:text-zinc-300 transition-colors",
                                    children: [
                                        "TikTok ",
                                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brand$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SOCIALS"].tiktokHandle
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/podlab/footer.tsx",
                                    lineNumber: 151,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brand$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SOCIALS"].facebook,
                                    target: "_blank",
                                    rel: "noreferrer",
                                    className: "hover:text-zinc-300 transition-colors",
                                    children: [
                                        "Facebook ",
                                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brand$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SOCIALS"].facebookHandle
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/podlab/footer.tsx",
                                    lineNumber: 154,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/podlab/footer.tsx",
                            lineNumber: 144,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/podlab/footer.tsx",
                    lineNumber: 140,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/podlab/footer.tsx",
            lineNumber: 30,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/podlab/footer.tsx",
        lineNumber: 29,
        columnNumber: 5
    }, this);
}
_c1 = Footer;
var _c, _c1;
__turbopack_context__.k.register(_c, "TikTokIcon");
__turbopack_context__.k.register(_c1, "Footer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/dialog.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Dialog",
    ()=>Dialog,
    "DialogClose",
    ()=>DialogClose,
    "DialogContent",
    ()=>DialogContent,
    "DialogDescription",
    ()=>DialogDescription,
    "DialogFooter",
    ()=>DialogFooter,
    "DialogHeader",
    ()=>DialogHeader,
    "DialogOverlay",
    ()=>DialogOverlay,
    "DialogPortal",
    ()=>DialogPortal,
    "DialogTitle",
    ()=>DialogTitle,
    "DialogTrigger",
    ()=>DialogTrigger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-dialog/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as XIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
function Dialog({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "dialog",
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/dialog.tsx",
        lineNumber: 12,
        columnNumber: 10
    }, this);
}
_c = Dialog;
function DialogTrigger({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trigger"], {
        "data-slot": "dialog-trigger",
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/dialog.tsx",
        lineNumber: 18,
        columnNumber: 10
    }, this);
}
_c1 = DialogTrigger;
function DialogPortal({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Portal"], {
        "data-slot": "dialog-portal",
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/dialog.tsx",
        lineNumber: 24,
        columnNumber: 10
    }, this);
}
_c2 = DialogPortal;
function DialogClose({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Close"], {
        "data-slot": "dialog-close",
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/dialog.tsx",
        lineNumber: 30,
        columnNumber: 10
    }, this);
}
_c3 = DialogClose;
function DialogOverlay({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Overlay"], {
        "data-slot": "dialog-overlay",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/dialog.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, this);
}
_c4 = DialogOverlay;
function DialogContent({ className, children, showCloseButton = true, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DialogPortal, {
        "data-slot": "dialog-portal",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DialogOverlay, {}, void 0, false, {
                fileName: "[project]/src/components/ui/dialog.tsx",
                lineNumber: 59,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Content"], {
                "data-slot": "dialog-content",
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg", className),
                ...props,
                children: [
                    children,
                    showCloseButton && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Close"], {
                        "data-slot": "dialog-close",
                        className: "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XIcon$3e$__["XIcon"], {}, void 0, false, {
                                fileName: "[project]/src/components/ui/dialog.tsx",
                                lineNumber: 74,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "sr-only",
                                children: "Close"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/dialog.tsx",
                                lineNumber: 75,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ui/dialog.tsx",
                        lineNumber: 70,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/dialog.tsx",
                lineNumber: 60,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/dialog.tsx",
        lineNumber: 58,
        columnNumber: 5
    }, this);
}
_c5 = DialogContent;
function DialogHeader({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "dialog-header",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex flex-col gap-2 text-center sm:text-left", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/dialog.tsx",
        lineNumber: 85,
        columnNumber: 5
    }, this);
}
_c6 = DialogHeader;
function DialogFooter({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "dialog-footer",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/dialog.tsx",
        lineNumber: 95,
        columnNumber: 5
    }, this);
}
_c7 = DialogFooter;
function DialogTitle({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Title"], {
        "data-slot": "dialog-title",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-lg leading-none font-semibold", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/dialog.tsx",
        lineNumber: 111,
        columnNumber: 5
    }, this);
}
_c8 = DialogTitle;
function DialogDescription({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Description"], {
        "data-slot": "dialog-description",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-muted-foreground text-sm", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/dialog.tsx",
        lineNumber: 124,
        columnNumber: 5
    }, this);
}
_c9 = DialogDescription;
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9;
__turbopack_context__.k.register(_c, "Dialog");
__turbopack_context__.k.register(_c1, "DialogTrigger");
__turbopack_context__.k.register(_c2, "DialogPortal");
__turbopack_context__.k.register(_c3, "DialogClose");
__turbopack_context__.k.register(_c4, "DialogOverlay");
__turbopack_context__.k.register(_c5, "DialogContent");
__turbopack_context__.k.register(_c6, "DialogHeader");
__turbopack_context__.k.register(_c7, "DialogFooter");
__turbopack_context__.k.register(_c8, "DialogTitle");
__turbopack_context__.k.register(_c9, "DialogDescription");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/input.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Input",
    ()=>Input
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
;
function Input({ className, type, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
        type: type,
        "data-slot": "input",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]", "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/input.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
_c = Input;
;
var _c;
__turbopack_context__.k.register(_c, "Input");
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
"[project]/src/components/podlab/player/floating-player.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FloatingPlayer",
    ()=>FloatingPlayer,
    "PdfCaptureDialog",
    ()=>PdfCaptureDialog
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/download.js [app-client] (ecmascript) <export default as Download>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.js [app-client] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$youtube$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Youtube$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/youtube.js [app-client] (ecmascript) <export default as Youtube>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/dialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$player$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/player-store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$videos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/videos.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brand$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/brand.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$episode$2d$highlights$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/episode-highlights.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pdf$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/pdf.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$download$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/download.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-toast.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
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
;
;
;
function PdfCaptureDialog({ video, open, onOpenChange }) {
    _s();
    const [email, setEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [name, setName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [done, setDone] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const submit = async ()=>{
        if (!video || !email.includes("@")) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"])({
                title: "Email invalide",
                description: "Renseignez une adresse email valide."
            });
            return;
        }
        setLoading(true);
        try {
            // Captation : l'email rejoint la base audience (source episode-pdf)
            await fetch("/api/newsletter", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    name: name || null,
                    segment: video.theme,
                    source: "episode-pdf"
                })
            });
            // PDF généré par le backend (logo officiel) ; repli client si besoin
            const delivered = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$download$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["downloadBackendPdf"])(`/api/pdf/episode?videoId=${encodeURIComponent(video.videoId)}&email=${encodeURIComponent(email)}`, `podlab-fiche-${video.videoId}.pdf`);
            if (!delivered) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pdf$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["downloadPdf"])({
                    brand: "PodLab Media — Fiche d'épisode",
                    title: video.title,
                    subtitle: `Thématique : ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$videos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VIDEO_THEMES"][video.theme]} · Émission « Discussion Informelle » — Chaîne PodLab (@podlabmedia)`,
                    sections: [
                        {
                            heading: "L'essentiel de cet épisode",
                            lines: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$episode$2d$highlights$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["highlightsFor"])(video.theme).map((h)=>`• ${h}`)
                        },
                        {
                            heading: "Pour aller plus loin",
                            lines: [
                                `• Regardez l'épisode complet sur YouTube : ${video.youtubeUrl}`,
                                "• Intégrez le Cercle Privé PodLab — l'analyse de chaque épisode, chaque dimanche à 8h.",
                                `• Suivez PodLab : Instagram ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brand$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SOCIALS"].instagramHandle} · TikTok ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brand$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SOCIALS"].tiktokHandle}`
                            ]
                        }
                    ],
                    footer: `© PodLab Media — Fiche générée pour ${email} · ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brand$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CONTACT"].email} · ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brand$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CONTACT"].phoneDisplay}`
                }, `podlab-${video.videoId}.pdf`);
            }
            setDone(true);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"])({
                title: "Fiche PDF téléchargée",
                description: "Vous êtes abonné(e) : les prochaines fiches arriveront par email."
            });
        } catch  {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"])({
                title: "Erreur",
                description: "Le téléchargement a échoué, réessayez."
            });
        } finally{
            setLoading(false);
        }
    };
    const reset = (v)=>{
        onOpenChange(v);
        if (!v) {
            setTimeout(()=>{
                setEmail("");
                setName("");
                setDone(false);
            }, 250);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
        open: open,
        onOpenChange: reset,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogContent"], {
            className: "glass-strong rounded-2xl border-white/10 sm:max-w-md",
            children: done ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "py-6 text-center space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                        className: "size-12 mx-auto text-white"
                    }, void 0, false, {
                        fileName: "[project]/src/components/podlab/player/floating-player.tsx",
                        lineNumber: 119,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                                className: "text-lg font-bold text-white",
                                children: "Fiche PDF envoyée !"
                            }, void 0, false, {
                                fileName: "[project]/src/components/podlab/player/floating-player.tsx",
                                lineNumber: 121,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogDescription"], {
                                className: "mt-2 text-sm text-zinc-400 leading-relaxed",
                                children: [
                                    "Le fichier a été téléchargé. Vous recevrez aussi les prochaines fiches d'épisodes à ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-zinc-200",
                                        children: email
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/podlab/player/floating-player.tsx",
                                        lineNumber: 126,
                                        columnNumber: 42
                                    }, this),
                                    "."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/podlab/player/floating-player.tsx",
                                lineNumber: 124,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/podlab/player/floating-player.tsx",
                        lineNumber: 120,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        variant: "outline",
                        className: "rounded-lg",
                        onClick: ()=>reset(false),
                        children: "Fermer"
                    }, void 0, false, {
                        fileName: "[project]/src/components/podlab/player/floating-player.tsx",
                        lineNumber: 129,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/podlab/player/floating-player.tsx",
                lineNumber: 118,
                columnNumber: 11
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-1 inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-400",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                                        className: "size-3"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/podlab/player/floating-player.tsx",
                                        lineNumber: 137,
                                        columnNumber: 17
                                    }, this),
                                    " Fiche de synthèse"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/podlab/player/floating-player.tsx",
                                lineNumber: 136,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                                className: "text-lg font-bold leading-snug text-white line-clamp-2",
                                children: video?.title
                            }, void 0, false, {
                                fileName: "[project]/src/components/podlab/player/floating-player.tsx",
                                lineNumber: 139,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogDescription"], {
                                className: "text-sm text-zinc-400 leading-relaxed",
                                children: "Recevez la fiche de synthèse de cet épisode (thématique, points clés et plan d'action) directement par email."
                            }, void 0, false, {
                                fileName: "[project]/src/components/podlab/player/floating-player.tsx",
                                lineNumber: 142,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/podlab/player/floating-player.tsx",
                        lineNumber: 135,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-3 pt-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                placeholder: "Votre nom (optionnel)",
                                value: name,
                                onChange: (e)=>setName(e.target.value),
                                className: "h-11 rounded-lg bg-black/60 border-white/15 text-sm"
                            }, void 0, false, {
                                fileName: "[project]/src/components/podlab/player/floating-player.tsx",
                                lineNumber: 148,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                type: "email",
                                placeholder: "votre@email.com",
                                value: email,
                                onChange: (e)=>setEmail(e.target.value),
                                className: "h-11 rounded-lg bg-black/60 border-white/15 text-sm",
                                onKeyDown: (e)=>e.key === "Enter" && submit()
                            }, void 0, false, {
                                fileName: "[project]/src/components/podlab/player/floating-player.tsx",
                                lineNumber: 154,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                onClick: submit,
                                disabled: loading,
                                className: "w-full h-11 rounded-lg gap-2 font-semibold",
                                children: [
                                    loading ? "Envoi en cours…" : "Recevoir la fiche PDF",
                                    !loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                                        className: "size-4"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/podlab/player/floating-player.tsx",
                                        lineNumber: 168,
                                        columnNumber: 30
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/podlab/player/floating-player.tsx",
                                lineNumber: 162,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[11px] leading-relaxed text-zinc-500 text-center",
                                children: "En validant, vous rejoignez le Cercle Privé PodLab. Désinscription en un clic, à tout moment."
                            }, void 0, false, {
                                fileName: "[project]/src/components/podlab/player/floating-player.tsx",
                                lineNumber: 170,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/podlab/player/floating-player.tsx",
                        lineNumber: 147,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true)
        }, void 0, false, {
            fileName: "[project]/src/components/podlab/player/floating-player.tsx",
            lineNumber: 116,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/podlab/player/floating-player.tsx",
        lineNumber: 115,
        columnNumber: 5
    }, this);
}
_s(PdfCaptureDialog, "4UYybJKB8EZqJ3nqX2xYekbD4QM=");
_c = PdfCaptureDialog;
function FloatingPlayer() {
    _s1();
    const video = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$player$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlayerStore"])({
        "FloatingPlayer.usePlayerStore[video]": (s)=>s.video
    }["FloatingPlayer.usePlayerStore[video]"]);
    const close = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$player$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlayerStore"])({
        "FloatingPlayer.usePlayerStore[close]": (s)=>s.close
    }["FloatingPlayer.usePlayerStore[close]"]);
    const [dialogOpen, setDialogOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: video && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        y: 96,
                        opacity: 0
                    },
                    animate: {
                        y: 0,
                        opacity: 1
                    },
                    exit: {
                        y: 96,
                        opacity: 0
                    },
                    transition: {
                        type: "spring",
                        stiffness: 320,
                        damping: 30
                    },
                    className: "fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-3xl",
                    role: "complementary",
                    "aria-label": "Lecteur PodLab en cours de lecture",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "glass-strong flex items-center gap-3 rounded-2xl p-3 shadow-2xl shadow-black/80",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative aspect-video w-24 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-black sm:w-40",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("iframe", {
                                    src: `https://www.youtube-nocookie.com/embed/${video.videoId}?autoplay=1&rel=0`,
                                    title: `Lecture — ${video.title}`,
                                    allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
                                    allowFullScreen: true,
                                    className: "absolute inset-0 h-full w-full"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/podlab/player/floating-player.tsx",
                                    lineNumber: 206,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/podlab/player/floating-player.tsx",
                                lineNumber: 205,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "min-w-0 flex-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-[9px] font-semibold uppercase tracking-[0.18em] text-zinc-500",
                                        children: [
                                            "En lecture · ",
                                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$videos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VIDEO_THEMES"][video.theme]
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/podlab/player/floating-player.tsx",
                                        lineNumber: 217,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-1 line-clamp-1 text-xs font-semibold text-white sm:text-sm",
                                        children: video.title
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/podlab/player/floating-player.tsx",
                                        lineNumber: 220,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-2 hidden h-4 items-end gap-[3px] sm:flex",
                                        "aria-hidden": true,
                                        children: [
                                            0,
                                            1,
                                            2,
                                            3,
                                            4,
                                            5,
                                            6,
                                            7,
                                            8,
                                            9,
                                            10,
                                            11
                                        ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "waveform-bar w-[3px] rounded-full bg-white",
                                                style: {
                                                    height: "100%",
                                                    animationDelay: `${i % 6 * 0.13}s`,
                                                    animationDuration: `${0.9 + i % 4 * 0.12}s`
                                                }
                                            }, i, false, {
                                                fileName: "[project]/src/components/podlab/player/floating-player.tsx",
                                                lineNumber: 228,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/podlab/player/floating-player.tsx",
                                        lineNumber: 223,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/podlab/player/floating-player.tsx",
                                lineNumber: 216,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex shrink-0 items-center gap-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        size: "icon",
                                        onClick: ()=>setDialogOpen(true),
                                        "aria-label": "Recevoir la fiche de synthèse PDF",
                                        title: "Fiche de synthèse PDF",
                                        className: "size-9 rounded-xl border-white/15 bg-black/60 hover:bg-white/10",
                                        variant: "outline",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                                            className: "size-4"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/podlab/player/floating-player.tsx",
                                            lineNumber: 251,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/podlab/player/floating-player.tsx",
                                        lineNumber: 243,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        size: "icon",
                                        onClick: ()=>window.open(video.youtubeUrl, "_blank", "noreferrer"),
                                        "aria-label": "Ouvrir sur YouTube",
                                        title: "Ouvrir sur YouTube",
                                        className: "size-9 rounded-xl border-white/15 bg-black/60 hover:bg-white/10",
                                        variant: "outline",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$youtube$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Youtube$3e$__["Youtube"], {
                                            className: "size-4"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/podlab/player/floating-player.tsx",
                                            lineNumber: 261,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/podlab/player/floating-player.tsx",
                                        lineNumber: 253,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        size: "icon",
                                        onClick: close,
                                        "aria-label": "Fermer le lecteur",
                                        className: "size-9 rounded-xl bg-white text-black hover:bg-zinc-200",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                            className: "size-4"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/podlab/player/floating-player.tsx",
                                            lineNumber: 269,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/podlab/player/floating-player.tsx",
                                        lineNumber: 263,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/podlab/player/floating-player.tsx",
                                lineNumber: 242,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/podlab/player/floating-player.tsx",
                        lineNumber: 203,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/podlab/player/floating-player.tsx",
                    lineNumber: 194,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/podlab/player/floating-player.tsx",
                lineNumber: 192,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PdfCaptureDialog, {
                video: video,
                open: dialogOpen,
                onOpenChange: setDialogOpen
            }, void 0, false, {
                fileName: "[project]/src/components/podlab/player/floating-player.tsx",
                lineNumber: 277,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s1(FloatingPlayer, "zbN9c3iEhFB7tQRRdaeoC+rxWFo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$player$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlayerStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$player$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlayerStore"]
    ];
});
_c1 = FloatingPlayer;
var _c, _c1;
__turbopack_context__.k.register(_c, "PdfCaptureDialog");
__turbopack_context__.k.register(_c1, "FloatingPlayer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/podlab/app-shell.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AppShell",
    ()=>AppShell
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$podlab$2f$header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/podlab/header.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$podlab$2f$footer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/podlab/footer.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$podlab$2f$player$2f$floating$2d$player$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/podlab/player/floating-player.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function AppShell({ active, children }) {
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AppShell.useEffect": ()=>{
            window.scrollTo({
                top: 0
            });
        }
    }["AppShell.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen flex flex-col bg-black",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$podlab$2f$header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Header"], {
                active: active
            }, void 0, false, {
                fileName: "[project]/src/components/podlab/app-shell.tsx",
                lineNumber: 28,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "flex-1 w-full",
                children: children
            }, void 0, false, {
                fileName: "[project]/src/components/podlab/app-shell.tsx",
                lineNumber: 29,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$podlab$2f$footer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Footer"], {}, void 0, false, {
                fileName: "[project]/src/components/podlab/app-shell.tsx",
                lineNumber: 30,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$podlab$2f$player$2f$floating$2d$player$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FloatingPlayer"], {}, void 0, false, {
                fileName: "[project]/src/components/podlab/app-shell.tsx",
                lineNumber: 31,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/podlab/app-shell.tsx",
        lineNumber: 27,
        columnNumber: 5
    }, this);
}
_s(AppShell, "OD7bBpZva5O2jO+Puf00hKivP7c=");
_c = AppShell;
var _c;
__turbopack_context__.k.register(_c, "AppShell");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/textarea.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Textarea",
    ()=>Textarea
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
;
function Textarea({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
        "data-slot": "textarea",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/textarea.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
_c = Textarea;
;
var _c;
__turbopack_context__.k.register(_c, "Textarea");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/accordion.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Accordion",
    ()=>Accordion,
    "AccordionContent",
    ()=>AccordionContent,
    "AccordionItem",
    ()=>AccordionItem,
    "AccordionTrigger",
    ()=>AccordionTrigger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$accordion$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-accordion/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDownIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDownIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
function Accordion({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$accordion$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "accordion",
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/accordion.tsx",
        lineNumber: 12,
        columnNumber: 10
    }, this);
}
_c = Accordion;
function AccordionItem({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$accordion$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Item"], {
        "data-slot": "accordion-item",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("border-b last:border-b-0", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/accordion.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
_c1 = AccordionItem;
function AccordionTrigger({ className, children, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$accordion$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Header"], {
        className: "flex",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$accordion$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trigger"], {
            "data-slot": "accordion-trigger",
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180", className),
            ...props,
            children: [
                children,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDownIcon$3e$__["ChevronDownIcon"], {
                    className: "text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200"
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/accordion.tsx",
                    lineNumber: 44,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/ui/accordion.tsx",
            lineNumber: 35,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ui/accordion.tsx",
        lineNumber: 34,
        columnNumber: 5
    }, this);
}
_c2 = AccordionTrigger;
function AccordionContent({ className, children, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$accordion$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Content"], {
        "data-slot": "accordion-content",
        className: "data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm",
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("pt-0 pb-4", className),
            children: children
        }, void 0, false, {
            fileName: "[project]/src/components/ui/accordion.tsx",
            lineNumber: 61,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ui/accordion.tsx",
        lineNumber: 56,
        columnNumber: 5
    }, this);
}
_c3 = AccordionContent;
;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "Accordion");
__turbopack_context__.k.register(_c1, "AccordionItem");
__turbopack_context__.k.register(_c2, "AccordionTrigger");
__turbopack_context__.k.register(_c3, "AccordionContent");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/podlab/shared.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CountUp",
    ()=>CountUp,
    "GlassCard",
    ()=>GlassCard,
    "LiveDot",
    ()=>LiveDot,
    "Reveal",
    ()=>Reveal,
    "SectionTag",
    ()=>SectionTag,
    "StatBlock",
    ()=>StatBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/utils/use-in-view.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function Reveal({ children, delay = 0, className, y = 24 }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        className: className,
        initial: {
            opacity: 0,
            y
        },
        whileInView: {
            opacity: 1,
            y: 0
        },
        viewport: {
            once: true,
            margin: "-64px"
        },
        transition: {
            duration: 0.55,
            delay,
            ease: [
                0.21,
                0.47,
                0.32,
                0.98
            ]
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/podlab/shared.tsx",
        lineNumber: 22,
        columnNumber: 5
    }, this);
}
_c = Reveal;
function CountUp({ to, duration = 1600, suffix = "", prefix = "", format = "compact", className }) {
    _s();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const inView = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInView"])(ref, {
        once: true,
        margin: "-32px"
    });
    const [val, setVal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CountUp.useEffect": ()=>{
            if (!inView) return;
            let raf = 0;
            const start = performance.now();
            const tick = {
                "CountUp.useEffect.tick": (now)=>{
                    const p = Math.min(1, (now - start) / duration);
                    // easeOutExpo
                    const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
                    setVal(to * eased);
                    if (p < 1) raf = requestAnimationFrame(tick);
                }
            }["CountUp.useEffect.tick"];
            raf = requestAnimationFrame(tick);
            return ({
                "CountUp.useEffect": ()=>cancelAnimationFrame(raf)
            })["CountUp.useEffect"];
        }
    }["CountUp.useEffect"], [
        inView,
        to,
        duration
    ]);
    const display = format === "compact" ? new Intl.NumberFormat("fr-FR", {
        notation: "compact",
        maximumFractionDigits: 1
    }).format(Math.round(val)) : new Intl.NumberFormat("fr-FR").format(Math.round(val));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        ref: ref,
        className: className,
        children: [
            prefix,
            display,
            suffix
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/podlab/shared.tsx",
        lineNumber: 75,
        columnNumber: 5
    }, this);
}
_s(CountUp, "9v3pWptbfNKuzyffOlK31gwLSVQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInView"]
    ];
});
_c1 = CountUp;
function SectionTag({ index, label, className }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center gap-3 text-xs font-medium uppercase tracking-[0.28em] text-zinc-500", className),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "font-mono text-zinc-600",
                children: index
            }, void 0, false, {
                fileName: "[project]/src/components/podlab/shared.tsx",
                lineNumber: 100,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "h-px w-8 bg-zinc-700",
                "aria-hidden": true
            }, void 0, false, {
                fileName: "[project]/src/components/podlab/shared.tsx",
                lineNumber: 101,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: label
            }, void 0, false, {
                fileName: "[project]/src/components/podlab/shared.tsx",
                lineNumber: 102,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/podlab/shared.tsx",
        lineNumber: 94,
        columnNumber: 5
    }, this);
}
_c2 = SectionTag;
function LiveDot({ className }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("relative inline-flex size-2 rounded-full bg-white animate-pulse-dot", className),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "absolute inset-0 rounded-full bg-white/40 blur-[2px]"
        }, void 0, false, {
            fileName: "[project]/src/components/podlab/shared.tsx",
            lineNumber: 116,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/podlab/shared.tsx",
        lineNumber: 110,
        columnNumber: 5
    }, this);
}
_c3 = LiveDot;
function GlassCard({ children, className, shine = true }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("rounded-2xl bg-zinc-950/80 border border-white/10 backdrop-blur-md", shine && "card-shine", className),
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/podlab/shared.tsx",
        lineNumber: 132,
        columnNumber: 5
    }, this);
}
_c4 = GlassCard;
function StatBlock({ value, label, sub }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(GlassCard, {
        className: "p-5 md:p-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-3xl md:text-4xl font-bold tracking-tight text-white tabular-nums",
                children: value
            }, void 0, false, {
                fileName: "[project]/src/components/podlab/shared.tsx",
                lineNumber: 156,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-2 text-sm font-medium text-zinc-300",
                children: label
            }, void 0, false, {
                fileName: "[project]/src/components/podlab/shared.tsx",
                lineNumber: 159,
                columnNumber: 7
            }, this),
            sub ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-0.5 text-xs text-zinc-500",
                children: sub
            }, void 0, false, {
                fileName: "[project]/src/components/podlab/shared.tsx",
                lineNumber: 160,
                columnNumber: 14
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/podlab/shared.tsx",
        lineNumber: 155,
        columnNumber: 5
    }, this);
}
_c5 = StatBlock;
var _c, _c1, _c2, _c3, _c4, _c5;
__turbopack_context__.k.register(_c, "Reveal");
__turbopack_context__.k.register(_c1, "CountUp");
__turbopack_context__.k.register(_c2, "SectionTag");
__turbopack_context__.k.register(_c3, "LiveDot");
__turbopack_context__.k.register(_c4, "GlassCard");
__turbopack_context__.k.register(_c5, "StatBlock");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/podlab/flag.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CountryFlag",
    ()=>CountryFlag
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
;
// ─── Drapeaux SVG inline ─────────────────────────────────────────────────────
// Les emojis drapeaux (🇧🇯 / 🇨🇮) ne sont PAS rendus par Windows ni par Chrome
// desktop — seul le code pays « BJ » / « CI » apparaissait, quel que soit le
// navigateur ou l'appareil. Ces drapeaux SVG vectoriels s'affichent partout :
// desktop, mobile, tous navigateurs, et même dans les PDF générés côté serveur.
const FLAG_LABELS = {
    BJ: "Drapeau du Bénin",
    CI: "Drapeau de la Côte d'Ivoire"
};
function CountryFlag({ code, className, cover = false }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 900 600",
        preserveAspectRatio: cover ? "xMidYMid slice" : "xMidYMid meet",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("block shrink-0", className),
        role: "img",
        "aria-label": FLAG_LABELS[code] ?? code,
        xmlns: "http://www.w3.org/2000/svg",
        children: code === "BJ" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                    width: "300",
                    height: "600",
                    fill: "#008751"
                }, void 0, false, {
                    fileName: "[project]/src/components/podlab/flag.tsx",
                    lineNumber: 42,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                    x: "300",
                    width: "600",
                    height: "300",
                    fill: "#FCD116"
                }, void 0, false, {
                    fileName: "[project]/src/components/podlab/flag.tsx",
                    lineNumber: 43,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                    x: "300",
                    y: "300",
                    width: "600",
                    height: "300",
                    fill: "#E8112D"
                }, void 0, false, {
                    fileName: "[project]/src/components/podlab/flag.tsx",
                    lineNumber: 44,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                    width: "300",
                    height: "600",
                    fill: "#F77F00"
                }, void 0, false, {
                    fileName: "[project]/src/components/podlab/flag.tsx",
                    lineNumber: 49,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                    x: "300",
                    width: "300",
                    height: "600",
                    fill: "#FFFFFF"
                }, void 0, false, {
                    fileName: "[project]/src/components/podlab/flag.tsx",
                    lineNumber: 50,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                    x: "600",
                    width: "300",
                    height: "600",
                    fill: "#009E60"
                }, void 0, false, {
                    fileName: "[project]/src/components/podlab/flag.tsx",
                    lineNumber: 51,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true)
    }, void 0, false, {
        fileName: "[project]/src/components/podlab/flag.tsx",
        lineNumber: 31,
        columnNumber: 5
    }, this);
}
_c = CountryFlag;
var _c;
__turbopack_context__.k.register(_c, "CountryFlag");
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
"[project]/src/components/podlab/invitation/invitation-view.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "InvitationView",
    ()=>InvitationView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-down.js [app-client] (ecmascript) <export default as ArrowDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$badge$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BadgeCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/badge-check.js [app-client] (ecmascript) <export default as BadgeCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CalendarCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar-check.js [app-client] (ecmascript) <export default as CalendarCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/external-link.js [app-client] (ecmascript) <export default as ExternalLink>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/mail.js [app-client] (ecmascript) <export default as Mail>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-client] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/phone.js [app-client] (ecmascript) <export default as Phone>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shield-check.js [app-client] (ecmascript) <export default as ShieldCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-client] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/zap.js [app-client] (ecmascript) <export default as Zap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$textarea$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/textarea.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$accordion$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/accordion.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$podlab$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/podlab/shared.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$podlab$2f$flag$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/podlab/flag.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2d$mock$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/data-mock.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brand$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/brand.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$invitation$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/invitation-data.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-toast.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
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
;
;
;
;
// ─── Page Invitation VIP (/invitation) ───────────────────────────────────────
// Destination des invités de prestige : chiffres d'impact, galerie des grands
// visages déjà reçus, calendrier de réservation privé (référence immédiate,
// sans échange d'e-mails) et guide de préparation rassurant.
const DAYS_AHEAD = 21;
function buildDays() {
    const out = [];
    const now = new Date();
    for(let i = 1; i <= DAYS_AHEAD; i++){
        const d = new Date(now);
        d.setDate(now.getDate() + i);
        out.push({
            iso: d.toISOString().slice(0, 10),
            weekday: d.toLocaleDateString("fr-FR", {
                weekday: "short"
            }),
            day: d.toLocaleDateString("fr-FR", {
                day: "2-digit"
            }),
            month: d.toLocaleDateString("fr-FR", {
                month: "short"
            })
        });
    }
    return out;
}
function InvitationView() {
    _s();
    // ── Réservation privée ──
    const days = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])(buildDays, []);
    const [city, setCity] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [date, setDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [slot, setSlot] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [guestName, setGuestName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [role, setRole] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [email, setEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [phone, setPhone] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [topic, setTopic] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [format, setFormat] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("standard");
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [done, setDone] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [occupied, setOccupied] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Set());
    // Chargement du planning VIP réel pour bloquer les créneaux pris
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "InvitationView.useEffect": ()=>{
            fetch("/api/invitations").then({
                "InvitationView.useEffect": (r)=>r.json()
            }["InvitationView.useEffect"]).then({
                "InvitationView.useEffect": (d)=>{
                    const list = d.invitations ?? [];
                    setOccupied(new Set(list.filter({
                        "InvitationView.useEffect": (b)=>new Date(b.date) >= new Date()
                    }["InvitationView.useEffect"]).map({
                        "InvitationView.useEffect": (b)=>`${b.city}|${b.date}|${b.slot}`
                    }["InvitationView.useEffect"])));
                }
            }["InvitationView.useEffect"]).catch({
                "InvitationView.useEffect": ()=>{}
            }["InvitationView.useEffect"]);
        }
    }["InvitationView.useEffect"], []);
    const isTaken = (d, s)=>city ? occupied.has(`${city}|${d}|${s}`) : false;
    const studio = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2d$mock$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STUDIOS"].find((s)=>s.id === city);
    const scrollTo = (id)=>document.getElementById(id)?.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    const submit = async ()=>{
        if (!city || !date || !slot) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"])({
                title: "Créneau manquant",
                description: "Choisissez votre studio, une date et un créneau."
            });
            return;
        }
        if (!guestName.trim() || guestName.trim().length < 2) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"])({
                title: "Nom requis",
                description: "Renseignez votre nom complet."
            });
            return;
        }
        if (!email.includes("@")) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"])({
                title: "Email invalide",
                description: "Renseignez une adresse email valide."
            });
            return;
        }
        if (phone.trim().length < 6) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"])({
                title: "Téléphone requis",
                description: "Pour vous rappeler sous 24 h."
            });
            return;
        }
        setLoading(true);
        try {
            const res = await fetch("/api/invitations", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    city,
                    date,
                    slot,
                    guestName: guestName.trim(),
                    role: role.trim() || null,
                    email: email.trim(),
                    phone: phone.trim(),
                    topic: topic.trim() || null,
                    format
                })
            });
            const data = await res.json();
            if (!res.ok) {
                if (res.status === 409) {
                    setOccupied((prev)=>new Set(prev).add(`${city}|${date}|${slot}`));
                    setSlot(null);
                }
                throw new Error(data.error ?? "Réservation impossible");
            }
            setDone(data.invitation);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"])({
                title: "Créneau bloqué",
                description: `Référence ${data.invitation.ref} — notre rédaction vous appelle sous 24 h.`
            });
        } catch (e) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"])({
                title: "Erreur",
                description: e instanceof Error ? e.message : "Réessayez dans un instant."
            });
        } finally{
            setLoading(false);
        }
    };
    const resetAll = ()=>{
        setDone(null);
        setSlot(null);
        setDate(null);
        setCity(null);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "relative overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 bg-grid",
                        "aria-hidden": true
                    }, void 0, false, {
                        fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                        lineNumber: 179,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-x-0 top-0 h-[460px] glow-top",
                        "aria-hidden": true
                    }, void 0, false, {
                        fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                        lineNumber: 180,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative mx-auto max-w-7xl px-4 sm:px-6 pt-32 pb-14 md:pt-40 md:pb-20 text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                initial: {
                                    opacity: 0,
                                    y: 16
                                },
                                animate: {
                                    opacity: 1,
                                    y: 0
                                },
                                transition: {
                                    duration: 0.5
                                },
                                className: "inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-zinc-950/80 px-4 py-1.5 text-xs font-medium text-zinc-300 backdrop-blur",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                        className: "size-3.5"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                        lineNumber: 188,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-semibold uppercase tracking-[0.18em]",
                                        children: "Accès prioritaire — Invitation personnelle"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                        lineNumber: 189,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                lineNumber: 182,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].h1, {
                                initial: {
                                    opacity: 0,
                                    y: 20
                                },
                                animate: {
                                    opacity: 1,
                                    y: 0
                                },
                                transition: {
                                    duration: 0.55,
                                    delay: 0.08
                                },
                                className: "mx-auto mt-6 max-w-3xl text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.05] text-gradient",
                                children: [
                                    "Vous êtes attendu(e)",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                        fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                        lineNumber: 201,
                                        columnNumber: 13
                                    }, this),
                                    "sur le plateau PodLab."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                lineNumber: 194,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].p, {
                                initial: {
                                    opacity: 0,
                                    y: 20
                                },
                                animate: {
                                    opacity: 1,
                                    y: 0
                                },
                                transition: {
                                    duration: 0.55,
                                    delay: 0.16
                                },
                                className: "mx-auto mt-6 max-w-2xl text-base md:text-lg leading-relaxed text-zinc-400",
                                children: [
                                    "Moins de 3 % des personnalités qui sollicitent un passage obtiennent une invitation. ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-zinc-200",
                                        children: "Votre segment d'épisode est déjà réservé"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                        lineNumber: 212,
                                        columnNumber: 29
                                    }, this),
                                    " — il ne reste qu'à choisir votre créneau."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                lineNumber: 205,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                initial: {
                                    opacity: 0,
                                    y: 20
                                },
                                animate: {
                                    opacity: 1,
                                    y: 0
                                },
                                transition: {
                                    duration: 0.55,
                                    delay: 0.24
                                },
                                className: "mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        size: "lg",
                                        onClick: ()=>scrollTo("calendrier"),
                                        className: "w-full gap-2 rounded-xl px-8 h-12 text-sm font-semibold shadow-[0_0_40px_-8px_rgba(255,255,255,0.4)] hover:shadow-[0_0_60px_-6px_rgba(255,255,255,0.55)] transition-shadow sm:w-auto",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CalendarCheck$3e$__["CalendarCheck"], {
                                                className: "size-4"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                lineNumber: 226,
                                                columnNumber: 15
                                            }, this),
                                            "Réserver mon passage"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                        lineNumber: 221,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        size: "lg",
                                        variant: "outline",
                                        onClick: ()=>scrollTo("impact"),
                                        className: "w-full gap-2 rounded-xl px-8 h-12 text-sm font-semibold border-white/20 hover:bg-white/10 sm:w-auto",
                                        children: [
                                            "L'audience que je toucherai ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDown$3e$__["ArrowDown"], {
                                                className: "size-4"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                lineNumber: 235,
                                                columnNumber: 48
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                        lineNumber: 229,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                lineNumber: 215,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                initial: {
                                    opacity: 0
                                },
                                animate: {
                                    opacity: 1
                                },
                                transition: {
                                    duration: 0.6,
                                    delay: 0.35
                                },
                                className: "mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-zinc-500",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "flex items-center gap-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"], {
                                                className: "size-3.5"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                lineNumber: 246,
                                                columnNumber: 15
                                            }, this),
                                            " Référence de confirmation immédiate"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                        lineNumber: 245,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "flex items-center gap-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__["ShieldCheck"], {
                                                className: "size-3.5"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                lineNumber: 249,
                                                columnNumber: 15
                                            }, this),
                                            " Aucun échange d'e-mails requis"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                        lineNumber: 248,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "flex items-center gap-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$badge$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BadgeCheck$3e$__["BadgeCheck"], {
                                                className: "size-3.5"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                lineNumber: 252,
                                                columnNumber: 15
                                            }, this),
                                            " Vous validez la vidéo avant publication"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                        lineNumber: 251,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                lineNumber: 239,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                        lineNumber: 181,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                lineNumber: 178,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                id: "impact",
                className: "relative scroll-mt-20 border-t border-white/10 py-16 md:py-24",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto max-w-7xl px-4 sm:px-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$podlab$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Reveal"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$podlab$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SectionTag"], {
                                    index: "01",
                                    label: "Chiffres d'impact — pourquoi ce plateau"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                    lineNumber: 262,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "mt-4 max-w-3xl text-3xl md:text-5xl font-bold tracking-tight text-white",
                                    children: [
                                        "Parler sur PodLab, c'est s'adresser",
                                        " ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-zinc-500",
                                            children: "à la salle des décideurs."
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                            lineNumber: 265,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                    lineNumber: 263,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-4 max-w-2xl text-sm md:text-base leading-relaxed text-zinc-400",
                                    children: "Chaque épisode de « Discussion Informelle » est écouté jusqu'au bout par une audience rare : cadres, fondateurs, investisseurs. Voici ce que vos 60 minutes de plateau deviennent entre nos mains."
                                }, void 0, false, {
                                    fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                    lineNumber: 267,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                            lineNumber: 261,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$podlab$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Reveal"], {
                            delay: 0.08,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$podlab$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GlassCard"], {
                                        className: "p-5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-3xl font-bold tracking-tight text-white tabular-nums",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$podlab$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CountUp"], {
                                                    to: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$invitation$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VIP_IMPACT"].completionRate,
                                                    suffix: " %"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                    lineNumber: 278,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                lineNumber: 277,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-2 text-sm font-medium text-zinc-300",
                                                children: "de taux de complétion"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                lineNumber: 280,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-1 text-xs text-zinc-500",
                                                children: "Moyenne secteur des interviews longues : ~45 %. Votre message est écouté jusqu'au bout."
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                lineNumber: 281,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                        lineNumber: 276,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$podlab$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GlassCard"], {
                                        className: "p-5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-3xl font-bold tracking-tight text-white tabular-nums",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$podlab$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CountUp"], {
                                                    to: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$invitation$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VIP_IMPACT"].attentionMinutes,
                                                    format: "compact",
                                                    suffix: " min"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                    lineNumber: 287,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                lineNumber: 286,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-2 text-sm font-medium text-zinc-300",
                                                children: "d'attention par épisode"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                lineNumber: 289,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-1 text-xs text-zinc-500",
                                                children: "Près de deux heures de temps de cerveau disponible, pas trois secondes de scroll."
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                lineNumber: 290,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                        lineNumber: 285,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$podlab$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GlassCard"], {
                                        className: "p-5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-3xl font-bold tracking-tight text-white tabular-nums",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$podlab$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CountUp"], {
                                                    to: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$invitation$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VIP_IMPACT"].listenersPerQuarter,
                                                    format: "compact",
                                                    prefix: "+"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                    lineNumber: 296,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                lineNumber: 295,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-2 text-sm font-medium text-zinc-300",
                                                children: "écoutes / trimestre"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                lineNumber: 298,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-1 text-xs text-zinc-500",
                                                children: "Podcast business n°1 au Bénin, 2ᵉ d'Afrique de l'Ouest."
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                lineNumber: 299,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                        lineNumber: 294,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$podlab$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GlassCard"], {
                                        className: "p-5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-3xl font-bold tracking-tight text-white tabular-nums",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$podlab$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CountUp"], {
                                                    to: 128_000,
                                                    format: "compact"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                    lineNumber: 305,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                lineNumber: 304,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-2 text-sm font-medium text-zinc-300",
                                                children: "décideurs abonnés"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                lineNumber: 307,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-1 text-xs text-zinc-500",
                                                children: "Dirigeants, fondateurs, créatifs et investisseurs — 14 pays d'écoute."
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                lineNumber: 308,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                        lineNumber: 303,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                lineNumber: 275,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                            lineNumber: 274,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$podlab$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Reveal"], {
                            delay: 0.12,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-6 grid gap-6 lg:grid-cols-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$podlab$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GlassCard"], {
                                        className: "p-6 md:p-7",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-sm font-bold uppercase tracking-[0.18em] text-zinc-400",
                                                children: "Profil des auditeurs"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                lineNumber: 319,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-5 space-y-4",
                                                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$invitation$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VIP_IMPACT"].audienceProfile.map((row, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-baseline justify-between gap-3 text-xs",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-zinc-300",
                                                                        children: row.label
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                                        lineNumber: 326,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-bold tabular-nums text-white",
                                                                        children: [
                                                                            row.pct,
                                                                            " %"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                                        lineNumber: 327,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                                lineNumber: 325,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/10",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                                    initial: {
                                                                        width: 0
                                                                    },
                                                                    whileInView: {
                                                                        width: `${row.pct}%`
                                                                    },
                                                                    viewport: {
                                                                        once: true
                                                                    },
                                                                    transition: {
                                                                        duration: 0.9,
                                                                        delay: 0.1 + i * 0.08,
                                                                        ease: "easeOut"
                                                                    },
                                                                    className: "h-full rounded-full bg-white"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                                    lineNumber: 330,
                                                                    columnNumber: 25
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                                lineNumber: 329,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, row.label, true, {
                                                        fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                        lineNumber: 324,
                                                        columnNumber: 21
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                lineNumber: 322,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-5 text-[11px] leading-relaxed text-zinc-500",
                                                children: "78 % de l'audience cumule des postes de décision — la communauté d'affaires la plus concentrée du média francophone africain. Moyennes internes 12 derniers mois."
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                lineNumber: 341,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                        lineNumber: 318,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$podlab$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GlassCard"], {
                                        className: "p-6 md:p-7",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-sm font-bold uppercase tracking-[0.18em] text-zinc-400",
                                                children: "Où votre épisode sera écouté"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                lineNumber: 349,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-5 space-y-4",
                                                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$invitation$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VIP_IMPACT"].geographies.map((row, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-baseline justify-between gap-3 text-xs",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-zinc-300",
                                                                        children: row.label
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                                        lineNumber: 356,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-bold tabular-nums text-white",
                                                                        children: [
                                                                            row.pct,
                                                                            " %"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                                        lineNumber: 357,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                                lineNumber: 355,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/10",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                                    initial: {
                                                                        width: 0
                                                                    },
                                                                    whileInView: {
                                                                        width: `${row.pct}%`
                                                                    },
                                                                    viewport: {
                                                                        once: true
                                                                    },
                                                                    transition: {
                                                                        duration: 0.9,
                                                                        delay: 0.1 + i * 0.08,
                                                                        ease: "easeOut"
                                                                    },
                                                                    className: "h-full rounded-full bg-zinc-500"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                                    lineNumber: 360,
                                                                    columnNumber: 25
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                                lineNumber: 359,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, row.label, true, {
                                                        fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                        lineNumber: 354,
                                                        columnNumber: 21
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                lineNumber: 352,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-5 text-[11px] leading-relaxed text-zinc-500",
                                                children: [
                                                    "Deux studios d'ancrage —",
                                                    " ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "inline-flex translate-y-[2px] items-center gap-1.5 text-zinc-400",
                                                        children: [
                                                            "Cotonou",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$podlab$2f$flag$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CountryFlag"], {
                                                                code: "BJ",
                                                                className: "h-2.5 w-4 rounded-[2px]"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                                lineNumber: 375,
                                                                columnNumber: 21
                                                            }, this),
                                                            " et Abidjan",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$podlab$2f$flag$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CountryFlag"], {
                                                                code: "CI",
                                                                className: "h-2.5 w-4 rounded-[2px]"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                                lineNumber: 376,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                        lineNumber: 373,
                                                        columnNumber: 19
                                                    }, this),
                                                    " ",
                                                    "— pour un rayonnement régional : Sénégal, Togo, Cameroun, France et diaspora."
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                lineNumber: 371,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                        lineNumber: 348,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                lineNumber: 317,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                            lineNumber: 316,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                    lineNumber: 260,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                lineNumber: 259,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                id: "prestige",
                className: "scroll-mt-20 border-t border-white/10 py-16 md:py-24",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto max-w-7xl px-4 sm:px-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$podlab$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Reveal"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$podlab$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SectionTag"], {
                                    index: "02",
                                    label: "Galerie de prestige — le plateau déjà trusté"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                    lineNumber: 391,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "mt-4 max-w-3xl text-3xl md:text-5xl font-bold tracking-tight text-white",
                                    children: [
                                        "Les grands visages déjà passés",
                                        " ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-zinc-500",
                                            children: "sur le plateau."
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                            lineNumber: 394,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                    lineNumber: 392,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-4 max-w-2xl text-sm leading-relaxed text-zinc-400",
                                    children: "Bâtisseurs d'empires, stars du showbiz, sportifs internationaux : chaque saison, les personnalités qui comptent choisissent PodLab pour la conversation sans filtre."
                                }, void 0, false, {
                                    fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                    lineNumber: 396,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                            lineNumber: 390,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4",
                            children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$invitation$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PRESTIGE_GUESTS"].map((guest, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$podlab$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Reveal"], {
                                    delay: Math.min(i, 4) * 0.06,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: `https://www.youtube.com/watch?v=${guest.videoId}`,
                                        target: "_blank",
                                        rel: "noreferrer",
                                        className: "group card-shine block overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/80 backdrop-blur-md transition-colors hover:border-white/25",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "relative aspect-video overflow-hidden bg-black",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                        src: `https://i.ytimg.com/vi/${guest.videoId}/hqdefault.jpg`,
                                                        alt: `Passage de ${guest.name} sur PodLab`,
                                                        loading: "lazy",
                                                        decoding: "async",
                                                        className: "absolute inset-0 h-full w-full object-cover grayscale contrast-110 opacity-80 transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-100"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                        lineNumber: 413,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                        lineNumber: 420,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "absolute right-2.5 top-2.5 flex size-7 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white opacity-0 backdrop-blur transition-all duration-300 group-hover:opacity-100",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__["ExternalLink"], {
                                                            className: "size-3.5"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                            lineNumber: 422,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                        lineNumber: 421,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "absolute bottom-3 left-3.5 right-3.5",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-sm font-bold tracking-tight text-white",
                                                            children: guest.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                            lineNumber: 425,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                        lineNumber: 424,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                lineNumber: 412,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "p-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-[11px] leading-relaxed text-zinc-500",
                                                        children: guest.role
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                        lineNumber: 431,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "mt-2.5 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-400 transition-colors group-hover:text-white",
                                                        children: [
                                                            "Voir l'épisode",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__["ExternalLink"], {
                                                                className: "size-3"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                                lineNumber: 436,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                        lineNumber: 434,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                lineNumber: 430,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                        lineNumber: 406,
                                        columnNumber: 17
                                    }, this)
                                }, guest.videoId, false, {
                                    fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                    lineNumber: 405,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                            lineNumber: 403,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                    lineNumber: 389,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                lineNumber: 388,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                id: "calendrier",
                className: "scroll-mt-20 border-t border-white/10 py-16 md:py-24",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto max-w-5xl px-4 sm:px-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$podlab$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Reveal"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$podlab$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SectionTag"], {
                                    index: "03",
                                    label: "Calendrier de réservation privé"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                    lineNumber: 450,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "mt-4 max-w-3xl text-3xl md:text-5xl font-bold tracking-tight text-white",
                                    children: [
                                        "Choisissez votre créneau.",
                                        " ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-zinc-500",
                                            children: "Il est bloqué à l'instant."
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                            lineNumber: 453,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                    lineNumber: 451,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-4 max-w-2xl text-sm leading-relaxed text-zinc-400",
                                    children: "Pas d'allers-retours d'e-mails : sélectionnez ville, date et créneau, laissez vos coordonnées — votre référence VIP est générée immédiatement et notre rédaction vous appelle sous 24 h pour affiner le déroulé."
                                }, void 0, false, {
                                    fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                    lineNumber: 455,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                            lineNumber: 449,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$podlab$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Reveal"], {
                            delay: 0.08,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$podlab$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GlassCard"], {
                                className: "mt-10 p-6 md:p-8",
                                children: done ? /* ── Confirmation immédiate — référence VIP ── */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "py-4 text-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "mx-auto flex size-16 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                className: "size-8"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                lineNumber: 469,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                            lineNumber: 468,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "mt-5 text-2xl font-bold tracking-tight text-white",
                                            children: [
                                                "Votre créneau est bloqué, ",
                                                done.guestName.split(" ")[0],
                                                "."
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                            lineNumber: 471,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mx-auto mt-3 max-w-md text-sm leading-relaxed text-zinc-400",
                                            children: "Référence de confirmation générée à l'instant — aucun e-mail à échanger. Notre rédaction vous appelle sous 24 h ouvrées pour affiner le déroulé de votre interview."
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                            lineNumber: 474,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mx-auto mt-6 max-w-md rounded-2xl border border-white/10 bg-black/60 p-5 text-left",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-between gap-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500",
                                                            children: "Référence VIP"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                            lineNumber: 482,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "rounded-md bg-white px-3 py-1 font-mono text-xs font-bold tracking-wider text-black",
                                                            children: done.ref
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                            lineNumber: 485,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                    lineNumber: 481,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mt-4 space-y-2.5 text-sm",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-2.5 text-zinc-200",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                                                    className: "size-4 shrink-0 text-zinc-500"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                                    lineNumber: 491,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "font-semibold",
                                                                    children: done.city === "cotonou" ? "Cotonou" : "Abidjan"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                                    lineNumber: 492,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-zinc-500",
                                                                    children: [
                                                                        "·",
                                                                        " ",
                                                                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2d$mock$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STUDIOS"].find((s)=>s.id === done.city)?.address
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                                    lineNumber: 495,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                            lineNumber: 490,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-2.5 text-zinc-200",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CalendarCheck$3e$__["CalendarCheck"], {
                                                                    className: "size-4 shrink-0 text-zinc-500"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                                    lineNumber: 501,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "font-semibold capitalize",
                                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2d$mock$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDateFR"])(done.date)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                                    lineNumber: 502,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                            lineNumber: 500,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-2.5 text-zinc-200",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                                                    className: "size-4 shrink-0 text-zinc-500"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                                    lineNumber: 507,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "font-semibold",
                                                                    children: done.slot
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                                    lineNumber: 508,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-zinc-500",
                                                                    children: [
                                                                        "·",
                                                                        " ",
                                                                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$invitation$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VIP_FORMATS"].find((f)=>f.id === done.format)?.label
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                                    lineNumber: 509,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                            lineNumber: 506,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                    lineNumber: 489,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                            lineNumber: 480,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                    variant: "outline",
                                                    className: "rounded-xl border-white/20 hover:bg-white/10",
                                                    onClick: ()=>window.open(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brand$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CONTACT"].whatsapp, "_blank", "noreferrer"),
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__["Phone"], {
                                                            className: "size-4"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                            lineNumber: 525,
                                                            columnNumber: 23
                                                        }, this),
                                                        " Une urgence ? WhatsApp studio"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                    lineNumber: 518,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                    variant: "ghost",
                                                    className: "text-zinc-400 hover:text-white",
                                                    onClick: resetAll,
                                                    children: "Modifier mon créneau"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                    lineNumber: 527,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                            lineNumber: 517,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                    lineNumber: 467,
                                    columnNumber: 17
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-8",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "flex size-7 items-center justify-center rounded-full bg-white text-xs font-bold text-black",
                                                            children: "1"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                            lineNumber: 541,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            className: "text-sm font-bold text-white",
                                                            children: "Dans quel studio souhaitez-vous venir ?"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                            lineNumber: 542,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                    lineNumber: 540,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mt-4 grid gap-4 sm:grid-cols-2",
                                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2d$mock$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STUDIOS"].map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>{
                                                                setCity(s.id);
                                                                setSlot(null);
                                                            },
                                                            "aria-pressed": city === s.id,
                                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center gap-3.5 rounded-2xl border p-4 text-left transition-all", city === s.id ? "border-white bg-white/[0.07]" : "border-white/10 bg-black/50 hover:border-white/40"),
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "block size-11 shrink-0 overflow-hidden rounded-xl border border-white/15 bg-black",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$podlab$2f$flag$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CountryFlag"], {
                                                                        code: s.flag,
                                                                        cover: true,
                                                                        className: "h-full w-full"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                                        lineNumber: 561,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                                    lineNumber: 560,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "block text-base font-bold text-white",
                                                                            children: s.city
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                                            lineNumber: 564,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "mt-0.5 block text-[11px] text-zinc-500",
                                                                            children: [
                                                                                s.country,
                                                                                " — ",
                                                                                s.address
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                                            lineNumber: 567,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                                    lineNumber: 563,
                                                                    columnNumber: 27
                                                                }, this),
                                                                city === s.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                                    className: "ml-auto size-4 shrink-0 text-white"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                                    lineNumber: 572,
                                                                    columnNumber: 29
                                                                }, this)
                                                            ]
                                                        }, s.id, true, {
                                                            fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                            lineNumber: 546,
                                                            columnNumber: 25
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                    lineNumber: 544,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                            lineNumber: 539,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "flex size-7 items-center justify-center rounded-full bg-white text-xs font-bold text-black",
                                                            children: "2"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                            lineNumber: 582,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            className: "text-sm font-bold text-white",
                                                            children: "Choisissez votre date"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                            lineNumber: 583,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                    lineNumber: 581,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mt-4 flex gap-2.5 overflow-x-auto pb-2 scrollbar-dark",
                                                    children: days.map((d)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>{
                                                                setDate(d.iso);
                                                                setSlot(null);
                                                            },
                                                            disabled: !city,
                                                            "aria-pressed": date === d.iso,
                                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex w-[64px] shrink-0 flex-col items-center rounded-xl border px-2 py-3 transition-all", !city && "cursor-not-allowed opacity-30", date === d.iso ? "border-white bg-white text-black" : "border-white/10 bg-black/50 text-zinc-300 hover:border-white/40"),
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-[10px] font-semibold uppercase tracking-wider opacity-70",
                                                                    children: d.weekday
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                                    lineNumber: 603,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "mt-1 text-lg font-bold leading-none",
                                                                    children: d.day
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                                    lineNumber: 606,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "mt-1 text-[10px] uppercase opacity-70",
                                                                    children: d.month
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                                    lineNumber: 607,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, d.iso, true, {
                                                            fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                            lineNumber: 587,
                                                            columnNumber: 25
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                    lineNumber: 585,
                                                    columnNumber: 21
                                                }, this),
                                                !city && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mt-2 text-[11px] text-zinc-600",
                                                    children: "Sélectionnez d'abord un studio ci-dessus."
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                    lineNumber: 612,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                            lineNumber: 580,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "flex size-7 items-center justify-center rounded-full bg-white text-xs font-bold text-black",
                                                            children: "3"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                            lineNumber: 621,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            className: "text-sm font-bold text-white",
                                                            children: "Choisissez votre créneau"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                            lineNumber: 622,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                    lineNumber: 620,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mt-4 grid gap-3 sm:grid-cols-3",
                                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2d$mock$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BOOKING_SLOTS"].map((s)=>{
                                                        const taken = date ? isTaken(date, s.slot) : false;
                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>setSlot(s.slot),
                                                            disabled: !date || taken,
                                                            "aria-pressed": slot === s.slot,
                                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("rounded-xl border p-4 text-left transition-all", (!date || taken) && "cursor-not-allowed opacity-30", slot === s.slot ? "border-white bg-white/[0.07]" : "border-white/10 bg-black/50 hover:border-white/40"),
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-sm font-bold text-white",
                                                                    children: s.label
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                                    lineNumber: 641,
                                                                    columnNumber: 29
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "mt-1 text-xs tabular-nums text-zinc-500",
                                                                    children: s.slot
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                                    lineNumber: 642,
                                                                    columnNumber: 29
                                                                }, this),
                                                                taken && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "mt-1.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-600",
                                                                    children: "Créneau pris"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                                    lineNumber: 644,
                                                                    columnNumber: 31
                                                                }, this)
                                                            ]
                                                        }, s.slot, true, {
                                                            fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                            lineNumber: 628,
                                                            columnNumber: 27
                                                        }, this);
                                                    })
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                    lineNumber: 624,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                            lineNumber: 619,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "flex size-7 items-center justify-center rounded-full bg-white text-xs font-bold text-black",
                                                            children: "4"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                            lineNumber: 657,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            className: "text-sm font-bold text-white",
                                                            children: "Vos coordonnées d'invité"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                            lineNumber: 658,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                    lineNumber: 656,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mt-4 grid gap-3 sm:grid-cols-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                            placeholder: "Nom complet *",
                                                            value: guestName,
                                                            onChange: (e)=>setGuestName(e.target.value),
                                                            className: "h-11 rounded-lg border-white/15 bg-black/60 text-sm"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                            lineNumber: 661,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                            placeholder: "Fonction / entreprise",
                                                            value: role,
                                                            onChange: (e)=>setRole(e.target.value),
                                                            className: "h-11 rounded-lg border-white/15 bg-black/60 text-sm"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                            lineNumber: 667,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                            type: "email",
                                                            placeholder: "Email *",
                                                            value: email,
                                                            onChange: (e)=>setEmail(e.target.value),
                                                            className: "h-11 rounded-lg border-white/15 bg-black/60 text-sm"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                            lineNumber: 673,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                            type: "tel",
                                                            placeholder: "Téléphone (WhatsApp) *",
                                                            value: phone,
                                                            onChange: (e)=>setPhone(e.target.value),
                                                            className: "h-11 rounded-lg border-white/15 bg-black/60 text-sm"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                            lineNumber: 680,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "sm:col-span-2",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$textarea$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Textarea"], {
                                                                placeholder: "Sujet que vous souhaitez aborder (libre — nos questions restent surprises)",
                                                                value: topic,
                                                                onChange: (e)=>setTopic(e.target.value),
                                                                className: "min-h-[76px] rounded-lg border-white/15 bg-black/60 text-sm"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                                lineNumber: 688,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                            lineNumber: 687,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                    lineNumber: 660,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                            lineNumber: 655,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "flex size-7 items-center justify-center rounded-full bg-white text-xs font-bold text-black",
                                                            children: "5"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                            lineNumber: 701,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            className: "text-sm font-bold text-white",
                                                            children: "Format d'interview souhaité"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                            lineNumber: 702,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                    lineNumber: 700,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mt-4 grid gap-3 md:grid-cols-3",
                                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$invitation$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VIP_FORMATS"].map((f)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>setFormat(f.id),
                                                            "aria-pressed": format === f.id,
                                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("rounded-2xl border p-4 text-left transition-all", format === f.id ? "border-white bg-white/[0.07]" : "border-white/10 bg-black/50 hover:border-white/40"),
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-center justify-between gap-2",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-sm font-bold text-white",
                                                                            children: f.label
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                                            lineNumber: 718,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        format === f.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                                            className: "size-4 shrink-0 text-white"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                                            lineNumber: 719,
                                                                            columnNumber: 49
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                                    lineNumber: 717,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "mt-1 text-[11px] font-medium text-zinc-400",
                                                                    children: f.duration
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                                    lineNumber: 721,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "mt-2 text-[11px] leading-relaxed text-zinc-500",
                                                                    children: f.detail
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                                    lineNumber: 722,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, f.id, true, {
                                                            fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                            lineNumber: 706,
                                                            columnNumber: 25
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                    lineNumber: 704,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                            lineNumber: 699,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "border-t border-white/10 pt-6",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                    size: "lg",
                                                    onClick: submit,
                                                    disabled: loading,
                                                    className: "h-12 w-full gap-2 rounded-xl text-sm font-semibold shadow-[0_0_40px_-8px_rgba(255,255,255,0.4)]",
                                                    children: loading ? "Blocage du créneau en cours…" : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"], {
                                                                className: "size-4"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                                lineNumber: 740,
                                                                columnNumber: 27
                                                            }, this),
                                                            "Confirmer mon passage — référence immédiate"
                                                        ]
                                                    }, void 0, true)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                    lineNumber: 730,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mt-3 flex items-center justify-center gap-1.5 text-center text-[11px] text-zinc-500",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__["ShieldCheck"], {
                                                            className: "size-3.5"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                            lineNumber: 746,
                                                            columnNumber: 23
                                                        }, this),
                                                        "Coordonnées chiffrées, jamais revendues — appel de la rédaction sous 24 h."
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                    lineNumber: 745,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                            lineNumber: 729,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                    lineNumber: 537,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                lineNumber: 464,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                            lineNumber: 463,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                    lineNumber: 448,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                lineNumber: 447,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                id: "guide",
                className: "scroll-mt-20 border-t border-white/10 py-16 md:py-24",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto max-w-4xl px-4 sm:px-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$podlab$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Reveal"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$podlab$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SectionTag"], {
                                    index: "04",
                                    label: "Guide de préparation — l'essentiel avant le plateau"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                    lineNumber: 761,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "mt-4 max-w-2xl text-3xl md:text-5xl font-bold tracking-tight text-white",
                                    children: [
                                        "Tout ce qu'il faut savoir,",
                                        " ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-zinc-500",
                                            children: "en 2 minutes."
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                            lineNumber: 764,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                    lineNumber: 762,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-4 max-w-2xl text-sm leading-relaxed text-zinc-400",
                                    children: "Durée, ton, maquillage, sécurité de vos données : les réponses courtes pour arriver serein(e). Le reste, on s'en occupe."
                                }, void 0, false, {
                                    fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                    lineNumber: 766,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                            lineNumber: 760,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$podlab$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Reveal"], {
                            delay: 0.08,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$accordion$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Accordion"], {
                                type: "single",
                                collapsible: true,
                                className: "mt-8",
                                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$invitation$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VIP_FAQ"].map((item, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$accordion$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccordionItem"], {
                                        value: `faq-${i}`,
                                        className: "border-b border-white/10",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$accordion$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccordionTrigger"], {
                                                className: "text-left text-sm font-semibold text-white hover:no-underline hover:text-zinc-300 [&>svg]:text-zinc-500",
                                                children: item.q
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                lineNumber: 780,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$accordion$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccordionContent"], {
                                                className: "pb-5 text-sm leading-relaxed text-zinc-400",
                                                children: item.a
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                lineNumber: 783,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, item.q, true, {
                                        fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                        lineNumber: 775,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                lineNumber: 773,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                            lineNumber: 772,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                    lineNumber: 759,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                lineNumber: 758,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "border-t border-white/10 py-12 md:py-16",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto max-w-5xl px-4 sm:px-6",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$podlab$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Reveal"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$podlab$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GlassCard"], {
                            className: "flex flex-col items-center justify-between gap-6 p-6 text-center md:flex-row md:p-8 md:text-left",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-lg font-bold text-white",
                                            children: "Une question avant de réserver ?"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                            lineNumber: 799,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-1.5 text-sm text-zinc-500",
                                            children: "La rédaction répond directement — sans standard, sans secrétaire, sans attente."
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                            lineNumber: 802,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                    lineNumber: 798,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col gap-2.5 sm:flex-row",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            variant: "outline",
                                            className: "gap-2 rounded-xl border-white/20 hover:bg-white/10",
                                            onClick: ()=>window.open(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brand$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CONTACT"].whatsapp, "_blank", "noreferrer"),
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__["Phone"], {
                                                    className: "size-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                    lineNumber: 813,
                                                    columnNumber: 19
                                                }, this),
                                                " ",
                                                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brand$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CONTACT"].phoneDisplay
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                            lineNumber: 808,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            variant: "outline",
                                            className: "gap-2 rounded-xl border-white/20 hover:bg-white/10",
                                            onClick: ()=>window.location.href = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brand$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CONTACT"].mailto,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__["Mail"], {
                                                    className: "size-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                                    lineNumber: 820,
                                                    columnNumber: 19
                                                }, this),
                                                " ",
                                                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brand$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CONTACT"].email
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                            lineNumber: 815,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                                    lineNumber: 807,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                            lineNumber: 797,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                        lineNumber: 796,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                    lineNumber: 795,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
                lineNumber: 794,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/podlab/invitation/invitation-view.tsx",
        lineNumber: 176,
        columnNumber: 5
    }, this);
}
_s(InvitationView, "rMxvJ6sxuG+7ZyiZD/o0ktaDGWQ=");
_c = InvitationView;
var _c;
__turbopack_context__.k.register(_c, "InvitationView");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_987f58f8._.js.map