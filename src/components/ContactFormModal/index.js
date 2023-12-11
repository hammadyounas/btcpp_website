import React, { useState } from "react";
import styles from "./styles.module.css";
import emailjs from "@emailjs/browser";
import useBaseUrl from "@docusaurus/useBaseUrl";

const ContactFormModal = ({ handleClose }) => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [value, setValue] = useState({
    name: "",
    contact: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    contact: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));

    setValue((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const validateFields = () => {
    const newErrors = {};

    if (!value.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!value.contact.trim()) {
      newErrors.contact = "Contact Number is required";
    }

    if (!value.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value.email)
    ) {
      newErrors.email = "Invalid email format";
    }

    if (!value.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateFields()) {
      return;
    }
    setLoading(true);

    const templateParams = {
      from_name: value.name,
      message: value.message,
      from_email: value.email,
      to_name: "hammad",
    };

    emailjs
      .send(
        "service_inapp",
        "template_y0r9ctv",
        templateParams,
        "c7EgqcHIdqFtoE1Ll"
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          setSubmitted(true);
          setLoading(false);
        },
        (err) => {
          console.log("FAILED...", err);
        }
      )
      .finally(() => {
        setLoading(false);
      });
  };

  const imageUrl = useBaseUrl("img/done.png");
  return (
    <div className={styles.modal}>
      <div style={{ position: "relative" }} className={styles.modalContent}>
        <div className={styles.closeBtn}>
          <img
            onClick={handleClose}
            style={{ cursor: "pointer" }}
            src={useBaseUrl("img/cross.png")}
            alt="icon"
            />
        </div>
        <div className={styles.scroll}>
          <div className={styles.formContainer}>
            {submitted ? (
              <div style={{textAlign:'center', paddingTop:'20px',paddingBottom:"20px"}}>
                <img width={"20%"} src={imageUrl} alt="icon" />
                
                <h2>Thank you for contact us!</h2>
                <p>Our team member will contact you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} id="contact-form">
                <h2>Contact Us</h2>
                <p>Tell us more about your needs</p>
                <div>
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    value={value.name}
                    onChange={handleChange}
                  />
                  <span className={styles.error}>{errors.name}</span>
                </div>
                <div>
                  <label>Contact Number</label>
                  <input
                    type="text"
                    name="contact"
                    value={value.contact}
                    onChange={handleChange}
                  />
                  <span className={styles.error}>{errors.contact}</span>
                </div>
                <div>
                  <label>Email</label>
                  <input
                    type="text"
                    name="email"
                    value={value.email}
                    onChange={handleChange}
                  />
                  <span className={styles.error}>{errors.email}</span>
                </div>
                <div>
                  <label>Message</label>
                  <textarea
                    name="message"
                    cols={3}
                    rows={6}
                    value={value.message}
                    onChange={handleChange}
                  ></textarea>
                  <span className={styles.error}>{errors.message}</span>
                </div>
                <div>
                  <button type="submit" disabled={loading}>
                    {" "}
                    {loading ? " Loading..." : "Send"}{" "}
                  </button>
                </div>
              </form>
            )}
          </div>
          {/* <iframe
          id="iframe"
            class="airtable-embed"
            src="https://airtable.com/embed/appqTlC23AiSoB4Fd/shrTx7NgRIa0cKlK8?backgroundColor=green"
            frameborder="0"
            onmousewheel=""
            width="100%"
            height="1100"
            // height="1070"
          ></iframe> */}
        </div>
      </div>
    </div>
  );
};

export default ContactFormModal;
