import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link'
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Header from '../../globalComponents/header';
import Footer from '../../globalComponents/footer';
const callAPI = require('../../middleware/utils/callAPI');


function NoBusinessFound() {
  return (
    <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
    No Business Found
  </Typography>
  );
}


const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  logo: {
    display:'block',
    marginLeft:'auto',
    marginRight:'auto',
    maxHeight:'300px'
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    height: '200px',
    marginBottom: theme.spacing(2),
  },
}));

export default function Business({ business }) {
  const classes = useStyles();

  console.log(business)

  return (
    <React.Fragment>
      <CssBaseline />
      <Header />
      {/* Hero unit */}
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
      {business.length == 0 && <NoBusinessFound />}
      {business.map((data) => (
        <React.Fragment>
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
          {data.BusinessName}
        </Typography>
        <img src={`http://localhost:3001/${data.LogoPath}`} className={classes.logo}/>
        <Typography variant="h5" align="center" color="textSecondary" component="p">
          {data.Description}
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" component="p">
        <a target="_blank" href={data.WebsiteLink}>Website Link</a>
        </Typography>
        </React.Fragment>
          ))}
    </Container>
      {/* End hero unit */}
      <Footer />
    </React.Fragment>
  );
}


export async function getServerSideProps(context) {

    const { id } = context.query
    const body = {
      id:id
    }

    const url = "http://localhost:3001/getBusiness"
    const business = await callAPI.makeAPICall("POST", url, body)
    // Pass data to the page via props
    return { props: { business }}
}