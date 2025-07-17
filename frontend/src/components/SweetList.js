import React, { useState } from 'react';
import { Table, Button, Alert } from 'react-bootstrap';
import ActionModal from './ActionModal';

function SweetList({ sweets, searchTerm, onDelete, onPurchase, onRestock }) {
    const [showModal, setShowModal] = useState(false);
    const [selectedSweet, setSelectedSweet] = useState(null);
    const [modalType, setModalType] = useState('');

    const handleShowModal = (sweet, type) => {
        setSelectedSweet(sweet);
        setModalType(type);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedSweet(null);
    };

    const handleDelete = (sweet) => {
        if (window.confirm(`Are you sure you want to delete ${sweet.name}?`)) {
            onDelete(sweet.id);
        }
    };

    if (sweets.length === 0) {
        if (searchTerm) {
            return <Alert variant="warning">Sweet matching '{searchTerm}' not found.</Alert>;
        }
        return <Alert variant="info">No sweets are currently in the shop. Try adding one!</Alert>;
    }

    return (
        <>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {sweets.map(sweet => (
                        <tr key={sweet.id}>
                            <td>{sweet.id}</td>
                            <td>{sweet.name}</td>
                            <td>{sweet.category}</td>
                            <td>₹{sweet.price}</td>
                            <td>{sweet.quantity}</td>
                            <td>
                                <Button variant="success" size="sm" className="me-1" onClick={() => handleShowModal(sweet, 'Buy')}>
                                    Buy
                                </Button>
                                <Button variant="info" size="sm" className="me-1" onClick={() => handleShowModal(sweet, 'Restock')}>
                                    Restock
                                </Button>
                                <Button variant="danger" size="sm" onClick={() => handleDelete(sweet)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <ActionModal
                show={showModal}
                handleClose={handleCloseModal}
                type={modalType}
                sweet={selectedSweet}
                onPurchase={onPurchase}
                onRestock={onRestock}
            />
        </>
    );
}

export default SweetList;