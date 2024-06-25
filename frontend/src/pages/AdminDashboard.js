/** @format */
import { useNavigate } from "react-router-dom";

import React from "react";
import {
  Container,
  Typography,
  Tabs,
  Tab,
  Box,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import axios from "axios";
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [tabIndex, setTabIndex] = React.useState(0);
  const [reports, setReports] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const handleChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };

  React.useEffect(() => {
    const fetchReports = async (status) => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:8081/api/admin/reports/${status}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setReports(response.data);
      } catch (error) {
        console.error("Error fetching reports:", error);
      } finally {
        setLoading(false);
      }
    };

    if (tabIndex === 0) {
      fetchReports("pending");
    } else if (tabIndex === 1) {
      fetchReports("inprocess");
    } else if (tabIndex === 2) {
      fetchReports("solved");
    } else if (tabIndex === 3) {
      fetchReports("spam");
    }
  }, [tabIndex]);

  return (
    <Container>
      <br />
      <Typography variant="h4">Admin Dashboard</Typography>
      <br />
      <Tabs value={tabIndex} onChange={handleChange}>
        <Tab label="Pending" />
        <Tab label="In Process" />
        <Tab label="Solved" />
        <Tab label="Spam" />
      </Tabs>
      <TabPanel value={tabIndex} reports={reports} />
    </Container>
  );
};
// const TabPanel = ({ value, reports }) => {
//   const navigate = useNavigate();

//   const handleReportClick = (id) => {
//     navigate(`/admin/report/${id}`);
//   };
//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== value}
//       id={`tabpanel-${value}`}
//       aria-labelledby={`tab-${value}`}
//     >
//       {value === value && (
//         <Box p={3}>
//           <List>
//           {reports.map((report) => (
//               <ListItem
//                 key={report.id}
//                 button
//                 onClick={() => handleReportClick(report.id)}
//               >
//                 <ListItemText primary={report.title} />
//               </ListItem>
//             ))}
//           </List>
//         </Box>
//       )}
//     </div>
//   );
// };
const TabPanel = ({ value, reports }) => {
  const navigate = useNavigate();

  const handleReportClick = (id) => {
    navigate(`/admin/report/${id}`);
  };

  return (
    <div
      role="tabpanel"
      hidden={value !== value}
      id={`tabpanel-${value}`}
      aria-labelledby={`tab-${value}`}
    >
      {value === value && (
        <Box p={3}>
          <List>
            {reports.map((report, index) => (
              <ListItem
                key={report.id}
                button
                onClick={() => handleReportClick(report.id)}
              >
                <ListItemText primary={`${index + 1}. ${report.title}`} />
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </div>
  );
};

export default AdminDashboard;
