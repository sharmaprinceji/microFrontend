import { useState, useEffect, useRef } from "react";

import { useNavigate, useParams } from "react-router-dom";

import API from "../api/axios";

import { motion } from "framer-motion";


export default function EditProduct() {
    const navigate = useNavigate();
    const { id } = useParams();
    const fileRef = useRef();
    const [form, setForm] = useState({
        title: "",
        price: "",
        description: "",
        image: null,
        imageUrl: ""
    });

    const [preview, setPreview] =
        useState(null);

    const [loading, setLoading] =
        useState(false);

    const [progress, setProgress] =
        useState(0);


    useEffect(() => {
        fetchProduct();
    }, []);


    const fetchProduct = async () => {
        const res =
            await API.get(`/products/${id}`);
        const p =
            res.data.data || res.data;
        setForm({
            title: p.title,
            price: p.price,
            description: p.description,
            image: null,
            imageUrl: p.image
        });
        setPreview(p.image);

    };


    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };


    // FILE SELECT OR DROP
    const handleFileChange = (file) => {
        if (!file) return;
        setForm({
            ...form,
            image: file,
            imageUrl: ""
        });

        setPreview(
            URL.createObjectURL(file)
        );

    };


    const handleInputFile = (e) => {

        handleFileChange(
            e.target.files[0]
        );

    };


    const handleDrop = (e) => {

        e.preventDefault();

        handleFileChange(
            e.dataTransfer.files[0]
        );

    };


    const handleUrlChange = (e) => {

        const url = e.target.value;

        setForm({

            ...form,

            imageUrl: url,

            image: null

        });

        setPreview(url);

    };


    const handleSubmit = async (e) => {
        e.preventDefault();
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
            const formData =
                new FormData();
            formData.append(
                "title",
                form.title
            );

            formData.append(
                "price",
                form.price
            );

            formData.append(
                "description",
                form.description
            );


            if (form.image)
                formData.append(
                    "image",
                    form.image
                );

            else
                formData.append(
                    "image",
                    form.imageUrl
                );


            await API.put(
                `/products/${id}`,
                formData,
                {
                    headers: {
                        "Content-Type":
                            "multipart/form-data"
                    },

                    onUploadProgress:
                        (event) => {
                            const percent =
                                Math.round(
                                    (event.loaded * 100) /
                                    event.total
                                );
                            setProgress(percent);
                        }
                }
            );


            alert("Product updated successfully");
            navigate(`/products/${id}`);
        }

        catch (error) {
            alert("Update failed");
        }

        finally {
            setLoading(false);

            setProgress(0);

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

                <h2>Edit Product</h2>


                <motion.input
                    name="title"
                    placeholder="Product Title"
                    value={form.title}
                    onChange={handleChange}
                    required
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
                    style={styles.input}
                    whileFocus={styles.inputFocus}
                />


                <motion.textarea
                    name="description"
                    placeholder="Description"
                    value={form.description}
                    onChange={handleChange}
                    required
                    style={styles.textarea}
                    whileFocus={styles.inputFocus}
                />


                {/* SAME DROP AREA */}
                <motion.div

                    style={styles.dropArea}

                    onDrop={handleDrop}

                    onDragOver={(e) =>
                        e.preventDefault()
                    }

                    onClick={() =>
                        fileRef.current.click()
                    }

                    whileHover={{
                        scale: 1.02
                    }}

                >

                    Drag & Drop Image
                    OR Click to Select

                </motion.div>


                <input
                    type="file"
                    hidden
                    ref={fileRef}
                    onChange={handleInputFile}
                />


                {/* URL */}
                <motion.input
                    type="text"
                    placeholder="OR paste image URL"
                    value={form.imageUrl}
                    onChange={handleUrlChange}
                    style={styles.input}
                    whileFocus={styles.inputFocus}
                />


                {/* PREVIEW SAME SIZE */}
                {preview && (

                    <motion.img
                        src={preview}
                        style={styles.preview}
                    />

                )}


                {/* PROGRESS */}
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


                <motion.button
                    disabled={loading}
                    style={styles.button}
                    whileHover={{
                        scale: 1.05
                    }}
                >

                    {loading
                        ? `Updating ${progress}%`
                        : "Update Product"}

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
        alignSelf: "center",
        border: "1px solid #ddd"
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
        borderRadius: "8px"
    }

};

