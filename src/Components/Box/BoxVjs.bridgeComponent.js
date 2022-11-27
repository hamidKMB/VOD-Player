import ReactDOM from "react-dom";

import videojs from "video.js";
import Box from "./Box.component";

const VjsComponent = videojs.getComponent("Component");

class BoxVjs extends VjsComponent {
  constructor(player, options) {
    super(player, options);
    // Bind the current class context to the mountReactComponent method
    this.mountReactComponent = this.mountReactComponent.bind(this);

    // When player is ready, call method to mount the React component
    player.ready(() => this.mountReactComponent());

    // Remove the React root when this component is destroyed
    this.on("dispose", () => ReactDOM.unmountComponentAtNode(this.el()));
  }

  // This method renders the ExampleReactComponent into the DOM element of
  // the Video.js component, `this.el()`.
  mountReactComponent() {
    ReactDOM.render(<Box vjsBridgeComponent={this} />, this.el());
  }
}

export default BoxVjs;
