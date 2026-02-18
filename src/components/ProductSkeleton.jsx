import { motion } from "framer-motion";

export default function ProductSkeleton() {

    return (

        <motion.div
            style={styles.card}
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{
                repeat: Infinity,
                duration: 1.5
            }}
        >

            <div style={styles.image} />

            <div style={styles.title} />

            <div style={styles.price} />

        </motion.div>

    );

}

const styles = {

    card: {

        padding: "10px",

        borderRadius: "10px",

        background: "#f3f3f3"

    },

    image: {

        height: "150px",

        background: "#ddd",

        borderRadius: "8px"

    },

    title: {

        height: "20px",

        background: "#ddd",

        marginTop: "10px",

        borderRadius: "4px"

    },

    price: {

        height: "15px",

        background: "#ddd",

        marginTop: "6px",

        width: "60%",

        borderRadius: "4px"

    }

};
