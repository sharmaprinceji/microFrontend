import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";
import ProductCard from "../components/ProductCard";
import ProductSkeleton from "../components/ProductSkeleton";
import Loader from "../components/Loader";
import { motion } from "framer-motion";

export default function ProductDetail() {

  const { id } = useParams();

  const [product, setProduct] = useState(null);

  const [loading, setLoading] = useState(true);

  const [initialLoading, setInitialLoading] = useState(true);


  const fetchProduct = async () => {

    setLoading(true);

    const start = Date.now();

    try {

      const res = await API.get(`/products/${id}`);

      setProduct(
        res.data.data || res.data
      );

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

    fetchProduct();

  }, [id]);


  //CENTER LOADER...
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

      {loading ? (

        //Skeleton while loading
        <ProductSkeleton />

      ) : (

        //Real Product
        <ProductCard
          product={product}
          showDelete={false}
          showEdit={true}
          showDescription={true}
        />

      )}

    </motion.div>

  );

}


const styles = {

  container: {

    padding: "20px",

    maxWidth: "400px",

    margin: "auto"

  },

  centerLoader: {

    height: "60vh",

    display: "flex",

    justifyContent: "center",

    alignItems: "center"

  }

};
