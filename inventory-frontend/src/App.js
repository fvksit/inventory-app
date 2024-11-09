// src/App.js
import React from 'react';
import { Layout } from 'antd';
import InventoryList from './components/inventoryList';
import CategoryList from './components/categoryList';

const { Header, Content, Footer } = Layout;

const App = () => {
  return (
    <Layout>
      <Header style={{ color: 'white', textAlign: 'center', fontSize: '24px' }}>
        Inventory Management System
      </Header>
      <Content style={{ padding: '20px 50px' }}>
        <div style={{ display: 'flex', gap: '20px' }}>
          <div style={{ flex: 1 }}>
            <InventoryList />
          </div>
          <div style={{ flex: 1 }}>
            <CategoryList />
          </div>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Inventory System ©2023</Footer>
    </Layout>
  );
};

export default App;
