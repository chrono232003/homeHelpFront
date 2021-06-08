import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import procSignUp from '../middleware/procSignup';
import { TextareaAutosize } from '@material-ui/core';
import Header from '../globalComponents/header';
import Footer from '../globalComponents/footer';

import Cookies from 'js-cookie';

import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

  const useStyles = makeStyles((theme) => ({
    textarea: {
      resize: "both"
    },
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    button: {
      backgroundColor: '#3f51b5',
      color: 'white'
     }
  }));

  function imagePreview(event) {
      var reader = new FileReader();
      reader.onload = function(){
        output.src = reader.result;
      };
      reader.readAsDataURL(event.target.files[0]);
  }

  function validEmail(email) {
    return email == "" || (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))
  }
  function validBizName(name) {
    return name == "" || (/^[0-9a-zA-Z- ]+$/.test(name))
  }

  function validPassword(pass) {
    return pass == "" || (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(pass))
  }

  function validURL(url) {
    return url == "" || (/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig.test(url))
  }

  function validDesc(desc) {
    return desc == "" || desc.length > 25;
  }

  const preventDefault = f => e => {
    e.preventDefault()
    f(e)
  }

  export default function SignUp({products}) {
    const handleSubmit = preventDefault(() => {
      procSignUp.createUser().then((res) => {
        if (res["response"] == "Success") {
          window.location.href = "./signUpSuccess";
        } else {
            console.log(res)
        }
      })
    })
    
    const classes = useStyles();
    const [nameError, setNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passError, setPassError] = useState(false);
    const [urlError, setUrlError] = useState(false);
    const [descError, setDescError] = useState(false);
  
    return (
      <React.Fragment>
        <Header />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            List your business
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit} encType="multipart/form-data" validate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  onBlur={(e) => {if(!validBizName(e.target.value)) {setNameError(true)} else {setNameError(false)}}}
                  error={nameError}
                  helperText={nameError ? "Enter a valid business name (Numbers, Letters, Spaces)" : ""}
                  id="businessName"
                  label="Business Name"
                  name="businessName"
                  autoComplete="businessName"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  onBlur={(e) => {if(!validEmail(e.target.value)) {setEmailError(true)} else {setEmailError(false)}}}
                  error={emailError}
                  helperText={emailError ? "Enter a valid email address" : ""}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  onBlur={(e) => {if(!validPassword(e.target.value)) {setPassError(true)} else {setPassError(false)}}}
                  error={passError}
                  helperText={passError ? "Enter a valid password (at least one uppercase, one lowercase and a special character)" : ""}
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              </Grid>
              <Grid item xs={12}>
        <InputLabel htmlFor="age-native-simple">Website Product Category</InputLabel>
        <Select
          id="products"
          name="products"
          native
          required
        >
          <option aria-label="None" value="" />
          {products.map((product) => (
            <option value={product.ID}>{product.ProductName}</option>
          ))}
        </Select>
                </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  onBlur={(e) => {if(!validURL(e.target.value)) {setUrlError(true)} else {setUrlError(false)}}}
                  error={urlError}
                  helperText={urlError ? "Enter a valid website url (EX: http://example.com)" : ""}
                  fullWidth
                  name="websiteLink"
                  label="Website Link"
                  type="text"
                  id="websiteLink"
                  autoComplete="websiteLink"
                />
              </Grid>
              <Grid item xs={12}>
              <input
                accept="image/*"
                className={classes.input}
                style={{ display: 'none' }}
                id="logo"
                name="logo"
                onChange={(event) => imagePreview(event)}
                multiple
                type="file"
              />
              <label htmlFor="logo">
                <Button variant="raised" component="span" className={classes.button}>
                  Upload Website Image/Logo
                </Button>
              </label>
              <img id="output" style={{marginTop:'5px', maxWidth:'300px'}}/>
              </Grid>
              <Grid item xs={12}>
              <TextareaAutosize
                    rowsMin={6}
                    style={{ width: "100%" }}
                    placeholder="Description"
                    onChange={(e) => {if(!validDesc(e.target.value)) {setDescError(true)} else {setDescError(false)}}}
                    error={descError}
                    helperText={descError ? "Enter a valid description" : ""}
                    aria-label="maximum height"
                    name="description"
                    label="Description"
                    id="description"
                    autoComplete="description"
                    />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="./signIn" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
      <Footer />
      </React.Fragment>
    );
  }

  export async function getServerSideProps() {
    // Fetch data from external API
    const res = await fetch(`http://localhost:3001/getProducts`)
    const products = await res.json()
  
    // Pass data to the page via props
    return { props: { products } }
  }



  
