import React from "react";
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./History.css"; // Import your CSS file

const History = ({ reports }) => {
  const navigate = useNavigate();

  const handleReportClick = (id) => {
    navigate(`/report/${id}`);
  };

  return (
    <Container className="history-container">
      <Typography variant="h4" className="history-title">
        History
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>S.No</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reports.map((report, index) => (
            <TableRow
              key={report.id}
              onClick={() => handleReportClick(report.id)}
              className="history-table-row"
            >
              <TableCell>{index + 1}</TableCell>
              <TableCell>{report.title}</TableCell>
              <TableCell>{report.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default History;
