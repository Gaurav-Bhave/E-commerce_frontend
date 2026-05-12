import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import { GetProductwithimages } from "../../../Services/api"
import { Myuseauth } from '../../../Context/Authcontext'
import { useFormik } from 'formik'
import { Deleteproductbyid } from "../../../Services/api"



function Product() {

  //navigation 
  const navigate = useNavigate()

  const handleclick = () => {
    navigate("add-product")
  }

  {/* get all products */ }
  const [myproducts, setmyproducts] = useState([])
  const [mytotalcount, setmytotalcount] = useState(0)

  const [currentpage, setcurrentpage] = useState(1)
  const pagesize = 3

  const totalpages = Math.ceil((mytotalcount || 0) / pagesize);



  {/* search and filter products */ }
  const [mysearchvalue, setmysearchvalue] = useState("")
  const [mypricerange, setmypricerange] = useState(null)

  {/*main function for calling api */ }


  const loadproducts = () => {

    GetProductwithimages({

      page: currentpage,
      pagesize: pagesize,
      search: mysearchvalue || null,
      pricerange: mypricerange || null
      ,
    })
      .then((Response) => {
        const data = Response.data.data;
        setmyproducts(Array.isArray(data) ? data : [])
        setmytotalcount(data[0]?.totalCount || 0)
        console.log("succefuully", Response)
      })
      .catch((err) => {
        console.log("error", err);
      });
  }


  const filterFormik = useFormik({
    initialValues: {
      search: "",
      pricerange: ""
    }
  })

  useEffect(() => {
    setmysearchvalue(filterFormik.values.search || "")
    setmypricerange(
      filterFormik.values.pricerange
        ? Number(filterFormik.values.pricerange)
        : null
    )
  }, [filterFormik.values.search, filterFormik.values.pricerange])


  useEffect(() => {
    loadproducts();
  }, [currentpage, mysearchvalue, mypricerange])


  const handledelete = async (id) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this product?");
      if (!confirmDelete) return;

      const res = await Deleteproductbyid(id);

      // alert(res.data.data.message);

      loadproducts(); // refresh after delete

    } catch (error) {
      console.log(error);
      alert("Error deleting product");
    }
  };
  return (


    <>
      <button onClick={handleclick}> + Add Product</button>
      <Outlet />



      <h2>All  Product</h2>

      <input type='text'
        name='search'
        placeholder='Search product by name'
        value={filterFormik.values.search}
        onChange={(e) => { filterFormik.handleChange(e); setcurrentpage(1) }}
      />

      {/* ✅ PRICE RANGE DROPDOWN */}

      <select name='pricerange' value={filterFormik.values.pricerange}
        onChange={(e) => { filterFormik.handleChange(e); setcurrentpage(1) }} style={{ marginLeft: "10px" }}>

        <option value="">All Prices</option>
        <option value="1">0 - 5000</option>
        <option value="2">5001 - 10000</option>
        <option value="3">10001 - 1000000</option>
      </select>


      {/* ✅ Table */}
      <table border="1">

        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Brand</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {myproducts.length > 0 ? (
            myproducts.map((p) => (
              <tr key={p.id + p.name}>
                <td>{p.name}</td>
                <td>{p.price}</td>
                <td>{p.categoryName}</td>
                <td>{p.brandName}</td>
                <td>

                  <button onClick={() => navigate(`${p.id}`)}>
                    View details
                  </button>

                  <button onClick={() => navigate(`edit/${p.id}`)}>
                    Edit
                  </button>

                  <button onClick={() => handledelete(p.id)}>
                    Delete
                  </button>

                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No Products Found</td>
            </tr>
          )}

        </tbody>
      </table>

      {/* PAGINATION */}
      <div style={{ marginTop: "20px" }}>
        <button disabled={currentpage == 1} onClick={() => setcurrentpage(currentpage - 1)}>
          prev
        </button>


        <span style={{ margin: "0 10px" }}>
          Page {currentpage} of {totalpages}
        </span>

        <button disabled={currentpage == totalpages} onClick={() => setcurrentpage(currentpage + 1)}>
          Next
        </button>
      </div>



    </>
  )
}

export default Product