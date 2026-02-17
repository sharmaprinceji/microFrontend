import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

export default function Login() {

  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await API.post("/auth/login", form);

      login(res.data.token);

      toast.success("Welcome back!");

      navigate("/");

    } catch (err) {

      setError(
        err.response?.data?.message ||
        "Invalid email or password"
      );

      toast.error("Login failed");
    }
  };

  return (

    <div style={styles.container}>

      <motion.form
        onSubmit={handleSubmit}
        style={styles.form}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >

        <h2 style={styles.title}>Welcome Back</h2>

        {error && (
          <motion.p
            style={styles.error}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.p>
        )}

        <motion.input
          name="email"
          type="email"
          placeholder="Email address"
          value={form.email}
          onChange={handleChange}
          required
          style={styles.input}
          whileFocus={styles.inputFocus}
        />

        <motion.input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          style={styles.input}
          whileFocus={styles.inputFocus}
        />

        <motion.button
          type="submit"
          style={styles.button}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Login
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
    background: "linear-gradient(135deg, #667eea, #764ba2)"
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
    textAlign: "center",
    marginBottom: "10px"
  },

  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    outline: "none",
    fontSize: "14px"
  },

  inputFocus: {
    scale: 1.03,
    borderColor: "#667eea",
    boxShadow: "0 0 8px rgba(102,126,234,0.5)"
  },

  button: {
    padding: "12px",
    background: "#667eea",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer"
  },

  error: {
    color: "red",
    fontSize: "14px"
  }

};
