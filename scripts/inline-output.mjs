import { readdir, readFile, rm, writeFile } from "node:fs/promises";
import { basename, dirname, resolve } from "node:path";

const htmlPath = resolve(process.argv[2] ?? "public/index.html");
const outputDir = dirname(htmlPath);
const htmlFileName = basename(htmlPath);
let html = await readFile(htmlPath, "utf8");

html = await inlineStyles(html);
html = await inlineScripts(html);
html = html.replace(/<script\s+type=importmap>.*?<\/script>/gs, "");

await writeFile(htmlPath, html);

await removeGeneratedSiblings();

async function inlineStyles(source) {
  return replaceAsync(
    source,
    /<link\s+rel=stylesheet\s+href="?([^"\s>]+)"?>/g,
    async (_match, href) => {
      const css = await readFile(resolve(outputDir, href), "utf8");

      return `<style>${css}</style>`;
    }
  );
}

async function inlineScripts(source) {
  return replaceAsync(
    source,
    /<script\s+type=module\s+src="?([^"\s>]+)"?><\/script>/g,
    async (_match, src) => {
      const js = await readFile(resolve(outputDir, src), "utf8");

      return `<script>${js}</script>`;
    }
  );
}

async function replaceAsync(source, pattern, replacer) {
  const replacements = await Promise.all(
    [...source.matchAll(pattern)].map((match) => replacer(...match))
  );

  let index = 0;

  return source.replace(pattern, () => replacements[index++] ?? "");
}

async function removeGeneratedSiblings() {
  const files = await readdir(outputDir);

  await Promise.all(
    files
      .filter((fileName) => fileName !== htmlFileName)
      .map((fileName) => rm(resolve(outputDir, fileName), { force: true, recursive: true }))
  );
}
