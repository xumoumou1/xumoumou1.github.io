importScripts("./lib/sww.js");
importScripts("./lib/bundle_cacher.22d1d8.js");
const distDir = "/";
const worker = new self.ServiceWorkerWare();
const cdnUrl = "https://113214";
worker.use(new BundleAsyncCacher(distDir + "assets/", cdnUrl, true));
worker.init();
