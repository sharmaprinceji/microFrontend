import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";
import ProductCard from "../components/ProductCard";

export default function ProductDetail() {

  const { id } = useParams();

  const [product, setProduct] =
    useState(null);


  useEffect(() => {

    API.get(`/products/${id}`)
      .then(res =>
        setProduct(
          res.data.data ||
          res.data
        )
      );

  }, [id]);


  if (!product)
    return <h2>Loading...</h2>;


  return (

    <div style={{

      padding: "20px",

      maxWidth: "400px",

      margin: "auto"

    }}>

      <ProductCard

        product={product}

        showDelete={false}

        showEdit={true}

        showDescription={true}

      />

    </div>

  );

}
