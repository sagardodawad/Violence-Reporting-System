/** @format */

// import React from "react";
// import { Link } from "react-router-dom";
// import "./Header.css";

// const Header = () => {
//   const userRole = localStorage.getItem("userRole");

//   const handleLogout = () => {
//     // Clear token from localStorage
//     localStorage.removeItem("token");
//     // Navigate to the home route
//     window.location.href = "/";
//   };

//   return (
//     <nav className="navbar">
//       <div className="container">
//         <div className="logo">
//           <Link to="/" className="logo-text">
//             Logo
//           </Link>
//         </div>
//         <div className="nav-links">
//           {userRole === "ADMIN" ? (
//             <>
//               <Link to="/admin-dashboard" className="nav-link">
//                 Admin Dashboard
//               </Link>
//               <button className="nav-link logout-button" onClick={handleLogout}>
//                 Logout
//               </button>
//             </>
//           ) : (
//             <>
//               <Link to="/report-violence" className="nav-link">
//                 Report Violence
//               </Link>
//               <Link to="/history" className="nav-link">
//                 History
//               </Link>
//               <Link to="/about-us" className="nav-link">
//                 About Us
//               </Link>
//               <button className="nav-link logout-button" onClick={handleLogout}>
//                 Logout
//               </button>
//             </>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Header;

import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const userRole = localStorage.getItem("userRole");

  const handleLogout = () => {
    // Clear token from localStorage
    localStorage.removeItem("token");
    // Navigate to the home route
    window.location.href = "/";
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
          <Link
           
            className="logo-text"
            onClick={() => window.location.reload()}
          >
            Peace
          </Link>
        </div>
        <div className="nav-links">
          {userRole === "ADMIN" ? (
            <>
              <Link to="/admin-dashboard" className="nav-link">
                Admin Dashboard
              </Link>
              <button className="nav-link logout-button" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/report-violence" className="nav-link">
                Report Violence
              </Link>
              <Link to="/history" className="nav-link">
                History
              </Link>
              <Link to="/about-us" className="nav-link">
                About Us
              </Link>
              <button className="nav-link logout-button" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
