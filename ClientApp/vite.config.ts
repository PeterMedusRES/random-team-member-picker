import { TanStackRouterVite } from "@tanstack/router-vite-plugin";
import react from "@vitejs/plugin-react-swc";
import { spawn } from "child_process";
import fs from "fs";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig(async () => ({
  plugins: [react(), TanStackRouterVite()],
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    https: await generateCerts(),
    port: 5173,
    strictPort: true,
    proxy: {
      "/api": {
        changeOrigin: true,
        secure: false,
        headers: {
          Connection: "Keep-Alive",
        },
        target: "https://localhost:7096",
      },
    },
  },
}));

async function generateCerts() {
  // Get base folder for certificates.
  const baseFolder =
    process.env.APPDATA !== undefined && process.env.APPDATA !== ""
      ? `${process.env.APPDATA}/ASP.NET/https`
      : `${process.env.HOME}/.aspnet/https`;

  // Generate the certificate name using the NPM package name
  const certificateName = process.env.npm_package_name;

  // Define certificate filepath
  const certFilePath = path.join(baseFolder, `${certificateName}.pem`);
  // Define key filepath
  const keyFilePath = path.join(baseFolder, `${certificateName}.key`);

  // Ensure the certificate and key exist
  if (!fs.existsSync(certFilePath) || !fs.existsSync(keyFilePath)) {
    // Wait for the certificate to be generated
    await new Promise<void>((resolve) => {
      spawn(
        "dotnet",
        [
          "dev-certs",
          "https",
          "--export-path",
          certFilePath,
          "--format",
          "Pem",
          "--no-password",
        ],
        { stdio: "inherit" },
      ).on("exit", (code) => {
        resolve();
        if (code) {
          process.exit(code);
        }
      });
    });
  }

  return {
    cert: certFilePath,
    key: keyFilePath,
  };
}
