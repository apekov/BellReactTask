import classnames from "classnames";
import * as React from "react";

interface IButton {
  children: JSX.Element | JSX.Element[] | string;
  className: string;
  onClick: (e: React.SyntheticEvent<HTMLButtonElement>) => void;
  disabled: boolean;
  active: boolean;
}

class Button extends React.Component<IButton, {}> {
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
