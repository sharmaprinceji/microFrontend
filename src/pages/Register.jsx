import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

export default function Register() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await API.post("/auth/register", form);

      toast.success("Account created!");

      navigate("/login");

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Registration failed"
      );
    }
  };

  return (

    <div style={styles.container}>

      <motion.form
        onSubmit={handleSubmit}
        style={styles.form}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
      >

        <h2 style={styles.title}>Create Account</h2>

        <motion.input
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          required
          style={styles.input}
          whileFocus={styles.inputFocus}
        />

        <motion.input
          name="email"
          type="email"
          placeholder="Email address"
          onChange={handleChange}
          required
          style={styles.input}
          whileFocus={styles.inputFocus}
        />

        <motion.input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
          style={styles.input}
          whileFocus={styles.inputFocus}
        />

        <motion.button
          style={styles.button}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Register
        </motion.button>

      </motion.form>

    </div>
  );
}

const styles = {

  container: {
    height: "80vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #43cea2, #185a9d)"
  },

  form: {
    background: "white",
    padding: "25px",
    borderRadius: "12px",
    width: "75%",
    maxWidth: "320px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
  },

  title: {
    textAlign: "center"
  },

  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    outline: "none"
  },

  inputFocus: {
    scale: 1.03,
    borderColor: "#43cea2",
    boxShadow: "0 0 8px rgba(67,206,162,0.5)"
  },

  button: {
    padding: "12px",
    background: "#43cea2",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer"
  }

};
