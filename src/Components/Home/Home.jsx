import { useState, useEffect } from 'react';
import axios from 'axios';

import Form from '../Form/Form.jsx';
import Search from '../Search/Search.jsx';
import Table from '../Table/Table.jsx';

import './Home.css'

function Home() {

    // Storing password
    const [password, setPassword] = useState('');
    const [authenticated, setAuthenticated] = useState(false);
    // Storing user search input
    const [searchInput, setSearchInput] = useState('');
    // Storing winners
    const [winners, setWinners] = useState([]);

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const checkPassword = () => {
        if (password === process.env.REACT_APP_PASSWORD) {
            setAuthenticated(true);
        }
    }

    // GET request to fetch winners
    const fetchWinners = () => {
        axios
            .get('/api/winners')
            .then((response) => {
                setWinners(response.data);
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

    if (!authenticated) {
        return (
            <div>
                <h2 className='auth'>Hi Mom! Please enter your password.</h2>
                <br /><br />
                <input type='password' value={password} onChange={handlePasswordChange} />
                <br />
                <button className='login-button' onClick={checkPassword}>Submit</button>
            </div>
        )
    } else {
        return (
            <div>
                <Form
                    fetchWinners={fetchWinners}
                />
                <hr size='2' color='black' />
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
}

export default Home;