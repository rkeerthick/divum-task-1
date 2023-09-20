import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTable } from "react-table";
import { COLUMNS } from "../columns";
import axios from "axios";
import { BsPersonFillAdd } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Modal.css";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const apiLink = "http://localhost:8080/api/v1/employees";

function DisplayTable({
  values,
  setValues,
  isEdit,
  setIsEdit,
  totalData,
  setTotalData,
  load,
  resultData,
  userAdded,
  setUserAdded,
  userEdited,
  setUserEdited,

  displayLoad,
}) {
  const navigate = useNavigate();
  const locate = useLocation();

  const receivedData = locate.state;
  // console.log(receivedData, "recieved data");

  // const [resultData, setResultData] = useState([]);
  console.log(resultData, "result data");
  console.log("displaytable");

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => resultData, [resultData]);

  const tableInstance = useTable({
    columns,
    data,
  });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  // const load = async () => {
  //   const result = await axios.get(apiLink + "/get");
  //   setResultData(result.data);
  //   setTotalData(result.data);
  // };

  useEffect(() => {
    // load();
    displayLoad();
    if (userAdded) {
      toast.success("Successfully added!!!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else if (userEdited) {
      toast.success("Successfully updated!!!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    setUserEdited(false);
    setUserAdded(false);
  }, []);

  const [modal, setModal] = useState(false);

  const [deleteMail, setDeleteMail] = useState("");

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  return (
    <div>
      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h2 className="text-red">Delete User!!!</h2>
            <p>Do you want to delete the user ?</p>
            <button className="cancel-btn cancel-modal" onClick={toggleModal}>
              No
            </button>
            <button
              className="delete-btn delete-modal"
              onClick={async () => {
                await axios.delete(apiLink + "/delete/email=" + deleteMail);
                displayLoad();
                toggleModal();
                setDeleteMail("");
              }}
              // onClick={() => console.log(deleteMail)}
            >
              Yes
            </button>
          </div>
        </div>
      )}
      <nav>
        <img className="logo" src="./Divum_Logo_Color.png" alt="Logo" />
        {/* <button
          onClick={() => navigate("/form")}
          className="add-btn px-18 btn-pointer border-none border-rds-5"
        >
          Add +{" "}
        </button> */}
        <BsPersonFillAdd
          data-testid="add-btn"
          onClick={() => navigate("/form")}
          className="add-icon add-btn btn-pointer"
        />
      </nav>
      <div>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headergroup) => (
              <tr {...headergroup.getHeaderGroupProps()}>
                {headergroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
                <th colSpan={2}>Edit/Delete</th>
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                  <td>
                    {/* <button
                      className="bg-blue border-none border-rds-5"
                      onClick={() => {
                        setValues(row.original);
                        setIsEdit(true);
                        navigate("/form");
                        console.log(values);
                      }}
                    >
                      Edit
                    </button> */}
                    <FaEdit
                      className="icon btn-pointer"
                      onClick={() => {
                        setValues(row.original);
                        setIsEdit(true);
                        navigate("/form");
                        // console.log(values);
                      }}
                    />
                  </td>
                  <td>
                    {/* <button
                      className="bg-red border-none border-rds-5"
                      onClick={async () => {
                        await axios.delete(
                          apiLink + "/delete/email=" + row.original.email
                        );
                        load();
                      }}
                    >
                      Delete
                    </button> */}
                    <RiDeleteBin6Line
                      className="icon btn-pointer"
                      // onClick={async () => {
                      //   await axios.delete(
                      //     apiLink + "/delete/email=" + row.original.email
                      //   );
                      //   load();
                      // }}
                      onClick={async() => {
                        
                        setDeleteMail(row.original.email);
                        toggleModal();
                        await axios.get(
                          apiLink + "/sendmail/" + row.original.email
                        );
                      }}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
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
          theme="light"
        />
      </div>
    </div>
  );
}

export default DisplayTable;
