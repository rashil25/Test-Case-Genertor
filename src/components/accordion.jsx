import React from "react";
import { withStyles } from "@material-ui/core/styles";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import RandomNumber from "./randomNumber";
import RandomArray from "./randomArray";
import RandomMatrix from "./randomMatrix";
import RandomString from "./randomString";
import RandomTree from "./randomTree";
import RandomGraph from "./randomGraph";
import WeightedTree from "./weightedTree";
import WeightedGraph from "./weightedGraph";

const Accordion = withStyles({
  root: {
    backgroundColor: "transparent",
    border: "1px solid rgba(0, 0, 0, .125)",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    // backgroundColor: "red",
    paddingLeft: "30px",
    fontFamily: "Segoe UI",
    backgroundColor: "rgba(32, 32, 32, 0.95)",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 56,
    color: "white",
    "&$expanded": {
      minHeight: 56,
    },
  },
  content: {
    "&$expanded": {
      margin: "12px 0",
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    backgroundColor: "rgba(32, 32, 32, 0.6)",
    // backgroundColor: "rgba(211,211,211,1)",
    color: "white",
    paddingBottom: theme.spacing(6),
    paddingTop: theme.spacing(1),
    paddingLeft: theme.spacing(5),
  },
}))(MuiAccordionDetails);

const CustomizedAccordions = (props) => {
  const [expanded, setExpanded] = React.useState("panel");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion
        square
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          aria-controls="panel1d-content"
          id="panel1d-header"
          expandIcon={<ExpandMoreIcon style={{ fill: "white" }} />}
        >
          Random Number
        </AccordionSummary>
        <AccordionDetails>
          <RandomNumber
            displayOutput={props.displayOutput}
            switchedOn={expanded === "panel1"}
          ></RandomNumber>
        </AccordionDetails>
      </Accordion>
      <Accordion
        square
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary
          aria-controls="panel2d-content"
          id="panel2d-header"
          expandIcon={<ExpandMoreIcon style={{ fill: "white" }} />}
        >
          Random Array
        </AccordionSummary>
        <AccordionDetails>
          <RandomArray
            displayOutput={props.displayOutput}
            switchedOn={expanded === "panel2"}
          ></RandomArray>
        </AccordionDetails>
      </Accordion>
      <Accordion
        square
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary
          aria-controls="panel3d-content"
          id="panel3d-header"
          expandIcon={<ExpandMoreIcon style={{ fill: "white" }} />}
        >
          Random Matrix
        </AccordionSummary>
        <AccordionDetails>
          <RandomMatrix
            displayOutput={props.displayOutput}
            switchedOn={expanded === "panel3"}
          ></RandomMatrix>
        </AccordionDetails>
      </Accordion>
      <Accordion
        square
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
      >
        <AccordionSummary
          aria-controls="panel4d-content"
          id="panel4d-header"
          expandIcon={<ExpandMoreIcon style={{ fill: "white" }} />}
        >
          Random String
        </AccordionSummary>
        <AccordionDetails>
          <RandomString
            displayOutput={props.displayOutput}
            switchedOn={expanded === "panel4"}
          ></RandomString>
        </AccordionDetails>
      </Accordion>
      <Accordion
        square
        expanded={expanded === "panel5"}
        onChange={handleChange("panel5")}
      >
        <AccordionSummary
          aria-controls="panel5d-content"
          id="panel5d-header"
          expandIcon={<ExpandMoreIcon style={{ fill: "white" }} />}
        >
          Random Unweighted Tree
        </AccordionSummary>
        <AccordionDetails>
          <RandomTree
            displayOutput={props.displayOutput}
            switchedOn={expanded === "panel5"}
          ></RandomTree>
        </AccordionDetails>
      </Accordion>
      <Accordion
        square
        expanded={expanded === "panel6"}
        onChange={handleChange("panel6")}
      >
        <AccordionSummary
          aria-controls="panel6d-content"
          id="panel6d-header"
          expandIcon={<ExpandMoreIcon style={{ fill: "white" }} />}
        >
          Random Weighted Tree
        </AccordionSummary>
        <AccordionDetails>
          <WeightedTree
            displayOutput={props.displayOutput}
            switchedOn={expanded === "panel6"}
          ></WeightedTree>
        </AccordionDetails>
      </Accordion>
      <Accordion
        square
        expanded={expanded === "panel7"}
        onChange={handleChange("panel7")}
      >
        <AccordionSummary
          aria-controls="panel7d-content"
          id="panel7d-header"
          expandIcon={<ExpandMoreIcon style={{ fill: "white" }} />}
        >
          Random Unweighted Graph
        </AccordionSummary>
        <AccordionDetails>
          <RandomGraph
            displayOutput={props.displayOutput}
            switchedOn={expanded === "panel7"}
          ></RandomGraph>
        </AccordionDetails>
      </Accordion>
      <Accordion
        square
        expanded={expanded === "panel8"}
        onChange={handleChange("panel8")}
      >
        <AccordionSummary
          aria-controls="panel8d-content"
          id="panel8d-header"
          expandIcon={<ExpandMoreIcon style={{ fill: "white" }} />}
        >
          Random Weighted Graph
        </AccordionSummary>
        <AccordionDetails>
          <WeightedGraph
            displayOutput={props.displayOutput}
            switchedOn={expanded === "panel8"}
          ></WeightedGraph>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default CustomizedAccordions;
