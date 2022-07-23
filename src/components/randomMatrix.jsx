import React, { Component } from "react";
import Input from "./input";
import Toggle from "./toggle";
import Joi from "joi-browser";
import { Button } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

class RandomMatrix extends Component {
  state = {
    inputs: {
      t: "",
      rows: "",
      cols: "",
      min: "",
      max: "",
      distinct: false,
      includeNM: true,
      includeT: true,
    },
    error: "",
  };

  schema = {
    t: Joi.number().integer().min(1).required().label("Number of test cases"),
    rows: Joi.number().integer().min(1).required().label("Rows"),
    cols: Joi.number().integer().min(1).required().label("Columns"),
    min: Joi.number().integer().required().label("Minimum value"),
    max: Joi.number().integer().required().label("Maximum value"),
    includeNM: Joi.boolean(),
    includeT: Joi.boolean(),
    distinct: Joi.boolean(),
  };

  generateMatrix = () => {
    let { rows, cols, includeNM, max, min, distinct } = this.state.inputs;
    let n = parseInt(rows);
    let m = parseInt(cols);
    max = parseInt(max);
    min = parseInt(min);
    let outp = String(n) + " " + String(m) + "\n";
    if (!includeNM) outp = "";
    if (!distinct) {
      for (let i = 0; i < n; i++) {
        let arr = Array.from({ length: m }, () =>
          Math.floor(Math.random() * (max - min + 1) + min)
        );
        outp += arr.join(" ") + "\n";
      }
      return outp;
    } else {
      let mainArr = [];
      for (let i = 0; i < n; i++) {
        let arr = [];
        while (arr.length < m) {
          let num = Math.floor(Math.random() * (max - min + 1)) + min;
          if (mainArr.indexOf(num) === -1) {
            arr.push(num);
            mainArr.push(num);
          }
        }
        // console.log(arr);
        outp += arr.join(" ") + "\n";
      }
      return outp;
    }
  };

  generateOutput = () => {
    let { t, includeT } = this.state.inputs;
    t = parseInt(t);
    let outp = String(t) + "\n";
    if (!includeT) outp = "";
    for (let i = 0; i < t; i++) {
      outp += this.generateMatrix();
    }
    return outp;
  };

  validate = () => {
    const { error } = Joi.validate(this.state.inputs, this.schema);
    if (!error) {
      let max = parseInt(this.state.inputs.max);
      let min = parseInt(this.state.inputs.min);
      let { distinct, rows, cols } = this.state.inputs;
      if (max < min) return "Maximum value cannot be less than minimum value";
      else if (distinct && max - min + 1 < rows * cols)
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
    inputs.rows = "";
    inputs.cols = "";
    inputs.min = "";
    inputs.max = "";
    inputs.distinct = false;
    inputs.includeNM = true;
    inputs.includeT = true;
    const error = "";
    this.setState({ inputs, error });
  };

  render() {
    const {
      t,
      rows,
      cols,
      min,
      max,
      includeNM,
      includeT,
      distinct,
    } = this.state.inputs;
    const { error } = this.state;
    const { handleChange, handleSubmit, handleSwitch } = this;
    const { switchedOn } = this.props;
    if (
      !switchedOn &&
      (t !== "" ||
        min !== "" ||
        max !== "" ||
        rows !== "" ||
        cols !== "" ||
        error !== "")
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
        </div>

        <div className="row">
          <div className="col">
            <Input
              name="rows"
              label={"Rows N"}
              value={rows}
              onChange={handleChange}
            />
          </div>
          <div className="col">
            <Input
              name="cols"
              label={"Columns M"}
              value={cols}
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
              checked={includeNM}
              label="Include N M"
              onChange={handleSwitch}
              name="includeNM"
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

export default RandomMatrix;
// }
