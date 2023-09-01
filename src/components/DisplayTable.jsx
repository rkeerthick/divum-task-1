import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTable } from "react-table";
import { COLUMNS } from "./columns";
import axios from "axios";

const apiLink = "http://localhost:8080/api/v1/employees";

function DisplayTable({ values, setValues, isEdit, setIsEdit, totalData, setTotalData }) {
  const navigate = useNavigate();

  const [resultData, setResultData] = useState([]);

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => resultData, [resultData]);

  const tableInstance = useTable({
    columns,
    data,
  });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  const load = async () => {
    const result = await axios.get(apiLink + "/get");
    setResultData(result.data);
    setTotalData(result.data);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <nav>
        <img className="logo" src="./Divum_Logo_Color.png" alt="Logo" />
        <button
          onClick={() => navigate("/form")}
          className="add-btn px-18 btn-pointer border-none border-rds-5"
        >
          Add +{" "}
        </button>
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
                    <button
                      className="bg-blue border-none border-rds-5"
                      onClick={() => {
                        setValues(row.original);
                        setIsEdit(true);
                        navigate("/form");
                        console.log(values);
                      }}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      className="bg-red border-none border-rds-5"
                      onClick={async () => {
                        await axios.delete(
                          apiLink + "/delete/email=" + row.original.email
                        );
                        load();
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DisplayTable;
