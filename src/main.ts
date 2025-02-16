// some parts were re-used from t3dogg/unduck
import { BangsMap } from "./bangs.ts";

function getBang() {
  const url = new URL(window.location.href);
  const query = url.searchParams.get("q")?.trim() || "";
  if (!query) {
    renderDefaultPage();
    return null;
  }

  const defaultEngineUrl = url.searchParams.get("e") || "google";
  const engineMatch = defaultEngineUrl.match(/([a-z0-9]+)/i);
  const defaultEngine = engineMatch?.[0] || "g";

  const match = query.match(/!([a-z0-9]+)/i);
  const potentialBang = match?.[1];
  const bangName = potentialBang || defaultEngine;

  const bang = BangsMap.get(bangName);

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

function renderDefaultPage() {
  const appDiv = document.getElementById("app");
  if (!appDiv) return;

  appDiv.innerHTML = `
          <!-- Logo -->
          <div class="fixed top-4 right-4">
              <a href="https://raphaelluethy.ch">
                  <div class="w-10 h-10 flex items-center justify-center">
                      <img src="/logo.png" alt="Logo">
                  </div>
              </a>
          </div>

          <div class="w-full max-w-2xl">
              <!-- Title -->
              <div class="text-center mb-12">
                  <h1
                      class="text-7xl font-bold bg-gradient-to-tr from-zinc-100 to-zinc-300 text-transparent bg-clip-text mb-1 leading-relaxed py-1">
                      bngr.ch</h1>
                  <p class="text-gray-400 text-lg">Universal Bang Search</p>
              </div>


              <div class="mb-6 text-gray-300 text-center">
                  <h2 class="text-2xl font-semibold mb-2">Use bangs without Kagi or Duckduckgo</h2>
                  <p class="text-gray-400 text-lg">Just add the following link as search engine query:</p>
              </div>
              <div class="flex items-center gap-4">
                  <div class="relative bg-zinc-800 rounded-lg shadow-lg border border-zinc-700 flex-1">
                      <input type="text" readonly id="copyText" value="https://bngr.ch?q=%s"
                          class="w-full bg-zinc-800 text-zinc-300 font-mono p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500 cursor-default select-all text-center" />
                      <button id="copyButton" onclick="copyToClipboard()"
                          class="absolute top-0 right-0 h-full px-4 flex items-center justify-center text-zinc-400 hover:text-zinc-200 focus:outline-none"
                          title="Copy to clipboard">
                          <svg id="copyIcon" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
                              fill="currentColor">
                              <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                              <path
                                  d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                          </svg>
                      </button>
                  </div>

                  <select
                      class="bg-zinc-800 text-zinc-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500 border border-zinc-700 h-[58px]"
                      id="engineSelect">
                      <option default value="g">Default (Google)</option>
                      <option value="p">Perplexity</option>
                      <option value="s">StartPage</option>
                      <option value="k">Kagi</option>
                      <option value="b">Bing</option>
                  </select>
              </div>
              <!-- Notification -->
              <div id="notification"
                  class="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg transform translate-y-16 opacity-0 transition-all duration-300">
                  Copied to clipboard! 📋
              </div>
          </div>



          <!-- Footer -->
          <footer class="fixed bottom-4 left-0 w-full text-center">
              <div class="flex justify-center space-x-6 text-gray-200">
                  <a href="https://github.com/raphaelluethy/bngr.ch" class="hover:text-gray-200 transition-colors"
                      target="_blank" rel="noopener noreferrer">
                      Repository
                  </a>
                  <a href="https://raphaelluethy.ch" class="hover:text-gray-200 transition-colors" target="_blank"
                      rel="noopener noreferrer">
                      Personal Website
                  </a>
                  <a href="https://github.com/raphaelluethy" class="hover:text-gray-200 transition-colors" target="_blank"
                      rel="noopener noreferrer">
                      GitHub
                  </a>
              </div>
          </footer>
    `;
}

doRedirect();
