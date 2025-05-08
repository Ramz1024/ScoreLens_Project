import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import Dashboard_p from './Dashboard_p';
import Dashboard_s from './Dashboard_s';
import LoginPage from './LoginPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard_p" element={<Dashboard_p />} />
        <Route path="/dashboard_s" element={<Dashboard_s />} />
      </Routes>
    </Router>
  );
}

export default App;


// import React, { useState, useEffect } from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import LoginPage from './LoginPage'; // Assuming your LoginPage component is in a separate file
// import Dashboard_p from './Dashboard_p'; // Assuming your Dashboard_p component is in a separate file
// import LocalStorageTest from './LocalStorageTest';

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userRole, setUserRole] = useState(null);

//   useEffect(() => {
//       const storedUserId = localStorage.getItem('user_id');
//       const storedRole = localStorage.getItem('role');
//       if (storedUserId) {
//           setIsLoggedIn(true);
//           setUserRole(storedRole);
//       }
//   }, []);

//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<LoginPage />} />
//         <Route
//           path="/dashboard_p"
//           element={<Dashboard_p />}
//         />
//         {/* Add other routes as needed */}
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;
