import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { CoinList } from '../config/api';
import {CryptoState} from "../CryptoContext"
import {  Container, createTheme, LinearProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, Typography } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { makeStyles,Paper } from '@material-ui/core';
import { numberWithCommas } from './Banner/Carousel';
import { Pagination } from '@material-ui/lab';

const CoinsTable = () => {

    const [coins,setCoins] = useState([]);
    const [loading,setLoading] = useState(false);
    const [search,setSearch] = useState();
    const [page,setPage] = useState(1);

    const navigate = useNavigate();
    const {currency,symbol} = CryptoState();

    const useStyles = makeStyles({
      row: {
        backgroundColor: "#16171a",
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "#131111",
        },
        fontFamily: "Montserrat",
      },
    pagination: {
        "& .MuiPaginationItem-root": {
          color: "gold",
        },
      },
      },
    );
    const classes = useStyles();

    useEffect(()=>{
        const fetchCoins = async ()=>{
            setLoading(true)
            const {data} = await axios.get(CoinList(currency));
            setCoins(data)
            setLoading(false)
        };
        fetchCoins()
    },[currency])

    const darkTheme = createTheme({
        palette: {
          primary:{
            main:"#fff",
          },
          type: 'dark',
        },
      });

    const handleSearch = () => {
      if (search){
        return coins.filter(
          (coin) =>
            coin.name.toLowerCase().includes(search) ||
            coin.symbol.toLowerCase().includes(search)
        );
      }
      else{
        return coins
      }
    };
  return(
      <ThemeProvider theme={darkTheme}>
        <Container style={{textAlign:"center",width:"90%"}} >
          <Typography variant='h4' style={{margin:18,fontFamily:"Monteserrat"}}>
            Cryptocurrency Prices by Market Cap
          </Typography>

          <TextField
            label="Search for any Crypto Currency u want.."
            variant="outlined"
            style={{marginBottom:20, width:"40%", textAlign:"left"}}
            onChange={(e)=> setSearch(e.target.value)}
          />

          <TableContainer component={Paper}  >
            {
              loading?(
                <LinearProgress style={{backgroundColor:"gold"}} />
              ):(
                <Table>
                  <TableHead style={{backgroundColor:"gold"}} >
                  <TableRow>
                  {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                    <TableCell
                      style={{
                        color: "black",
                        fontWeight: "700",
                        fontFamily: "Montserrat",
                      }}
                      key={head}
                      align={head === "Coin" ? "" : "right"}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
                  </TableHead>
                  <TableBody>
                    {handleSearch()
                    .slice((page-1)*10,(page-1)*10+10)
                    .map((row)=>{
                      const profit = row.price_change_percentage_24h>0;
                      return(
                        <TableRow onClick={() => navigate(`/coins/${row.id}`)}
                          className={classes.row}
                          key={row.name} >
                            <TableCell component="th" scope="row" style={{display:"flex",gap:15}} >
                              <img src={row?.image} alt={row.name} height="50" style={{marginBottom:10}} />
                              <div style={{display:"flex", flexDirection:"column"}} >
                                <span style={{textTransform:"uppercase",fontSize:22}} >
                                  {row.symbol}
                                </span>
                                <span style={{color:"darkgray"}}>
                                  {row.name}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell align='right'>
                              {symbol}{" "}
                              {numberWithCommas(row.current_price.toFixed(2))}

                            </TableCell>
                            <TableCell align='right' style={{color:profit>0?"green":"red", fontWeight:500}} >
                              {profit && "+"}
                              {row.price_change_percentage_24h.toFixed(2)}%
                            </TableCell>
                            <TableCell align='right'>
                              {symbol}{" "}
                              {numberWithCommas(row.market_cap.toString().slice(0,-6))}
                              M

                            </TableCell>

                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              )}
          </TableContainer>

          <Pagination
          count={(handleSearch()?.length / 10).toFixed(0)}
          style={{
            padding: 20,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
          classes={{ ul: classes.pagination }}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}/>

        </Container>
      </ThemeProvider>
  );
};

export default CoinsTable;
