import {Button, Card, Table,Modal } from 'antd'
import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

const AddCategory = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [categories, setCategories] = useState([]); // List of saved categories
  const [category, setCategory] = useState({
    name: "",
    shortDescription: "",
    detailedDescription: "",
    image: null,
  });
  const [editingCategory, setEditingCategory] = useState(null);

  // Fetch categories from localStorage when the page loads
  useEffect(() => {
    const savedCategories = localStorage.getItem('categories');
    if (savedCategories) {
      setCategories(JSON.parse(savedCategories)); // Load categories from localStorage
    }
  }, []);

  const toggleForm = () => {
    console.log("Toggle Form Clicked"); // Debugging
    setIsFormOpen(!isFormOpen);
  };

  const handleChange = (e) => {
  const { name, value } = e.target;
    setCategory({ ...category, [name]: value });
  };

  const handleFileChange = (e) => {
    setCategory({ ...category, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Category Submitted:", category);
    if (category.name.trim() === "") {
      alert("Category Name is required!");
      return;
    }

    // Create FormData to handle file upload
    const formData = new FormData();
    formData.append("name", category.name);
    formData.append("shortDescription", category.shortDescription);
    formData.append("detailedDescription", category.detailedDescription);
    formData.append("image", category.image); // Send the image file

    // Sending the data to the server
    axios
    .post('http://localhost:5001/api/category/add', formData)
    .then((response) => {
      // Assuming the backend response contains the category with the _id field
      const newCategory = { ...category, id: response.data._id }; // Use the ID from backend
      setCategories([...categories, newCategory]); // Add category to the list
      setCategory({ name: "", shortDescription: "", detailedDescription: "", image: null }); // Reset form
      setIsFormOpen(false); // Close form
    })
    .catch((error) => {
      console.error("Error adding category:", error);
    });
  };

  const handleEdit = (id) => {
    const selectedCategory = categories.find(cat => cat._id === id);
    if (selectedCategory) {
      setEditingCategory(selectedCategory);
      setIsEditModalOpen(true);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingCategory({ ...editingCategory, [name]: value });
  };


  const handleUpdate = () => {
    console.log("Updating category with ID:", editingCategory._id); // Debugging

    axios
      .put(`http://localhost:5001/api/category/update/${editingCategory._id}`, editingCategory)
      .then((response) => {
        setCategories(categories.map(cat => cat._id === editingCategory._id ? response.data : cat));
        setIsEditModalOpen(false);
        setEditingCategory(null);
      })
      .catch((error) => {
        console.error("Error updating category:", error);
      });
  };


  const handleDelete = (id) => {
    console.log("Deleting category with _id:", id); // Ensure id is passed correctly
    if (!id) {
      console.error("Invalid category ID");
      return;
    }
  
    axios
      .delete(`http://localhost:5001/api/category/delete/${id}`)
      .then((response) => {
        console.log("Category deleted successfully:", response.data);
        // Update your categories state after deletion
        const updatedCategories = categories.filter((category) => category._id !== id);
        setCategories(updatedCategories);
      })
      .catch((error) => {
        console.error("Error deleting category:", error);
      });
  };
  
  

  // Table Columns
  const columns = [
    {
      title: "Category Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <>
          <Button onClick={() => handleEdit(record._id)} style={{ marginRight: "10px" }}>
            Edit
          </Button>
          <Button danger onClick={() => handleDelete(record._id)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <div style={{display:'flex', justifyContent:'space-between',paddingRight:'20px', paddingLeft:'20px', backgroundColor:'#d8e4f2', borderRadius:'10px'}}>
        <h1>Categories</h1>
        <button style={{width:'200px', height:'50px', marginTop:'13px'}} onClick = {toggleForm}>Add Category</button>
      </div>
      {isFormOpen && (
        <div style={{ marginTop: "20px", padding: "10px", background: "#fff", borderRadius: "10px" }}>
          <h2>Add Category</h2>
          <form style={{backgroundColor:'#d8e4f2', alignItems:'center'}} onSubmit={handleSubmit}>
            <label style={{padding:'0px 0px 8px 0px'}}>Category Name</label>
            <input type="text" name="name" value={category.name} onChange={handleChange} placeholder="Enter category name" required />
            <br />
            <label style={{padding:'10px 0px 8px 0px'}}>Short Description</label>
            <textarea name="shortDescription" value={category.shortDescription} onChange={handleChange} placeholder="Enter a short description"></textarea>
            <br />
            <label style={{padding:'10px 0px 8px 0px'}}>Detailed Description</label>
            <textarea name="detailedDescription" value={category.detailedDescription} onChange={handleChange} placeholder="Enter detailed description"></textarea>
            <br />
            <label style={{padding:'10px 0px 8px 0px'}}>Category Image</label>
            <input style={{padding:'0px 0px 20px 0px'}} type="file" onChange={handleFileChange} />
            <br />
            <button type="submit" style={{ background: "#40476D", color: "#fff", padding: "10px 20px", border: "none", cursor: "pointer" }}>
              Save Category
            </button>
          </form>
        </div>
      )}

      <h1 style={{backgroundColor:'#d8e4f2', height:'50px', borderRadius:'10px', padding:'5px 0px 0px 20px'}}>List of Category</h1>
      {/* Display categories as cards
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '20px' }}>
        {categories.map((cat) => (
          <Card key={cat.id} title={cat.name} style={{ width: 300 }}>
            <p><strong>Short Description:</strong> {cat.shortDescription}</p>
            <p><strong>Detailed Description:</strong> {cat.detailedDescription}</p>
            {cat.image && <img src={cat.image} alt="Category" style={{ width: '100%', height: '150px', objectFit: 'cover' }} />}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
              <Button type="primary">Edit</Button>
              <Button type="danger" onClick={() => handleDelete(cat.id)}>Delete</Button>
            </div>
          </Card>
        ))}
      </div> */}

      <Table 
        dataSource={categories} 
        columns={columns} 
        rowKey="id" 
        style={{ marginTop: "10px", background: "#fff", borderRadius: "10px" }} 
      />

      <Modal style={{alignItems:'center', padding:'0px 0px 0px 0px'}} title="Edit Category" open={isEditModalOpen} onOk={handleUpdate} onCancel={() => setIsEditModalOpen(false)}>
        <label style={{padding:'7px 0px 7px 0px'}}>Category Name</label>
        <input type="text" name="name" value={editingCategory?.name || ""} onChange={handleEditChange} />
        <label style={{padding:'7px 0px 7px 0px'}}>Short Description</label>
        <textarea style={{padding:'5px 0px 30px 0px'}} name="shortDescription" value={editingCategory?.shortDescription || ""} onChange={handleEditChange}></textarea>
        <label style={{padding:'7px 0px 7px 0px'}}>Detailed Description</label>
        <textarea style={{padding:'5px 0px 30px 0px'}} name="detailedDescription" value={editingCategory?.detailedDescription || ""} onChange={handleEditChange}></textarea>
      </Modal>
      {/* <ul className='category-list'>
        {categories.map((category) =>(
          <li key={category.id}>
            {category.category_name}
            <button onClick={() =>openEditable(category)}>Edit</button>
            <button onClick={() => handleDelete(category.id)}>Delete</button>
          </li>
        ))}

      </ul> */}
    </div>
  )
}

export default AddCategory