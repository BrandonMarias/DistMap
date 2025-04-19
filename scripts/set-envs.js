import { mkdirSync, readFileSync, writeFileSync } from "fs";
import dotenv from "dotenv";

dotenv.config();
const env = process.env;

const targetPath = "./src/environments/environment.ts";
const targetPathDev = "./src/environments/environment.development.ts";
const MAPS_API_KEY = env["MAPS_API_KEY"];
if (!MAPS_API_KEY) {
  throw new Error("MAPS_API_KEY is not set");
}

const envFileContent = `
export const environment = {
  mapsApiKey: '${MAPS_API_KEY}',
};
`;

mkdirSync("./src/environments", { recursive: true });
writeFileSync(targetPath, envFileContent);
writeFileSync(targetPathDev, envFileContent);
