import { Component } from "react";
import * as ReactDom from "react-dom";

class Portal extends Component {
  public el = document.createElement("div");
  componentDidMount() {
    document.body.appendChild(this.el);
  }
  componentWillUnmount() {
    document.body.removeChild(this.el);
  }

  render() {
    this.el.classList.add("modal_layer");
    const { children } = this.props;

    return ReactDom.createPortal(children, this.el);
  }
}
export { Portal };
