import { Component } from "react";

export default class ExampleReactComponent extends Component {
  constructor(props) {
    super(props);
    const player = this.props.vjsBridgeComponent.player();
    console.log(player);
  }
  componentDidMount() {
    console.log(this.props);
  }
  render() {
    return <div>Hello World</div>;
  }
}
