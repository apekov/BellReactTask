import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { match} from "react-router-dom"
import { IActionType, IStateComponent } from "../../common";
import { IEmployee } from "../../common";
import { Actions } from "../../Actions/Actions";
import { Button } from "../button/Button";
import { Modal } from "../modal/Modal";
import { Inputs } from "../FormsInput/InputsItems";

interface IDetailParams {
  divisionId: string;
}

interface IStateProps {
  employee: IEmployee[];
  match?: match<IDetailParams>;
}

interface IDispatchProps {
  actions: Actions;
}

interface IInputInterface {
  FIO: string,
  address: string,
  position: string
}

interface IStateComponentInput {
  inputItems: IInputInterface;
}

/**
* Итоговые пропсы и state компонента
*/
type TProps = IStateProps & IDispatchProps;
type TState = IDetailParams & IStateComponent & IStateComponentInput

class Employee extends React.Component<TProps, TState> {
  state = {
    divisionId: "",
    confirmOpen: false,
    modalOpen: false,
    editOpen: false,
    delatedId: "",
    editedId: "",
    completed: false,
    inputItems: {
      FIO: "",
      address: "",
      position: ""
    }
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

  handleOpenModal = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    this.setState({
      ...this.state,
      modalOpen: true
    });
  };

  handleModalCancel = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    this.setState({
      confirmOpen: false,
      modalOpen: false,
      editOpen: false,
      delatedId: "",
      editedId: ""
    });
  };

  handleModalSubmit = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { inputItems, divisionId } = this.state;
    this.props.actions.addEmployee({
      ...inputItems,
      id_division: divisionId
    });
    this.setState({
      ...this.state,
      completed: true
    });
  };

  handleInputChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    this.setState({
      ...this.state,
      inputItems: {
        ...this.state.inputItems,
        [target.id]: target.value
      }
    });
  };

  handleOpenConfirm = (e: React.SyntheticEvent<HTMLElement>) => {
    e.preventDefault();
    this.setState({
      ...this.state,
      confirmOpen: true,
      delatedId: e.currentTarget.dataset.id
    });
  };

  deleteItem = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault;
    const { delatedId } = this.state;
    this.props.actions.deleteEmployee(delatedId);
    this.setState({
      ...this.state,
      completed: true
    });
  };

  handleOpenEdit = (e: React.SyntheticEvent<HTMLElement>) => {
    e.preventDefault();
    const id = e.currentTarget.dataset.id;
    const editemItem = this.searchEditedItem(id);
    this.setState({
      ...this.state,
      editOpen: true,
      editedId: id,
      inputItems: {
        FIO: editemItem.FIO,
        address: editemItem.address,
        position: editemItem.position
      }
    });
  };

  searchEditedItem(id: string): IEmployee {
    return this.props.employee.find(item => {
      return `${item.id}` === id;
    });
  }

  saveEditedItem = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { inputItems } = this.state;
    this.props.actions.editEmployee({
      id: this.state.editedId,
      ...inputItems
    });
    this.setState({
      ...this.state,
      completed: true
    });
  };

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
                  <div className="action_list">
                    <b
                      data-id={item.id}
                      onClick={this.handleOpenEdit}
                      className="edit"
                    >
                      &#9998;
                    </b>
                    <b
                      data-id={item.id}
                      onClick={this.handleOpenConfirm}
                      className="delete"
                    >
                      &#10008;
                    </b>
                  </div>
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
    const {
      modalOpen,
      inputItems,
      confirmOpen,
      editOpen,
      completed
    } = this.state;
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
        {/* Modal add */}
        <Modal
          completed={completed}
          isOpen={modalOpen}
          title="Добавление сотрудника"
          onCancelAction={this.handleModalCancel}
          onSubmitAction={this.handleModalSubmit}
        >
          <div className="add_organization_inputs">
            <Inputs
              data={inputItems}
              handleInputChange={this.handleInputChange}
            />
          </div>
        </Modal>
        {/* Modal delete */}
        <Modal
          completed={completed}
          isOpen={confirmOpen}
          title="Удаление сотрудника"
          onCancelAction={this.handleModalCancel}
          onSubmitAction={this.deleteItem}
        >
          <div className="confirm_delate">
            <p>Вы уверены что хотите удалить данную запись?</p>
          </div>
        </Modal>
        {/* Modal edit */}
        <Modal
          completed={completed}
          isOpen={editOpen}
          title="Редактирование сотрудника"
          onCancelAction={this.handleModalCancel}
          onSubmitAction={this.saveEditedItem}
        >
          <div className="add_organization_inputs">
            <Inputs
              data={inputItems}
              handleInputChange={this.handleInputChange}
            />
          </div>
        </Modal>
      </>
    );
  }
}

interface IEmployeeState {
  employee: IEmployee[]
}

interface IMapStateToProps {
  organization: IEmployeeState
}
function mapStateToProps(state: IMapStateToProps) {
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
