import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
      "next/link": path.resolve(__dirname, "./src/lib/next-link.jsx"),
      "next/navigation": path.resolve(__dirname, "./src/lib/next-navigation.jsx"),
      "next/image": path.resolve(__dirname, "./src/lib/next-image.jsx"),
    },
  },
});
