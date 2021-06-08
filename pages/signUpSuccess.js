import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import StarIcon from '@material-ui/icons/StarBorder';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Header from '../globalComponents/header';
import Footer from '../globalComponents/footer';

export default function SignUpSuccess() {
    //const classes = useStyles();
  
    return (
      <React.Fragment>
        <CssBaseline />
        <Header />
        {/* Hero unit */}
        <Container maxWidth="sm" component="main">
          <Typography variant="h5" align="center" color="textSecondary" component="p">
            Thanks for registering with us! You can now login via the login page or go to the homepage. 
          </Typography>
          </Container>
        <Footer />
      </React.Fragment>
    );
  }