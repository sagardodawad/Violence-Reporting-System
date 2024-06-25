// /** @format */

// import React, { useState } from "react";
// import { Container, Typography, Box, Tabs, Tab } from "@mui/material";
// import UserLogin from "./UserLogin";
// import UserRegister from "./UserRegister";

// const LandingPage = () => {
//   const [tabIndex, setTabIndex] = useState(0);

//   const handleTabChange = (event, newValue) => {
//     setTabIndex(newValue);
//   };

//   return (
//     <Container>
//       <Typography variant="h3" align="center" gutterBottom>
//         Welcome to SDG 16 Project
//       </Typography>

//       <Box>
//         <Tabs value={tabIndex} onChange={handleTabChange} centered>
//           <Tab label="Login" />
//           <Tab label="Register" />
//         </Tabs>
//         {tabIndex === 0 && <UserLogin />}
//         {tabIndex === 1 && <UserRegister />}
//       </Box>
//     </Container>
//   );
// };

// export default LandingPage;


/** @format */

import React, { useState } from "react";
import { Container, Typography, Box, Tabs, Tab } from "@mui/material";
import UserLogin from "./UserLogin";
import UserRegister from "./UserRegister";
import "./LandingPage.css";

const LandingPage = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <div className="background-image">

    
    <div className="landing-page" >
      <Container className="content">
      

        <Box className="tabs-container">
          <Tabs value={tabIndex} onChange={handleTabChange} centered>
            <Tab label="Login" className="tab"/>
            <Tab label="Register" className="tab"/>
          </Tabs>
          {tabIndex === 0 && <UserLogin />}
          {tabIndex === 1 && <UserRegister />}
        </Box>
      </Container>
    </div>
    </div>
  );
};

export default LandingPage;
