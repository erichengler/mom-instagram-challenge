import { useState, useEffect } from 'react';
import axios from 'axios';

import Form from '../Form/Form.jsx';
import Search from '../Search/Search.jsx';
import Table from '../Table/Table.jsx';

function Home() {

    // Storing user search input
    const [searchInput, setSearchInput] = useState('');

    // Storing winners
    const [winners, setWinners] = useState([]);

    // GET request to fetch winners
    const fetchWinners = () => {
        axios
            .get('/api/winners')
            .then((response) => {
                setWinners(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log('Error fetching winners:', error)
            });
    }

    // Automatically fetch winners on page load
    useEffect(() => {
        fetchWinners();
    }, []);

    // Handle change for user search input
    const handleSearchInputChange = (event) => {
        setSearchInput(event.target.value);
    }

    // Filter results based on user search input
    const filteredWinners = winners.filter((winner) =>
        winner.instagram.toLowerCase().includes(searchInput.toLowerCase())
    );

    return (
        <div>
            <Form
                fetchWinners={fetchWinners}
            />
            <hr />
            <Search
                searchInput={searchInput}
                handleSearchInputChange={handleSearchInputChange}
            />
            <Table
                filteredWinners={filteredWinners}
                fetchWinners={fetchWinners}
            />
        </div>
    );
}

export default Home;