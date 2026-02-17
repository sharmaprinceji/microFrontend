import { useEffect, useState } from "react";
import API from "../api/axios";
import ProductCard from "../components/ProductCard";
import { motion } from "framer-motion";

export default function Favorites() {

  const [products, setProducts] =
    useState([]);


  const fetchFavorites = async () => {

    const res =
      await API.get(
        "/products/favorites"
      );

    setProducts(res.data.data);
  };


  useEffect(() => {

    fetchFavorites();

  }, []);


  return (

    <motion.div
      style={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >

      <h2>Favorites ❤️</h2>

      <div style={styles.grid}>

        {products.map(product => (

          <ProductCard
            key={product._id}
            product={product}
          />

        ))}

      </div>

    </motion.div>
  );
}


const styles = {

  container: {
    padding: "20px"
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fill, minmax(220px,1fr))",
    gap: "20px"
  }

};
