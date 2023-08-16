importScripts("./lib/jszip.min.js");
var MIMEMAP = {
    json: "application/json",
    js: "application/javascript",
    css: "text/css",
    png: "image/png",
    jpg: "image/jpeg",
    html: "text/html",
    bin: "application/octet-stream",
    mp3: "audio/mpeg"
};

function getFileMime(e) {
    var t = e.substr(e.lastIndexOf(".") + 1);
    return MIMEMAP[t] || "text/plain"
}

function unzipEntry(n, s, a, o) {
    const i = [];
    n.forEach((e, t) => {
        if (t.dir) {
            i.push(...unzipEntry(n.folder(e), s, a, o))
        } else {
            i.push(t.async("arraybuffer")
                .then(e => {
                    return s.put(new Request(a + t.name), new Response(e, {
                        headers: {
                            "Content-Type": getFileMime(t.name)
                        }
                    }))
                        .then(() => {
                            o()
                        })
                }))
        }
    });
    return i
}

function cacheZip(t, e, n) {
    var s = new JSZip;
    return s.loadAsync(e)
        .then(e => {
            return unzipEntry(e, t, n)
        })
}

function BundleAsyncCacher(e, t, n) {
    this.rootRoute = e;
    this.loadRoot = "remoteAsset/";
    this.fetchOrigin = t || "";
    this.cachedBundles = new Map;
    this.cahcedCache = {};
    this.waitCache = n || false
}
BundleAsyncCacher.prototype.onInstall = function (e) {
    return Promise.resolve()
};
BundleAsyncCacher.prototype.onActivate = function (e) {
    return Promise.resolve()
};
BundleAsyncCacher.prototype.onMessage = async function (n) {
    if (n.data.what == "installBundle") {
        const t = n.data.bundle + "." + n.data.version;
        let e = await caches.has(t);
        console.log("installBundle", t, "cached:", e);
        if (e) {
            const s = await this.loadBundleCache(n.data.bundle, n.data.version);
            const a = await s.match(new Request(this.rootRoute + "finish.json"));
            if (!a) {
                console.log("incomplete bundle");
                await caches.delete(t);
                e = false
            }
        }
        if (e) {
            this.cleanBundle(n.source, n.data.bundle, n.data.version);
            this.notifyBundleProgress(n.source, n.data.bundle, n.data.version, 1)
        } else {
            await this.installBundle(n.source, n.data.bundle, n.data.version)
                .catch(e => {
                    console.log("bundle", n.data.bundle, "install err", e);
                    caches.delete(t);
                    this.notifyBundleError(n.source, n.data.bundle, n.data.version, e)
                })
        }
    } else if (n.data.what == "cleanBundle") {
        const t = n.data.bundle + "." + n.data.version;
        console.log("clean bundle to only keep this version:", t);
        this.cleanBundle(n.source, n.data.bundle, n.data.version)
    } else if (n.data.what === "cleanAllBundle") {
        caches.keys()
            .then(e => {
                return Promise.all(e.map(e => {
                    const t = e.split(".");
                    if (t && t.length) {
                        this.notifyBundleClean(n.source, t[0], t[1])
                    }
                    return caches.delete(e)
                }))
            })
            .then(e => {
                n.source.postMessage({
                    what: "cleanFinish"
                })
            })
    } else if (n.data.what === "cleanBundles") {
        caches.keys()
            .then(e => {
                return Promise.all(e.map(e => {
                    const t = e.split(".");
                    if (t && t.length) {
                        if (n.data.bundles[t[0]]) {
                            return Promise.resolve(true)
                        }
                        this.notifyBundleClean(n.source, t[0], t[1])
                    }
                    return caches.delete(e)
                }))
            })
    } else if (n.data.what === "skipWaiting") {
        self.skipWaiting()
    }
};
BundleAsyncCacher.prototype.notifyBundleProgress = function (e, t, n, s) {
    e.postMessage({
        what: "installProgress",
        bundle: t,
        version: n,
        percent: s
    })
};
BundleAsyncCacher.prototype.notifyBundleError = function (e, t, n, s) {
    e.postMessage({
        what: "installError",
        bundle: t,
        version: n,
        error: s
    })
};
BundleAsyncCacher.prototype.notifyBundleClean = function (e, t, n) {
    e.postMessage({
        what: "onCleanBundle",
        bundle: t,
        version: n
    })
};
BundleAsyncCacher.prototype.installBundle = async function (t, n, s) {
    const e = n + "." + s;
    const a = this.fetchOrigin + this.loadRoot + e + ".zip";
    const o = await fetch(a);
    const i = o.body.getReader();
    const r = +o.headers.get("Content-Length");
    let l = 0;
    let c = new Uint8Array(r);
    console.log("Remote bundle found", n, s, r);
    while (true) {
        const {
            done: g,
            value: B
        } = await i.read();
        if (g) {
            break
        }
        c.set(B, l);
        l += B.length;
        this.notifyBundleProgress(t, n, s, l / r / 2)
    }
    this.notifyBundleProgress(t, n, s, .5);
    const u = await this.openCache(e);
    const h = new JSZip;
    const d = await h.loadAsync(c.buffer);
    let f = 0;
    let p = 0;
    const y = unzipEntry(d, u, this.rootRoute, () => {
        f++;
        if (p > 0) {
            let e = .5 + f / p / 2;
            if (e < 1) {
                this.notifyBundleProgress(t, n, s, e)
            }
        }
    });
    p = y.length;
    await Promise.all(y);
    await u.put(new Request(this.rootRoute + "finish.json"), new Response("{}", {
        headers: {
            "Content-Type": "application/json"
        }
    }));
    this.notifyBundleProgress(t, n, s, 1);
    this.cachedBundles.set(n, e);
    console.log("bundle", n, "install complete")
};
BundleAsyncCacher.prototype.loadBundleCache = function (e, t) {
    const n = e + "." + t;
    this.cachedBundles.set(e, n);
    return this.openCache(n)
};
BundleAsyncCacher.prototype.cleanBundle = function (e, n, s) {
    caches.keys()
        .then(e => {
            e.map(e => {
                var t = e.split(".");
                if (t.length == 2 && t[0] == n && t[1] != s) {
                    console.log("[CleanBundle]", e, n, t[1]);
                    return caches.delete(e)
                }
                return Promise.resolve(true)
            })
        })
};
BundleAsyncCacher.prototype.openCache = function (t) {
    if (!this.cahcedCache[t]) {
        return caches.open(t)
            .then(e => {
                this.cahcedCache[t] = e;
                return e
            })
    }
    return Promise.resolve(this.cahcedCache[t])
};
BundleAsyncCacher.prototype.onFetch = async function (n, e) {
    if (e) {
        return Promise.resolve(e)
    }
    if (this.cachedBundles.size === 0) {
        let e = await caches.keys();
        for (const t of e) {
            let e = t.split(".");
            if (e.length == 2) {
                this.cachedBundles.set(e[0], t)
            }
        }
    }
    for (let [e, t] of this.cachedBundles) {
        var s = n.url.indexOf(this.rootRoute + e + "/");
        var a = n.url;
        if (s >= 0) {
            if (this.fetchOrigin.length) {
                a = this.fetchOrigin + n.url.substring(s)
            }
            return this.openCache(t)
                .then(e => {
                    return e.match(n.url)
                        .then(e => {
                            if (e) {
                                return e.clone()
                            }
                            return fetch(a)
                        })
                })
        }
    }

    return fetch(n)
};
