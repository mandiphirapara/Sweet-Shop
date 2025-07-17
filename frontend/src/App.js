import React, { useState } from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import Header from './components/Header';
import SweetList from './components/SweetList';
import AddSweet from './components/AddSweet';
import SearchBar from './components/SearchBar';
import SortModal from './components/SortModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import SweetShop from './logic/sweetshop';

const shop = new SweetShop();

shop.addSweet(1001, "Kaju Katli", "Nut-Based", 50, 20);
shop.addSweet(1002, "Gajar Halwa", "Vegetable-Based", 30, 15);
shop.addSweet(1003, "Gulab Jamun", "Milk-Based", 10, 50);

function App() {
    const [sweets, setSweets] = useState(shop.getAllSweets());
    const [searchTerm, setSearchTerm] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [showSortModal, setShowSortModal] = useState(false);
    const [sortOrder, setSortOrder] = useState({ sortBy: null, order: 'asc' });

    const updateSweetsList = () => {
        setSweets([...shop.getAllSweets()]);
    };

    const handleSort = (sortBy, order) => {
        shop.sortSweets(sortBy, order);
        setSortOrder({ sortBy, order });
        updateSweetsList();
        toast.info(`Sorted by ${sortBy} (${order === 'asc' ? 'ascending' : 'descending'})`);
    };
    
    const handleClearSort = () => {
        shop.sortSweets('id', 'asc');
        setSortOrder({ sortBy: null, order: 'asc' });
        updateSweetsList();
        toast.info("Sort has been cleared.");
    };

    const handleAddSweet = (sweet) => {
        const maxId = shop.getAllSweets().reduce((max, s) => (s.id > max ? s.id : max), 0);
        const newId = maxId > 0 ? maxId + 1 : 1001;
        shop.addSweet(newId, sweet.name, sweet.category, sweet.price, sweet.quantity);

        if (sortOrder.sortBy) {
            shop.sortSweets(sortOrder.sortBy, sortOrder.order);
        }
        
        updateSweetsList();
        toast.success(`${sweet.name} added successfully!`);
    };

    const handleDeleteSweet = (id) => {
        const sweetToDelete = shop.getAllSweets().find(s => s.id === id);
        shop.deleteSweet(id);
        updateSweetsList();
        if (sweetToDelete) {
            toast.error(`${sweetToDelete.name} has been deleted.`);
        }
    };

    const handlePurchase = (id, amount) => {
        try {
            const sweetToBuy = shop.getAllSweets().find(s => s.id === id);
            shop.purchaseSweet(id, amount);
            updateSweetsList();
            toast.success(`You purchased ${amount} ${sweetToBuy.name}(s).`);
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleRestock = (id, amount) => {
        const sweetToRestock = shop.getAllSweets().find(s => s.id === id);
        shop.restockSweet(id, amount);
        updateSweetsList();
        toast.info(`${sweetToRestock.name} has been restocked with ${amount} units.`);
    };

    const filteredSweets = shop.searchSweets(searchTerm);

    return (
        <div className="App">
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
            <Header />
            <Container className="mt-4">
                <Row className="align-items-center mb-3">
                    <Col><h2 className='text-start'>Available Sweets</h2></Col>
                    <Col className="text-end">
                        <Button variant="primary" onClick={() => setShowAddModal(true)}>
                            + Add a New Sweet
                        </Button>
                    </Col>
                </Row>
                
                <SearchBar 
                    searchTerm={searchTerm} 
                    setSearchTerm={setSearchTerm} 
                    onSortClick={() => setShowSortModal(true)}
                    sortOrder={sortOrder}
                />
                
                <SweetList
                    sweets={filteredSweets}
                    searchTerm={searchTerm}
                    onDelete={handleDeleteSweet}
                    onPurchase={handlePurchase}
                    onRestock={handleRestock}
                />
            </Container>

            <AddSweet 
                show={showAddModal}
                handleClose={() => setShowAddModal(false)}
                onAdd={handleAddSweet}
            />

            <SortModal
                show={showSortModal}
                handleClose={() => setShowSortModal(false)}
                onSort={handleSort}
                onClearSort={handleClearSort}
                sortOrder={sortOrder}
            />
        </div>
    );
}

export default App;