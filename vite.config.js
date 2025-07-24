import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  server: {
    cors: {
      origin: "https://73df91a16e5c.ngrok-free.app",
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    },
    origin: "https://73df91a16e5c.ngrok-free.app",
    allowedHosts: ["6b7531bae5dc.ngrok-free.app"],
  },
});

