import { fileURLToPath } from "node:url";
import path from "node:path";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

export const __dirname = path.dirname(fileURLToPath(import.meta.url));