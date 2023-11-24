import react from "@vitejs/plugin-react-swc";
import { spawn } from "child_process";
import fs from "fs";
import path from "path";
import { defineConfig, UserConfig } from "vite";

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

let target: string;
if (process.env.ASPNETCORE_HTTPS_PORT) {
  target = `https://localhost:${process.env.ASPNETCORE_HTTPS_PORT}`;
} else {
  target = process.env.ASPNETCORE_URLS
    ? process.env.ASPNETCORE_URLS.split(";")[0]
    : "http://localhost:[IIS-HTTP-PORT]";
}

// https://vitejs.dev/config/
export default defineConfig(async () => {
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

  const config: UserConfig = {
    plugins: [react()],
    server: {
      port: 5173,
      strictPort: true,
      https: {
        cert: certFilePath,
        key: keyFilePath,
      },
      proxy: {
        "/api": {
          target,
          secure: false,
          headers: {
            Connection: "Keep-Alive",
          },
        },
      },
    },
  };

  return config;
});
