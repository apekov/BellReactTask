import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Dispatch } from "redux";

import { IActionType, IStateComponent } from "../../common";
import { Actions } from "../../Actions/Actions";
import { IOrganizationItem } from "../../Reducers/organizationReducer";
import { Button } from "../button/Button";
import { Modal } from "../modal/Modal";
import { Inputs } from "../FormsInput/InputsItems";


interface IStateProps {
  organization: IOrganizationItem[];
  loading: boolean;
}

/**
 * Пропсы для передачи экшенов.
 * @prop {Actions} actions Экшены для работы приложения.
 */
export interface IDispatchProps {
  actions: Actions;
}

interface IInputInterface {
    name: string,
    address: string,
    INN: string
}

interface IStateComponentInput {
  inputItems: IInputInterface
}

/**
 * Итоговые пропсы и state компонента
 */
type TProps = IStateProps & IDispatchProps;
type TState = IStateComponent & IStateComponentInput

class Organization extends React.Component<TProps, TState> {
  state = {
    // модальное окно для удаления
    confirmOpen: false,
    // модальное окно для создания
    modalOpen: false,
    // модальное окно для редактирования
    editOpen: false,
    // id удаляемого элемента
    delatedId: "",
    // id изменяемого элемента
    editedId: "",
    // обозначение успешности выполнения действия
    completed: false,
    // Поля для заполнения
    inputItems: {
      name: "",
      address: "",
      INN: ""
    }
  };

  // Получение данных при примонтировании элемента
  componentDidMount() {
    this.props.actions.getOrganizations();
  }

  // Открытие диалогового окна для добавления новой записи
  handleOpenModal = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    this.setState({
      ...this.state,
      modalOpen: true
    });
  };

  // Закрытие дилогого окна
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

  // Нажатие на кнопку для сохранения новой записи
  handleModalSubmit = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { inputItems } = this.state;
    this.props.actions.addOrganization(inputItems);
    this.setState({
      ...this.state,
      completed: true
    });
  };

  // Заполенение state
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

  // Открытие окна подтверждения удаления
  handleOpenConfirm = (e: React.SyntheticEvent<HTMLElement>) => {
    e.preventDefault();
    this.setState({
      ...this.state,
      confirmOpen: true,
      delatedId: e.currentTarget.dataset.id
    });
  };

  // Удаление записи
  deleteItem = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { delatedId } = this.state;
    this.props.actions.deleteOrganization(delatedId);
    this.setState({
      ...this.state,
      completed: true
    });
  };

  // Открытие окна для редактирования записи
  handleOpenEdit = (e: React.SyntheticEvent<HTMLElement>) => {
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
        INN: `${editemItem.INN}`
      }
    });
  };

  // Поиск записи в массиве полученных данных
  searchEditedItem(id: string): IOrganizationItem {
    return this.props.organization.find(item => {
      return `${item.id}` === id;
    });
  }

  // Сохранение измененной записи
  saveEditedItem = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { inputItems } = this.state;
    this.props.actions.editOrganization({
      id: this.state.editedId,
      ...inputItems
    });
    this.setState({
      ...this.state,
      completed: true
    });
  };

  renderItems() {
    const { organization, loading } = this.props;
    let template: JSX.Element | JSX.Element[] | string;
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
          completed={completed}
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
          completed={completed}
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
          completed={completed}
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

interface IMapStateToProps {
  organization: IOrganizationItem[]
}

function mapStateToProps(state: IMapStateToProps) {
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
