import root from "./index.html";

const server = Bun.serve({
  // Add HTML imports to `static`
  static: {
    // Bundle & route index.html to "/"
    "/": root,
  },

  // Enable development mode for:
  // - Detailed error messages
  // - Rebuild on request
  development: true,

  // Handle API requests
  async fetch(req) {
    return new Response("Not Found", { status: 404 });
  },
});

console.log(`Listening on ${server.url}`);
