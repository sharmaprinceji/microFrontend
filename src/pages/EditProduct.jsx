import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api/axios";
import { motion } from "framer-motion";
import Loader from "../components/Loader";

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

    const [preview, setPreview] = useState(null);

    const [loading, setLoading] = useState(false);

    const [progress, setProgress] = useState(0);

    const [initialLoading, setInitialLoading] = useState(true);


    useEffect(() => {

        fetchProduct();

    }, []);


    const fetchProduct = async () => {

        setInitialLoading(true);

        const start = Date.now();

        try {

            const res = await API.get(`/products/${id}`);

            const p = res.data.data || res.data;

            setForm({

                title: p.title,
                price: p.price,
                description: p.description,
                image: null,
                imageUrl: p.image

            });

            setPreview(p.image);

        }

        catch {

            alert("Failed to load product");

        }

        finally {

            const elapsed = Date.now() - start;

            const delay = Math.max(2000 - elapsed, 0);

            setTimeout(() => {

                setInitialLoading(false);

            }, delay);

        }

    };


    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    };


    const handleFileChange = (file) => {

        if (!file) return;

        setForm({

            ...form,

            image: file,

            imageUrl: ""

        });

        setPreview(URL.createObjectURL(file));

    };


    const handleInputFile = (e) => {

        handleFileChange(e.target.files[0]);

    };


    const handleDrop = (e) => {

        e.preventDefault();

        handleFileChange(e.dataTransfer.files[0]);

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

        if (loading) return;

        try {

            if (!form.image && !form.imageUrl) {

                alert("Select image file OR enter image URL");

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


            await API.put(

                `/products/${id}`,

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

            const elapsed = Date.now() - start;

            const delay = Math.max(2000 - elapsed, 0);

            setTimeout(() => {

                alert("Product updated successfully");

                navigate(`/products/${id}`);

            }, delay);

        }

        catch {

            alert("Update failed");

        }

        finally {

            setTimeout(() => {

                setLoading(false);

                setProgress(0);

            }, 500);

        }

    };


    //LOADER WHILE FETCHING
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

            <motion.form
                onSubmit={handleSubmit}
                style={styles.form}
            >

                <h2>Edit Product</h2>


                <motion.input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    disabled={loading}
                    style={styles.input}
                    whileFocus={styles.inputFocus}
                />


                <motion.input
                    name="price"
                    type="number"
                    value={form.price}
                    onChange={handleChange}
                    disabled={loading}
                    style={styles.input}
                    whileFocus={styles.inputFocus}
                />


                <motion.textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    disabled={loading}
                    style={styles.textarea}
                    whileFocus={styles.inputFocus}
                />


                <motion.div
                    style={styles.dropArea}
                    onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()}
                    onClick={() => !loading && fileRef.current.click()}
                >
                    Drag & Drop Image OR Click
                </motion.div>


                <input
                    type="file"
                    hidden
                    ref={fileRef}
                    onChange={handleInputFile}
                />


                <motion.input
                    value={form.imageUrl}
                    onChange={handleUrlChange}
                    disabled={loading}
                    style={styles.input}
                />


                {preview && (

                    <img
                        src={preview}
                        style={styles.preview}
                    />

                )}


                {loading && (

                    <div style={styles.progressBar}>

                        <div
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
                >

                    {loading

                        ? <Loader />

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

    centerLoader: {
        height: "60vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },

    form: {
        width: "340px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        background: "white",
        padding: "20px",
        borderRadius: "12px"
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

    dropArea: {
        padding: "20px",
        border: "2px dashed #667eea",
        borderRadius: "10px",
        textAlign: "center",
        cursor: "pointer"
    },

    preview: {
        width: "180px",
        height: "180px",
        objectFit: "cover",
        alignSelf: "center"
    },

    progressBar: {
        width: "100%",
        height: "8px",
        background: "#eee"
    },

    progressFill: {
        height: "100%",
        background: "#667eea"
    },

    button: {
        padding: "12px",
        background: "#667eea",
        color: "white",
        border: "none"
    }

};