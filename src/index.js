import React from "react";
import ReactDOM from "react-dom";
import SeasonDisplay from "./SeasonDisplay";
import Spinner from "./Spinner";

class App extends React.Component {
  state = { lat: null, long: null, errorMessage: "" };

  componentDidMount = () => {
    window.navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({ lat: position.coords.latitude });
        this.setState({ long: position.coords.longitude });
      },
      (err) => {
        this.setState({ errorMessage: err.message });
      }
    );
  };

  renderContent = () => {
    if (this.state.errorMessage && !this.state.lat && !this.state.long) {
      return (
        <div className="ui active dimmer">
          <div className="ui big text loader">
            <h1>{this.state.errorMessage}</h1>
          </div>
        </div>
      );
    }

    if (!this.state.errorMessage && this.state.lat && this.state.long) {
      return (
        <div>
          <SeasonDisplay lat={this.state.lat} long={this.state.long} />
        </div>
      );
    }

    return <Spinner message="Please allow location request" />;
  };

  render() {
    return (
      <div className="border red">
        {this.renderContent()}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
