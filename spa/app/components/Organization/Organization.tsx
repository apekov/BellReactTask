import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Dispatch } from "redux";

import { IActionType } from "../../common";
import { Actions } from "../../Actions/Actions";
import { IOrganizationItem } from "../../Reducers/organizationReducer";
import { Button } from "../button/Button";
import { Modal } from "../modal/Modal";
import { Inputs } from "../FormsInput/InputsItems";

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
  state = {
    confirmOpen: false,
    modalOpen: false,
    editOpen: false,
    delatedId: "",
    editedId: "",
    inputItems: {
      name: "",
      address: "",
      INN: ""
    }
  };

  componentDidMount() {
    this.props.actions.getOrganizations();
  }

  handleOpenModal = (e: any) => {
    e.preventDefault();
    this.setState({
      ...this.state,
      modalOpen: true
    });
  };
  handleModalCancel = (e: any) => {
    e.preventDefault();
    this.setState({
      confirmOpen: false,
      modalOpen: false,
      editOpen: false,
      delatedId: "",
      editedId: ""
    });
  };
  handleModalSubmit = (e: any) => {
    e.preventDefault();
    const { inputItems } = this.state;
    this.props.actions.addOrganization(inputItems);
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

  handleOpenConfirm = (e: any) => {
    e.preventDefault();
    this.setState({
      ...this.state,
      confirmOpen: true,
      delatedId: e.currentTarget.dataset.id
    });
  };

  deleteItem = (e: any) => {
    e.preventDefault;
    const { delatedId } = this.state;
    this.props.actions.deleteOrganization(delatedId);
  };

  handleOpenEdit = (e: any) => {
    e.preventDefault();
    const id = e.currentTarget.dataset.id;
    const editemItem = this.searchEditedItem(id);
    this.setState({
      ...this.state,
      editOpen: true,
      editedId: id,
      inputItems: {
        name: editemItem.name,
        address: editemItem.address,
        INN: editemItem.INN
      }
    });
  };

  searchEditedItem(id: string) {
    return this.props.organization.find(item => {
      return `${item.id}` === id;
    });
  }

  saveEditedItem = (e: any) => {
    e.preventDefault();
    const { inputItems } = this.state;
    this.props.actions.editOrganization({
      id: this.state.editedId,
      ...inputItems
    });
  };

  renderItems() {
    const { organization, loading } = this.props;
    let template: any;
    if (loading) {
      template = <p>Загрузка</p>;
    } else {
      if (organization.length > 0) {
        template = organization.map(item => {
          return (
            <div key={item.id} className="col-lg-4">
              <div className="item_row">
                <div className="card-header">
                  <h4 className="font-weight-normal">{item.name}</h4>
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
                  <p>
                    <b>ИНН: {item.INN}</b>
                  </p>
                  <Link
                    className="btn btn-secondary"
                    to={`/divison/${item.id}`}
                  >
                    Перейти к подразделениям
                  </Link>
                </div>
              </div>
            </div>
          );
        });
      } else {
        template = <p>Не найдено подразделений</p>;
      }
    }
    return template;
  }
  render() {
    const { modalOpen, inputItems, confirmOpen, editOpen } = this.state;
    return (
      <>
        <div className="heading">
          <h3>Организации</h3>
          <p>Список организаций в системе</p>
        </div>
        <div className="add_items">
          <Button
            disabled={false}
            active={false}
            className="btn-success"
            onClick={this.handleOpenModal}
          >
            Добавить организацию
          </Button>
        </div>
        <div className="row text-center">{this.renderItems()}</div>
        {/* Modal add */}
        <Modal
          isOpen={modalOpen}
          title="Добавление организации"
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
          isOpen={confirmOpen}
          title="Удаление организации"
          onCancelAction={this.handleModalCancel}
          onSubmitAction={this.deleteItem}
        >
          <div className="confirm_delate">
            <p>Вы уверены что хотите удалить данную запись?</p>
          </div>
        </Modal>
        {/* Modal edit */}
        <Modal
          isOpen={editOpen}
          title="Редактирование организации"
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
