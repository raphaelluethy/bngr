import { Bangs } from "./bangs.ts";

function getBang() {
  const url = new URL(window.location.href);
  const query = url.searchParams.get("q")?.trim() || "";
  if (!query) {
    console.log("No query");
    return null;
  }

  const defaultEngineUrl = url.searchParams.get("e") || "google";
  const engineMatch = defaultEngineUrl.match(/([a-z0-9]+)/i);
  const defaultEngine = engineMatch?.[0] || "g";

  const match = query.match(/!([a-z0-9]+)/i);
  const potentialBang = match?.[1];
  const bangName = potentialBang || defaultEngine;

  const bang = Bangs.find((bang) => bang.t === bangName);

  // Remove the first bang from the query
  const cleanQuery = query.replace(/![a-z0-9]+\s*/i, "").trim();

  // Format of the url is:
  // https://www.google.com/search?q={{{s}}}
  const searchUrl = bang?.u.replace(
    "{{{s}}}",
    // Replace %2F with / to fix formats like "!ghr+..."
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
