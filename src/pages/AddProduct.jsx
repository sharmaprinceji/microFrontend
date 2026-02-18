import { useState, useRef } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Loader from "../components/Loader";

export default function AddProduct() {

    const navigate = useNavigate();
    const fileRef = useRef();

    const [form, setForm] = useState({

        title: "",
        price: "",
        description: "",
        image: null,
        imageUrl: ""

    });

    const [preview, setPreview] = useState(null);

    const [loading, setLoading] = useState(false);

    const [progress, setProgress] = useState(0);


    // text change
    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };


    // file select
    const handleFileChange = (file) => {

        if (!file) return;

        setForm({
            ...form,
            image: file,
            imageUrl: ""
        });

        setPreview(URL.createObjectURL(file));

    };


    // input file change
    const handleInputFile = (e) => {

        handleFileChange(e.target.files[0]);

    };


    // drag drop
    const handleDrop = (e) => {

        e.preventDefault();

        handleFileChange(e.dataTransfer.files[0]);

    };


    // url change
    const handleUrlChange = (e) => {

        const url = e.target.value;

        setForm({
            ...form,
            imageUrl: url,
            image: null
        });

        setPreview(url);

    };


    // submit
    const handleSubmit = async (e) => {

        e.preventDefault();

        if (loading) return;

        try {

            if (!form.image && !form.imageUrl) {

                alert("Select image file OR enter image URL");

                return;

            }

            if (form.image && form.imageUrl) {

                alert("Select only one: file OR URL");

                return;

            }

            setLoading(true);
            setProgress(0);

            const start = Date.now();

            const formData = new FormData();

            formData.append("title", form.title);
            formData.append("price", form.price);
            formData.append("description", form.description);

            if (form.image)
                formData.append("image", form.image);
            else
                formData.append("image", form.imageUrl);


            await API.post(

                "/products",

                formData,

                {

                    headers: {

                        "Content-Type": "multipart/form-data"

                    },

                    onUploadProgress: (event) => {

                        const percent = Math.round(
                            (event.loaded * 100) / event.total
                        );

                        setProgress(percent);

                    }

                }

            );

            // minimum 2 second loader
            const elapsed = Date.now() - start;

            const delay = Math.max(2000 - elapsed, 0);

            setTimeout(() => {

                alert("Product added successfully");

                navigate("/products");

            }, delay);

        }

        catch (error) {

            alert(
                error.response?.data?.message ||
                "Upload failed"
            );

        }

        finally {

            setTimeout(() => {

                setLoading(false);
                setProgress(0);

            }, 500);

        }

    };


    return (

        <motion.div
            style={styles.container}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >

            <motion.form
                onSubmit={handleSubmit}
                style={styles.form}
            >

                <h2>Add Product</h2>


                <motion.input
                    name="title"
                    placeholder="Product Title"
                    value={form.title}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    style={styles.input}
                    whileFocus={styles.inputFocus}
                />


                <motion.input
                    name="price"
                    type="number"
                    placeholder="Price"
                    value={form.price}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    style={styles.input}
                    whileFocus={styles.inputFocus}
                />


                <motion.textarea
                    name="description"
                    placeholder="Description"
                    value={form.description}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    style={styles.textarea}
                    whileFocus={styles.inputFocus}
                />


                {/* DROP AREA */}
                <motion.div
                    style={{
                        ...styles.dropArea,
                        opacity: loading ? 0.6 : 1
                    }}
                    onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()}
                    onClick={() => !loading && fileRef.current.click()}
                >

                    {loading
                        ? "Uploading..."
                        : "Drag & Drop Image OR Click to Select"}

                </motion.div>


                <input
                    type="file"
                    hidden
                    ref={fileRef}
                    onChange={handleInputFile}
                    disabled={loading}
                />


                {/* URL */}
                <motion.input
                    type="text"
                    placeholder="OR paste image URL"
                    value={form.imageUrl}
                    onChange={handleUrlChange}
                    disabled={loading}
                    style={styles.input}
                    whileFocus={styles.inputFocus}
                />


                {/* PREVIEW */}
                {preview && (

                    <motion.img
                        src={preview}
                        style={styles.preview}
                    />

                )}


                {/* PROGRESS BAR */}
                {loading && (

                    <div style={styles.progressBar}>

                        <motion.div
                            style={{
                                ...styles.progressFill,
                                width: `${progress}%`
                            }}
                        />

                    </div>

                )}


                {/* BUTTON */}
                <motion.button
                    disabled={loading}
                    style={styles.button}
                >

                    {loading

                        ? (

                            <div style={styles.loaderRow}>

                                <Loader />

                                <span>
                                    Uploading {progress}%
                                </span>

                            </div>

                        )

                        : "Add Product"}

                </motion.button>

            </motion.form>

        </motion.div>

    );

}


const styles = {

    container: {
        display: "flex",
        justifyContent: "center",
        padding: "40px"
    },

    form: {
        width: "340px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        background: "white",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
    },

    input: {
        padding: "12px",
        borderRadius: "8px",
        border: "1px solid #ddd"
    },

    textarea: {
        padding: "12px",
        borderRadius: "8px",
        border: "1px solid #ddd"
    },

    inputFocus: {
        scale: 1.03,
        borderColor: "#667eea",
        boxShadow: "0 0 8px rgba(102,126,234,0.5)"
    },

    dropArea: {
        padding: "20px",
        border: "2px dashed #667eea",
        borderRadius: "10px",
        textAlign: "center",
        cursor: "pointer",
        color: "#667eea"
    },

    preview: {
        width: "180px",
        height: "180px",
        objectFit: "cover",
        borderRadius: "10px",
        alignSelf: "center"
    },

    progressBar: {
        width: "100%",
        height: "8px",
        background: "#eee",
        borderRadius: "10px"
    },

    progressFill: {
        height: "100%",
        background: "#667eea",
        borderRadius: "10px"
    },

    button: {
        padding: "12px",
        background: "#667eea",
        color: "white",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        height: "45px"
    },

    loaderRow: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px"
    }

};
