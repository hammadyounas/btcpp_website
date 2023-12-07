import React, { useState } from "react";
import styles from "./styles.module.css";

const ContactFormModal = ({handleClose}) => {
  return (
    <div onClick={handleClose} className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.scroll} style={{height:800,overflow:'auto'}}>
          <iframe
          id="iframe"
            class="airtable-embed"
            src="https://airtable.com/embed/appqTlC23AiSoB4Fd/shrTx7NgRIa0cKlK8?backgroundColor=green"
            frameborder="0"
            onmousewheel=""
            width="100%"
            height="1100"
            // height="1070"
          ></iframe>

        </div>
      </div>
    </div>
  );
};

export default ContactFormModal;

