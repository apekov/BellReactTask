import * as React from "react";
import { connect } from "react-redux";
import { Link, Route } from "react-router-dom";
import { Dispatch } from "redux";
import { IActionType } from "../common";
import { Actions } from "../Actions/Actions";
import { IOrganizationItem } from "../Reducers/organizationReducer";

import { DivisionAndEmployee } from "./DivisionAndEmployee";

interface IStateProps {
  organization: IOrganizationItem[];
  loading: boolean;
  match: any;
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

class Organization extends React.Component<TProps, {}> {
  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    this.props.actions.getOrganizations();
  }
  renderItems() {
    const { organization, loading, match } = this.props;
    let template: any;
    if (loading) {
      template = <p>Загрузка</p>;
    } else {
      if (organization.length > 0) {
        template = organization.map(item => {
          return (
            <div key={item.id} className="card mb-4 shadow-sm">
              <div className="card-header">
                <h4 className="my-0 font-weight-normal">{item.name}</h4>
              </div>
              <div className="card-body">
                <p>Адрес: {item.address}</p>
                <p>
                  <b>ИНН: {item.INN}</b>
                </p>
                <Link
                  className="btn btn-secondary"
                  to={`${match.url}/info/${item.id}`}
                >
                  Перейти к подразделениям
                </Link>
              </div>
            </div>
          );
        });
      } else {
        template = <p>Не найдено новостей</p>;
      }
    }
    return template;
  }
  render() {
    const { match } = this.props;
    return (
      <>
        <div className="heading">
          <h3>Организации</h3>
          <p>Список организаций в системе</p>
        </div>
        <div className="row">
          <div className="card-deck mb-3 text-center">{this.renderItems()}</div>
        </div>
        <div className="row Division_block">
          <Route
            path={`${match.path}/info/:id`}
            component={DivisionAndEmployee}
          />
        </div>
      </>
    );
  }
}
function mapStateToProps(state: any) {
  return state.organization;
}

function mapDispatchToProps(dispatch: Dispatch<IActionType>): IDispatchProps {
  return {
    actions: new Actions(dispatch)
  };
}

const connectOrganization = connect(
  mapStateToProps,
  mapDispatchToProps
)(Organization);

export { connectOrganization as Organization };
