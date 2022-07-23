import React, { Component } from "react";
import Input from "./input";
import Toggle from "./toggle";
import Joi from "joi-browser";
import { Button } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

class RandomGraph extends Component {
  state = {
    inputs: {
      t: "",
      n: "",
      e: "",
      indexing: "",
      directed: false,
      includeNE: true,
      includeT: true,
    },
    error: "",
  };

  schema = {
    t: Joi.number().integer().min(1).required().label("Number of test cases"),
    n: Joi.number().integer().min(1).required().label("Number of nodes"),
    e: Joi.number().integer().min(0).required().label("Number of edges"),
    indexing: Joi.number().integer().required().label("Indexing from"),
    directed: Joi.boolean(),
    includeNE: Joi.boolean(),
    includeT: Joi.boolean(),
  };

  generateGraph = () => {
    let { n, e, includeNE, indexing, directed } = this.state.inputs;
    n = parseInt(n);
    e = parseInt(e);
    indexing = parseInt(indexing);
    let outp = String(n) + " " + String(e) + "\n";
    if (!includeNE) outp = "";
    if (n === 1) return outp;
    let edges = new Set();
    let numEdges = 0;
    while (numEdges < e) {
      let u = indexing + Math.floor(Math.random() * n);
      let v = indexing + Math.floor(Math.random() * n);
      if (u === v) continue;
      let edge = String(u) + " " + String(v);
      if (edges.has(edge)) continue;
      edges.add(edge);
      outp += edge + "\n";
      if (!directed) edges.add(String(v) + " " + String(u));
      numEdges += 1;
    }
    return outp;
  };

  generateOutput = () => {
    let { t, includeT } = this.state.inputs;
    t = parseInt(t);
    let outp = String(t) + "\n";
    if (!includeT) outp = "";
    for (let i = 0; i < t; i++) {
      outp += this.generateGraph();
    }
    return outp;
  };

  validate = () => {
    const { error } = Joi.validate(this.state.inputs, this.schema);
    if (!error) {
      let { n, e, directed } = this.state.inputs;
      n = parseInt(n);
      e = parseInt(e);
      let limit = directed ? n * (n - 1) : (n * (n - 1)) / 2;
      if (e > limit)
        return "Maximum number of edges possible is " + String(limit);
      else return "";
    } else return error.details[0].message;
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
    inputs.e = "";
    inputs.indexing = "";
    inputs.directed = "";
    inputs.includeNE = true;
    inputs.includeT = true;
    const error = "";
    this.setState({ inputs, error });
  };

  render() {
    const {
      t,
      n,
      e,
      indexing,
      directed,
      includeNE,
      includeT,
    } = this.state.inputs;
    const { error } = this.state;
    const { handleChange, handleSubmit, handleSwitch } = this;
    const { switchedOn } = this.props;
    if (
      !switchedOn &&
      (t !== "" || indexing !== "" || n !== "" || e !== "" || error !== "")
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
              label={"N Nodes"}
              value={n}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="row" style={{ marginBottom: "20px" }}>
          <div className="col">
            <Input
              name="e"
              label={"E Edges"}
              value={e}
              onChange={handleChange}
            />
          </div>
          <div className="col">
            <Input
              name="indexing"
              label={"Indexing from"}
              value={indexing}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="row">
          <div className="col">
            <Toggle
              checked={directed}
              label="Directed"
              onChange={handleSwitch}
              name="directed"
            />
          </div>
          <div className="col">
            <Toggle
              checked={includeNE}
              label="Include NE"
              onChange={handleSwitch}
              name="includeNE"
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

export default RandomGraph;
