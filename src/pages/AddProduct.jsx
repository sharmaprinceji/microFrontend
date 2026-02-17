import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function AddProduct() {

  const navigate = useNavigate();

  const [form, setForm] = useState({

    title: "",
    price: "",
    description: "",
    image: ""

  });


  const handleChange = (e) => {

    setForm({

      ...form,

      [e.target.name]: e.target.value

    });
  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    await API.post("/products", form);

    alert("Product added");

    navigate("/products");
  };


  return (

    <motion.div
      style={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >

      <form
        onSubmit={handleSubmit}
        style={styles.form}
      >

        <h2>Add Product</h2>

        <input
          name="title"
          placeholder="Title"
          onChange={handleChange}
        />

        <input
          name="price"
          placeholder="Price"
          onChange={handleChange}
        />

        <input
          name="image"
          placeholder="Image URL"
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
        />

        <motion.button
          whileHover={{ scale: 1.05 }}
        >
          Add Product
        </motion.button>

      </form>

    </motion.div>
  );
}


const styles = {

  container: {
    display: "flex",
    justifyContent: "center",
    padding: "40px"
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    width: "300px"
  }

};
