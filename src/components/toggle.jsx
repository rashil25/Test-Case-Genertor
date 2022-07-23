import React, { Component } from "react";
import Switch from "@material-ui/core/Switch";
import { withStyles } from "@material-ui/core/styles";
import { lightGreen } from "@material-ui/core/colors";

const GreenSwitch = withStyles({
  switchBase: {
    color: lightGreen[300],
    "&$checked": {
      color: lightGreen["A400"],
    },
    "&$checked + $track": {
      backgroundColor: lightGreen["A400"],
    },
  },
  checked: {},
  track: {},
})(Switch);

class Toggle extends Component {
  state = {};
  render() {
    const { label, checked, onChange, name } = this.props;
    return (
      <div className="form-group">
        <label
          style={{
            color: "rgba(255, 255, 255, 0.67)",
            fontFamily: "Segoe UI",
            fontSize: "16px",
            fontWeight: "490",
          }}
        >
          {label}
        </label>
        <GreenSwitch
          checked={checked}
          onChange={onChange}
          color="secondary"
          name={name}
          inputProps={{ "aria-label": "primary checkbox" }}
        />
      </div>
    );
  }
}

export default Toggle;
