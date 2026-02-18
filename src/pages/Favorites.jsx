import { useEffect, useState } from "react";
import API from "../api/axios";
import ProductCard from "../components/ProductCard";
import ProductSkeleton from "../components/ProductSkeleton";
import Loader from "../components/Loader";
import { motion } from "framer-motion";

export default function Favorites() {

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [initialLoading, setInitialLoading] = useState(true);


  const fetchFavorites = async () => {

    setLoading(true);

    const start = Date.now();

    try {

      const res = await API.get("/products/favorites");

      setProducts(res.data.data || []);

    }

    catch (error) {

      console.error(error);

    }

    finally {

      const elapsed = Date.now() - start;

      const delay = Math.max(2000 - elapsed, 0);

      setTimeout(() => {

        setLoading(false);

        setInitialLoading(false);

      }, delay);

    }

  };


  useEffect(() => {

    fetchFavorites();

  }, []);


  //LOADER 
  if (initialLoading) {

    return (

      <div style={styles.centerLoader}>

        <Loader />

      </div>

    );

  }


  return (

    <motion.div
      style={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >

      <h2 style={styles.title}>
        Favorites Products
      </h2>


      {/* Skeleton while loading */}
      {loading ? (

        <div style={styles.grid}>

          {[...Array(6)].map((_, i) => (

            <ProductSkeleton key={i} />

          ))}

        </div>

      )

        : products.length === 0 ? (

          <div style={styles.emptyState}>

            <p>No favorite products yet</p>

          </div>

        )

          : (

            <div style={styles.grid}>

              {products.map(product => (

                <ProductCard
                  key={product._id}
                  product={product}
                />

              ))}

            </div>

          )}

    </motion.div>

  );

}


const styles = {

  container: {

    padding: "20px",

    maxWidth: "1200px",

    margin: "0 auto"

  },

  title: {

    marginBottom: "20px",

    fontWeight: "600"

  },

  grid: {

    display: "grid",

    gridTemplateColumns:
      "repeat(auto-fill, minmax(220px,220px))",

    justifyContent: "center",

    gap: "20px"

  },

  centerLoader: {

    height: "60vh",

    display: "flex",

    justifyContent: "center",

    alignItems: "center"

  },

  emptyState: {

    height: "40vh",

    display: "flex",

    justifyContent: "center",

    alignItems: "center",

    color: "#777",

    fontSize: "18px"

  }

};
