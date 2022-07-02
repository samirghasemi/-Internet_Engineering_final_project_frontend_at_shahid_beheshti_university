import React, { useState } from "react";
import { validate } from "./validators";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import SvgIcon from "@mui/material/SvgIcon";
const INPUT_STATES = {
  UNTOUCHED: "UNTOUCHED",
  VALID: "VALID",
  INVALID: "INVALID",
};

const Input = (props) => {
  const [inputUntouched, inputUntouchedset] = useState(INPUT_STATES.UNTOUCHED);
  const [inputIsValid, setInputIsValid] = useState(INPUT_STATES.VALID);

  const inputOnblurhandler = (event) => {
    inputUntouchedset("TOUCHED");
    setInputIsValid(
      validate(event.target.value, props.validators) === true
        ? "VALID"
        : "INVALID"
    );
  };

  const inputOnchangehandler = (event) => {
    setInputIsValid(
      validate(event.target.value, props.validators) === true
        ? "VALID"
        : "INVALID"
    );
  };
  const error = (inputIsValid === "VALID" ? true : false)
    ? true
    : inputUntouched === "UNTOUCHED"
    ? true
    : false;
  const shown = props.shown;
  const [visible, visibleSet] = useState(false);
  const Visibilityhold = (e) => {
    visibleSet(!visible);
  };

  console.log(error);
  const form = `form-input ${error ? "" : "form-input--invalid"}`;
  return (
    <div className={form} data-testid="form-input">
      <label htmlFor="{props.id}">{props.label}</label>
      <div style={{ display: "flex" }}>
        <input
          style={shown ? { display: "none " } : { display: "inherit" }}
          type={props.password ? (visible ? "password" : "text") : props.type}
          onBlur={inputOnblurhandler}
          onChange={inputOnchangehandler}
        />
        {props.password && (
          <button
            type="button"
            className="password__shown__button"
            onClick={Visibilityhold}
          >
            <SvgIcon
              component={!visible ? VisibilityOffIcon : VisibilityIcon}
              inheritViewBox
            />
          </button>
        )}
      </div>
      {!error && !shown && <p>{props.errorText}</p>}
    </div>
  );
};

export default Input;
