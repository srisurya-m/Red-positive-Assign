import axios from "axios";
import { ChangeEvent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Update = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    hobbies: "",
    email: "",
  });

  const { id } = useParams();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response  = await axios.put(`${import.meta.env.VITE_SERVER}/api/v1/details/${id}`,formData)
    setFormData({
      name: "",
      phoneNumber: "",
      hobbies: "",
      email: "",
    });
    navigate("/")
  };
  return (
    <form onSubmit={handleSubmit} className="my-form">
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Phone Number:</label>
        <input
          type="number"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Hobbies:</label>
        <input
          type="text"
          name="hobbies"
          value={formData.hobbies}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Update;
