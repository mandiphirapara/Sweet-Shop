import React from 'react';
import { Modal, Button, ButtonGroup } from 'react-bootstrap';

function SortModal({ show, handleClose, onSort, onClearSort, sortOrder }) {
    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Sort Sweets</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">
                <p>How would you like to sort the list?</p>
                <div className="d-grid gap-2">
                    <ButtonGroup>
                        <Button
                            variant="outline-primary"
                            active={sortOrder.sortBy === 'name' && sortOrder.order === 'asc'}
                            onClick={() => { onSort('name', 'asc'); handleClose(); }}>
                            By Name (A-Z)
                        </Button>
                        <Button
                            variant="outline-primary"
                            active={sortOrder.sortBy === 'name' && sortOrder.order === 'desc'}
                            onClick={() => { onSort('name', 'desc'); handleClose(); }}>
                            By Name (Z-A)
                        </Button>
                    </ButtonGroup>
                    <ButtonGroup>
                        <Button
                            variant="outline-success"
                            active={sortOrder.sortBy === 'price' && sortOrder.order === 'asc'}
                            onClick={() => { onSort('price', 'asc'); handleClose(); }}>
                            By Price (Low-High)
                        </Button>
                        <Button
                            variant="outline-success"
                            active={sortOrder.sortBy === 'price' && sortOrder.order === 'desc'}
                            onClick={() => { onSort('price', 'desc'); handleClose(); }}>
                            By Price (High-Low)
                        </Button>
                    </ButtonGroup>
                    
                    <Button variant="secondary" onClick={() => { onClearSort(); handleClose(); }}>
                        Clear Sort
                    </Button>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default SortModal;