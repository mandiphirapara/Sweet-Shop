import React, { useState, useEffect } from 'react'; // Import useEffect
import { Container, Button, Row, Col } from 'react-bootstrap';
import Header from './components/Header';
import SweetList from './components/SweetList';
import AddSweet from './components/AddSweet';
import SearchBar from './components/SearchBar';
import SortModal from './components/SortModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

// We no longer import the SweetShop class

const API_URL = 'http://localhost:3001/sweets';

function App() {
    const [sweets, setSweets] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [showSortModal, setShowSortModal] = useState(false);
    const [sortOrder, setSortOrder] = useState({ sortBy: null, order: 'asc' });

    // Fetch initial data when the app loads
    useEffect(() => {
        const getSweets = async () => {
            const sweetsFromServer = await fetchSweets();
            setSweets(sweetsFromServer);
        };
        getSweets();
    }, []);

    const fetchSweets = async () => {
        const res = await fetch(API_URL);
        const data = await res.json();
        return data;
    };

    const fetchSweet = async (id) => {
        const res = await fetch(`${API_URL}/${id}`);
        const data = await res.json();
        return data;
    };

    const handleAddSweet = async (sweet) => {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(sweet),
        });
        const newSweet = await res.json();
        setSweets([...sweets, newSweet]); // Update UI
        toast.success(`${sweet.name} added successfully!`);
    };

    const handleDeleteSweet = async (id) => {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        setSweets(sweets.filter(sweet => sweet.id !== id)); // Update UI
        toast.error(`Sweet has been deleted.`);
    };

    const updateSweetQuantity = async (id, newQuantity) => {
        const res = await fetch(`${API_URL}/${id}`, {
            method: 'PATCH',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ quantity: newQuantity }),
        });
        const updatedSweet = await res.json();
        setSweets(sweets.map(sweet => sweet.id === id ? updatedSweet : sweet));
    };

    const handlePurchase = async (id, amount) => {
        const sweetToBuy = await fetchSweet(id);
        if (sweetToBuy.quantity >= amount) {
            const newQuantity = sweetToBuy.quantity - amount;
            await updateSweetQuantity(id, newQuantity);
            toast.success(`You purchased ${amount} ${sweetToBuy.name}(s).`);
        } else {
            toast.error(`Not enough stock for ${sweetToBuy.name}!`);
        }
    };

    const handleRestock = async (id, amount) => {
        const sweetToRestock = await fetchSweet(id);
        const newQuantity = sweetToRestock.quantity + amount;
        await updateSweetQuantity(id, newQuantity);
        toast.info(`${sweetToRestock.name} has been restocked with ${amount} units.`);
    };

    // Filtering and sorting are now done on the frontend state
    const sortedSweets = [...sweets].sort((a, b) => {
        if (!sortOrder.sortBy) return 0;
        const valA = sortOrder.sortBy === 'name' ? a.name.toLowerCase() : a.price;
        const valB = sortOrder.sortBy === 'name' ? b.name.toLowerCase() : b.price;
        if (valA < valB) return sortOrder.order === 'asc' ? -1 : 1;
        if (valA > valB) return sortOrder.order === 'asc' ? 1 : -1;
        return 0;
    });

    const filteredAndSortedSweets = sortedSweets.filter(sweet =>
        sweet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sweet.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(sweet.id).includes(searchTerm)
    );

    return (
        <div className="App">
            {/* The rest of your JSX remains exactly the same */}
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
            <Header />
            <Container className="mt-4">
                <Row className="align-items-center mb-3">
                    <Col><h2>Available Sweets</h2></Col>
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
                    sweets={filteredAndSortedSweets}
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
                onSort={(sortBy, order) => setSortOrder({ sortBy, order })}
                onClearSort={() => setSortOrder({ sortBy: null, order: 'asc' })}
                sortOrder={sortOrder}
            />
        </div>
    );
}

export default App;