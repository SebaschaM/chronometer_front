import { Button, Modal, Typography, Box } from "@mui/material";

const ModalCleanConfirm = ({ show, onHide, onConfirm }) => {
  const handleClose = () => {
    onHide();
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    rowGap: "0.6rem",
    alignItems: "center",
  };

  const handleClean = () => {
    onConfirm();
    handleClose();
  };
  return (
    <Modal
      open={show}
      onClose={onHide}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h4" component="h2">
          ¿Estás seguro de limpiar?
        </Typography>
        <Typography id="modal-modal-description" variant="h5">
          Esta acción no se puede deshacer.
        </Typography>
        <Box
          sx={{
            display: "flex",
            columnGap: "1rem",
            mt: "1rem",
          }}
        >
          <Button
            variant="contained"
            color="success"
            size="large"
            sx={{
              color: "white",
            }}
            onClick={handleClean}
          >
            Limpiar
          </Button>
          <Button
            variant="contained"
            color="error"
            size="large"
            sx={{
              color: "white",
            }}
            onClick={() => {
              console.log("no Limpiar");
              handleClose();
            }}
          >
            Cancelar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalCleanConfirm;
