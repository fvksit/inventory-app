import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const fetchInventoryList = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/inventory`);
        return response.data;
    } catch (error) {
        console.error("Error fetching inventory list:", error);
        return [];
    }
};

export const addInventoryItem = async (item) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/inventory`, item);
        return response.data;
    } catch (error) {
        console.error("Error adding inventory item:", error);
        throw error;
    }
};

export const updateInventoryItem = async (id, updatedItem) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/inventory/${id}`, updatedItem);
        return response.data;
    } catch (error) {
        console.error("API error:", error.response ? error.response.data : error);
        throw error;
    }
};

export const deleteInventoryItem = async (id) => {
    try {
        await axios.delete(`${API_BASE_URL}/inventory/${id}`);
    } catch (error) {
        console.error("Error deleting inventory item:", error);
        throw error;
    }
};

export const fetchCategoryList = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/category`);
        return response.data;
    } catch (error) {
        console.error("Error fetching category list:", error);
        return [];
    }
};

export const addCategory = async (category) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/category`, category);
        return response.data;
    } catch (error) {
        console.error("Error adding category:", error);
        throw error;
    }
};

export const updateCategory = async (id, updatedCategory) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/category/${id}`, updatedCategory);
        return response.data;
    } catch (error) {
        console.error("Error updating category:", error);
        throw error;
    }
};

export const deleteCategory = async (id) => {
    try {
        await axios.delete(`${API_BASE_URL}/category/${id}`);
    } catch (error) {
        console.error("Error deleting category:", error);
        throw error;
    }
};
