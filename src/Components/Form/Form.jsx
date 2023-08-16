import { useState } from 'react';
import axios from 'axios';
import './Form.css'

function Form ({ fetchWinners }) {

    // Storing instagram handle and date won from user form
    const [instagramHandle, setInstagramHandle] = useState('');
    const [dateWon, setDateWon] = useState('');

    const createNewWinner = (event) => {
        event.preventDefault();

        // Check if both fields are filled
        if (!instagramHandle || !dateWon) {
            alert('Please fill out both the Instagram Handle and the Date Won.');
            return;
        }

        // Data to be sent to the server
        const formData = {
            handle: instagramHandle,
            date: dateWon,
        }

        // Sending data to the server
        axios
            .post('/api/winners', formData)
            .then((response) => {
                // Reset form after successful submission
                setInstagramHandle('');
                setDateWon('');
                // Fetch winners after successful submission
                fetchWinners();
                alert(`Added ${instagramHandle} to the winners list. Date won: ${dateWon}`)
            })
            .catch((error) => {
                console.log('Error creating new winner:', error);
            });
    }

    return (
        <div className="Winner-form">
            <h2 className='header'><u>Create New Winner</u></h2>
            <form>
                <label>Instagram Handle:</label><br />
                <input 
                    type="text" 
                    id="handle" 
                    name="handle"
                    value={instagramHandle}
                    onChange={(event) => setInstagramHandle(event.target.value)}
                />

                <label>Date Won:</label><br />
                <input 
                    type="date" 
                    id="date" 
                    name="date" 
                    value={dateWon}
                    onChange={(event) => setDateWon(event.target.value)}
                /><br />

                <button onClick={createNewWinner}>Submit</button>
            </form>
        </div>
    );
}

export default Form;