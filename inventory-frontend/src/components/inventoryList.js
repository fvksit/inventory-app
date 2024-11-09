import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Input, Form, Select, message } from 'antd';
import { fetchInventoryList, addInventoryItem, updateInventoryItem, deleteInventoryItem, fetchCategoryList } from '../services/api';

const InventoryList = () => {
    const [inventory, setInventory] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [form] = Form.useForm();

    useEffect(() => {
        const getInventoryAndCategories = async () => {
            const data = await fetchInventoryList();
            const formattedData = data.map(item => {
                const categoryName = item.Category ? item.Category.name : 'No Category';
                return {
                    ...item,
                    categoryName,
                };
            });
            setInventory(formattedData);

            const categoryData = await fetchCategoryList();
            setCategories(categoryData);
        };
        getInventoryAndCategories();
    }, []);

    useEffect(() => {
        if (editingItem) {
            form.setFieldsValue(editingItem);
        } else {
            form.resetFields();
        }
    }, [editingItem, form]);

    const handleAdd = async (values) => {
        try {
            const newItem = await addInventoryItem(values);
            const categoryName = categories.find(cat => cat.categoryId === newItem.categoryId)?.name || 'No Category';
            setInventory([...inventory, { ...newItem, categoryName }]);
            message.success('Item added successfully');
        } catch (error) {
            console.error("Add error:", error);
            message.error('Failed to add item');
        }
        setIsModalOpen(false);
    };

    const handleUpdate = async (values) => {
        try {
            const updatedItem = await updateInventoryItem(editingItem.id, values);
            const categoryName = categories.find(cat => cat.categoryId === updatedItem.categoryId)?.name || 'No Category';
            setInventory(inventory.map(item => item.id === editingItem.id ? { ...updatedItem, categoryName } : item));
            message.success('Item updated successfully');
        } catch (error) {
            message.error('Failed to update item');
        }
        setIsModalOpen(false);
    };


    const handleDelete = async (id) => {
        try {
            await deleteInventoryItem(id);
            setInventory(inventory.filter(item => item.id !== id));
            message.success('Item deleted successfully');
        } catch (error) {
            console.error("Delete error:", error);
            message.error('Failed to delete item');
        }
    };

    const columns = [
        {
            title: 'No',
            key: 'index',
            render: (_, __, index) => index + 1,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Category Name',
            dataIndex: 'categoryName',
            key: 'categoryName',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <>
                    <Button onClick={() => { setEditingItem(record); setIsModalOpen(true); }}>Edit</Button>
                    <Button onClick={() => handleDelete(record.id)} style={{ marginLeft: 8 }}>Delete</Button>
                </>
            ),
        },
    ];

    return (
        <div>
            <h2>Inventory List</h2>
            <Button type="primary" onClick={() => { setEditingItem(null); setIsModalOpen(true); }}>
                Add Inventory Item
            </Button>
            <Table dataSource={inventory} columns={columns} rowKey="id" />

            <Modal
                title={editingItem ? 'Edit Inventory Item' : 'Add Inventory Item'}
                visible={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                onOk={() => {
                    form.submit(); // Submit form saat modal OK diklik
                }}
            >
                <Form
                    form={form}
                    id="inventory-form"
                    initialValues={editingItem || { name: '', quantity: 1, price: 0 }}
                    onFinish={editingItem ? handleUpdate : handleAdd}
                >
                    <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="quantity" label="Quantity" rules={[{ required: true }]}>
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item name="price" label="Price" rules={[{ required: true }]}>
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item name="categoryId" label="Category" rules={[{ required: true }]}>
                        <Select
                            showSearch
                            placeholder="Select a category"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                option.children.toLowerCase().includes(input.toLowerCase())
                            }
                        >
                            {categories.map(category => (
                                <Select.Option key={category.categoryId} value={category.categoryId}>
                                    {category.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default InventoryList;
