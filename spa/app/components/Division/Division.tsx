import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Dispatch } from "redux";
import { IActionType } from "../../common";
import { IDivision } from "../../common";
import { Actions } from "../../Actions/Actions";
import { Button } from "../button/Button";
import { Modal } from "../modal/Modal";

interface IStateProps {
  division: IDivision[];
  match: any;
}

export interface IDispatchProps {
  actions: Actions;
}

type TProps = IStateProps & IDispatchProps;

class Division extends React.Component<TProps, {}> {
  state = {
    organizationId: "",
    modalOpen: false,
    inputItems: {
      name: "",
      phone: ""
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
    this.props.actions.addDivision({
      ...inputItems,
      id_organization: this.state.organizationId
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
        params: { organizationId: id }
      }
    } = this.props;
    this.setState({
      ...this.state,
      organizationId: id
    });
    this.updateData(id);
  }

  updateData(id: string) {
    this.props.actions.getDivisionByIdOrganization(Number(id));
  }
  renderItems() {
    const { division } = this.props;
    let template: any;
    if (division.length <= 0) {
      template = <p>Нет подразделений</p>;
    } else {
      template = (
        <>
          {division.map(item => {
            return (
              <div key={item.id} className="col-lg-4">
                <div className="card-header">
                  <h4 className="my-0 font-weight-normal">{item.name}</h4>
                </div>
                <div className="card-body">
                  <p>Телефон: {item.phone}</p>
                  <Link
                    className="btn btn-secondary"
                    to={`/employee/${item.id}`}
                  >
                    Показать сотрудников подразделения
                  </Link>
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
    const { modalOpen, inputItems } = this.state;
    return (
      <>
        <div className="heading">
          <h3>Подразделения</h3>
          <p>Список подразделений в системе</p>
        </div>
        <div className="add_items">
          <Button
            disabled={false}
            active={false}
            className="btn-success"
            onClick={this.handleOpenModal}
          >
            Добавить подразделение
          </Button>
        </div>
        <div className="row text-center">{this.renderItems()}</div>
        <Modal
          isOpen={modalOpen}
          title="Добавление подразделения"
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
    division: state.organization.division
  };
}

function mapDispatchToProps(dispatch: Dispatch<IActionType>): IDispatchProps {
  return {
    actions: new Actions(dispatch)
  };
}

const connectDivision = connect(
  mapStateToProps,
  mapDispatchToProps
)(Division);

export { connectDivision as Division };
