/** @format */

import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Avatar,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs"; // Add dayjs for date formatting
import "./AdminReportDetails.css";
const ReportDetailsPage = () => {
  const { id } = useParams();
  const [report, setReport] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchReportDetails = async () => {
      try {
        const token = localStorage.getItem("token");

        // Fetch report details
        const reportResponse = await axios.get(
          `http://localhost:8081/api/report/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Fetch report comments
        const commentsResponse = await axios.get(
          `http://localhost:8081/api/user/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        //

        setReport(reportResponse.data);
        setComments(commentsResponse.data);
        setStatus(reportResponse.data.status); // Set the initial status
        const userDetails = await axios.get(
          `http://localhost:8081/api/users/${reportResponse.data.user.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserDetails(userDetails.data);
      } catch (error) {
        console.error("Error fetching report or comments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReportDetails();
  }, [comments]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:8081/api/admin/report/${id}/comment`,
        { comment: commentText },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setComments([...comments, response.data]);
      setCommentText("");
      //   window.location.reload();
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleStatusChange = async (e) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:8081/api/admin/report/${id}/${e.target.value}`,
        { status: e.target.value },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStatus(e.target.value);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };
  const isAdmin = true;
  return (
    <Container>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Typography variant="h4">Title: {report.title}</Typography>
          <br></br>
          <Typography variant="h6">
            Description: {report.description}
          </Typography>
          <br />
          <Typography variant="h5">Reported by: </Typography>
          <Typography variant="h7">Name: {userDetails.userName}</Typography>
          <br />
          <Typography variant="h7">Email: {userDetails.email}</Typography>
          <br />
          <Typography variant="h7">
            Mobile number: {userDetails.phoneNumber}
          </Typography>
          <br />
          <br />
          <Typography variant="h6">Status:</Typography>

          <FormControl fullWidth margin="normal">
            <InputLabel id="status-label"></InputLabel>
            <Select
              labelId="status-label"
              id="status"
              value={status}
              onChange={handleStatusChange}
            >
              <MenuItem value="PENDING">Pending</MenuItem>
              <MenuItem value="INPROCESS">In Process</MenuItem>
              <MenuItem value="SOLVED">Solved</MenuItem>
              <MenuItem value="SPAM">Spam</MenuItem>
            </Select>
          </FormControl>
          <Typography variant="h6">Images: </Typography>
          {Array.isArray(report.files) && report.files.length > 0 ? (
            <div className="images-container">
              {report.files.map((file, index) => (
                <Avatar
                  key={index}
                  alt={`Image ${index + 1}`}
                  src={file}
                  sx={{ width: "370px", height: "300px", borderRadius: "10px" }} // Customize size and shape here
                />
              ))}
            </div>
          ) : null}
          <br />
          <br />
          <Typography variant="h6">Comments:</Typography>
          <List className="comments-list">
            {comments.map((comment, index) => (
              <ListItem
                key={index}
                className={`comment-item ${
                  isAdmin ? "admin-comment" : "user-comment"
                }`}
              >
                <ListItemText
                  primary={`${comment.user.role}: ${comment.comment}`}
                  secondary={dayjs(comment.date).format("DD/MM/YYYY HH:mm:ss")}
                />
              </ListItem>
            ))}
          </List>
          <form onSubmit={handleCommentSubmit}>
            <TextField
              label="Add a comment"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              fullWidth
              multiline
              variant="outlined"
              margin="normal"
            />
            <Button type="submit" variant="contained" color="primary">
              Add Comment
            </Button>
          </form>
        </>
      )}
    </Container>
  );
};

export default ReportDetailsPage;
