import { listenAndServe } from "https://deno.land/std@0.99.0/http/mod.ts";
import React from "https://jspm.dev/react@17.0.2";
import ReactDOMServer from "https://jspm.dev/react-dom@17.0.2/server";

import { App } from "../client/App.jsx";

const BUNDLE_JS_FILE_URL = "/client/bundle.js";

const js = await Deno.readFile(`.${BUNDLE_JS_FILE_URL}`);

listenAndServe({ port: 8080 }, (req) => {
  switch (true) {
    case req.url === "/": {
      req.respond({
        status: 200,
        headers: new Headers({
          "Content-Type": "text/html",
        }),
        body: ReactDOMServer.renderToString(
          <html>
            <head></head>
            <body>
              <div id="app">
                <App />
              </div>
              <script type="module" src={BUNDLE_JS_FILE_URL}></script>
            </body>
          </html>
        ),
      });
      break;
    }
    case req.url === BUNDLE_JS_FILE_URL: {
      req.respond({
        status: 200,
        headers: new Headers({
          "Content-Type": "text/javascript",
        }),
        body: js,
      });
      break;
    }
    default: {
      req.respond({
        status: 404,
        headers: new Headers({
          "Content-Type": "text/plain",
        }),
        body: "Not found\n",
      });
      break;
    }
  }
});