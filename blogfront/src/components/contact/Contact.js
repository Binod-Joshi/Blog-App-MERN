import React, { useRef, useState } from 'react'
import "./Contact.css"
import { MdOutlineEmail } from "react-icons/md"
import { FaLinkedin } from 'react-icons/fa'
import { FaGithub } from 'react-icons/fa'
import emailjs from '@emailjs/browser';

const Contact = ({ redirectHandler }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const form = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    emailjs.sendForm('service_6kaeqf9','template_kk0rfhc',form.current,'laZo32ZKUxQCJTyb1')      .then((result) => {
        console.log(result.text);
        setMessage("Message sent successfully")
        setShowPopup(true)
      },
        (error) => {
          console.log(error.text);
          setMessage("Internal Error")
          setShowPopup(true)
        });
  }
  if(showPopup){
    setTimeout(() => {
      setShowPopup(false)
      console.log("false")
    }, 5000);
  }

  return (
    <>
      <div className='contact-main-container'>
        <h2>Get in Touch</h2>

        <div className="contact__container">
          <div className="contact__options">
            <article className="contact__option" onClick={() => redirectHandler("mailto:binodjoshi849@gmail.com")}>
              <MdOutlineEmail className='contact__option-icon' />
              <h3>Email</h3>
              <h5>binodjoshi849@gmail.com </h5>
              <a className='link' href="mailto:binodjoshi849@gmail.com">Send an email</a>
            </article>
            <article className="contact__option" onClick={() => redirectHandler("https://www.linkedin.com/in/binod-joshi-481790252/")}>
              <FaLinkedin className='contact__option-icon' />
              <h3>Linkedin</h3>
              <h5>linkedin/in/binod-joshi-481790252/</h5>
              <a className='link' href="https://www.linkedin.com/in/binod-joshi-481790252/">Connect with me</a>
            </article>
            <article className="contact__option" onClick={() => redirectHandler("https://github.com/Binod-Joshi")}>
              <FaGithub className='contact__option-icon' />
              <h3>Github</h3>
              <h5>/Binod-Joshi</h5>
              <a className='link' href="https://github.com/Binod-Joshi">View my profile</a>
            </article>
          </div>

          <form ref={form} onSubmit={submitHandler}>
            <input type="text" name='user_name' autoFocus={true} className='name' placeholder='Your Full Name' required />
            <input type="email" name='user_email' className='email' placeholder='Your Email' required />
            <textarea name="message" rows="7" className='textarea' placeholder='Your Message' required ></textarea>
            <button type='submit' className="btn btn-primary" value="Send">Submit</button>
          </form>
        </div>
      </div>
      {showPopup && (
        <div className="msg-popups">
          <div className="msg-popups-content">
            <h2>{message}</h2>
          </div>
        </div>
      )}
    </>
  )
}

export default Contact
