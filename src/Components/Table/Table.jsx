import axios from 'axios';
import './Table.css';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

function Table({ filteredWinners, fetchWinners }) {

    const removeWinner = (winnerId) => {
        if (window.confirm("Are you sure?")) {
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
            {filteredWinners.length === 0 ? <h3>No Winners Yet!</h3> :
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Name / Handle</th>
                            <th>Date Won</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredWinners.map((winner) => (
                            <tr key={winner.id} className='rows'>
                                {winner.name ? (
                                    <td className='table-cell'>
                                        {winner.name}
                                        <br />
                                        {winner.instagram}
                                    </td>
                                ) : (
                                    <td className='table-cell'>
                                        {winner.instagram}
                                    </td>
                                )}

                                <td>{formatDate(winner.date)}</td>
                                <td>
                                    <DeleteForeverIcon
                                        sx={{ cursor: "pointer" }}
                                        fontSize="large"
                                        onClick={() => removeWinner(winner.id)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            }
        </div>
    );
}

export default Table;