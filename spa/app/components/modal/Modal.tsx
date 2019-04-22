import * as React from "react";
import { Button } from "../button/Button";
import { Portal } from "./portal/Portal";

import "./Modal.less";
interface IModal {
  title: string;
  isOpen: boolean;
  completed: boolean;
  onCancelAction: any;
  onSubmitAction: any;
}
class Modal extends React.Component<IModal, {}> {
  // defaultProps = {
  //   title: "",
  //   isOpen: false,
  //   onCancelAction: () => {
  //     console.log("cancel");
  //   },
  //   onSubmit: () => {
  //     console.log("onsubmit");
  //   }
  // };
  render() {
    const {
      title,
      isOpen,
      onCancelAction,
      onSubmitAction,
      children,
      completed
    } = this.props;
    return (
      <>
        {isOpen && (
          <Portal>
            <div className="modal_layer">
              <div className="modal_contain">
                <div className="modal_header">
                  <div className="title">
                    <h4>{title}</h4>
                  </div>
                  <div onClick={onCancelAction} className="iconCancel">
                    <b>X</b>
                  </div>
                </div>
                {completed ? (
                  <p>
                    Действие успешно выполнено. Перезайдите на страницу чтобы
                    увидеть изменение
                  </p>
                ) : (
                  <>
                    <div className="modal_body">{children}</div>
                    <div className="modal_body">
                      <Button
                        disabled={false}
                        active={false}
                        className="btn-warning"
                        onClick={onCancelAction}
                      >
                        Отмена
                      </Button>
                      <Button
                        disabled={false}
                        active={false}
                        className="btn-success"
                        onClick={onSubmitAction}
                      >
                        Подтвердить
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </Portal>
        )}
      </>
    );
  }
}

export { Modal };
