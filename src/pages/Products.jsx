import { useEffect, useState } from "react";
import API from "../api/axios";
import ProductCard from "../components/ProductCard";
import { motion } from "framer-motion";

export default function Products() {

  const [products, setProducts] = useState([]);

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);


  const fetchProducts = async () => {

    try {

      const res = await API.get(
        `/products?search=${search}&page=${page}&limit=8`
      );

      setProducts(res.data.data);

      setTotalPages(res.data.pages);

    } catch (error) {

      console.error(error);
    }
  };


  useEffect(() => {

    fetchProducts();

  }, [search, page]);


  return (

    <motion.div
      style={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >

      {/* Search */}
      <motion.input
        placeholder="Search products..."
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        style={styles.search}
        whileFocus={{ scale: 1.03 }}
      />


      {/* Products Grid */}
      <div style={styles.grid}>

        {products.map(product => (

          <ProductCard
            key={product._id}
            product={product}
          />

        ))}

      </div>


      {/* Pagination */}
      <div style={styles.pagination}>

        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          style={styles.pageBtn}
        >
          ← Prev
        </button>


        <span>
          Page {page} of {totalPages}
        </span>


        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          style={styles.pageBtn}
        >
          Next →
        </button>

      </div>

    </motion.div>
  );
}


const styles = {

  container: {
    padding: "20px"
  },

  search: {
    padding: "10px",
    width: "100%",
    maxWidth: "400px",
    marginBottom: "20px",
    borderRadius: "8px",
    border: "1px solid #ddd"
  },

grid: {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(220px, 220px))",
  justifyContent: "center",
  gap: "20px"
},


  pagination: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "15px"
  },

  pageBtn: {
    padding: "8px 15px",
    borderRadius: "6px",
    border: "none",
    background: "#667eea",
    color: "white",
    cursor: "pointer"
  }

};
