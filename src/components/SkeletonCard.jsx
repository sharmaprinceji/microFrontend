import { motion } from "framer-motion";

export default function SkeletonCard() {

  return (

    <motion.div

      animate={{ opacity: [0.5, 1, 0.5] }}

      transition={{
        repeat: Infinity,
        duration: 1.2
      }}

      style={styles.card}

    >

      <div style={styles.image}></div>

      <div style={styles.text}></div>

      <div style={styles.textSmall}></div>

    </motion.div>

  );
}

const styles = {

  card: {
    padding: "15px",
    borderRadius: "10px",
    background: "#eee"
  },

  image: {
    height: "150px",
    background: "#ddd",
    marginBottom: "10px",
    borderRadius: "8px"
  },

  text: {
    height: "20px",
    background: "#ddd",
    marginBottom: "8px"
  },

  textSmall: {
    height: "15px",
    background: "#ddd",
    width: "50%"
  }

};
