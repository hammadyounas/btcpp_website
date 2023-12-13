import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./styles.module.css";

const service = "service_inapp";
const template = "template_y0r9ctv";
const serviceKey = "c7EgqcHIdqFtoE1Ll";
const toName = "hammad";
const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

const ContactUSFormModal = ({ handleClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));

    setFormData((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const validateFields = () => {
    const validationErrors = {};

    if (!formData.name.trim()) {
      validationErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      validationErrors.email = "Email is required";
    }
    else if (!emailRegex.test(formData.email)) {
      validationErrors.email = "Invalid email format";
    }

    if (!formData.message.trim()) {
      validationErrors.message = "Message is required";
    }

    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!validateFields()) return;
      setIsLoading(true);

      const templateParams = {
        from_name: formData.name,
        message: formData.message,
        company_name: formData.companyName,
        from_email: formData.email,
        to_name: toName,
      };

      await emailjs.send(
        service,
        template,
        templateParams,
        serviceKey
      );

      setSubmitted(true);
      setIsLoading(false);

    } catch (errors) {
      setIsLoading(false);
      console.log("FAILED...", errors);
    }
  };

  const successImageURL = useBaseUrl("img/done.png");

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.closeBtn}>
          <img
            onClick={handleClose}
            className={styles.close}
            src={useBaseUrl("img/cross.png")}
            alt="icon"
          />
        </div>
        <div className={styles.scroll}>
          <div className={styles.formContainer}>
            {submitted ? (
              <div
                className={styles.success}
              >
                <img width={"20%"} src={successImageURL} alt="icon" />

                <h2>Thank you for contact us!</h2>
                <p>Our team member will contact you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} id="contact-form">
                <h2>Contact Us</h2>
                <p>Tell us more about your needs</p>
                <div>
                  <label>Name <span className={styles.required}>*</span></label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                  <span className={styles.error}>{errors.name}</span>
                </div>
                <div>
                  <label>Company Name <span className={styles.optional}>(optional)</span> </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label>Email <span className={styles.required}>*</span></label>
                  <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  <span className={styles.error}>{errors.email}</span>
                </div>
                <div>
                  <label>Message <span className={styles.required}>*</span></label>
                  <textarea
                    name="message"
                    cols={3}
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                  ></textarea>
                  <span className={styles.error}>{errors.message}</span>
                </div>
                <div>
                  <button type="submit" disabled={isLoading}>
                    {" "}
                    {isLoading ? " Loading..." : "Send"}{" "}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUSFormModal;
