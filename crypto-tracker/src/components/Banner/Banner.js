import { Container, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import Carousel from './Carousel';

const useStyles = makeStyles(() => ({
    banner: {


    },
    bannerContent:{
        height:400,
        display:'flex',
        flexDirection:"column",
        paddingTop:25,
        justifyContent:"space-around"
    },
    tagline:{
        display:'flex',
        height:'40%',
        flexDirection:"column",
        justifyContent:"center",
        textAlign:"center",
    },
    caros:{
        // backgroundColor:"Indigo",
        padding:20,
        borderRadius:20,
    }
}));
const Banner = () => {
    const classes = useStyles();

    return <div className={classes.banner}>
        <Container className={classes.bannerContent} >
            <div className={classes.tagline} >
                <Typography variant='subtitle2' style={{color:"darkgrey",fontFamily:"Montserrat",textTransform:"capitalize"}} >
                    Explore new Crypto Currencies with
                </Typography>
                <Typography variant='h2' style={{fontWeight:"bold",marginBottom:15,fontFamily:"Montserrat"}} >
                    Crypto Tracker
                </Typography>
                <Typography variant='subtitle' style={{color:"darkgrey",fontFamily:"Montserrat",textTransform:"capitalize"}} >
                    -by Nakul Siwach
                </Typography>
            </div>
            <div  className={classes.caros}  >
                <Carousel/>
            </div>
        </Container>

    </div>;
};

export default Banner;
