import { useEffect, useState } from "react";
import Modal from "react-modal";
import Swal from 'sweetalert2'
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const PopUp = (props: any) => {
  const [email, setEmail] = useState("");
  const [data, setData] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  async function sendEmail() {
    if (emailRegex.test(email) && data)
      // window.location.href = `mailto:${email}?subject=Subject&body=${data}`;
    // let signedTransactionStr = "this is the signed transaction"
    // console.log(signedTransactionStr)
       // Default options are marked with *
       // http://150.239.170.180:4000/send-email
        await fetch("http://localhost:4000/send-email", {
         method: 'POST', // *GET, POST, PUT, DELETE, etc.
          //mode: '*cors', // no-cors, *cors, same-origin?
         // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
         // credentials: 'same-origin', // include, *same-origin, omit
         headers: {
           'Content-Type': 'application/json',
           'Accept': 'application/json',
           'Access-Control-Allow-Origin': 'http://localhost:3000',
       
           // 'Content-Type': 'application/x-www-form-urlencoded',
         },
      
         // redirect: 'follow', // manual, *follow, error
         // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
         body: JSON.stringify({message:data,email}) // body data type must match "Content-Type" header
       }).then(data=>{
         console.info(data)
         if(data)
         Swal.fire(
             
             'success'
           )
           else
           Swal.fire(
             'Error!',
             "Please enter valid email !"
           )
       }).catch(error=> {
         console.log("error send "+error)
         Swal.fire(
             'Error!',
             
             'error'
           )
         });
       // return response.json(); // parses JSON response into native JavaScript objects
     
  }
  useEffect(() => {
    isFormValid();
  }, [email, data]);

  function isFormValid() {
    if (emailRegex.test(email) && data) setIsDisabled(false);
    else setIsDisabled(true);
  }

  function handleEmailChange(event: any) {
    let email = event.target.value;
    setEmail(email);
  }
  function handleDataChange(event: any) {
    let data = event.target.value;
    setData(data);
  }

  return (
    <Modal
      isOpen={props.isOpen}
      // onAfterOpen={afterOpenModal}
      onRequestClose={props.close}
      style={customStyles}
      contentLabel="Example Modal"
    >
      {/* <button onClick={props.close}>x</button> */}
      <i className="fas fa-times" onClick={props.close}></i>
      <h2 className="title">Send transaction data</h2>
      <div>
        <div className="form-group">
          <label htmlFor="">Email</label>
          <input
            type="email"
            className="form-control"
            onChange={handleEmailChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor=""></label>
          <textarea
            name=""
            id=""
            cols={30}
            rows={10}
            className="form-control"
            onChange={handleDataChange}
          ></textarea>
        </div>

        <button
          disabled={isDisabled}
          type="submit"
          onClick={sendEmail}
          className="btn btn-success"
        >
          send email
        </button>
      </div>
    </Modal>
  );
  
};
export default PopUp;


