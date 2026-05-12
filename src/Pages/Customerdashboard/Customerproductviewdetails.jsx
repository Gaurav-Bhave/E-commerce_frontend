import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import { C_productdetailsbyid } from "../../Services/api"

function Customerproductviewdetails() {

    const { id } = useParams()
    const navigate = useNavigate()

    const [myproductdata, setmyproductdata] = useState(null)
    const [selectedImage, setSelectedImage] = useState("")

    useEffect(() => {

        C_productdetailsbyid(id)
            .then((Response) => {

                const product = Response.data.data

                setmyproductdata(product)

                // first image default preview
                if (product.images.length > 0) {
                    setSelectedImage(
                        `https://localhost:7046${product.images[0].imageUrl}`
                    )
                }

            })
            .catch((error) => {
                console.log(error)
                alert("Error while fetching product details!")
            })

    }, [id])

    // loading
    if (!myproductdata) {
        return <h2 style={{ padding: "20px" }}>Loading...</h2>
    }

    return (
        <div style={{
            padding: "30px",
            maxWidth: "1200px",
            margin: "auto"
        }}>

            <div style={{
                display: "flex",
                gap: "40px",
                alignItems: "flex-start"
            }}>

                {/* LEFT SIDE IMAGES */}
                <div style={{ flex: 1 }}>

                    {/* MAIN IMAGE */}
                    <img
                        src={selectedImage}
                        alt="product"
                        style={{
                            width: "100%",
                            height: "450px",
                            objectFit: "cover",
                            borderRadius: "10px",
                            border: "1px solid #ddd"
                        }}
                    />

                    {/* THUMBNAILS */}
                    <div style={{
                        display: "flex",
                        gap: "10px",
                        marginTop: "15px",
                        flexWrap: "wrap"
                    }}>

                        {myproductdata.images.map((img, index) => (

                            <img
                                key={index}
                                src={`https://localhost:7046${img.imageUrl}`}
                                alt="thumb"
                                onClick={() =>
                                    setSelectedImage(
                                        `https://localhost:7046${img.imageUrl}`
                                    )
                                }
                                style={{
                                    width: "80px",
                                    height: "80px",
                                    objectFit: "cover",
                                    borderRadius: "8px",
                                    cursor: "pointer",
                                    border: "2px solid #ccc"
                                }}
                            />

                        ))}

                    </div>

                </div>

                {/* RIGHT SIDE DETAILS */}
                <div style={{ flex: 1 }}>

                    <h1>{myproductdata.name}</h1>

                    <p style={{
                        color: "#666",
                        marginTop: "10px",
                        lineHeight: "1.6"
                    }}>
                        {myproductdata.description}
                    </p>

                    <h2 style={{
                        color: "green",
                        marginTop: "20px"
                    }}>
                        ₹ {myproductdata.price}
                    </h2>

                    <div style={{ marginTop: "20px" }}>

                        <p>
                            <strong>Category :</strong>{" "}
                            {myproductdata.categoryName}
                        </p>

                        <p>
                            <strong>Brand :</strong>{" "}
                            {myproductdata.brandName}
                        </p>

                        <p>
                            <strong>Stock :</strong>{" "}
                            {myproductdata.stockQuantity}
                        </p>

                    </div>

                    {/* BUTTONS */}
                    <div style={{
                        marginTop: "30px",
                        display: "flex",
                        gap: "15px"
                    }}>

                        <button
                            style={{
                                background: "#28a745",
                                color: "#fff",
                                border: "none",
                                padding: "12px 20px",
                                borderRadius: "6px",
                                cursor: "pointer",
                                fontSize: "16px"
                            }}
                        >
                            Add To Cart
                        </button>

                        <button
                            onClick={() => navigate("/customer/product")}
                            style={{
                                background: "#6c757d",
                                color: "#fff",
                                border: "none",
                                padding: "12px 20px",
                                borderRadius: "6px",
                                cursor: "pointer",
                                fontSize: "16px"
                            }}
                        >
                            Back To Products
                        </button>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default Customerproductviewdetails