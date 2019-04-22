import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { IActionType } from "../../common";
import { Actions } from "../../Actions/Actions";
// import { IStoreState } from "../Reducers/userReducer";

interface IStateProps {
  loginStatus: boolean;
  waitingForLogin: boolean;
}

/**
 * Пропсы для передачи экшенов.
 * @prop {Actions} actions Экшены для работы приложения.
 */
export interface IDispatchProps {
  actions: Actions;
}

/**
 * Итоговые пропсы компонента
 */
type TProps = IStateProps & IDispatchProps;

class Login extends React.Component<TProps, {}> {
  state = {
    login: "",
    password: ""
  };

  onChange = (e: any) => {
    const { id, value } = e.currentTarget;
    this.setState({ [id]: value });
  };

  handleLogin = (e: any) => {
    e.preventDefault();
    const { login, password } = this.state;
    this.props.actions.onLogin({ login: login, password: password });
  };

  handleLogout = () => this.props.actions.onLogout();

  renderForm = () => {
    const { loginStatus } = this.props;
    if (loginStatus) {
      return (
        <>
          <p>
            Вы авторизовались в системе, нажмите выход чтобы выйти из системы
          </p>
          <button
            className="btn btn-lg btn-primary btn-block"
            type="submit"
            onClick={this.handleLogout}
          >
            Выйти
          </button>
        </>
      );
    } else {
      return (
        <>
          <h1 className="h3 mb-3 font-weight-normal">
            Пожалуйста, введите логин и пароль
          </h1>
          <label className="sr-only">Login</label>
          <input
            type="email"
            id="login"
            className="form-control"
            placeholder="Login"
            value={this.state.login}
            onChange={this.onChange}
          />
          <label className="sr-only">Password</label>
          <input
            type="password"
            id="password"
            className="form-control"
            placeholder="Password"
            value={this.state.password}
            onChange={this.onChange}
          />
          <p className="mt-5 mb-3 text-muted">© Bell 2019</p>
          <button
            className="btn btn-lg btn-primary btn-block"
            type="submit"
            onClick={this.handleLogin}
          >
            Авторизоваться
          </button>
        </>
      );
    }
  };
  render() {
    return (
      <div className="row">
        <form className="form-signin">{this.renderForm()}</form>
      </div>
    );
  }
}
function mapStateToProps(state: any) {
  return state.user;
}

function mapDispatchToProps(dispatch: Dispatch<IActionType>): IDispatchProps {
  return {
    actions: new Actions(dispatch)
  };
}

const connectLogin = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

export { connectLogin as Login };
