import React, { Component } from "react";
import Input from "./input";
import Toggle from "./toggle";
import Joi from "joi-browser";
import { Button } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

class RandomArray extends Component {
  state = {
    inputs: {
      t: "",
      n: "",
      distinct: false,
      min: "",
      max: "",
      includeN: true,
      includeT: true,
    },
    error: "",
  };

  schema = {
    t: Joi.number().integer().min(1).required().label("Number of test cases"),
    n: Joi.number().integer().min(1).required().label("Array size"),
    min: Joi.number().integer().required().label("Minimum value"),
    max: Joi.number().integer().required().label("Maximum value"),
    includeN: Joi.boolean(),
    includeT: Joi.boolean(),
    distinct: Joi.boolean(),
  };

  generateArray = () => {
    let { n, includeN, max, min, distinct } = this.state.inputs;
    n = parseInt(n);
    max = parseInt(max);
    min = parseInt(min);
    let outp = String(n) + "\n";
    if (!includeN) outp = "";
    if (!distinct) {
      let arr = Array.from({ length: n }, () =>
        Math.floor(Math.random() * (max - min + 1) + min)
      );
      return outp + arr.join(" ") + "\n";
    } else {
      let arr = [];
      while (arr.length < n) {
        let num = Math.floor(Math.random() * (max - min + 1)) + min;
        if (arr.indexOf(num) === -1) arr.push(num);
      }
      return outp + arr.join(" ") + "\n";
    }
  };

  generateOutput = () => {
    let { t, includeT } = this.state.inputs;
    t = parseInt(t);
    let outp = String(t) + "\n";
    if (!includeT) outp = "";
    for (let i = 0; i < t; i++) {
      outp += this.generateArray();
    }
    return outp;
  };

  validate = () => {
    const { error } = Joi.validate(this.state.inputs, this.schema);
    if (!error) {
      let max = parseInt(this.state.inputs.max);
      let min = parseInt(this.state.inputs.min);
      let { distinct, n } = this.state.inputs;
      if (max < min) return "Maximum value cannot be less than minimum value";
      else if (distinct && max - min + 1 < n)
        return "Distinct values not possible";
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
    inputs.n = "";
    inputs.min = "";
    inputs.max = "";
    inputs.distinct = false;
    inputs.includeN = true;
    inputs.includeT = true;
    const error = "";
    this.setState({ inputs, error });
  };

  render() {
    const { t, n, min, max, includeN, includeT, distinct } = this.state.inputs;
    const { error } = this.state;
    const { handleChange, handleSubmit, handleSwitch } = this;
    const { switchedOn } = this.props;
    if (
      !switchedOn &&
      (t !== "" || min !== "" || max !== "" || n !== "" || error !== "")
    ) {
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
          <div className="col">
            <Input
              name="n"
              label={"Array Size N"}
              value={n}
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
              checked={distinct}
              label="Distinct"
              onChange={handleSwitch}
              name="distinct"
            />
          </div>
          <div className="col">
            <Toggle
              checked={includeN}
              label="Include N"
              onChange={handleSwitch}
              name="includeN"
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

export default RandomArray;
