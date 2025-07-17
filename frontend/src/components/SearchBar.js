import React from 'react';
import { Form, FormControl, InputGroup, Button } from 'react-bootstrap';

function SearchBar({ searchTerm, setSearchTerm, onSortClick, sortOrder }) {
    // Check if a sort is active by seeing if sortOrder.sortBy has a value
    const isSortActive = sortOrder.sortBy;

    return (
        <Form className="mb-3">
            <InputGroup>
                <InputGroup.Text>🔍</InputGroup.Text>
                <FormControl
                    type="text"
                    placeholder="Search by id, name or category..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                {/* Change button variant based on whether a sort is active */}
                <Button variant={isSortActive ? 'primary' : 'outline-secondary'} onClick={onSortClick}>
                    ⇅ Sort
                </Button>
            </InputGroup>
        </Form>
    );
}

export default SearchBar;