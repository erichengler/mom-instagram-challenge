import axios from 'axios';

import './Table.css';

function Table ({ filteredWinners, fetchWinners }) {

    const removeWinner = (winnerId) => {
        axios
            .delete(`/api/winners/${winnerId}`)
            .then((response) => {
                // After successful deletion, fetch winners
                fetchWinners();
            })
            .catch((error) => {
                console.log('Error deleteing winner:', error);
            });
    }

    // Correctly formats date to MM-DD-YYYY
    function formatDate(dateString) {
        const date = new Date(dateString);
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const year = date.getFullYear();
        return `${month}-${day}-${year}`;
    }

    return (
        <div>
            <h2>Previous Winners</h2>
            <table className="data-table">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Date Won</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredWinners.map((winner) => (
                        <tr key={winner.id}>
                            <td>{winner.instagram}</td>
                            <td>{formatDate(winner.date)}</td>
                            <td>
                                <button onClick={() => removeWinner(winner.id)}>
                                    X
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
}

export default Table;