import vue from "@vitejs/plugin-vue";
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
import ViteFonts from "unplugin-fonts/vite";
import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8081,
    proxy: {
      "/api": {
        target: process.env.PROXY_API_URL,
        changeOrigin: true,
        configure: (proxy, _options) => {
          proxy.on("error", (err, _req, _res) => {
            console.log("proxy error", err);
          });
          // proxy.on("proxyReq", (proxyReq, req, _res) => {
          //   console.log(
          //     "Sending PROXY Request:",
          //     req.method,
          //     req.url,
          //     " => TO THE TARGET =>  ",
          //     proxyReq.method,
          //     proxyReq.protocol,
          //     proxyReq.host,
          //     proxyReq.path,
          //   );
          // });
          // proxy.on("proxyRes", (proxyRes, req, _res) => {
          //   console.log(
          //     "Received PROXY Response from the Target:",
          //     proxyRes.statusCode,
          //     req.url,
          //   );
          // });
        },
      },
    },
  },
  plugins: [
    vue({
      template: { transformAssetUrls },
    }),
    vuetify({
      autoImport: true,
    }),
    ViteFonts({
      google: {
        families: [
          {
            name: "Roboto",
            styles: "wght@100;300;400;500;700;900",
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
    extensions: [".js", ".json", ".jsx", ".mjs", ".ts", ".tsx", ".vue"],
  },
});
