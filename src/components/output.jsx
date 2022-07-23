import React, { Component } from "react";
import { Button } from "@material-ui/core";
import Title from "./title";

class Output extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    const el = this.textArea;
    el.select();
    document.execCommand("copy");
  };

  handleDownload = (e) => {
    e.preventDefault();
    const element = document.createElement("a");
    const file = new Blob([this.props.output], {
      type: "text/plain",
    });
    element.href = URL.createObjectURL(file);
    element.download = "output.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <Title></Title>
        <div className="form-group">
          <textarea
            ref={(textarea) => (this.textArea = textarea)}
            className="form-control"
            id="output"
            rows="10"
            cols="5"
            style={{ backgroundColor: "rgba(0,0,0,0.5)", color: "white" }}
            value={this.props.output}
            color="white"
            readOnly
          ></textarea>
        </div>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          // href="#outlined-buttons"
        >
          Copy
        </Button>
        &nbsp; &nbsp;
        <Button
          onClick={this.handleDownload}
          variant="contained"
          color="primary"
        >
          Download
        </Button>
      </form>
    );
  }
}

export default Output;
