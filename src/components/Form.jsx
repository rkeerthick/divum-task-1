import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

function Form({
  values,
  setValues,
  isEdit,
  setIsEdit,
  totalData,
  setTotalData,
}) {
  const navigate = useNavigate();
  console.log(totalData);

  console.log(new Date());

  const apiLink = "http://localhost:8080/api/v1/employees";

  const [data, setData] = useState({});

  const [error, setError] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    dob: "",
    address: "",
  });

  const validCharregex = /^[A-Za-z]+$/;
  const validEmailregex = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
  const validNameregex = /^[A-Za-z]+$/;
  const validMobileNo = /^(\d{3})[- ]?(\d{3})[- ]?(\d{4})$/;

  const emailValidate = () => {
    if (values.email !== "" && validEmailregex.test(values.email)) {
      for (let i = 0; i < totalData.length; i++) {
        if (values.email === totalData[i].email) {
          setError({ ...error, email: "Email ID already exists." });
          return;
        }
      }
    } else {
      setError({ ...error, email: "Invalid email" });
      return;
    }

    setError({ ...error, email: "" });
  };

  const firstNameValidate = () => {
    if (values.firstName !== "" && validCharregex.test(values.firstName)) {
      setError({ ...error, firstName: "" });
    } else {
      setError({ ...error, firstName: "Invalid first name" });
    }
  };

  const lastNameValidate = () => {
    if (values.lastName !== "" && validCharregex.test(values.lastName)) {
      setError({ ...error, lastName: "" });
    } else {
      setError({ ...error, lastName: "Invalid last name" });
    }
  };

  const phoneNumberValidate = () => {
    // console.log("ph",values.phoneNumber.length)
    if (values.phoneNumber.length < 10) {
      setError({ ...error, phoneNumber: "Invalid phone number" });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(values);
    console.log("yn");
    setData(values);
    if (isEdit === false) {
      console.log("y");
      await axios.post(apiLink + "/post", values);
    } else {
      console.log("n");
      setIsEdit(false);
      await axios.put(apiLink + "/update/email=" + values.email, values);
    }
    navigate(-1);
  };

  return (
    <div>
      <nav className="form-nav">
        <img className="logo" src="./Divum_Logo_Color.png" alt="Logo" />
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
            value={values.email}
            onBlur={emailValidate}
            onChange={(event) => {
              setValues({ ...values, email: event.target.value });
            }}
          />
          <p>{error.email}</p>
        </div>
        <div className="form-group">
          <label htmlFor="first_name">First Name</label>
          <input
            type="text"
            name="first_name"
            value={values.firstName}
            onBlur={firstNameValidate}
            onChange={(event) =>
              setValues({ ...values, firstName: event.target.value })
            }
          />
          <p>{error.firstName}</p>
        </div>
        <div className="form-group">
          <label htmlFor="last_name">Last Name</label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={values.lastName}
            onBlur={lastNameValidate}
            onChange={(event) => {
              setValues({ ...values, lastName: event.target.value });
            }}
          />
          <p>{error.lastName}</p>
        </div>
        <div className="form-group">
          <label htmlFor="ph_no">Phone</label>

          <input
            type="text"
            name="ph_no"
            value={values.phoneNumber}
            maxLength={10}
            onBlur={phoneNumberValidate}
            onChange={(event) => {
              setValues({ ...values, phoneNumber: event.target.value });
              // phoneNumberValidate();
            }}
          />
          <p>{error.phoneNumber}</p>
        </div>
        <div className="form-group">
          <label htmlFor="dob">DOB</label>

          {/* <input
          className="display-block"
            type="date"
            name="dob"
            value={values.dob}
            onChange={(event) =>
              setValues({ ...values, dob: event.target.value })
            }
          /> */}
          <DatePicker
            selected={values.dob}
            onChange={(dob) => setValues(dob)}
          />

          <p>{error.dob}</p>
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>

          <textarea
            name="address"
            id=""
            cols="30"
            rows="3"
            maxLength={50}
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
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Form;
