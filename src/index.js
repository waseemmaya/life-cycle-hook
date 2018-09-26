import React from "react";
import ReactDOM from "react-dom";
import Registration from "./Registration";
import registerServiceWorker from "./registerServiceWorker";

// import 'antd/dist/antd.css';
import "../node_modules/grommet-css";

ReactDOM.render(<Registration />, document.getElementById("root"));
registerServiceWorker();

if (module.hot) {
  module.hot.accept();
}
