import React, { useEffect, useRef } from 'react';

function UserSearchBar({search, setUserSearch}) {
    const searchBarRef = useRef(null);
    
    useEffect(() => {
        searchBarRef.current.focus();
    }, [])

    const updateSearchQuery = (e) => {
        setUserSearch(e.target.value);
    }
    
    return (
        <form className="search-for-user-form" onSubmit={search}>
            <input className="search-for-user-input" type="text" ref={searchBarRef} onChange={updateSearchQuery} placeholder="Search for a user"/>
            <button className="search-for-user-button">Search</button>
        </form>
    )
}

export default UserSearchBar;
