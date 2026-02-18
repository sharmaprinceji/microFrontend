import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaTrash, FaEdit } from "react-icons/fa";
import API from "../api/axios";
import { useFavorites } from "../context/FavoritesContext";

export default function ProductCard({

    product,

    showDelete = true,

    showEdit = false,

    showDescription = false

}) {

    const navigate = useNavigate();

    const { toggleFavorite, isFavorite } =
        useFavorites();

    const favorite =
        isFavorite(product._id);


    const handleDelete = async (e) => {

        e.stopPropagation();

        if (!window.confirm("Delete product?"))
            return;

        try {

            await API.delete(
                `/products/${product._id}`
            );

            alert("Product deleted");

            window.location.reload();

        }

        catch {

            alert("Delete failed");

        }

    };


    return (

        <motion.div

            style={styles.card}

            whileHover={{ scale: 1.05 }}

            onClick={() =>
                navigate(`/products/${product._id}`)
            }

        >

            {/* IMAGE */}
            <img
                src={product.image}
                alt={product.title}
                style={styles.image}
            />


            {/* TITLE + ICONS */}
            <div style={styles.titleRow}>

                <h3 style={styles.title}>
                    {product.title}
                </h3>


                <div style={styles.iconGroup}>

                    {showEdit && (

                        <FaEdit

                            style={styles.editIcon}

                            onClick={(e) => {

                                e.stopPropagation();

                                navigate(
                                    `/edit-product/${product._id}`
                                );

                            }}

                        />

                    )}


                    {showDelete && (

                        <FaTrash

                            style={styles.deleteIcon}

                            onClick={handleDelete}

                        />

                    )}

                </div>

            </div>


            {/* PRICE */}
            <p style={styles.price}>
                ₹ {product.price}
            </p>


            {/* DESCRIPTION (only when enabled) */}
            {showDescription && (

                <p style={styles.description}>
                    {product.description}
                </p>

            )}


            {/* FAVORITE BUTTON */}
            <motion.button

                onClick={(e) => {

                    e.stopPropagation();

                    toggleFavorite(
                        product._id
                    );

                }}

                style={{
                    ...styles.favoriteBtn,
                    background:
                        favorite
                            ? "#ff4757"
                            : "#aaa"
                }}

                whileTap={{ scale: 0.9 }}

            >

                {favorite
                    ? "❤️ Favorited"
                    : "🤍 Favorite"}

            </motion.button>

        </motion.div>

    );

}


const styles = {

    card: {

        border: "1px solid #ddd",

        padding: "12px",

        borderRadius: "10px",

        background: "white",

        cursor: "pointer",

        display: "flex",

        flexDirection: "column",

        gap: "6px"

    },

    image: {

        width: "100%",

        height: "150px",

        objectFit: "cover",

        borderRadius: "8px"

    },

    titleRow: {

        display: "flex",

        justifyContent: "space-between",

        alignItems: "center",

        marginTop: "5px"

    },

    title: {

        margin: 0,

        fontSize: "16px",

        fontWeight: "600"

    },

    iconGroup: {

        display: "flex",

        gap: "10px"

    },

    editIcon: {

        color: "#667eea",

        cursor: "pointer"

    },

    deleteIcon: {

        color: "#ff4757",

        cursor: "pointer"

    },

    price: {

        margin: "2px 0",

        fontWeight: "500"

    },

    description: {

        fontSize: "14px",

        color: "#555"

    },

    favoriteBtn: {

        padding: "6px",

        border: "none",

        borderRadius: "6px",

        color: "white",

        cursor: "pointer"

    }

};
