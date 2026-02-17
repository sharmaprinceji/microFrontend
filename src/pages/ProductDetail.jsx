import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";
import { motion } from "framer-motion";
import { useFavorites } from "../context/FavoritesContext";

export default function ProductDetail() {

  const { id } = useParams();

  const { toggleFavorite, isFavorite } =
    useFavorites();

  const favorite =
    isFavorite(id);

  const [product, setProduct] =
    useState(null);


  useEffect(() => {

    API.get(`/products/${id}`)
      .then(res =>
        setProduct(
          res.data.data || res.data
        )
      );

  }, [id]);


  if (!product)
    return (
      <div style={styles.loading}>
        Loading...
      </div>
    );


  return (

    <motion.div
      style={styles.page}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >

      <motion.div
        style={styles.card}
        initial={{ y: 40 }}
        animate={{ y: 0 }}
        whileHover={{
          scale: 1.01
        }}
      >

        {/* Image */}
        <motion.img
          src={product.image}
          alt={product.title}
          style={styles.image}
          whileHover={{ scale: 1.05 }}
        />


        {/* Details */}
        <div style={styles.details}>

          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {product.title}
          </motion.h2>


          <motion.p
            style={styles.description}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {product.description}
          </motion.p>


          <motion.h3
            style={styles.price}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
          >
            ₹ {product.price}
          </motion.h3>


          {/* Favorite Button */}
          <motion.button

            onClick={() =>
              toggleFavorite(id)
            }

            style={{
              ...styles.button,
              background:
                favorite
                  ? "#ff4757"
                  : "#aaa"
            }}

            whileHover={{
              scale: 1.08
            }}

            whileTap={{
              scale: 0.95
            }}

          >

            {favorite
              ? "❤️ Favorited"
              : "🤍 Add Favorite"}

          </motion.button>

        </div>

      </motion.div>

    </motion.div>

  );
}


const styles = {

  page: {
    display: "flex",
    justifyContent: "center",
    padding: "20px"
  },

  card: {
    display: "flex",
    flexWrap: "wrap",
    gap: "25px",
    maxWidth: "800px",
    width: "100%",
    background: "white",
    borderRadius: "12px",
    padding: "20px",
    boxShadow:
      "0 6px 20px rgba(0,0,0,0.15)"
  },

  image: {
    width: "100%",
    maxWidth: "320px",
    borderRadius: "10px",
    objectFit: "cover"
  },

  details: {
    flex: "1",
    minWidth: "250px"
  },

  description: {
    marginTop: "10px",
    color: "#555"
  },

  price: {
    marginTop: "15px",
    color: "#2ecc71"
  },

  button: {
    marginTop: "20px",
    padding: "12px 20px",
    border: "none",
    borderRadius: "8px",
    color: "white",
    cursor: "pointer",
    fontSize: "16px"
  },

  loading: {
    padding: "40px",
    textAlign: "center"
  }

};
