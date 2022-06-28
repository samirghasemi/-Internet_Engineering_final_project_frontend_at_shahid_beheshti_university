import { Fragment } from "react";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import classes from "./TabModal.module.css";

const Backdrop = (props) => {
  const Dispatch = useDispatch();
  const closeHandler = () => {
    Dispatch({ type: "delete" });
  };
  return <div className={classes.backdrop} onClick={closeHandler} />;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById("overlays");

const TabModal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default TabModal;
