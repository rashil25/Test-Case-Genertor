import React, { Component } from "react";
import Output from "./output";
import CustomizedAccordions from "./accordion";
import Particles from "react-particles-js";
import "./main.css";

class Main extends Component {
  state = {
    outp: "Output",
  };

  displayOutput = (outp) => {
    this.setState({ outp });
  };

  render() {
    return (
      <html>
        <div id="container">
          <div id="navi">
            <Particles
              params={{
                particles: {
                  number: {
                    value: 150,
                  },
                  size: {
                    value: 2,
                  },
                },
                interactivity: {
                  events: {
                    onhover: {
                      enable: true,
                      mode: "repulse",
                    },
                  },
                },
              }}
              style={{
                position: "fixed",
                backgroundColor: "black",
                top: "0",
                bottom: "0",
                left: "0",
                zIndex: "0",
              }}
            />
          </div>
          <div id="infoi">
            <div>
              <div
                className="row"
                style={{
                  backgroundColor: "transparent",
                  paddingLeft: "50px",
                  paddingRight: "50px",
                  paddingTop: "50px",
                  overflowX: "hidden",
                }}
              >
                <div
                  className="col-7"
                  style={{
                    paddingLeft: "40px",
                    paddingRight: "40px",
                    paddingTop: "27px",
                    width: "100%",
                  }}
                >
                  <CustomizedAccordions displayOutput={this.displayOutput} />
                </div>
                <div
                  className="col-5"
                  style={{
                    paddingLeft: "30px",
                    position: "fixed",
                    marginLeft: "53%",
                  }}
                >
                  <Output output={this.state.outp}></Output>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <RandomMatrix displayOutput={this.displayOutput}></RandomMatrix> */}
      </html>
    );
  }
}

export default Main;
