import React, { Component } from "react";
import Input from "./input";
import Toggle from "./toggle";
import Joi from "joi-browser";
import { Button } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

class RandomNumber extends Component {
  state = {
    inputs: { t: "", min: "", max: "", includeT: true },
    error: "",
  };

  schema = {
    t: Joi.number().integer().min(0).required().label("Number of test cases"),
    min: Joi.number().integer().required().label("Minimum value"),
    max: Joi.number().integer().required().label("Maximum value"),
    includeT: Joi.boolean(),
  };

  generateOutput = () => {
    let { t, max, min, includeT } = this.state.inputs;
    t = parseInt(t);
    max = parseInt(max);
    min = parseInt(min);
    let outp = String(t) + "\n";
    if (!includeT) outp = "";
    for (let i = 0; i < t; i++) {
      const num = Math.floor(Math.random() * (max - min + 1)) + min;
      outp += String(num) + "\n";
    }
    return outp;
  };

  validate = () => {
    const { error } = Joi.validate(this.state.inputs, this.schema);
    if (!error) {
      let max = parseInt(this.state.inputs.max);
      let min = parseInt(this.state.inputs.min);
      if (max < min) return "Maximum value cannot be less than minimum value";
      else return "";
    }
    return error.details[0].message;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    let error = this.validate();
    this.setState({ error });

    if (error) return;

    //execute logic
    const outp = this.generateOutput();
    this.props.displayOutput(outp);
  };

  handleChange = ({ currentTarget: input }) => {
    let inputs = { ...this.state.inputs };
    inputs[input.name] = input.value;
    this.setState({ inputs });
  };

  handleSwitch = ({ currentTarget: input }) => {
    let inputs = { ...this.state.inputs };
    inputs[input.name] = !inputs[input.name];
    this.setState({ inputs });
  };

  clear = () => {
    const inputs = this.state.inputs;
    inputs.t = "";
    inputs.min = "";
    inputs.max = "";
    const error = "";
    this.setState({ inputs, error });
  };

  render() {
    const { t, min, max, includeT } = this.state.inputs;
    const { error } = this.state;
    const { handleChange, handleSubmit, handleSwitch } = this;
    const { switchedOn } = this.props;
    if (!switchedOn && (t !== "" || min !== "" || max !== "" || error !== "")) {
      this.clear();
    }
    return (
      <form onSubmit={handleSubmit} autocomplete="off">
        <div className="row">
          <div className="col">
            <Input
              name="t"
              label={"T Test Cases"}
              value={t}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="row" style={{ marginBottom: "20px" }}>
          <div className="col">
            <Input
              name="min"
              label={"Min Value"}
              value={min}
              onChange={handleChange}
            />
          </div>
          <div className="col">
            <Input
              name="max"
              label={"Max Value"}
              value={max}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <Toggle
              checked={includeT}
              label="Include T"
              onChange={handleSwitch}
              name="includeT"
            />
          </div>
        </div>

        {/* <button type="submit" className="btn btn-primary">
          Generate
        </button> */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          // href="#outlined-buttons"
        >
          Generate
        </Button>

        {error && <Alert severity="error">{error}</Alert>}
      </form>
    );
  }
}

export default RandomNumber;
