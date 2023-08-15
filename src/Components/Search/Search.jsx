import './Search.css';

function Search ({ searchInput, handleSearchInputChange }) {

    return (
        <div className="Winner-search">
            <input 
                type="text"
                value={searchInput}
                onChange={handleSearchInputChange}
                placeholder="Search..."
            />
            <br />
        </div>
    )
}

export default Search;