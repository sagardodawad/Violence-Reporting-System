import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const AboutUs = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>About Us</Typography>
      <Box mb={2}>
        <Typography variant="body1">
          The violence reporting system aims to reduce underreporting of incidents, enhance transparency, and promote accountability in institutions by providing a platform for reporting violence and tracking statuses. This initiative contributes to Goal 16: Peace, Justice, and Strong Institutions.
        </Typography>
      </Box>
      <Box mb={2}>
        <Typography variant="body1">
          The project aligns closely with Target 16.3, which aims to promote the rule of law at the national and international levels and ensure equal access to justice for all.
        </Typography>
      </Box>
      <Box mb={2}>
        <Typography variant="body1">
          <strong>Promoting the Rule of Law:</strong> Our application encourages individuals to seek legal recourse for incidents of violence, helping to ensure that these incidents are addressed within a legal framework.
        </Typography>
      </Box>
      <Box mb={2}>
        <Typography variant="body1">
          <strong>Equal Access to Justice:</strong> By providing a platform for reporting and tracking incidents of violence, our application helps ensure that everyone has equal access to justice, regardless of their background.
        </Typography>
      </Box>
      <Box mb={2}>
        <Typography variant="body1">
          <strong>Effective, Accountable, and Inclusive Institutions:</strong> Our project enables administrators to manage reports of violence transparently and efficiently, building trust in the justice system.
        </Typography>
      </Box>
    </Container>
  );
};

export default AboutUs;
