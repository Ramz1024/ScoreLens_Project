import React, { useState, useEffect } from 'react';

const LocalStorageTest = () => {
    const [storedUserId, setStoredUserId] = useState(null);

    useEffect(() => {
        const userIdFromStorage = localStorage.getItem('user_id');
        console.log("LocalStorageTest: useEffect - user_id from localStorage:", userIdFromStorage);
        setStoredUserId(userIdFromStorage);
    }, []);

    return (
        <div>
            <h1>Local Storage Test</h1>
            <p>User ID from localStorage: {storedUserId}</p>
        </div>
    );
};

export default LocalStorageTest;
