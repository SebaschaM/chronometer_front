// ButtonState.jsx
import { ToggleButton } from "@mui/material";
import { useState, useEffect } from "react";
import ModalCleanConfirm from "../components/ModalCleanConfirm.jsx";

const ButtonState = ({
  defaultState,
  confirmModal,
  onStateChange,
  onRefresh,
}) => {
  const [modal, setModal] = useState(false);
  const [alignment, setAlignment] = useState(defaultState);

  useEffect(() => {
    const defaultState = localStorage.getItem("selectedStateCurrent");
    setAlignment(defaultState);
  }, [defaultState]);

  const handleToggle = (value) => {
    setAlignment(value);
    onStateChange(value);
  };

  const openModal = () => {
    setModal(true);
  };

  const handleClose = () => {
    setModal(false);
  };

  return (
    <>
      <ToggleButton
        value="online"
        selected={alignment === "online"}
        onChange={() => handleToggle("online")}
        aria-label="online"
        color="primary"
      >
        En línea
      </ToggleButton>
      <ToggleButton
        value="lunch"
        selected={alignment === "lunch"}
        onChange={() => handleToggle("lunch")}
        aria-label="lunch"
        color="secondary"
      >
        Almuerzo
      </ToggleButton>
      <ToggleButton
        value="coach"
        selected={alignment === "coach"}
        onChange={() => handleToggle("coach")}
        aria-label="break"
        color="warning"
      >
        Coach
      </ToggleButton>
      <ToggleButton
        value="disconnected"
        selected={alignment === "disconnected"}
        onChange={() => handleToggle("disconnected")}
        aria-label="disconnected"
        color="error"
      >
        Desconectado
      </ToggleButton>
      <ToggleButton
        value="refresh"
        //selected={alignment === "disconnected"}
        //onChange={() => handleToggle("refresh")}
        onClick={onRefresh}
        aria-label="disconnected"
        color="error"
      >
        Actualizar tiempo
      </ToggleButton>
      <ToggleButton
        value="clean"
        onChange={() => {
          openModal();
        }}
        aria-label="erase_modal"
      >
        Limpiar
      </ToggleButton>
      {modal && (
        <ModalCleanConfirm
          show={modal}
          onHide={handleClose}
          onConfirm={confirmModal}
        />
      )}
    </>
  );
};

export default ButtonState;
