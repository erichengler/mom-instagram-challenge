import './Search.css';

function Search ({ searchInput, handleSearchInputChange }) {

    return (
        <div className="Winner-search">
            <h2 style={{marginBottom: "15px"}}><u>Previous Winners</u></h2>
            <input 

                type="text"
                value={searchInput}
                onChange={handleSearchInputChange}
                placeholder="Search..."
            />
        </div>
    )
}

export default Search;