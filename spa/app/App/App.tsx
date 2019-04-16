import * as React from "react";
import { Link, Route, Switch } from "react-router-dom";

import { Home } from "../components/Home";
import { Login } from "../components/Login";
import { Organization } from "../components/Organization";

import "./App.less";

class App extends React.Component {
  render() {
    return (
      <>
        <div className="navigate">
          <div className="container">
            <header className="blog-header py-3">
              <div className="row flex-nowrap justify-content-between align-items-center">
                <div className="col-4 pt-1" />
                <div className="col-4 text-center">
                  <Link className="blog-header-logo text-dark" to="/">
                    <h2>My first Typescript Code</h2>
                  </Link>
                </div>
                <div className="col-4 d-flex justify-content-end align-items-center">
                  <Link
                    className="btn btn-sm btn-outline-secondary"
                    to="/login"
                  >
                    Авторизация
                  </Link>
                </div>
              </div>
            </header>
            <div className="nav-scroller py-1 mb-2">
              <nav className="nav nav_menu">
                <Link className="p-2 text-muted" to="/">
                  Главная
                </Link>
                <Link className="p-2 text-muted" to="/organization">
                  Организации
                </Link>
              </nav>
            </div>
          </div>
        </div>
        <div className="container">
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/login" component={Login} />
            <Route path="/organization" component={Organization} />
          </Switch>
        </div>
      </>
    );
  }
}

export { App };
