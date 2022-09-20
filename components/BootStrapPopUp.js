import React from "react";
import { Button, Modal } from "react-bootstrap";
import styles from "../styles/BootstrapPopup.module.css";
function BootstrapPopup({
  showPopup,
  setShowPopup,
  title,
  body,
  size,
  proceedBtnRequired,
  proceedBtnName,
  closeBtnName,
  handleProceed,
}) {
  return (
    <Modal
      show={showPopup}
      centered
      size={size}
      >
      <Modal.Body style={{backgroundColor: "#E5E5E5"}}>
        <div className={styles.mBody}>
          <p className={`${styles.mHeading}`}>{title}</p>
          <p className={`${styles.text} mb-5 mt-3`}>{body}</p>
          <div className="d-flex flex-row mt-4">
            <Button
              className={`${styles.mainBtn} me-3`}
              onClick={() => {
                setShowPopup(false);
              }}
            >
              {closeBtnName}
            </Button>
            {proceedBtnRequired && (
              <Button onClick={handleProceed} className={`${styles.mainBtn}`}>
                {proceedBtnName}
              </Button>
            )}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default BootstrapPopup;
