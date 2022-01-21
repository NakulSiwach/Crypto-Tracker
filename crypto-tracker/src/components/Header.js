
import React from 'react';
import { AppBar, Container, Toolbar, Typography,Select,MenuItem, makeStyles, createTheme, ThemeProvider } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { CryptoState } from '../CryptoContext';


const useStyles=makeStyles(()=>({
  title:{
    color:"gold",
    flex:1,
    fontWeight:"bold",
    cursor:"pointer",
  }
}));

const Header = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const { currency,setCurrency } = CryptoState()
  console.log(currency)
  const darkTheme = createTheme({
    palette: {
      primary:{
        main:"#fff",
      },
      type: 'dark',
    },
  });

  return (
    <ThemeProvider theme={darkTheme} >

  <AppBar color='transparent' position='static' >
    <Container>
      <Toolbar>
        <Typography onClick={()=>navigate("/")} className={classes.title} variant='h5' >
              Crypto Tracker
        </Typography>
        <Typography>
          <Select variant='outlined' style={{
            width:100,
            height:40,
            marginRight:15,
          }}
          value={currency}
          onChange={(e)=>setCurrency(e.target.value)}
          >
            <MenuItem value={'USD'}>USD</MenuItem>
            <MenuItem value={'INR'}>INR</MenuItem>
          </Select>
        </Typography>
      </Toolbar>
    </Container>

  </AppBar>
  </ThemeProvider>
  );
};

export default Header;

