import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

const FooterComponent = () => {
  return (
    <AppBar position="static" color="primary">
      <Container maxWidth="lg">
        <Toolbar>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3} lg={3}>
              <Typography variant="h5">About Us</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={3}>
              <Typography variant="h5">Contact Us</Typography>
              <List>
                <ListItem>
                  <Typography variant="body1">info@example.com</Typography>
                </ListItem>
                <ListItem>
                  <Typography variant="body1">tel: +15555555555</Typography>
                </ListItem>
                <ListItem>
                  <a
                    href="https://www.example.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Typography variant="body1">
                      https://www.example.com
                    </Typography>
                  </a>
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={3}>
              <Typography variant="h5">Copyright</Typography>
              <Typography variant="body1">
                Copyright © 2023 Example Company. All rights reserved.
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default FooterComponent;
