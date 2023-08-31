import React, { useState } from "react";
import DisplayTable from "./DisplayTable";
import Form from "./Form";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function Routing() {
  const [totalData, setTotalData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [values, setValues] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    dob: "",
    address: "",
  });
  return (
    <BrowserRouter>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <DisplayTable
              values={values}
              setValues={setValues}
              isEdit={isEdit}
              setIsEdit={setIsEdit}
              totalData={totalData}
              setTotalData={setTotalData}
            />
          }
        >
          <Route
            path="/display_table"
            element={
              <DisplayTable
                values={values}
                setValues={setValues}
                isEdit={isEdit}
                setIsEdit={setIsEdit}
                totalData={totalData}
                setTotalData={setTotalData}
              />
            }
          ></Route>
        </Route>
        <Route
          exact
          path="/form"
          element={
            <Form
              values={values}
              setValues={setValues}
              isEdit={isEdit}
              setIsEdit={setIsEdit}
              totalData={totalData}
              setTotalData={setTotalData}
            />
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Routing;
