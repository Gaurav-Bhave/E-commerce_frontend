import React, { useEffect, useState } from 'react'
import { C_getallproduct } from "../../Services/api"
import { useNavigate } from 'react-router-dom'
import { Myuseauth } from "../../Context/Authcontext"
import { addToCartApi } from "../../Services/api"
import { IncrementDecrementQuantity } from "../../Services/api"

function Customerproduct() {

  const { currentuser } = Myuseauth()

  const [products, setProducts] = useState([])
  const [pageNumber, setPageNumber] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const [pageSize] = useState(6)
  const [searchTerm, setSearchTerm] = useState("")


  //cart
  const [cartItems, setCartItems] = useState({})
  

  const navigate = useNavigate()


  // =========================
  // Display products in card
  // =========================

  useEffect(() => {
    fetchProducts()
  }, [pageNumber, searchTerm, cartupdate])


  //display product in card

  const fetchProducts = async () => {

    try {

      const res = await C_getallproduct({
        PageNumber: pageNumber,
        PageSize: pageSize,
        SearchTerm: searchTerm
      })

      setProducts(res.data.data.products)
      setTotalCount(res.data.data.totalCount)

    } catch (err) {

      console.log(err)

    }
  }


  const totalPages = Math.ceil(totalCount / pageSize)



  // =========================
  // ADD TO CART
  // =========================

  const Addtocart = async (item) => {

    try {

      const res = await addToCartApi({
        productId: item.id,
        quantity: 1
      })

      alert(res.data.message)

      // setcartupdate(!cartupdate)

    } catch (error) {

      console.log(error)

    }
  }



  // =========================
  // INCREMENT QUANTITY
  // =========================

  const IncreaseQuantity = async (item) => {

    try {

      const res = await IncrementDecrementQuantity({
        productId: item.id,
        action: "INCREMENT"
      })

      alert(res.data.message)

      setcartupdate(!cartupdate)

    } catch (error) {

      console.log(error)

    }
  }



  // =========================
  // DECREMENT QUANTITY
  // =========================

  const DecreaseQuantity = async (item) => {

    try {

      const res = await IncrementDecrementQuantity({
        productId: item.id,
        action: "DECREMENT"
      })

      alert(res.data.message)

      setcartupdate(!cartupdate)

    } catch (error) {

      console.log(error)

    }
  }




  return (

    <div style={{ padding: "20px" }}>

      <h2>All Products</h2>


      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value)
          setPageNumber(1)
        }}
        style={{
          padding: "10px",
          width: "300px",
          marginBottom: "20px",
          borderRadius: "5px",
          border: "1px solid #ccc"
        }}
      />



      {/* GRID */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "20px"
      }}>

        {products.map((item) => {

          return (

            <div
              key={item.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "15px",
                textAlign: "center",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
              }}
            >

              <h3>{item.name}</h3>

              <img
                src={`https://localhost:7046${item.images[0]?.imageUrl}`}
                alt={item.name}
                style={{
                  width: "100%",
                  height: "180px",
                  objectFit: "cover",
                  borderRadius: "8px"
                }}
              />


              {/* BUTTONS */}
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "12px"
              }}>

                {/* ADD TO CART */}
                <button
                  onClick={() => Addtocart(item)}
                  style={{
                    background: "#28a745",
                    color: "#fff",
                    border: "none",
                    padding: "8px 12px",
                    borderRadius: "5px",
                    cursor: "pointer"
                  }}
                >
                  Add to Cart
                </button>



                {/* QUANTITY BUTTONS */}
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px"
                }}>

                  <button onClick={() => DecreaseQuantity(item)}>
                    -
                  </button>

                  <button onClick={() => IncreaseQuantity(item)}>
                    +
                  </button>

                </div>



                {/* VIEW DETAILS */}
                <button
                  onClick={() =>
                    navigate(`/customer/productdetails/${item.id}`)
                  }
                  style={{
                    background: "#007bff",
                    color: "#fff",
                    border: "none",
                    padding: "8px 12px",
                    borderRadius: "5px",
                    cursor: "pointer"
                  }}
                >
                  View Details
                </button>

              </div>

            </div>

          )

        })}

      </div>



      {/* PAGINATION */}
      <div style={{
        marginTop: "20px",
        display: "flex",
        gap: "15px",
        justifyContent: "center",
        alignItems: "center"
      }}>

        <button
          disabled={pageNumber === 1}
          onClick={() => setPageNumber(pageNumber - 1)}
        >
          Prev
        </button>

        <span style={{
          fontWeight: "bold",
          background: "#007bff",
          color: "#fff",
          padding: "6px 12px",
          borderRadius: "5px"
        }}>
          {pageNumber} of {totalPages}
        </span>

        <button
          disabled={pageNumber === totalPages}
          onClick={() => setPageNumber(pageNumber + 1)}
        >
          Next
        </button>

      </div>

    </div>
  )
}

export default Customerproduct