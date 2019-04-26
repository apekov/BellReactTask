import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { IActionType } from "../../common";
import { Actions } from "../../Actions/Actions";

interface IStateProps {
  loginStatus: boolean;
  waitingForLogin: boolean;
}

/**
 * Пропсы для передачи экшенов.
 * @prop {Actions} actions Экшены для работы приложения.
 */
interface IDispatchProps {
  actions: Actions;
}

interface IStateComponent{
  login: string,
  password: string
}

/**
* Итоговые пропсы и state компонента
*/
type TProps = IStateProps & IDispatchProps;

class Login extends React.Component<TProps, IStateComponent> {
  state = {
    login: "",
    password: ""
  };

  onChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const { id, value } = e.currentTarget;
    // @ts-ignore
    this.setState({ [id]: value });
  };

  handleLogin = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { login, password } = this.state;
    this.props.actions.onLogin({ login: login, password: password });
  };

  handleLogout = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    this.props.actions.onLogout()
  };

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
interface IUser { 
  user: IStateComponent
}
function mapStateToProps(state: IUser) {
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
