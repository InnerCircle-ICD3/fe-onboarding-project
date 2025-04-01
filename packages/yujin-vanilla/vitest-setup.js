import { beforeEach } from "vitest";
import fs from "fs";
import path from "path";
const html = fs.readFileSync(path.resolve(__dirname, "./index.html"), "utf8");

beforeEach(() => {
    document.body.innerHTML = html.toString()
});
