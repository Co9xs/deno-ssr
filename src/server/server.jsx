import { listenAndServe } from "https://deno.land/std@0.99.0/http/mod.ts";
import React from "https://jspm.dev/react@17.0.2";
import ReactDOMServer from "https://jspm.dev/react-dom@17.0.2/server";

import { App } from "../client/App.jsx";

const BUNDLE_JS_FILE_URL = "/client/dist/bundle.js";
const DUMMY_DB = new Map([
  ["potato", { name: "potato", like: 10, dislike: 0 }],
  ["carrot", { name: "carrot", like: 6, dislike: 4 }],
  ["tomato", { name: "tomato", like: 3, dislike: 7 }],
]);

const js = await Deno.readFile(`.${BUNDLE_JS_FILE_URL}`);

listenAndServe({ port: 8080 }, (req) => {
  switch (true) {
    case req.url === "/": {
      const initialFood = DUMMY_DB.get("potato")
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
                <App initialFood={initialFood}/>
              </div>
              <script
                id="initial-food"
                type="text/plain"
                data-json={JSON.stringify(initialFood)}
              ></script>
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
    case /^\/api\//.test(req.url): {
      req.respond({
        status: 200,
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(DUMMY_DB.get(req.url.slice(5))),
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