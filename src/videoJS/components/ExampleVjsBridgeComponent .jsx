import ReactDOM from "react-dom";
import ExampleReactComponent from "./SampleComponent";
import videojs from "video.js";

const VjsComponent = videojs.getComponent("Component");

class ExampleVjsBridgeComponent extends VjsComponent {
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
    ReactDOM.render(
      <ExampleReactComponent
        vjsBridgeComponent={this}
        text="Example React Component"
      />,
      this.el()
    );
  }
}

// Make sure to register the Video.js component so Video.js knows it exists
videojs.registerComponent(
  "exampleVjsBridgeComponent",
  ExampleVjsBridgeComponent
);

export default ExampleVjsBridgeComponent;
