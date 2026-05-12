// src/pages/admin/Editproduct.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Getproductbyid,
  Getallcategory,
  GetallBrands,
  Editproductwithimages
} from "../../../Services/api";

function Editproduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    productName: "",
    description: "",
    price: "",
    categoryId: "",
    brandId: "",
    stockQuantity: ""
  });

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  const [oldImages, setOldImages] = useState([]); // { id: number, url: string }
  const [newImages, setNewImages] = useState([]); // { file, url, key }
  const [deletedIds, setDeletedIds] = useState([]); // number[]

  const BASE_URL = "https://localhost:7046";

  // Load category + brand
  useEffect(() => {
    Getallcategory().then(res => setCategories(res.data?.data || []));
    GetallBrands().then(res => setBrands(res.data?.data || []));
  }, []);

  // Load product by id
  useEffect(() => {
    Getproductbyid(id).then(res => {
      const data = res.data?.data;
      if (!data) return;

      setForm({
        productName: data.name ?? "",
        description: data.description ?? "",
        price: data.price ?? "",
        categoryId: data.categoryId ?? "",
        brandId: data.brandId ?? "",
        stockQuantity: data.stockQuantity ?? ""
      });

      // Map images safely
      const mapped = (data.images || []).map(img => ({
        id: Number(img.id ?? img.Id ?? img.imageId ?? img.ImageId),
        url: BASE_URL + (img.imageUrl ?? img.ImageUrl ?? "")
      })).filter(x => x.id > 0);

      setOldImages(mapped);
    });
  }, [id]);

  // Form change
  const handleChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Add new images (no duplicates)
  const handleFile = e => {
    const files = Array.from(e.target.files || []);
    const mapped = files.map(f => ({
      file: f,
      url: URL.createObjectURL(f),
      key: `${f.name}_${f.size}` // stable key
    }));

    const merged = [...newImages, ...mapped];

    const unique = merged.filter((img, index, self) =>
      index === self.findIndex(t => t.file.name === img.file.name && t.file.size === img.file.size)
    );

    setNewImages(unique);
    e.target.value = "";
  };

  // Remove old image
  const removeOldImage = imgId => {
    const numericId = Number(imgId);
    if (!numericId) return;

    setOldImages(prev => prev.filter(x => x.id !== numericId));
    setDeletedIds(prev => prev.includes(numericId) ? prev : [...prev, numericId]);
  };

  // Remove new image
  const removeNewImage = index => {
    setNewImages(prev => prev.filter((_, i) => i !== index));
  };

  // Submit
  const handleSubmit = async e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("ProductId", id);
    formData.append("ProductName", form.productName);
    formData.append("Description", form.description);
    formData.append("Price", form.price);
    formData.append("CategoryId", form.categoryId);
    formData.append("BrandId", form.brandId);
    formData.append("StockQuantity", form.stockQuantity);

    newImages.forEach(img => {
      formData.append("NewImages", img.file);
    });

    if (deletedIds.length > 0) {
      formData.append("DeletedImageIds", deletedIds.join(","));
    }

    try {
      await Editproductwithimages(formData);
      alert("Product Updated Successfully");
      navigate("/admin/products");
    } catch (err) {
      console.error(err);
      alert("Update failed. Check console and server logs.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="productName" value={form.productName} onChange={handleChange} placeholder="Product Name" />
      <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" />
      <input name="price" value={form.price} onChange={handleChange} placeholder="Price" />
      <input name="stockQuantity" value={form.stockQuantity} onChange={handleChange} placeholder="Stock" />

      <select name="categoryId" value={form.categoryId} onChange={handleChange}>
        <option value="">Select Category</option>
        {categories.map(c => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>

      <select name="brandId" value={form.brandId} onChange={handleChange}>
        <option value="">Select Brand</option>
        {brands.map(b => (
          <option key={b.id} value={b.id}>{b.name}</option>
        ))}
      </select>

      <input type="file" multiple onChange={handleFile} />

      <h4>Old Images</h4>
      <div style={{ display: "flex", gap: 10 }}>
        {oldImages.map(img => (
          <div key={img.id}>
            <img src={img.url} width="100" alt="old" />
            <button type="button" onClick={() => removeOldImage(Number(img.id))}>X</button>
          </div>
        ))}
      </div>

      <h4>New Images</h4>
      <div style={{ display: "flex", gap: 10 }}>
        {newImages.map((img, i) => (
          <div key={img.key}>
            <img src={img.url} width="100" alt="new" />
            <button type="button" onClick={() => removeNewImage(i)}>X</button>
          </div>
        ))}
      </div>

      <button type="submit">Update Product</button>
    </form>
  );
}

export default Editproduct;
