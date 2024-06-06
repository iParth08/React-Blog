import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://react-blog-server-brown.vercel.app",
        changeOrigin: true,
      },
      "/foo": {
        target: "https://react-blog-server-brown.vercel.app",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/foo/, ""),
      },
    },
  },
});
