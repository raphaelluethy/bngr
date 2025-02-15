import { Bangs } from "./bangs.ts";
const defaultBang = {
  c: "Search",
  d: "www.kagi.com",
  r: 0,
  s: "Kagi Search",
  sc: "Search",
  t: "k",
  u: "https://www.kagi.com/search?q={{{s}}}",
};
const defaultUrl = "https://www.kagi.com";

function getBang() {
  const url = new URL(window.location.href);
  // const url = new URL("https://bngr.ch/search?q=hello!lkhfklsjfklsdf");
  const query = url.searchParams.get("q")?.trim() || "";
  if (!query) {
    return defaultUrl;
  }
  const match = query.match(/!([a-z0-9]+)/i);
  const potentialBang = match?.[1];
  const bang = Bangs.find((bang) => bang.t === potentialBang);

  // Remove the first bang from the query
  const cleanQuery = query.replace(/![a-z0-9]+\s*/i, "").trim();

  // Format of the url is:
  // https://www.google.com/search?q={{{s}}}
  const searchUrl = bang?.u.replace(
    "{{{s}}}",
    // Replace %2F with / to fix formats like "!ghr+t3dotgg/unduck"
    encodeURIComponent(cleanQuery).replace(/%2F/g, "/"),
  );
  if (!searchUrl) return null;

  return searchUrl;
}

function doRedirect() {
  const searchUrl = getBang();
  if (!searchUrl) return;
  window.location.replace(searchUrl);
}

doRedirect();
