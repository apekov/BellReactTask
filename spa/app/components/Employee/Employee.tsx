import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { IActionType } from "../../common";
import { IEmployee } from "../../common";
import { Actions } from "../../Actions/Actions";
import { Button } from "../button/Button";
import { Modal } from "../modal/Modal";

interface IStateProps {
  employee: IEmployee[];
  match: any;
}

export interface IDispatchProps {
  actions: Actions;
}

type TProps = IStateProps & IDispatchProps;

class Employee extends React.Component<TProps, {}> {
  state = {
    divisionId: "",
    modalOpen: false,
    inputItems: {
      FIO: "",
      address: "",
      position: ""
    }
  };
  handleOpenModal = (e: any) => {
    e.preventDefault();
    this.setState({
      ...this.state,
      modalOpen: true
    });
  };
  handleModalSubmit = (e: any) => {
    e.preventDefault();
    const { inputItems } = this.state;
    this.props.actions.addEmployee({
      ...inputItems,
      id_division: this.state.divisionId
    });
  };
  handleModalCancel = (e: any) => {
    e.preventDefault();
    this.setState({
      modalOpen: false
    });
  };
  handleInputChange = (e: any) => {
    const target = e.currentTarget;
    this.setState({
      ...this.state,
      inputItems: {
        ...this.state.inputItems,
        [target.id]: target.value
      }
    });
  };
  componentDidMount() {
    const {
      match: {
        params: { divisionId: id }
      }
    } = this.props;
    this.setState({
      divisionId: id
    });
    this.updateData(id);
  }

  updateData(id: string) {
    this.props.actions.getEmployeeByIdDivision(Number(id));
  }
  renderItems() {
    const { employee } = this.props;
    let template: any;
    if (employee.length <= 0) {
      template = <p>Нет сотрудников</p>;
    } else {
      template = (
        <>
          {employee.map(item => {
            return (
              <div key={item.id} className="col-lg-4">
                <div className="card-header">
                  <h4 className="my-0 font-weight-normal">Fio: {item.FIO}</h4>
                </div>
                <div className="card-body">
                  <p>Адрес: {item.address}</p>
                  <p>Позиция: {item.position}</p>
                </div>
              </div>
            );
          })}
        </>
      );
    }
    return template;
  }

  render() {
    console.log(this.props);

    const { modalOpen, inputItems } = this.state;
    return (
      <>
        <div className="heading">
          <h3>Сотрудники</h3>
          <p>Список сотрудников подразделения</p>
        </div>
        <div className="add_items">
          <Button
            disabled={false}
            active={false}
            className="btn-success"
            onClick={this.handleOpenModal}
          >
            Добавить сотрудника
          </Button>
        </div>
        <div className="row text-center">{this.renderItems()}</div>
        <Modal
          isOpen={modalOpen}
          title="Добавление сотрудника"
          onCancelAction={this.handleModalCancel}
          onSubmitAction={this.handleModalSubmit}
        >
          <div className="add_organization_inputs">
            {Object.keys(inputItems).map(item => {
              let value: any;
              // @ts-ignore
              value = inputItems[item];
              return (
                <p key={item}>
                  <label htmlFor={item}>{item}</label>
                  <input
                    className="form-control"
                    type="text"
                    id={item}
                    value={value}
                    onChange={this.handleInputChange}
                  />
                </p>
              );
            })}
          </div>
        </Modal>
      </>
    );
  }
}
function mapStateToProps(state: any) {
  return {
    employee: state.organization.employee
  };
}

function mapDispatchToProps(dispatch: Dispatch<IActionType>): IDispatchProps {
  return {
    actions: new Actions(dispatch)
  };
}

const connectEmployee = connect(
  mapStateToProps,
  mapDispatchToProps
)(Employee);

export { connectEmployee as Employee };
