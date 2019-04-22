import classnames from "classnames";
import * as React from "react";

interface IButton {
  children: any;
  className: string;
  onClick: any;
  disabled: boolean;
  active: boolean;
}
class Button extends React.Component<IButton, {}> {
  // defaultProps = {
  //   children: "Default button",
  //   className: "",
  //   onClick: () => {},
  //   disabled: false,
  //   active: false
  // };

  render() {
    const { children, className, onClick, disabled, active } = this.props;
    const classes = classnames("btn", className, { active });

    return (
      <button className={classes} disabled={disabled} onClick={onClick}>
        {children}
      </button>
    );
  }
}

export { Button };
