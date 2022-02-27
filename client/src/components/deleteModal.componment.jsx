import React from "react";
import { Box, Button, Modal, styled } from "@mui/material";
import { Icon } from "@iconify/react";

const DeleteModalContainer = styled(Box)(() => ({
  width: "30vw",
  height: "45vh",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#fff",
  outline: "none",
  borderRadius: 10,
  padding: "10px 20px 20px 20px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",

  "& .delete-text": {
    fontSize: "1.4em",
    fontWeight: 600,
    textAlign:'center'
  },
  "& .delete-text-sub": {
    fontSize: "0.9em",
    color: "#a3a3a3",
    textAlign:'center'
  },
  "& .btn-container": {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",

    "& .MuiButton-root": {
      width: "48%",
      borderRadius: 5,
    },
  },
  "& .delete-btn": {
    backgroundColor: "#c73737",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#c73737",
    },
  },
  "& .cancel-btn": {
    backgroundColor: "#4361EE",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#4361EE",
    },
  },
}));

const DeleteModal = ({ state, onYes, onNo, toggleModal,text }) => {
  return (
    <Modal open={state} onClose={toggleModal}>
      <DeleteModalContainer>
        <Icon
          icon="jam:triangle-danger"
          width="150px"
          height="150px"
          color="#c73737"
        />
        <div>
          <div className="delete-text">{text || "Do you really want to delete this?"}</div>
          <div className="delete-text-sub">
            Once deleted, it cannot be restored !
          </div>
        </div>
        <div className="btn-container">
          <Button className="cancel-btn" onClick={onNo}>CANCEL</Button>
          <Button className="delete-btn" onClick={onYes}>DELETE</Button>
        </div>
      </DeleteModalContainer>
    </Modal>
  );
};

export default DeleteModal;
