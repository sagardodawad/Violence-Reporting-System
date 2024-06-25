

import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  IconButton,
} from "@mui/material";
import axios from "axios";
import { Cloudinary } from "@cloudinary/url-gen";
import { auto } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { Box } from "@mui/material";


const ReportViolence = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);
  const [fileUrls, setFileUrls] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const cld = new Cloudinary({ cloud: { cloudName: "dkcy9ejf0" } });

  const handleFileChange = async (event) => {
    const fileList = Array.from(event.target.files);
    const imageFiles = fileList.filter((file) =>
      file.type.startsWith("image/")
    );

    if (imageFiles.length !== fileList.length) {
      alert("Please upload only image files.");
      return;
    }

    setFiles(imageFiles);
    setIsLoading(true);

    const urls = [];
    for (const file of imageFiles) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "default"); // Replace with your actual upload preset name

      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dkcy9ejf0/image/upload",
          formData
        );
        const imageUrl = response.data.secure_url;

        // Apply transformations if needed
        const img = cld
          .image(response.data.public_id)
          .format("auto")
          .quality("auto")
          .resize(auto().gravity(autoGravity()).width(500).height(500));

        const transformedUrl = img.toURL();
        urls.push(transformedUrl);
        console.log("File uploaded and transformed:", transformedUrl);
      } catch (error) {
        console.error(
          "Error uploading file:",
          error.response ? error.response.data : error.message
        );
        alert(
          `Error uploading file: ${
            error.response ? error.response.data.error.message : error.message
          }`
        );
        setIsLoading(false);
        setFiles([]);
        setFileUrls([]);
        return;
      }
    }

    setFileUrls(urls);
    setIsLoading(false);
  };

  const handleSubmit = async () => {
    if (isLoading) {
      alert("Please wait for the files to finish uploading.");
      return;
    }

    try {
      const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
      const response = await axios.post(
        "http://localhost:8081/api/report",
        {
          title,
          description,
          files: fileUrls,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Report submitted successfully:", response.data);
      alert("Report submitted successfully");
      setTitle("");
      setDescription("");
      setFiles([]);
      setFileUrls([]);
    } catch (error) {
      console.error(
        "Error submitting report:",
        error.response ? error.response.data : error.message
      );
      alert(
        `Error submitting report: ${
          error.response ? error.response.data.message : error.message
        }`
      );
    }
  };
  return (
    <Container maxWidth="sm">
      <Typography variant="h4" style={{ marginBottom: "1rem" }}>
        Report Violence
      </Typography>
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        margin="normal"
        autoComplete="off"
      />
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        margin="normal"
        multiline
        rows={4}
      />
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
        id="file-upload"
      />
      <label htmlFor="file-upload">
        <IconButton component="span">
          <AttachFileIcon />
        </IconButton>
        Upload Images
      </label>
      <Box display="flex" flexWrap="wrap">
        {fileUrls.map((url, index) => (
          <Box key={index} m={1}>
            <img src={url} alt={`Image ${index + 1}`} style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 5 }} />
          </Box>
        ))}
      </Box>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={isLoading}
        style={{ marginBottom: "1rem" }}
      >
        {isLoading ? "Uploading..." : "Submit"}
      </Button>
    </Container>
  );
};

export default ReportViolence;
