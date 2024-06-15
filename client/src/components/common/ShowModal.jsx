import Modal from "react-modal";
import "./common.css";

function ShowModal({ children, isOpen, onClose }) {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      boxShadow: `rgba(99, 99, 99, 0.2) 0px 2px 8px 0px`,
      borderRadius: "10px",
      border: "none",
    },
    overlay: {
      backgroundColor: "rgba(255, 252, 252, 0.56)",
      zIndex: "2",
    },
  };

  Modal.setAppElement("#modal");

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {children}
      </Modal>
    </div>
  );
}

export default ShowModal;
