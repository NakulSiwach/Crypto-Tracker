import { makeStyles, Typography } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SingleCoin } from '../config/api';
import { CryptoState } from '../CryptoContext';
import { numberWithCommas } from '../components/Banner/Carousel';
import { LinearProgress } from '@material-ui/core';

const HtmlToReactParser = require('html-to-react').Parser;


const Coinpage = () => {
  const {id} = useParams();
  const [coin,setCoin] = useState();
  const {currency,symbol}= CryptoState();
  console.log(id)
  useEffect(() => {
    const fetchCoin = async () => {
      const { data } = await axios.get(SingleCoin(id));
      console.log(data)
      setCoin(data);
    };
    fetchCoin();
  }, [id]);


  const useStyles = makeStyles((theme) => ({
    container: {
      display: "flex",
      marginLeft:"10%",
      [theme.breakpoints.down("md")]: {
        flexDirection: "column",
        alignItems: "center",
      },
    },
    sidebar: {
      width: "85%",
      [theme.breakpoints.down("md")]: {
        width: "100%",
      },
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: 25,
      borderRight: "5px solid gold",
      borderLeft: "5px solid gold",


    },
    heading: {
      fontWeight: "bold",
      marginBottom: 20,
      fontFamily: "Montserrat",
    },
    description: {
      width: "100%",
      fontFamily: "Montserrat",
      padding: 25,
      paddingBottom: 15,
      paddingTop: 0,
      textAlign: "justify",
    },
    marketData: {
      alignSelf: "start",
      padding: 25,
      paddingTop: 10,
      width: "100%",
      [theme.breakpoints.down("md")]: {
        display: "flex",
        justifyContent: "space-around",
      },
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        alignItems: "center",
      },
      [theme.breakpoints.down("xs")]: {
        alignItems: "start",
      },
    },
  }));
  const classes = useStyles();
  const htmlInput = coin?.description.en.split(". ").slice(0,2);
  const htmlToReactParser = new HtmlToReactParser();
  const reactElement = htmlToReactParser.parse(htmlInput);

  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;
  return (

    <div className={classes.container} >
      <div className={classes.sidebar} >

        <div style={{display:"flex", padding:"0%",marginTop:"10%",marginLeft:"10%"}} >
        <div style={{paddingRight:"10%"}}  >
          <img
            src={coin?.image.large}
            alt={coin?.name}
            height="200"
            style={{ marginBottom: 20,cursor:'pointer' }}
          />
          <Typography variant='h3' className={classes.heading} style={{textAlign:"center"}} >
            {coin?.name}
          </Typography>

        </div>
        <div>

        <div className={classes.marketData} >
        <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {numberWithCommas(coin?.market_cap_rank)}
            </Typography>
          </span>

          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Market Cap:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
          </span>


        </div>
        <Typography variant='subtitle1' className={classes.description}>
          {reactElement}
        </Typography>

        </div>
        </div>

      </div>

    </div>
  );
};

export default Coinpage;
