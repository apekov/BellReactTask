import * as React from "react";
import { connect } from "react-redux";
import { Link, match } from "react-router-dom";
import { Dispatch } from "redux";
import { IActionType, IStateComponent } from "../../common";
import { IDivision } from "../../common";
import { Actions } from "../../Actions/Actions";
import { Button } from "../button/Button";
import { Modal } from "../modal/Modal";
import { Inputs } from "../FormsInput/InputsItems";

interface IDetailParams {
  organizationId: string;
}

interface IStateProps {
  division: IDivision[];
  match?: match<IDetailParams>;
}

interface IDispatchProps {
  actions: Actions;
}

interface IInputInterface {
  name: string,
  phone: string
}

interface IStateComponentInput {
  inputItems: IInputInterface;
}

/**
* Итоговые пропсы и state компонента
*/
type TProps = IStateProps & IDispatchProps;
type TState = IDetailParams & IStateComponent & IStateComponentInput

class Division extends React.Component<TProps, TState> {
  state = {
    organizationId: "",
    confirmOpen: false,
    modalOpen: false,
    editOpen: false,
    delatedId: "",
    editedId: "",
    completed: false,
    inputItems: {
      name: "",
      phone: ""
    }
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
    const { inputItems, organizationId } = this.state;
    this.props.actions.addDivision({
      ...inputItems,
      id_organization: organizationId
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
    this.props.actions.deleteDivision(delatedId);
    this.setState({
      ...this.state,
      completed: true
    });
  };

  handleOpenEdit = (e: React.SyntheticEvent<HTMLElement>) => {
    e.preventDefault();
    const id = e.currentTarget.dataset.id;    
    const editemItem = this.searchEditedItem(id);
    console.log(editemItem);
    this.setState({
      ...this.state,
      editOpen: true,
      editedId: id,
      inputItems: {
        name: editemItem.name,
        phone: `${editemItem.phone}`
      }
    });
  };

  searchEditedItem(id: string): IDivision {
    return this.props.division.find(item => {
      return `${item.id}` === id;
    });
  }

  saveEditedItem = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { inputItems } = this.state;
    this.props.actions.editDivision({
      id: this.state.editedId,
      ...inputItems
    });
    this.setState({
      ...this.state,
      completed: true
    });
  };

  updateData(id: string) {
    this.props.actions.getDivisionByIdOrganization(Number(id));
  }
  renderItems() {
    const { division } = this.props;
    let template: JSX.Element | JSX.Element[] | string;
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
        {/* Modal add */}
        <Modal
          completed={completed}
          isOpen={modalOpen}
          title="Добавление подразделения"
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
          title="Удаление подразделения"
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
          title="Редактирование подразделения"
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


interface IDivisionState {
  division: IDivision[]
}
interface IMapStateToProps {
  organization: IDivisionState
}
function mapStateToProps(state: IMapStateToProps) {
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
