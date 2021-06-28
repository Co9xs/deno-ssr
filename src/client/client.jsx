import React from "https://jspm.dev/react@17.0.2";
import ReactDOM from "https://jspm.dev/react-dom@17.0.2";
import { App } from "./App.jsx"

const initialFood = JSON.parse(
  document.getElementById("initial-food").getAttribute("data-json")
)

ReactDOM.hydrate(
  <App initialFood={initialFood}/>,
  document.getElementById("app")
)