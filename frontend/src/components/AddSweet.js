import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

function AddSweet({ show, handleClose, onAdd }) {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !category || !price || !quantity) {
            alert('Please fill all fields');
            return;
        }

        // Convert values to numbers for checking
        const priceValue = parseFloat(price);
        const quantityValue = parseInt(quantity);

        // --- New Validation Logic ---
        if (priceValue <= 0) {
            alert('Price must be greater than 0.');
            return; // Stop the submission
        }

        if (quantityValue <= 0) {
            alert('Quantity must be greater than 0.');
            return; // Stop the submission
        }
        // --- End of New Logic ---

        onAdd({ name, category, price: priceValue, quantity: quantityValue });
        
        // Clear fields and close modal
        setName('');
        setCategory('');
        setPrice('');
        setQuantity('');
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Add a New Sweet</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Sweet Name</Form.Label>
                        <Form.Control type="text" placeholder="e.g., Ladoo" value={name} onChange={e => setName(e.target.value)} autoFocus />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Category</Form.Label>
                        <Form.Control type="text" placeholder="e.g., Milk-Based" value={category} onChange={e => setCategory(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="number" placeholder="e.g., 20" min="0.01" step="0.01" value={price} onChange={e => setPrice(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control type="number" placeholder="e.g., 100" min="1" step="1" value={quantity} onChange={e => setQuantity(e.target.value)} />
                    </Form.Group>
                    <Button type="submit" style={{ display: 'none' }} />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Add Sweet
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddSweet;