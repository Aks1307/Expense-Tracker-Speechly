import React from "react";
import ReactDom from "react-dom";
import {SpeechProvider} from '@speechly/react-client'
import { Provider } from "./Context/context";

import App from "./app";
import "./index.css";

ReactDom.render(
  <SpeechProvider appId="2119aeeb-b675-4d8d-8bb7-c76403140afc" language="en-US">
    <Provider>
    <App />
  </Provider>
  </SpeechProvider>
  ,
  document.getElementById("root")
);
