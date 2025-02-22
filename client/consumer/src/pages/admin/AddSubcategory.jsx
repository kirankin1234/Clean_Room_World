import React, { useState, useEffect } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Modal, Input, Form, Button } from "antd";
import axios from "axios";
import "./AddSubcategory.css";

const { TextArea } = Input;

const AddSubcategory = () => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedSubcategory, setSelectedSubcategory] = useState(null);

    // State for new subcategory form
    const [newSubcategory, setNewSubcategory] = useState({
        categoryId: "",
        name: "",
        shortDescription: "",
        detailedDescription: "",
        image: null
    });

    // Fetch categories and subcategories when component loads
    useEffect(() => {
        fetchCategories();
        fetchSubcategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get("http://localhost:5001/api/category/get");
            setCategories(response.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const fetchSubcategories = async () => {
        try {
            const response = await axios.get("http://localhost:5001/api/subcategory/get");
            setSubcategories(response.data);
        } catch (error) {
            console.error("Error fetching subcategories:", error);
            setSubcategories([]);
        }
    };

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewSubcategory((prev) => ({ ...prev, [name]: value }));
    };

    // Handle file upload change
    const handleFileChange = (e) => {
        setNewSubcategory((prev) => ({ ...prev, image: e.target.files[0] }));
    };

    // Submit the form and save the subcategory
    const handleSubmit = async () => {
        try {
            const formData = new FormData();
            formData.append("categoryId", newSubcategory.categoryId);
            formData.append("name", newSubcategory.name);
            formData.append("shortDescription", newSubcategory.shortDescription);
            formData.append("detailedDescription", newSubcategory.detailedDescription);
            if (newSubcategory.image) {
                formData.append("image", newSubcategory.image);
            }

            await axios.post("http://localhost:5001/api/subcategory/add", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            setIsFormOpen(false);
            fetchSubcategories(); // Refresh the subcategory list
        } catch (error) {
            console.error("Error adding subcategory:", error);
        }
    };

    // Edit functionality
    const handleEdit = (subcategoryId) => {
        const subcategory = subcategories.find((sub) => sub._id === subcategoryId);
        if (subcategory) {
            setSelectedSubcategory({ ...subcategory });
            setIsEditModalOpen(true);
        }
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setSelectedSubcategory((prev) => ({ ...prev, [name]: value }));
    };

    const handleModalSubmit = async () => {
        if (selectedSubcategory) {
            try {
                await axios.put(
                    `http://localhost:5001/api/subcategory/update/${selectedSubcategory._id}`,
                    selectedSubcategory
                );
                setIsEditModalOpen(false);
                fetchSubcategories(); // Refresh list
            } catch (error) {
                console.error("Error updating subcategory:", error);
            }
        }
    };

    // Delete subcategory
    const handleDelete = async (subcategoryId) => {
        try {
            await axios.delete(`http://localhost:5001/api/subcategory/delete/${subcategoryId}`);
            fetchSubcategories(); // Refresh list
        } catch (error) {
            console.error("Error deleting subcategory:", error);
        }
    };

    return (
        <div className="page-container">
            <div className="container">
                <h1>Subcategories</h1>
                <button className="header-button" onClick={() => setIsFormOpen(!isFormOpen)}>
                    Add Subcategory
                </button>
            </div>

            {isFormOpen && (
                <div className="form-container">
                    <h2>Add Subcategory</h2>
                    <Form className="form-box">
                        <label>Select Category</label>
                        <select
                            className="select-field"
                            name="categoryId"
                            value={newSubcategory.categoryId}
                            onChange={handleInputChange}
                        >
                            <option value="">-- Select a Category --</option>
                            {categories.map((cat) => (
                                <option key={cat._id} value={cat._id}>{cat.name}</option>
                            ))}
                        </select>

                        <label>Subcategory Name</label>
                        <Input
                            className="input-field"
                            name="name"
                            value={newSubcategory.name}
                            onChange={handleInputChange}
                        />

                        <label>Short Description</label>
                        <TextArea
                            className="textarea-field"
                            name="shortDescription"
                            value={newSubcategory.shortDescription}
                            onChange={handleInputChange}
                        />

                        <label>Detailed Description</label>
                        <TextArea
                            className="textarea-field"
                            name="detailedDescription"
                            value={newSubcategory.detailedDescription}
                            onChange={handleInputChange}
                        />

                        <label>Subcategory Image</label>
                        <Input type="file" onChange={handleFileChange} />

                        <Button className="submit-button" onClick={handleSubmit}>
                            Save Subcategory
                        </Button>
                    </Form>
                </div>
            )}

            <div className="category-container">
                {categories.map((category) => (
                    <div key={category._id} className="category-box">
                        <div className="category-header">{category.name}</div>
                        <div className="subcategory-list">
                            {subcategories
                                .filter((sub) => sub.categoryId === category._id)
                                .map((sub) => (
                                    <div key={sub._id} className="subcategory-item">
                                        {sub.name}
                                        <EditOutlined className="icon-button" onClick={() => handleEdit(sub._id)} />
                                        <DeleteOutlined className="icon-button" onClick={() => handleDelete(sub._id)} />
                                    </div>
                                ))}
                        </div>
                    </div>
                ))}
            </div>

            <Modal
                title="Edit Subcategory"
                visible={isEditModalOpen}
                onOk={handleModalSubmit}
                onCancel={() => setIsEditModalOpen(false)}
            >
                {selectedSubcategory && (
                    <Form layout="vertical">
                        <Form.Item label="Subcategory Name">
                            <Input name="name" value={selectedSubcategory.name} onChange={handleEditChange} />
                        </Form.Item>
                        <Form.Item label="Short Description">
                            <TextArea name="shortDescription" value={selectedSubcategory.shortDescription} onChange={handleEditChange} />
                        </Form.Item>
                        <Form.Item label="Detailed Description">
                            <TextArea name="detailedDescription" value={selectedSubcategory.detailedDescription} onChange={handleEditChange} />
                        </Form.Item>
                    </Form>
                )}
            </Modal>
        </div>
    );
};

export default AddSubcategory;
