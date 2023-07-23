"use client";
import * as React from "react";
import PropTypes from "prop-types";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function CircularProgressWithLabel(props) {
  const [color, setColor] = React.useState("");
  React.useEffect(() => {
    console.log(props.value);
    console.log(parseInt(props.value) < 40);
    if (parseInt(props.value) < 40) {
      setColor("brown");
    } else if (parseInt(props.value) <= 75) {
      setColor("orange");
    } else {
      setColor("green");
    }
  }, []);
  return (
    <Box
      sx={{
        position: "relative",
        display: "inline-flex",
      }}
    >
      <CircularProgress
        sx={{ color: { color } }}
        variant="determinate"
        {...props}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary">
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   * @default 0
   */
  value: PropTypes.number.isRequired,
};

export default function CircularWithValueLabel(props) {
  const [progress, setProgress] = React.useState(10);

  return <CircularProgressWithLabel value={props.progress} />;
}
