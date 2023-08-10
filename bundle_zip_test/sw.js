importScripts("./lib/sww.js");
importScripts("./lib/bundle_cacher.755c74.js");
const distDir = "";
const worker = new self.ServiceWorkerWare();
const cdnUrl = "";
worker.use(new BundleAsyncCacher(distDir + "assets/", cdnUrl, true));
worker.init();
