import { listenAndServe } from "https://deno.land/std@0.99.0/http/mod.ts"
import React from "https://jspm.dev/react@17.0.2"
import ReactDOMServer from "https://jspm.dev/react-dom@17.0.2/server"
import { App } from "../client/App.jsx"

listenAndServe({ port: 8080 }, (req) => {
  req.respond({
    status: 200,
    headers: new Headers({
      "Content-Type": "text/html"
    }),
    body: ReactDOMServer.renderToString(
      <html>
        <head></head>
        <body>
          <div id="app">
            <App/>
          </div>
        </body>
      </html>
    )
  })
})