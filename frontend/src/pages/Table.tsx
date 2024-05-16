import  { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

type DataType = {
  _id: string;
  name: string;
  phoneNumber: number;
  email: string;
  hobbies: string;
};

const Table = () => {
  const [data, setData] = useState<DataType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const handleDelete = async (id: string) => {
     await axios.delete(
      `${import.meta.env.VITE_SERVER}/api/v1/details/${id}`
    );
    fetchData();
  };

  const handleCheckboxChange = (id: string) => {
    const selectedIndex = selectedRows.indexOf(id);
    if (selectedIndex === -1) {
      setSelectedRows([...selectedRows, id]); // Add to selected rows
    } else {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id)); // Remove from selected rows
    }
  };

  const handelclick = async() =>{
    for (let index = 0; index < selectedRows.length; index++) {
      const element = selectedRows[index];
       await axios.get(
      `${import.meta.env.VITE_SERVER}/api/v1/details/mail/${element}`
      );
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER}/api/v1/details/all`
      );
      setData(response.data.requiredinterfaces);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };


  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div>
            <h1>Data Table</h1>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Hobbies</th>
                  <th>Ph Number</th>
                  <th>
                    Actions{" "}
                    <Link to={"/create"}>
                      <FaPlus />
                    </Link>
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item._id}>
                    <td>{item._id}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.hobbies}</td>
                    <td>{item.phoneNumber}</td>
                    <td className="action-icons">
                      <FaTrashAlt onClick={() => handleDelete(item._id)} />
                      <Link to={`/${item._id}`}>
                        <FaEdit />
                      </Link>
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(item._id)}
                        onChange={() => handleCheckboxChange(item._id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="sendmail" onClick={()=> handelclick()}>
              Send
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default Table;
