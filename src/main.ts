// some parts were re-used from t3dogg/unduck
import { BangsMap } from "./bangs.ts";
import template from "./template.html?raw";
import { CustomBang, db } from "./db";

async function getBang() {
    const url = new URL(window.location.href);
    let query = url.searchParams.get("q")?.trim() || "";
    if (!query) {
        renderDefaultPage();
        return null;
    }

    const defaultEngineUrl = url.searchParams.get("e") || "g";
    const engineMatch = defaultEngineUrl.match(/([a-z0-9]+)/i);
    const defaultEngine = engineMatch?.[0] || "g";

    const isPassThrough = query.startsWith("|");
    if (isPassThrough) {
        query = query.slice(1).trim();
    }

    const match = query.match(/!([a-z0-9]+)/i);
    const potentialBang = match?.[1];
    const bangName = isPassThrough
        ? defaultEngine
        : potentialBang || defaultEngine;

    // First check custom bangs
    const customBang = (await db.customBangs
        .where("bang")
        .equals(bangName)
        .first()) as CustomBang | undefined;
    if (customBang) {
        const cleanQuery = handlePassThrough(isPassThrough, query);
        const queryUrl = customBang.url.replace("{query}", "{{{s}}}");
        return fixUrl(queryUrl, cleanQuery);
    }

    // If no custom bang found, check predefined bangs
    const bang = BangsMap.get(bangName) || BangsMap.get(defaultEngine);
    if (!bang) {
        console.error(
            `This should never happen; I messed up somewhere royally. Please open an issue with your query!: ${query}`,
        );
        renderDefaultPage();
        return null;
    }

    const cleanQuery = handlePassThrough(isPassThrough, query);
    const searchUrl = fixUrl(bang.u, cleanQuery);
    if (!searchUrl) {
        console.error(
            `This should never happen; I messed up somewhere royally. Please open an issue with your query!: ${query}`,
        );
        renderDefaultPage();
        return null;
    }

    // return from searchUrl
    return searchUrl;
}

function handlePassThrough(isPassThrough: boolean, query: string) {
    return isPassThrough ? query : query.replace(/![a-z0-9]+\s*/i, "").trim();
}

function fixUrl(queryUrl: string, cleanQuery: string) {
    // Format of the url is:
    // https://www.google.com/search?q={{{s}}}
    return queryUrl.replace(
        "{{{s}}}",
        // Replace %2F with / to fix formats like "!ghr+t3dotgg/unduck"
        encodeURIComponent(cleanQuery).replace(/%2F/g, "/"),
    );
}

async function doRedirect() {
    const searchUrl = await getBang();
    if (!searchUrl) return;
    window.location.replace(searchUrl);
}

function renderDefaultPage() {
    const appDiv = document.getElementById("app");
    if (!appDiv) return;
    appDiv.innerHTML = template;
}

doRedirect();
