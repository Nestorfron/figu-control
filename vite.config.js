import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),

    VitePWA({
      registerType: "autoUpdate",

      includeAssets: [
        "favicon.ico",
        "apple-touch-icon.png",
        "mask-icon.svg",
      ],

      manifest: {
        name: "FiguControl",
        short_name: "FiguControl",

        description:
          "Organiza tus figuritas del Mundial 2026",

        theme_color: "#008f72",
        background_color: "#000000",

        display: "standalone",

        orientation: "portrait",

        scope: "/",
        start_url: "/",

        icons: [
          {
            src: "/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },

          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },

          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },

      workbox: {
        globPatterns: [
          "**/*.{js,css,html,png,svg,ico}"
        ],

        runtimeCaching: [
          {
            urlPattern: /^https:\/\/flagcdn\.com\/.*/i,

            handler: "CacheFirst",

            options: {
              cacheName: "flags-cache",

              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30,
              },
            },
          },
        ],
      },
    }),
  ],

  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:3001",
        changeOrigin: true,

        rewrite: (path) =>
          path.replace(/^\/api/, ""),
      },
    },
  },
});