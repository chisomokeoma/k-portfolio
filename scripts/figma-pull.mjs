// Pulls the portfolio frames from the Figma REST API.
//
//   npm run figma:pull
//
// Reads FIGMA_TOKEN from the environment (never logged). Writes:
//   figma/nodes.json          full node tree for both frames (layout, text, styles)
//   figma/frame-*.png         rendered frames for visual reference
//   figma/fills/*             original image fills (photos, logos)
//   public/icons/*.svg        icon exports used by the site
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const FILE_KEY = "LJZ96oNj9hrjlJU0Q8Op7S";
const FRAMES = { "25:494": "desktop", "97:390": "mobile" };
const ICONS = {
  "53:482": "inframobile",
  "53:501": "education",
  "53:208": "blockchain",
  "53:534": "infrastructure",
  "53:553": "systems",
  "I81:554;81:99;53:675": "essay",
  "I81:554;81:100;53:618": "quill",
  "I58:849;53:753": "note",
  "6:233": "scroll-down",
  "65:236": "to-top",
  "44:122": "play",
  "104:192": "menu",
};

const token = process.env.FIGMA_TOKEN;
if (!token) {
  console.error("FIGMA_TOKEN is not set. Export it in your shell (e.g. ~/.zshrc) and retry.");
  process.exit(1);
}

const root = path.resolve(import.meta.dirname, "..");
const out = path.join(root, "figma");

async function api(endpoint) {
  const res = await fetch(`https://api.figma.com/v1/${endpoint}`, {
    headers: { "X-Figma-Token": token },
  });
  if (!res.ok) throw new Error(`Figma API ${endpoint.split("?")[0]} -> HTTP ${res.status}`);
  return res.json();
}

async function download(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Download failed -> HTTP ${res.status}`);
  return res;
}

const ids = (list) => encodeURIComponent(Object.keys(list).join(","));

await mkdir(path.join(out, "fills"), { recursive: true });
await mkdir(path.join(root, "public/icons"), { recursive: true });

const nodes = await api(`files/${FILE_KEY}/nodes?ids=${ids(FRAMES)}`);
await writeFile(path.join(out, "nodes.json"), JSON.stringify(nodes, null, 1));

const renders = await api(`images/${FILE_KEY}?ids=${ids(FRAMES)}&format=png&scale=1`);
for (const [id, url] of Object.entries(renders.images)) {
  if (url) await writeFile(path.join(out, `frame-${FRAMES[id]}.png`), Buffer.from(await (await download(url)).arrayBuffer()));
}

const refs = new Set();
const collect = (node) => {
  for (const fill of node.fills ?? []) if (fill.type === "IMAGE" && fill.imageRef) refs.add(fill.imageRef);
  node.children?.forEach(collect);
};
Object.values(nodes.nodes).forEach((n) => collect(n.document));

const fills = await api(`files/${FILE_KEY}/images`);
for (const ref of refs) {
  const url = fills.meta.images[ref];
  if (!url) continue;
  const res = await download(url);
  const ext = (res.headers.get("content-type") ?? "image/png").split("/")[1].replace("jpeg", "jpg");
  await writeFile(path.join(out, "fills", `${ref}.${ext}`), Buffer.from(await res.arrayBuffer()));
}

const svgs = await api(`images/${FILE_KEY}?ids=${ids(ICONS)}&format=svg`);
for (const [id, url] of Object.entries(svgs.images)) {
  if (url) await writeFile(path.join(root, "public/icons", `${ICONS[id]}.svg`), await (await download(url)).text());
}

console.log(
  `Pulled ${Object.keys(nodes.nodes).length} frames, ${refs.size} image fills, ${Object.keys(ICONS).length} icons.`,
);
