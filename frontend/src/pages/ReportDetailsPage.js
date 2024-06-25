

// import React, { useEffect, useState } from "react";
// import {
//   Container,
//   Typography,
//   List,
//   ListItem,
//   ListItemText,
//   ListItemAvatar,
//   Avatar,
//   Divider,
//   TextField,
//   Button,
// } from "@mui/material";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import dayjs from "dayjs"; // Add dayjs for date formatting
// import './ReportDetailsPage.css';
// const ReportDetailsPage = () => {
//   const { id } = useParams();
//   const [report, setReport] = useState(null);
//   const [comments, setComments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [commentText, setCommentText] = useState("");

//   useEffect(() => {
//     const fetchReportDetails = async () => {
//       try {
//         const token = localStorage.getItem("token");

//         // Fetch report details
//         const reportResponse = await axios.get(
//           `http://localhost:8081/api/report/${id}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         // Fetch report comments
//         const commentsResponse = await axios.get(
//           `http://localhost:8081/api/user/${id}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         setReport(reportResponse.data);
//         setComments(commentsResponse.data);
//       } catch (error) {
//         console.error("Error fetching report or comments:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchReportDetails();
//   }, [comments]);

//   const handleCommentSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.put(
//         `http://localhost:8081/api/admin/report/${id}/comment`,
//         { comment: commentText },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setComments([...comments, response.data]);
//       setCommentText("");
//       //   window.location.reload();
//     } catch (error) {
//       console.error("Error adding comment:", error);
//     }
//   };

//   return (
//     <Container>
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <>
//           <Typography variant="h4">Title: {report.title}</Typography>
//           <Typography variant="body1">Description: {report.description}</Typography>

//           {Array.isArray(report.files) && report.files.length > 0 ? (
//             <div>
//               <Typography variant="h6">Images:</Typography>
//               <List>
//                 {report.files.map((file, index) => (
//                   <React.Fragment key={index}>
//                     <ListItem>
//                       <ListItemAvatar>
//                         <Avatar
//                           alt={`Image ${index + 1}`}
//                           src={file}
//                           sx={{ width: 200, height: 200 }} // Customize size here
//                         />
//                       </ListItemAvatar>
//                       <ListItemText primary={`Image ${index + 1}`} />
//                     </ListItem>
//                     {index < report.files.length - 1 && <Divider />}
//                   </React.Fragment>
//                 ))}
//               </List>
//             </div>
//           ) : null}
//           <Typography variant="h6">Comments:</Typography>
//           <List>
//             {comments.map((comment) => (
//               <ListItem key={comment.id}>
//                 <ListItemText
//                   primary={`${comment.user.role}: ${comment.comment}`}
//                   secondary={dayjs(comment.date).format("DD/MM/YYYY HH:mm:ss")}
//                 />
//               </ListItem>
//             ))}
//           </List>
//           <form onSubmit={handleCommentSubmit}>
//             <TextField
//               label="Add a comment"
//               value={commentText}
//               onChange={(e) => setCommentText(e.target.value)}
//               fullWidth
//               multiline
//               variant="outlined"
//               margin="normal"
//             />
//             <Button type="submit" variant="contained" color="primary">
//               Add Comment
//             </Button>
//           </form>
//         </>
//       )}
//     </Container>
//   );
// };

// export default ReportDetailsPage;


import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  TextField,
  Button,
} from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs"; // Add dayjs for date formatting
import "./ReportDetailsPage.css";

const ReportDetailsPage = () => {
  const { id } = useParams();
  const [report, setReport] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    const fetchReportDetails = async () => {
      try {
        const token = localStorage.getItem("token");

        // Fetch report details
        const reportResponse = await axios.get(`http://localhost:8081/api/report/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Fetch report comments
        const commentsResponse = await axios.get(`http://localhost:8081/api/user/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setReport(reportResponse.data);
        setComments(commentsResponse.data);
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

  const isAdmin = true; // Replace with your logic to determine if the user is an admin

  return (
    <Container>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Typography variant="h4">Title: {report.title}</Typography>
          <br />
          <Typography variant="h6">Description: {report.description}</Typography><br />
          <Typography variant="h5">Images:</Typography>
          <br />
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
          <br /><br />
          <Typography variant="h6">Comments:</Typography>
          <List className="comments-list">
            {comments.map((comment, index) => (
              <ListItem
                key={index}
                className={`comment-item ${isAdmin ? "admin-comment" : "user-comment"}`}
              >
                <ListItemText
                  primary={`${comment.user.role}: ${comment.comment}`}
                  secondary={dayjs(comment.date).format("DD/MM/YYYY HH:mm:ss")}
                />
              </ListItem>
            ))}
          </List>
          
          <form onSubmit={handleCommentSubmit} className="comment-form">
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
