import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Getproductbyid } from "../../../Services/api";

function Productdetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Backend server URL
  const BASE_URL = "https://localhost:7046"


  // ✅ Convert relative path to full URL
  const getFullImageUrl = (imagePath) => {
    if (!imagePath) return "https://via.placeholder.com/120";

    // Agar already full URL hai to wahi return karo
    if (imagePath.startsWith('http')) {
      return imagePath;
    }

    // Relative path ko full URL mein convert karo
    return `${BASE_URL}${imagePath}`;
  };

  useEffect(() => {
    Getproductbyid(id)
      .then((res) => {
        setProduct(res.data.data);
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>No product found</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>Price: ₹ {product.price}</p>
      <p>Category: {product.categoryName}</p>
      <p>Brand: {product.brandName}</p>
      <p>Created At: {new Date(product.createdAt).toLocaleString()}</p>
      <p>Deleted: {product.isDeleted ? "Yes" : "No"}</p>

      <h3>Images</h3>
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {product.images?.map((img, i) => (
          <img
            key={i}
            src={getFullImageUrl(img.imageUrl)}
            alt={`${product.name} - ${i + 1}`}
            style={{
              width: "120px",
              height: "120px",
              objectFit: "cover",
              borderRadius: "8px",
              border: "1px solid #ddd",
            }}
            onError={(e) => {
              console.log("Image failed to load:", img.imageUrl);
              e.target.src = "https://via.placeholder.com/120?text=No+Image";
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default Productdetails;