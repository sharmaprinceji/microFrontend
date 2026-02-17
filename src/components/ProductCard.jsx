import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useFavorites } from "../context/FavoritesContext";

export default function ProductCard({ product }) {

  const { toggleFavorite, isFavorite } =
    useFavorites();

  const favorite =
    isFavorite(product._id);


  const handleFavorite = async (e) => {

    e.preventDefault();

    await toggleFavorite(product._id);
  };


  return (

    <Link
      to={`/products/${product._id}`}
      style={{
        textDecoration: "none",
        color: "black"
      }}
    >

      <motion.div
        style={styles.card}
        whileHover={{
          scale: 1.05,
          y: -5
        }}
        whileTap={{
          scale: 0.97
        }}
      >

        <motion.img
          src={product.image}
          alt={product.title}
          style={styles.image}
          whileHover={{ scale: 1.08 }}
        />


        <h3>{product.title}</h3>

        <p>₹ {product.price}</p>


        <motion.div
          onClick={handleFavorite}
          style={{
            fontSize: "22px",
            cursor: "pointer"
          }}
          whileTap={{ scale: 1.4 }}
          animate={{
            scale: favorite ? 1.2 : 1
          }}
        >
          {favorite ? "❤️" : "🤍"}
        </motion.div>

      </motion.div>

    </Link>
  );
}


const styles = {

  card: {
    border: "1px solid #ddd",
    padding: "15px",
    borderRadius: "10px",
    maxWidth: "220px",
    margin: "0 auto",
    background: "white"
  },

  image: {
    width: "100%",
    borderRadius: "8px"
  }

};
