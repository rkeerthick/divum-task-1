import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import emailjs from "@emailjs/browser";

import "react-datepicker/dist/react-datepicker.css";

function Form({
  values,
  setValues,
  isEdit,
  setIsEdit,
  totalData,
  setTotalData,
  load,
  setUserAdded,
  setUserEdited,
}) {
  const navigate = useNavigate();
  // console.log(totalData);

  // console.log(tData, "tData");

  // console.log(new Date());

  const apiLink = "http://localhost:8080/api/v1/employees";

  const [data, setData] = useState({});

  const [readOnly, setReadOnly] = useState(false);

  const [error, setError] = useState({
    email: "",
    phoneNumber: "",
    firstName: "",
    lastName: "",
    dob: "",
    address: "",
  });

  useEffect(() => {
    load();
    isEdit ? setReadOnly(true) : setReadOnly(false);
    // setTotalData(load().data);
  }, []);

  const validCharregex = /^[A-Za-z]+$/;
  const validEmailregex = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
  const validNameregex = /^[A-Za-z]+$/;
  const validMobileNo = /^(\d{3})[- ]?(\d{3})[- ]?(\d{4})$/;
  const validNumber = /^[0-9]*$/;

  const emailValidate = () => {
    console.log(values);
    if (isEdit === false) {
      if (values.email !== "") {
        console.log("1");
        if (validEmailregex.test(values.email)) {
          console.log("2 ", totalData);
          for (let i = 0; i < totalData.length; i++) {
            console.log("3");
            if (values.email === totalData[i].email) {
              console.log("checking email already");
              setError({ ...error, email: "Email ID already exists." });
              return false;
            } else {
              setError({ ...error, email: "" });
            }
          }
        } else {
          setError({ ...error, email: "Invalid Email" });
          return false;
        }
      } else {
        setError({ ...error, email: "Enter email id" });
        return false;
      }
    }

    setError({ ...error, email: "" });
    return true;
  };

  const firstNameValidate = () => {
    if (values.firstName !== "") {
      if (validCharregex.test(values.firstName) === false) {
        setError({ ...error, firstName: "Enter only alphabets..." });
        return false;
      }
    } else {
      setError({ ...error, firstName: "Enter first name" });
      return false;
    }

    setError({ ...error, firstName: "" });
    return true;
  };

  const lastNameValidate = () => {
    if (values.lastName !== "") {
      if (validCharregex.test(values.lastName) === false) {
        setError({ ...error, lastName: "Enter only alphabets..." });
        return false;
      }
    } else {
      setError({ ...error, lastName: "Enter last name" });
      return false;
    }
    setError({ ...error, lastName: "" });
    return true;
  };

  const phoneNumberValidate = () => {
    if (values.phoneNumber === "") {
      setError({ ...error, phoneNumber: "Enter phone number" });
    } else if (!validMobileNo.test(values.phoneNumber)) {
      setError({ ...error, phoneNumber: "Invalid phone number." });
    } else {
      setError({ ...error, phoneNumber: "" });
      return true;
    }
    return false;
  };

  const dateValidate = () => {
    if (values.dob === "") {
      setError({ ...error, dob: "Enter date of birth" });
      return false;
    } else {
      setError({ ...error, dob: "" });
      return true;
    }
  };

  const addressValidate = () => {
    if (values.address === "") {
      setError({ ...error, address: "Enter your address." });
      return false;
    }
    setError({ ...error, address: "" });
    return true;
  };

  const notify = () =>
    toast.error("Enter the feilds", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(error, "error");
    console.log(error.phoneNumber, "error-phonenumber");
    if (
      !(
        emailValidate() &&
        firstNameValidate() &&
        lastNameValidate() &&
        addressValidate() &&
        phoneNumberValidate()
      )
    ) {
      notify();
      return;
    }
    console.log("ers ", error.email);
    if (error.email !== "") {
      alert("Error");
      return;
    }
    console.log(error, "errors");
    // console.log("yn");
    setData(values);
    if (isEdit === false) {
      console.log("y", values);
      setUserAdded(true);
      // setValues({ ...values, updatedDate: new Date().toISOString().split("T")[0] })
      await axios.post(apiLink + "/post", values);
    } else {
      console.log("n");
      setUserEdited(true);
      setIsEdit(false);
      // setValues({ ...values, updatedDate: new Date().toISOString().split("T")[0] })
      await axios.put(apiLink + "/update/email=" + values.email, values);
    }
    setValues({
      email: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      dob: "",
      address: "",
    });
    navigate(-1);
  };

  return (
    <div>
      <nav className="form-nav">
        <img
          className="logo btn-  pointer"
          src="./Divum_Logo_Color.png"
          alt="Logo"
          onClick={handleLogoClick}
        />
        {/* <button
          onClick={() => navigate("/display_table")}
          className="add-btn px-18 btn-pointer border-none border-rds-5"
        >
          Tables
        </button> */}
      </nav>
      <form className="my-form" action="">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            data-testid="email"
            readOnly={readOnly}
            value={values.email}
            placeholder="Enter your email"
            onBlur={emailValidate}
            onChange={(event) => {
              setValues({ ...values, email: event.target.value });
            }}
          />
          <p data-testid="email-error-msg">{error.email}</p>
        </div>
        <div className="form-group">
          <label htmlFor="first_name">First Name</label>
          <input
            type="text"
            name="first_name"
            data-testid="firstName"
            value={values.firstName}
            placeholder="Enter you first name"
            onBlur={firstNameValidate}
            onChange={(event) =>
              setValues({ ...values, firstName: event.target.value })
            }
          />
          <p data-testid="firstName-error-msg">{error.firstName}</p>
        </div>
        <div className="form-group">
          <label htmlFor="last_name">Last Name</label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            data-testid="lastName"
            value={values.lastName}
            placeholder="Enter your last name"
            onBlur={lastNameValidate}
            onChange={(event) => {
              setValues({ ...values, lastName: event.target.value });
            }}
          />
          <p data-testid="lastName-error-msg">{error.lastName}</p>
        </div>
        <div className="form-group">
          <label htmlFor="ph_no">Phone</label>
          <input
            type="text"
            name="ph_no"
            data-testid="phoneNumber"
            value={values.phoneNumber}
            placeholder="Enter your phone number"
            maxLength={10}
            onBlur={phoneNumberValidate}
            onChange={(event) => {
              setValues({ ...values, phoneNumber: event.target.value });
              // phoneNumberValidate();
            }}
          />
          {console.log("error", error.phoneNumber)}
          <p data-testid="phNo-error-msg">{error.phoneNumber}</p>
        </div>
        <div className="form-group">
          <label htmlFor="dob">DOB</label>

          <input
            className="display-block"
            type="date"
            name="dob"
            data-testid="dob"
            value={values.dob}
            placeholder="Enter your DOB"
            onBlur={dateValidate}
            onChange={(event) =>
              setValues({ ...values, dob: event.target.value })
            }
            max={new Date().toISOString().split("T")[0]}
          />
          {/* <DatePicker
            selected={values.dob}
            onChange={(dob) => setValues(dob)}
          /> */}

          <p data-testid="dob-error-msg">{error.dob}</p>
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>

          <textarea
            name="address"
            id=""
            cols="30"
            rows="3"
            maxLength={50}
            onBlur={addressValidate}
            placeholder="Enter your address"
            value={values.address}
            onChange={(event) =>
              setValues({ ...values, address: event.target.value })
            }
          ></textarea>
          <p>{error.address}</p>
        </div>
        <button
          className="button bg-orange px-24-bold btn-pointer"
          onClick={handleSubmit}
          data-testid="submit"
        >
          {isEdit ? "Update" : "Submit"}
          {/* <FaSave /> */}
        </button>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </form>
    </div>
  );
}

export default Form;
