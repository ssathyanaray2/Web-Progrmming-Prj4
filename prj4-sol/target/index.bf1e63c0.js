// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"6fQGg":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
var HMR_USE_SSE = false;
module.bundle.HMR_BUNDLE_ID = "40af12ebbf1e63c0";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, HMR_USE_SSE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var HMR_USE_SSE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && ![
        "localhost",
        "127.0.0.1",
        "0.0.0.0"
    ].includes(hostname) ? "wss" : "ws";
    var ws;
    if (HMR_USE_SSE) ws = new EventSource("/__parcel_hmr");
    else try {
        ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/");
    } catch (err) {
        if (err.message) console.error(err.message);
        ws = {};
    }
    // Web extension context
    var extCtx = typeof browser === "undefined" ? typeof chrome === "undefined" ? null : chrome : browser;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    }
    // $FlowFixMe
    ws.onmessage = async function(event /*: {data: string, ...} */ ) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        assetsToDispose = [];
        var data /*: HMRMessage */  = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH);
            // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets);
                // Dispose all old assets.
                let processedAssets = {} /*: {|[string]: boolean|} */ ;
                for(let i = 0; i < assetsToDispose.length; i++){
                    let id = assetsToDispose[i][1];
                    if (!processedAssets[id]) {
                        hmrDispose(assetsToDispose[i][0], id);
                        processedAssets[id] = true;
                    }
                }
                // Run accept callbacks. This will also re-execute other disposed assets in topological order.
                processedAssets = {};
                for(let i = 0; i < assetsToAccept.length; i++){
                    let id = assetsToAccept[i][1];
                    if (!processedAssets[id]) {
                        hmrAccept(assetsToAccept[i][0], id);
                        processedAssets[id] = true;
                    }
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html);
                // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    if (ws instanceof WebSocket) {
        ws.onerror = function(e) {
            if (e.message) console.error(e.message);
        };
        ws.onclose = function() {
            console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
        };
    }
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          \u{1F6A8} ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>\u{1F4DD} <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute("href");
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", // $FlowFixMe
    href.split("?")[0] + "?" + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension fix
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3 && typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                        extCtx.runtime.reload();
                        return;
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) {
            assetsToAlsoAccept.forEach(function(a) {
                hmrDispose(a[0], a[1]);
            });
            // $FlowFixMe[method-unbinding]
            assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
        }
    });
}

},{}],"CnCET":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _appJs = require("./app.js");
var _appJsDefault = parcelHelpers.interopDefault(_appJs);
const DEFAULT_WS_URL = "https://localhost:2345";
/**
 * Entry point for the application.
 * Initializes the app after the DOM content is fully loaded.
 */ window.addEventListener("DOMContentLoaded", ()=>{
    try {
        const wsUrl = getWsUrl();
        console.log(`Using Web Services URL: ${wsUrl}`);
        (0, _appJsDefault.default)(wsUrl);
    } catch (error) {
        console.error("Error during app initialization:", error);
        const errorContainer = document.getElementById("errors");
        if (errorContainer) errorContainer.innerHTML = `<p>Failed to initialize the application. Please try again later.</p>`;
    }
});
/**
 * Extracts the Web Services URL from the query parameters.
 * Defaults to `DEFAULT_WS_URL` if no parameter is found.
 * @returns The Web Services URL to be used by the application.
 */ function getWsUrl() {
    try {
        const url = new URL(document.location.href);
        return url.searchParams.get("ws-url") ?? DEFAULT_WS_URL;
    } catch (error) {
        console.error("Invalid URL detected, using default Web Services URL:", error);
        return DEFAULT_WS_URL;
    }
}

},{"./app.js":"6wtUX","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"6wtUX":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>makeApp);
var _libraryWsJs = require("./library-ws.js");
var _utilsJs = require("./utils.js");
function makeApp(wsUrl) {
    return new App(wsUrl);
}
class App {
    wsUrl;
    ws;
    result;
    errors;
    constructor(wsUrl){
        this.wsUrl = wsUrl;
        this.ws = (0, _libraryWsJs.makeLibraryWs)(wsUrl);
        this.result = document.querySelector("#result");
        this.errors = document.querySelector("#errors");
        const searchInput = document.querySelector("#search");
        if (searchInput) this.addEnterKeyListener(searchInput, ()=>{
            this.handleSearch(new Event("submit"));
        });
    }
    /**
     * Adds an Enter key listener to a specified element.
     */ addEnterKeyListener(element, callback) {
        element.addEventListener("keydown", (event)=>{
            if (event.key === "Enter") {
                event.preventDefault();
                callback();
            }
        });
    }
    /**
     * Handles the search functionality by querying the API and displaying results.
     */ async handleSearch(event) {
        event.preventDefault();
        this.clearErrors();
        this.result.innerHTML = "";
        const searchInput = document.querySelector("#search");
        if (!searchInput || !searchInput.value.trim()) {
            this.displayError("search", "Search field cannot be empty.");
            return;
        }
        const query = searchInput.value.trim();
        const searchUrl = (0, _utilsJs.makeQueryUrl)(`${this.wsUrl}/api/books`, {
            search: query
        });
        const result = await this.ws.findBooksByUrl(searchUrl);
        if (result.isOk) {
            // This is an OkResult, safely access `result.val`.
            const envelope = result.val;
            if (envelope.result.length > 0) this.displayBooksWithPagination(envelope);
            else this.result.innerHTML = "<p>No books found.</p>";
        } else {
            // This is an ErrResult, safely access `errors`.
            const errResult = result; // Explicitly narrow to ErrResult.
            this.displayErrors(errResult.errors);
        }
    }
    /**
     * Displays books with pagination controls.
     */ displayBooksWithPagination(envelope) {
        const books = envelope.result;
        // Clear previous results
        this.result.innerHTML = "";
        // Create book list container
        const list = (0, _utilsJs.makeElement)("ul");
        // Add each book to the list
        books.forEach((book)=>{
            const li = (0, _utilsJs.makeElement)("li", {
                style: "margin-bottom: 10px; display: flex; align-items: center;"
            });
            const titleSpan = (0, _utilsJs.makeElement)("span", {
                style: "flex-grow: 1;"
            }, book.result.title);
            const detailsLink = (0, _utilsJs.makeElement)("a", {
                href: "#",
                style: "margin-left: 20px; text-decoration: underline; color: blue;"
            }, "details...");
            detailsLink.addEventListener("click", (event)=>{
                event.preventDefault();
                this.showBookDetails([
                    book
                ]);
            });
            li.append(titleSpan, detailsLink);
            list.append(li);
        });
        this.result.appendChild(list);
        // Add pagination navigation
        const pagination = this.createPagination(envelope.links);
        this.result.appendChild(pagination);
    }
    /**
   * Creates pagination controls for navigating results.
   */ createPagination(links) {
        const paginationContainer = (0, _utilsJs.makeElement)("div", {
            class: "pagination",
            style: "display: flex; justify-content: space-between; align-items: center; width: 100%;"
        });
        // Previous Button
        const prevButton = (0, _utilsJs.makeElement)("button", {
            style: "color: blue; text-decoration: underline; cursor: pointer;"
        }, "<< Previous");
        if (links.prev) {
            prevButton.addEventListener("click", async ()=>{
                const prevUrl = new URL(links.prev.href, this.wsUrl).toString(); // Convert to absolute URL
                console.log("Fetching previous page:", prevUrl); // Debug log
                try {
                    const result = await this.ws.findBooksByUrl(prevUrl);
                    if (result.isOk) this.displayBooksWithPagination(result.val);
                    else {
                        const errorResult = result;
                        console.error("Error fetching previous page:", errorResult);
                        this.displayErrors(errorResult.errors);
                    }
                } catch (error) {
                    console.error("Unexpected error fetching previous page:", error);
                }
            });
            paginationContainer.appendChild(prevButton);
        } else {
            // Disable the button if no previous link
            prevButton.setAttribute("disabled", "true");
            prevButton.style.cursor = "not-allowed"; // Add visual indication
            paginationContainer.appendChild(prevButton);
        }
        // Next Button
        const nextButton = (0, _utilsJs.makeElement)("button", {
            style: "color: blue; text-decoration: underline; cursor: pointer;"
        }, "Next >>");
        if (links.next) {
            nextButton.addEventListener("click", async ()=>{
                const nextUrl = new URL(links.next.href, this.wsUrl).toString(); // Convert to absolute URL
                console.log("Fetching next page:", nextUrl); // Debug log
                try {
                    const result = await this.ws.findBooksByUrl(nextUrl);
                    if (result.isOk) this.displayBooksWithPagination(result.val);
                    else {
                        const errorResult = result;
                        console.error("Error fetching next page:", errorResult);
                        this.displayErrors(errorResult.errors);
                    }
                } catch (error) {
                    console.error("Unexpected error fetching next page:", error);
                }
            });
            paginationContainer.appendChild(nextButton);
        } else {
            // Disable the button if no next link
            nextButton.setAttribute("disabled", "true");
            nextButton.style.cursor = "not-allowed"; // Add visual indication
            paginationContainer.appendChild(nextButton);
        }
        return paginationContainer;
    }
    /**
     * Displays the details of one or more books.
     * Accepts a list of books, even if it's a single one.
     */ async showBookDetails(books) {
        // Clear existing book details but preserve the layout
        const detailsContainer = document.querySelector(".book-details");
        if (detailsContainer) detailsContainer.remove(); // Remove previous details section
        // Iterate over the list of books and fetch details for each
        for (const book of books){
            const bookUrl = new URL(book.links.self.href, this.wsUrl).toString();
            console.log("Fetching details for book:", bookUrl); // Debug log
            try {
                const result = await this.ws.getBookByUrl(bookUrl);
                if (result.isOk) {
                    const bookDetails = result.val;
                    this.displayBookDetails(bookDetails.result); // Safely access the result
                } else {
                    // Handle errors for individual book fetches
                    const errorResult = result;
                    console.error("Error fetching book details:", errorResult);
                    this.displayErrors(errorResult.errors);
                }
            } catch (error) {
                console.error("Unexpected error fetching book details:", error);
            }
        }
    }
    /**
   * Renders the details of a book.
   */ async displayBookDetails(book) {
        const detailsContainer = document.querySelector(".book-details");
        if (detailsContainer) detailsContainer.remove();
        const details = (0, _utilsJs.makeElement)("div", {
            class: "book-details"
        });
        details.append((0, _utilsJs.makeElement)("p", {}, `ISBN: ${book.isbn}`), (0, _utilsJs.makeElement)("p", {}, `Title: ${book.title}`), (0, _utilsJs.makeElement)("p", {}, `Authors: ${book.authors?.join(", ") || "N/A"}`), (0, _utilsJs.makeElement)("p", {}, `Number of Pages: ${book.pages || "N/A"}`), (0, _utilsJs.makeElement)("p", {}, `Publisher: ${book.publisher || "N/A"}`), (0, _utilsJs.makeElement)("p", {}, `Number of Copies: ${book.nCopies || "N/A"}`), (0, _utilsJs.makeElement)("p", {}, "Borrowers:"));
        const borrowersList = (0, _utilsJs.makeElement)("ul");
        details.appendChild(borrowersList);
        try {
            // Fetch borrower list from backend
            const lendingsResult = await this.ws.getLends(book.isbn);
            console.log("Fetched borrower list:", lendingsResult); // Debug log
            if (lendingsResult.isOk) {
                const lendings = lendingsResult.val.result; // Access the `result` field which contains the array
                // Ensure lendings is an array
                if (Array.isArray(lendings)) lendings.forEach((lending)=>{
                    const borrowerItem = (0, _utilsJs.makeElement)("li", {}, lending.patronId);
                    const returnButton = (0, _utilsJs.makeElement)("button", {
                        style: "margin-left: 10px; color: blue; cursor: pointer;"
                    }, "Return Book");
                    returnButton.addEventListener("click", async ()=>{
                        try {
                            await this.ws.returnBook({
                                isbn: book.isbn,
                                patronId: lending.patronId
                            });
                            alert(`Book returned by ${lending.patronId}`);
                            borrowerItem.remove();
                            if (book.nCopies !== undefined) {
                                book.nCopies += 1;
                                const copiesElement = document.querySelector(".book-details p:nth-child(6)");
                                if (copiesElement) copiesElement.textContent = `Number of Copies: ${book.nCopies}`;
                            }
                        } catch (error) {
                            console.error("Error returning book:", error);
                        }
                    });
                    borrowerItem.appendChild(returnButton);
                    borrowersList.appendChild(borrowerItem);
                });
                else {
                    console.error("Lendings is not an array:", lendings);
                    borrowersList.appendChild((0, _utilsJs.makeElement)("li", {}, "No borrowers found."));
                }
            } else {
                console.error("Error fetching borrower list:", lendingsResult);
                borrowersList.appendChild((0, _utilsJs.makeElement)("li", {}, "Failed to fetch borrowers."));
            }
        } catch (error) {
            console.error("Unexpected error fetching borrower list:", error);
            borrowersList.appendChild((0, _utilsJs.makeElement)("li", {}, "Failed to fetch borrowers."));
        }
        // Checkout section
        const patronInput = (0, _utilsJs.makeElement)("input", {
            id: "patron-id",
            placeholder: "Enter Patron ID"
        });
        const checkoutButton = (0, _utilsJs.makeElement)("button", {}, "Checkout Book");
        checkoutButton.addEventListener("click", async ()=>{
            const patronId = patronInput.value.trim();
            if (!patronId) {
                alert("Please enter a Patron ID.");
                return;
            }
            try {
                const result = await this.ws.checkoutBook({
                    isbn: book.isbn,
                    patronId
                });
                if (result.isOk) {
                    alert(`Book checked out to Patron ID: ${patronId}`);
                    if (book.nCopies && book.nCopies > 0) {
                        book.nCopies -= 1;
                        const copiesElement = document.querySelector(".book-details p:nth-child(6)");
                        if (copiesElement) copiesElement.textContent = `Number of Copies: ${book.nCopies}`;
                    }
                    const borrowerItem = (0, _utilsJs.makeElement)("li", {}, patronId);
                    const returnButton = (0, _utilsJs.makeElement)("button", {
                        style: "margin-left: 10px; color: blue; cursor: pointer;"
                    }, "Return Book");
                    returnButton.addEventListener("click", async ()=>{
                        try {
                            await this.ws.returnBook({
                                isbn: book.isbn,
                                patronId
                            });
                            alert(`Book returned by ${patronId}`);
                            borrowerItem.remove();
                            if (book.nCopies !== undefined) {
                                book.nCopies += 1;
                                const copiesElement = document.querySelector(".book-details p:nth-child(6)");
                                if (copiesElement) copiesElement.textContent = `Number of Copies: ${book.nCopies}`;
                            }
                        } catch (error) {
                            console.error("Error returning book:", error);
                        }
                    });
                    borrowerItem.appendChild(returnButton);
                    borrowersList.appendChild(borrowerItem);
                } else {
                    const errorResult = result;
                    alert(`Failed to checkout book: ${errorResult.errors.map((err)=>err.message).join(", ")}`);
                }
            } catch (error) {
                console.error("Error checking out book:", error);
            }
        });
        details.append((0, _utilsJs.makeElement)("p", {}, "Patron ID:"), patronInput, checkoutButton);
        const backButton = (0, _utilsJs.makeElement)("button", {
            style: "margin-top: 20px; color: blue; cursor: pointer;"
        }, "Back to Results");
        backButton.addEventListener("click", ()=>{
            const detailsSection = document.querySelector(".book-details");
            if (detailsSection) detailsSection.remove();
            this.result.scrollIntoView();
        });
        details.appendChild(backButton);
        this.result.appendChild(details);
    }
    /**
     * Displays a specific error for a field.
     */ displayError(fieldId, message) {
        const fieldError = document.querySelector(`#${fieldId}-error`);
        if (fieldError) fieldError.textContent = message;
        else this.errors.appendChild((0, _utilsJs.makeElement)("li", {
            class: "error"
        }, message));
    }
    /**
     * Clears all error messages.
     */ clearErrors() {
        this.errors.innerHTML = "";
        document.querySelectorAll(".error").forEach((el)=>el.textContent = "");
    }
    /**
     * Displays errors in the error container.
     */ displayErrors(errors) {
        errors.forEach((err)=>{
            const id = err.options?.widget ?? err.options?.path;
            if (id) this.displayError(id, err.message);
            else {
                const li = (0, _utilsJs.makeElement)("li", {
                    class: "error"
                }, err.message);
                this.errors.appendChild(li);
            }
        });
    }
}

},{"./library-ws.js":"hrmJa","./utils.js":"3cCYB","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"hrmJa":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Create a Library Web Services wrapper instance.
 * @param url The base URL for the web services.
 * @returns An instance of `LibraryWs`.
 */ parcelHelpers.export(exports, "makeLibraryWs", ()=>makeLibraryWs);
parcelHelpers.export(exports, "LibraryWs", ()=>LibraryWs);
var _cs544JsUtils = require("cs544-js-utils");
var _responseEnvelopesJs = require("./response-envelopes.js");
function makeLibraryWs(url) {
    return new LibraryWs(url);
}
class LibraryWs {
    url;
    constructor(url){
        this.url = url;
    }
    /**
     * Fetch details of a book using its URL.
     * @param bookUrl The URL of the book resource.
     * @returns A Result containing the book details or an error.
     */ async getBookByUrl(bookUrl) {
        return await getEnvelope(bookUrl);
    }
    /**
     * Search for books using a query URL.
     * @param findUrl The URL containing search query parameters.
     * @returns A Result containing paginated books or an error.
     */ async findBooksByUrl(findUrl) {
        return await getEnvelope(findUrl);
    }
    /**
   * Checkout a book for a patron.
   * @param lend The lending details containing the book and patron info.
   * @returns A Result indicating success or an error.
   */ async checkoutBook(lend) {
        const url = `${this.url}/api/lendings`; // Ensure `/api` is included
        const options = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(lend)
        };
        try {
            console.log("Checkout URL:", url);
            console.log("Request options:", options);
            const result = await fetchJson(url, options);
            if (result.isOk) console.log("Checkout successful:", result);
            else console.error("Error during checkout:", result);
            return result;
        } catch (error) {
            console.error("Unexpected error during checkout:", error);
            return (0, _cs544JsUtils.Errors).errResult("Unexpected error during checkout.");
        }
    }
    /**
   * Return a previously checked-out book.
   * @param lend The lending details containing the book and patron info.
   * @returns A Result indicating success or an error.
   */ async returnBook(lend) {
        const url = `${this.url}/api/lendings`; // Corrected to include `/api`
        const options = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(lend)
        };
        try {
            console.log("Return URL:", url);
            console.log("Request options:", options);
            const result = await fetchJson(url, options);
            if (result.isOk) console.log("Return successful:", result);
            else console.error("Error during return:", result);
            return result;
        } catch (error) {
            console.error("Unexpected error during return:", error);
            return (0, _cs544JsUtils.Errors).errResult("Unexpected error during return.");
        }
    }
    /**
   * Get all lendings of a specific book by ISBN.
   * @param isbn The ISBN of the book.
   * @returns A Result containing a list of lendings or an error.
   */ async getLends(isbn) {
        const url = new URL(`${this.url}/api/lendings`); // Ensure `/api` is included
        url.searchParams.append("findBy", "isbn");
        url.searchParams.append("isbn", isbn);
        try {
            console.log("Fetching lends by ISBN:", url.toString());
            const result = await fetchJson(url);
            if (result.isOk) console.log("Lendings by ISBN fetched successfully:", result.val);
            else console.error("Error fetching lendings by ISBN:", result);
            return result;
        } catch (error) {
            console.error("Unexpected error fetching lendings by ISBN:", error);
            return (0, _cs544JsUtils.Errors).errResult("Unexpected error fetching lendings by ISBN.");
        }
    }
    /**
     * Get all lendings by a specific patron ID.
     * @param patronId The ID of the patron.
     * @returns A Result containing a list of lendings or an error.
     */ async getLendsByPatron(patronId) {
        const url = new URL(`${this.url}/api/lendings`); // Ensure `/api` is included
        url.searchParams.append("findBy", "patronId");
        url.searchParams.append("patronId", patronId);
        try {
            console.log("Fetching lends by Patron ID:", url.toString());
            const result = await fetchJson(url);
            if (result.isOk) console.log("Lendings by Patron ID fetched successfully:", result.val);
            else console.error("Error fetching lendings by Patron ID:", result);
            return result;
        } catch (error) {
            console.error("Unexpected error fetching lendings by Patron ID:", error);
            return (0, _cs544JsUtils.Errors).errResult("Unexpected error fetching lendings by Patron ID.");
        }
    }
}
/**
 * Fetch an envelope response (Success or Paged) from the backend.
 * @param url The URL of the resource.
 * @returns A Result containing the envelope or an error.
 */ async function getEnvelope(url) {
    const result = await fetchJson(url);
    if (result.isOk) {
        const envelope = result.val;
        // Check if the response is an error envelope
        if ((0, _responseEnvelopesJs.isErrorEnvelope)(envelope)) return (0, _cs544JsUtils.Errors).errResult(envelope.errors.map((err)=>err.message).join(", "));
        // Return the successfully parsed envelope
        return (0, _cs544JsUtils.Errors).okResult(envelope);
    }
    return result;
}
async function fetchJson(url, options = {
    method: "GET"
}) {
    try {
        console.log(`Fetching URL: ${url}`, options);
        const response = await fetch(url.toString(), options);
        if (!response.ok) {
            const text = await response.text();
            console.error(`HTTP error ${response.status}: ${response.statusText}`);
            console.error("Error response body:", text);
            return (0, _cs544JsUtils.Errors).errResult(`HTTP error ${response.status}: ${response.statusText}`);
        }
        const contentType = response.headers.get("Content-Type");
        if (contentType && contentType.includes("application/json")) {
            const json = await response.json();
            console.log("Successful response:", json); // Debug the JSON response
            return (0, _cs544JsUtils.Errors).okResult(json);
        } else {
            const text = await response.text();
            console.error("Unexpected content type:", contentType);
            console.error("Response body:", text);
            return (0, _cs544JsUtils.Errors).errResult("Unexpected response type.");
        }
    } catch (error) {
        console.error("Fetch failed:", error);
        return (0, _cs544JsUtils.Errors).errResult(`Failed to fetch from ${url}: ${error}`);
    }
}

},{"cs544-js-utils":"8WQYV","./response-envelopes.js":"lOej1","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"8WQYV":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Errors", ()=>_errorsJs);
var _errorsJs = require("./lib/errors.js");

},{"./lib/errors.js":"aGjnO","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"aGjnO":[function(require,module,exports) {
// Immutable API
/** throw exception with msg and args; use when impossible conditions occur */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "panic", ()=>panic);
parcelHelpers.export(exports, "Err", ()=>Err);
/** A Result is either a success result identified by isOk=true,
 *  or an error result identified by isOk=false.  A success
 *  result has the success value in its 'val' property; an
 *  error result will have one or more 'Err' objects in its
 *  'errors' property.
 */ parcelHelpers.export(exports, "OkResult", ()=>OkResult);
parcelHelpers.export(exports, "ErrResult", ()=>ErrResult);
/** factory function for a success result */ parcelHelpers.export(exports, "okResult", ()=>okResult);
parcelHelpers.export(exports, "VOID_RESULT", ()=>VOID_RESULT);
/** factory function for an error result initialized to contain
 *  a single error as per arg0, args.
 *    errResult(msg: string, code?: string, widget?: string)
 *    errResult(msg: string, options: ErrOptions)
 *    errResult(err: Err)
 *    errResult(err: ErrResult, options: ErrOptions)
 *    errResult(errObj: object, options: ErrOptions)
 */ parcelHelpers.export(exports, "errResult", ()=>errResult);
/** Convenience error building function.  Possible arguments:
 *     error(msg: string, code?: string, widget?: string)
 *     error(msg: string, options: ErrOptions)
 *     error(err: Err)
 *     error(err: Error, options?: ErrOptions)
 *     error(errObj: object, options?: ErrOptions)
 */ parcelHelpers.export(exports, "error", ()=>error) /*
//demo program

function safeDiv(num: number, denom: number) : Result<number> {
  if (denom === 0) return errResult('zero denominator');
  return okResult(num/denom);
}

function demo(result: Result<number>) : Result<string> {
  if (!result.isOk) return result as Result<string>;
  const v = result.val + 1;
  return result.chain((val: number) => okResult('x'.repeat(v*val)))
               .chain((str: string) => okResult(str + 'aaa'));
}

console.log(safeDiv(1, 0));
console.log(safeDiv(1, 2));
console.log(demo(errResult('some error', 'ERR_CODE')));
console.log(demo(okResult(2)));
*/ ;
function panic(msg, ...args) {
    throw new Error(msg + args.map((a)=>JSON.stringify(a)).join(", "));
}
const DEFAULT_ERR_CODE = "UNKNOWN";
class Err {
    message;
    options;
    constructor(message, options){
        this.message = message;
        this.options = options;
    }
}
class OkResult {
    isOk = true;
    val;
    constructor(v){
        this.val = v;
    }
    /** return result of applying fn on val */ chain(fn) {
        return fn(this.val);
    }
}
class ErrResult {
    isOk = false;
    errors;
    constructor(errors = []){
        this.errors = errors;
    }
    /** Possible arguments
     *   addError(ErrResult errResult)
     *   addError(msg: string, code?: string, widget?: string)
     *   addError(msg: string, options: ErrOptions)
     *   addError(err: Err)
     *   addError(err: Error, options?: ErrOptions)
     *   addError(errObj: object, options?: ErrOptions)
     */ addError(arg0, ...args) {
        const errors = arg0 instanceof ErrResult ? arg0.errors : [
            error(arg0, ...args)
        ];
        return new ErrResult(this.errors.concat(errors));
    }
    /** ignore fn, simply returning this error result */ chain(_fn) {
        return this;
    }
}
function okResult(v) {
    return new OkResult(v);
}
const VOID_RESULT = okResult(undefined);
function errResult(arg0, ...args) {
    return new ErrResult().addError(arg0, ...args);
}
function error(arg0, ...args) {
    let options = {
        code: DEFAULT_ERR_CODE
    };
    if (typeof arg0 === "string") {
        const msg = arg0;
        if (args.length === 0) return new Err(msg, {
            code: DEFAULT_ERR_CODE
        });
        else if (args.length === 1 && typeof args[0] === "object") return new Err(msg, {
            code: DEFAULT_ERR_CODE,
            ...args[0]
        });
        else if (args.length === 1 && typeof args[0] === "string") return new Err(msg, {
            code: args[0]
        });
        else if (args.length === 2 && typeof args[0] === "string" && typeof args[1] === "string") return new Err(msg, {
            code: args[0],
            widget: args[1]
        });
        else panic(`bad error args`, [
            arg0,
            ...args
        ]);
    } else if (arg0 instanceof Err) return arg0;
    else if (arg0 instanceof Error) return new Err(arg0.message, args.length > 0 ? args[0] : {
        code: DEFAULT_ERR_CODE
    });
    else if (typeof arg0 === "object") return new Err(arg0.toString(), args.length > 0 ? args[0] : {
        code: DEFAULT_ERR_CODE
    });
    else panic(`bad error args`, [
        arg0,
        ...args
    ]);
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gkKU3":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || Object.prototype.hasOwnProperty.call(dest, key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"lOej1":[function(require,module,exports) {
/**
 * Type guard for SuccessEnvelope<T>
 * Checks if the envelope is a successful, non-paged response.
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "isSuccessEnvelope", ()=>isSuccessEnvelope);
/**
 * Type guard for PagedEnvelope<T>
 * Checks if the envelope is a successful, paged response.
 */ parcelHelpers.export(exports, "isPagedEnvelope", ()=>isPagedEnvelope);
/**
 * Type guard for ErrorEnvelope
 * Checks if the envelope represents an error response.
 */ parcelHelpers.export(exports, "isErrorEnvelope", ()=>isErrorEnvelope);
function isSuccessEnvelope(envelope) {
    return envelope.isOk === true && "result" in envelope && !Array.isArray(envelope.result);
}
function isPagedEnvelope(envelope) {
    return envelope.isOk === true && "result" in envelope && Array.isArray(envelope.result);
}
function isErrorEnvelope(envelope) {
    return envelope.isOk === false && "errors" in envelope;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"3cCYB":[function(require,module,exports) {
/**
 * Create and return a new DOM element.
 * @param tagName The tag name for the element (e.g., 'div', 'p', 'ul').
 * @param attrs An object containing attributes to set on the element.
 * @param appendees Elements or text to append as children of the created element.
 * @returns The created DOM element.
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "makeElement", ()=>makeElement);
/**
 * Create a URL object by appending query parameters to a base URL.
 * @param baseUrl The base URL string.
 * @param req An object representing key-value pairs for query parameters.
 * @returns A URL object with the query parameters appended.
 */ parcelHelpers.export(exports, "makeQueryUrl", ()=>makeQueryUrl);
/**
 * Extract key-value pairs from a form, filtering out empty fields.
 * @param form The form element to extract data from.
 * @returns An object containing non-empty form data as key-value pairs.
 */ parcelHelpers.export(exports, "getFormData", ()=>getFormData);
/**
 * Display errors in a designated errors container.
 * @param errorsContainer The DOM element to contain error messages.
 * @param errors An array of error messages to display.
 */ parcelHelpers.export(exports, "displayErrors", ()=>displayErrors);
/**
 * Clear all error messages from a designated container.
 * @param errorsContainer The DOM element to clear error messages from.
 */ parcelHelpers.export(exports, "clearErrors", ()=>clearErrors);
/**
 * Create a button with a specified label and click handler.
 * @param label The text displayed on the button.
 * @param onClick The function to execute when the button is clicked.
 * @returns The created button element.
 */ parcelHelpers.export(exports, "makeButton", ()=>makeButton);
function makeElement(tagName, attrs = {}, ...appendees) {
    const element = document.createElement(tagName);
    for (const [k, v] of Object.entries(attrs))element.setAttribute(k, v);
    element.append(...appendees);
    return element;
}
function makeQueryUrl(baseUrl, req) {
    const url = new URL(baseUrl);
    Object.entries(req).forEach(([k, v])=>url.searchParams.append(k, v));
    return url;
}
function getFormData(form) {
    const pairs = [
        ...new FormData(form).entries()
    ].map(([k, v])=>[
            k,
            v
        ]).filter(([_, v])=>v.trim().length > 0);
    return Object.fromEntries(pairs);
}
function displayErrors(errorsContainer, errors) {
    errorsContainer.innerHTML = ""; // Clear previous errors
    errors.forEach((err)=>{
        const errorItem = makeElement("li", {
            class: "error"
        }, err.message);
        errorsContainer.appendChild(errorItem);
    });
}
function clearErrors(errorsContainer) {
    errorsContainer.innerHTML = "";
}
function makeButton(label, onClick) {
    const button = document.createElement("button");
    button.textContent = label;
    button.addEventListener("click", onClick);
    return button;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["6fQGg","CnCET"], "CnCET", "parcelRequireeeb6")

//# sourceMappingURL=index.bf1e63c0.js.map
