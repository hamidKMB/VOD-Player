import { Component } from "react";

export default class ExampleReactComponent extends Component {
  componentDidMount() {
    console.log(this.props);
  }
  render() {
    return <div>{this.props.text}</div>;
  }
}
