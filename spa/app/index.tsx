import "bootstrap/dist/css/bootstrap.min.css";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { App } from "./App/App";
import { appStore } from "./Store/Store";

/**
 * Каркас приложения с подключением Redux.
 */
ReactDOM.render(
  <Provider store={appStore}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("app")
);
// import * as React from "react";
// import * as ReactDOM from "react-dom";
// import { BrowserRouter as Router, Link, Route } from "react-router-dom";

// class Home extends React.Component<any, any> {
//   render() {
//     return (
//       <div>
//         <div>HOME</div>
//         <div>
//           <Link to="/one">Goto Page One</Link>
//         </div>
//         <div>
//           <Link to="/two">Goto Page Two</Link>
//         </div>
//       </div>
//     );
//   }
// }

// class One extends React.Component<any, any> {
//   render() {
//     return (
//       <div>
//         <div>ONE</div>
//         <Link to="/">Goto Home</Link>
//       </div>
//     );
//   }
// }

// class Two extends React.Component<any, any> {
//   render() {
//     return (
//       <div>
//         <div>TWO</div>
//         <Link to="/">Goto Home</Link>
//       </div>
//     );
//   }
// }

// ReactDOM.render(
//   <Router>
//     <div>
//       <Route exact path="/" component={Home} />
//       <Route exact path="/one" component={One} />
//       <Route exact path="/two" component={Two} />
//     </div>
//   </Router>,
//   document.getElementById("app")
// );
