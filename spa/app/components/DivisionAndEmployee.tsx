import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { IActionType } from "../common";
import { IDivision, IEmployee } from "../common";
import { Actions } from "../Actions/Actions";

interface IStateProps {
  division: IDivision[];
  employee: IEmployee[];
  match: any;
}

export interface IDispatchProps {
  actions: Actions;
}

type TProps = IStateProps & IDispatchProps;

class DivisionAndEmployee extends React.Component<TProps, {}> {
  constructor(props: any) {
    super(props);
  }
  componentDidMount() {
    const { id } = this.props.match;
    this.props.actions.getDivisionByIdOrganization(id);
  }
  // componentDidUpdate() {
  //   const { id } = this.props.match;
  //   this.props.actions.getDivisionByIdOrganization(id);
  // }
  renderDivision() {
    const { division } = this.props;
    let template: any;
    if (division.length <= 0) {
      template = <p>Нет подразделений</p>;
    } else {
      template = division.map(item => {
        return (
          <div key={item.id} className="card mb-4 shadow-sm">
            <div className="card-header">
              <h4 className="my-0 font-weight-normal">{item.name}</h4>
            </div>
            <div className="card-body">
              <p>Телефон: {item.phone}</p>
            </div>
          </div>
        );
      });
    }
    return template;
  }

  render() {
    // const {division, employee} = this.props;
    return (
      <>
        {this.renderDivision()}
        {/* {this.renderDivision()} */}
      </>
    );
  }
}
function mapStateToProps(state: any) {
  return {
    division: state.organization.division,
    employee: state.organization.employee
  };
}

function mapDispatchToProps(dispatch: Dispatch<IActionType>): IDispatchProps {
  return {
    actions: new Actions(dispatch)
  };
}

const connectDivisionAndEmployee = connect(
  mapStateToProps,
  mapDispatchToProps
)(DivisionAndEmployee);

export { connectDivisionAndEmployee as DivisionAndEmployee };
