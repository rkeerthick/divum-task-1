import React, { useEffect, useState } from "react";
import DisplayTable from "./DisplayTable";
import Form from "./Form";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";

const apiLink = "http://localhost:8080/api/v1/employees";

function Routing() {
  const [totalData, setTotalData] = useState([]);
  const [totalTenData, setTotalTenData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [userAdded, setUserAdded] = useState(false);
  const [userEdited, setUserEdited] = useState(false);
  const [values, setValues] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    dob: "",
    address: "",
    updatedDate: "",
  });

  const [resultData, setResultData] = useState([]);

  const displayLoad = async () => {
    const result = await axios.get(apiLink + "/get10/0/10");
    if(result != undefined) {
    setTotalTenData(result.data);
    setResultData(result.data.content);

    }
  };

  const load = async () => {
    const result = await axios.get(apiLink + "/get");
    // return result;
    if(result !== undefined)
      setTotalData(result.data);
    // setResultData(result.data);
  };

  return (
    // <BrowserRouter>
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
              load={load}
              resultData={resultData}
              setResultData={setResultData}
              userAdded={userAdded}
              setUserAdded={setUserAdded}
              userEdited={userEdited}
              setUserEdited={setUserEdited}
              displayLoad={displayLoad}
              totalTenData={totalTenData}
              setTotalTenData={setTotalTenData}
            />
          }
        >
          {/* <Route
            path="/display_table"
            element={
              <DisplayTable
                values={values}
                setValues={setValues}
                isEdit={isEdit}
                setIsEdit={setIsEdit}
                totalData={totalData}
                setTotalData={setTotalData}
                load={load}
                resultData={resultData}
                setResultData={setResultData}
                userAdded={userAdded}
                setUserAdded={setUserAdded}
                userEdited={userEdited}
                setUserEdited={setUserEdited}
                displayLoad={displayLoad}
                totalTenData={totalTenData}
                setTotalTenData={setTotalTenData}
              />
            }
          ></Route> */}
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
              load={load}
              userAdded={userAdded}
              setUserAdded={setUserAdded}
              userEdited={userEdited}
              setUserEdited={setUserEdited}
            />
          }
        ></Route>
      </Routes>
    // </BrowserRouter>
  );
}

export default Routing;
