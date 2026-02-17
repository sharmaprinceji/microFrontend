import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Home() {

  const navigate = useNavigate();

  return (

    <motion.div
      style={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >

      <motion.h1
        initial={{ y: -30 }}
        animate={{ y: 0 }}
      >
        🛒 MicroMarket
      </motion.h1>


      <p style={styles.description}>

        MicroMarket is a modern micro marketplace application
        built using React, Node.js, Express, and MongoDB.

        Users can browse products, search items, and add
        favorites securely using JWT authentication.

      </p>


      <motion.button
        style={styles.button}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate("/products")}
      >
        Browse Products
      </motion.button>

    </motion.div>
  );
}


const styles = {

  container: {
  padding: "20px",
  textAlign: "center"
},

description: {
  fontSize: "16px",
  padding: "0 10px"
},


  button: {
    padding: "12px 20px",
    background: "#667eea",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer"
  }

};
