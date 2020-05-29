import React, { PureComponent } from "react";

class App extends PureComponent {
  componentDidMount() {
    console.log("componentDidMount");
  }

  render() {
    return <p>Hello world (React app)</p>;
  }
}

export default App;
