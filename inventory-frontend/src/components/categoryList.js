import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Input, Form, message } from 'antd';
import { fetchCategoryList, addCategory, updateCategory, deleteCategory } from '../services/api';

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null); // Perbaikan nama fungsi set

    const [form] = Form.useForm(); // Buat instance form untuk mengatur nilai form

    useEffect(() => {
        const getCategories = async () => {
            const data = await fetchCategoryList();
            setCategories(data);
        };
        getCategories();
    }, []);

    useEffect(() => {
        if (editingCategory) {
            form.setFieldsValue(editingCategory);
        } else {
            form.resetFields();
        }
    }, [editingCategory, form]);

    const handleAdd = async (values) => {
        try {
            const newItem = await addCategory(values);
            setCategories([...categories, newItem]);
            message.success('Category added successfully');
        } catch {
            message.error('Failed to add category');
        }
        setIsModalOpen(false);
    };

    const handleUpdate = async (values) => {
        try {
            const updatedCategory = await updateCategory(editingCategory.categoryId, values);
            setCategories(categories.map(item => item.categoryId === editingCategory.categoryId ? updatedCategory : item));
            message.success('Category updated successfully');
        } catch {
            message.error('Failed to update category');
        }
        setIsModalOpen(false);
    };

    const handleDelete = async (id) => {
        try {
            await deleteCategory(id);
            setCategories(categories.filter(item => item.categoryId !== id));
            message.success('Category deleted successfully');
        } catch {
            message.error('Failed to delete category');
        }
    };

    const columns = [
        {
            title: 'No',
            key: 'index',
            render: (_, __, index) => index + 1,
        },
        {
            title: 'Category Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <>
                    <Button onClick={() => { setEditingCategory(record); setIsModalOpen(true); }}>Edit</Button>
                    <Button onClick={() => handleDelete(record.categoryId)} style={{ marginLeft: 8 }}>Delete</Button>
                </>
            ),
        },
    ];

    return (
        <div>
            <h2>Category List</h2>
            <Button type="primary" onClick={() => { setEditingCategory(null); setIsModalOpen(true); }}>
                Add Category
            </Button>
            <Table dataSource={categories} columns={columns} rowKey="categoryId" />

            <Modal
                title={editingCategory ? 'Edit Category' : 'Add Category'}
                visible={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                onOk={() => form.submit()}
            >
                <Form
                    form={form}
                    id="category-form"
                    initialValues={editingCategory || { name: '' }}
                    onFinish={editingCategory ? handleUpdate : handleAdd}
                >
                    <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default CategoryList;
