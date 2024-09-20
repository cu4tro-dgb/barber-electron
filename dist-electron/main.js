import { app as o, BrowserWindow as r } from "electron";
import e from "node:path";
import n from "node:url";
const t = n.fileURLToPath(import.meta.url), i = e.dirname(t);
function a() {
  new r({
    width: 1440,
    height: 768,
    webPreferences: {
      preload: e.join(i, "preload.js"),
      nodeIntegration: !0
    }
  }).loadURL(process.env.VITE_DEV_SERVER_URL);
}
o.whenReady().then(() => {
  a();
});
