import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';

import Cookies from 'js-cookie';


const useStyles = makeStyles((theme) => ({
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
  }));

  function SignInOrProfileButton() {
    return (Cookies.get('user')) ? "Your Profile" : "Login"
  }

  // function SignOutButton() {
  //   return  (
  //     <Button color="primary" variant="outlined" className={classes.link}>
  //     Sign Out
  //     </Button>
  //   )
  // }

export default function Header() {

    const signOutUser = () => {
      Cookies.remove('user');
      window.location.href = "/";
    }
    const classes = useStyles();
    return (
    <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
    <Toolbar className={classes.toolbar}>
      <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
        BL Guy
      </Typography>
      <nav>
        <Link variant="button" color="textPrimary" href="/" className={classes.link}>
          Home
        </Link>
        <Link variant="button" color="textPrimary" href="#" className={classes.link}>
          Business by Category
        </Link>
        <Link variant="button" color="textPrimary" href="#" className={classes.link}>
          Legal
        </Link>
      </nav>
      <Button href={Cookies.get('user') ? "/profile" : "/signIn"} color="primary" variant="outlined" className={classes.link}>
      {SignInOrProfileButton()}
      </Button>
      {Cookies.get('user') && 
      <Button onClick={signOutUser} color="primary" variant="outlined" className={classes.link}>
      Sign Out
      </Button>}
    </Toolbar>
  </AppBar>
    );
}