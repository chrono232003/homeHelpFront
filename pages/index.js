import React from 'react';
import Image from 'next/image'
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import StarIcon from '@material-ui/icons/StarBorder';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Header from '../globalComponents/header';
import Footer from '../globalComponents/footer';
import Cookies from 'js-cookie';
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

const newSites = [
  {
    title: 'Free',
    price: '0',
    description: ['10 users included', '2 GB of storage', 'Help center access', 'Email support'],
    buttonText: 'Sign up for free',
    buttonVariant: 'outlined',
  },
  {
    title: 'Pro',
    // subheader: 'Most popular',
    price: '15',
    description: [
      '20 users included',
      '10 GB of storage',
      'Help center access',
      'Priority email support',
    ],
    buttonText: 'Get started',
    buttonVariant: 'contained',
  },
  {
    title: 'Enterprise',
    price: '30',
    description: [
      '50 users included',
      '30 GB of storage',
      'Help center access',
      'Phone & email support',
    ],
    buttonText: 'Contact us',
    buttonVariant: 'outlined',
  },
];

const imageLink = (imagePath) => {
  return `/homeHelp/images/${imagePath}`;
}

function Home({ latestAddedBusinesses }) {
  const classes = useStyles();
  const sessionData = Cookies.get('user')
  console.log("This is the session data:", JSON.stringify(sessionData))
  return (
    <React.Fragment>
      <CssBaseline />
      <Header />
      {/* Hero unit */}
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
          List your Business Now!
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" component="p">
          Connecting customers with great ecommerce through social media marketing. We provide this service
          for free with a simple business listing. 
        </Typography>
          <Button
            fullWidth
            href="./signUpBusiness"
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Register your Business Now
          </Button>



      </Container>
      {/* End hero unit */}
      <Container maxWidth="md" component="main">
      <h2>New Ecommerce Sites</h2>
        <Grid container spacing={5} alignItems="flex-end">
            {latestAddedBusinesses.map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <Grid item key={tier.title} xs={12} sm={tier.title === 'Enterprise' ? 12 : 6} md={4}>
              <Card>
              <Link href={`/business/${tier.ID}`}>
                <CardHeader
                  title={tier.BusinessName}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{ align: 'center' }}
                  action={tier.title === 'Pro' ? <StarIcon /> : null}
                  className={classes.cardHeader}
                />
                </Link>
                <CardContent>
                <img src={`http://localhost:3001/${tier.LogoPath}`} className={classes.logo}/>
                  <div className={classes.cardPricing}>
                    <Typography variant="h6" color="textSecondary">
                      {tier.Description}
                    </Typography>
                  </div>
                </CardContent>
                <CardActions>
                  <Button fullWidth variant={tier.buttonVariant} color="primary">
                    {tier.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Footer />
    </React.Fragment>
  );
}


export async function getServerSideProps() {
     // Fetch data from external API
     const res = await fetch(`http://localhost:3001/getBusinesses`)
     const latestAddedBusinesses = await res.json()
   
     // Pass data to the page via props
     return { props: { latestAddedBusinesses } }
}


export default Home