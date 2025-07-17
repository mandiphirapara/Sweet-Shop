import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function ActionModal({ show, handleClose, type, sweet, onPurchase, onRestock }) {
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        setQuantity(1);
    }, [show]);

    // The function now accepts the event 'e'
    const handleSubmit = (e) => {
        e.preventDefault(); // This is the crucial line that stops the page from reloading

        const amount = parseInt(quantity);
        if (amount > 0) {
            if (type === 'Buy') {
                onPurchase(sweet.id, amount);
            } else if (type === 'Restock') {
                onRestock(sweet.id, amount);
            }
            handleClose();
        }
    };

    if (!sweet) return null;

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{type} {sweet.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* Add the onSubmit handler to the Form tag */}
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Quantity:</Form.Label>
                        <Form.Control
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            min="1"
                            max={type === 'Buy' ? sweet.quantity : undefined}
                            autoFocus
                        />
                    </Form.Group>
                    {/* The button below doesn't need to change, but we add a hidden one for semantics */}
                    <Button type="submit" style={{ display: 'none' }} />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant={type === 'Buy' ? 'success' : 'info'} onClick={handleSubmit}>
                    Confirm {type}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ActionModal;