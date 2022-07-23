import React, { Component } from "react";
import Input from "./input";
import Toggle from "./toggle";
import Joi from "joi-browser";
import { Button } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

class RandomString extends Component {
  state = {
    inputs: {
      t: "",
      n: "",
      distinct: false,
      chars: "",
      includeN: true,
      includeT: true,
    },
    error: "",
  };

  schema = {
    t: Joi.number().integer().min(1).required().label("Number of test cases"),
    n: Joi.number().integer().min(1).required().label("String size"),
    chars: Joi.string().alphanum().min(1).label("Valid characters"),
    includeN: Joi.boolean(),
    includeT: Joi.boolean(),
    distinct: Joi.boolean(),
  };

  generateString = () => {
    let { n, chars, includeN, distinct } = this.state.inputs;
    n = parseInt(n);
    let outp = String(n) + "\n";
    if (!includeN) outp = "";
    if (!distinct) {
      for (let i = 0; i < n; i++) {
        let idx = Math.floor(Math.random() * chars.length);
        outp += chars.charAt(idx);
      }
      return outp + "\n";
    } else {
      let arr = chars.split("");
      let len = arr.length;
      for (let i = 0; i < len - 1; i++) {
        let j = Math.floor(Math.random() * len);
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
      }

      let shuffled = arr.join("");
      let res = shuffled.substr(0, n + 1);
      outp += res + "\n";
      return outp;
    }
  };

  generateOutput = () => {
    let { t, includeT } = this.state.inputs;
    t = parseInt(t);
    let outp = String(t) + "\n";
    if (!includeT) outp = "";
    for (let i = 0; i < t; i++) {
      outp += this.generateString();
    }
    return outp;
  };

  validate = () => {
    const { error } = Joi.validate(this.state.inputs, this.schema);
    if (!error) {
      let { chars, distinct, n } = this.state.inputs;
      n = parseInt(n);
      if (distinct && chars.length < n)
        return "Distinct characters not possible";
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
    inputs.chars = "";
    inputs.distinct = false;
    inputs.includeN = true;
    inputs.includeT = true;
    const error = "";
    this.setState({ inputs, error });
  };

  render() {
    const { t, n, chars, includeN, includeT, distinct } = this.state.inputs;
    const { error } = this.state;
    const { handleChange, handleSubmit, handleSwitch } = this;
    const { switchedOn } = this.props;
    if (!switchedOn && (t !== "" || chars !== "" || n !== "" || error !== "")) {
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
              label={"String Size N"}
              value={n}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="row" style={{ marginBottom: "20px" }}>
          <div className="col">
            <Input
              name="chars"
              label={"Valids chars"}
              value={chars}
              onChange={handleChange}
              type="text"
            />
          </div>
        </div>

        <div className="row">
          <div className="col">
            <Toggle
              checked={distinct}
              label="Distinct Chars"
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

export default RandomString;
