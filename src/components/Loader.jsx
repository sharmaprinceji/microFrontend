import { motion } from "framer-motion";

export default function Loader({ fullScreen = false }) {

    return (

        <div style={{
            ...styles.container,
            ...(fullScreen && styles.fullScreen)
        }}>

            <motion.div
                style={styles.spinner}
                animate={{ rotate: 360 }}
                transition={{
                    repeat: Infinity,
                    duration: 1,
                    ease: "linear"
                }}
            />

        </div>

    );

}

const styles = {

    container: {

        display: "flex",

        justifyContent: "center",

        alignItems: "center",

        padding: "20px"

    },

    fullScreen: {

        height: "60vh"

    },

    spinner: {

        width: "40px",

        height: "40px",

        border: "4px solid #ddd",

        borderTop: "4px solid #667eea",

        borderRadius: "50%"

    }

};
