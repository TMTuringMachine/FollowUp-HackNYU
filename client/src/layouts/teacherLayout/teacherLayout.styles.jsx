import {styled} from '@mui/material';

export const Page = styled('div')(()=>({
    width:'100vw',
    height:'100vh',
    maxHeight:'100vh',
    maxWidth:'100vw',
    overflow:'hidden',

}))

export const Content = styled("div")(({fullScreen})=>({
    // height:'96vh',
    // width:fullScreen?'96vw':'77vw',
    // margin:fullScreen?'2vh 5vw':'2vh 0 2vh 23vw',
    // transition:'all 0.2s ease-in',
    // padding:'10px',
    // width:'100vw',
    // maxHeight:"96vh",
    // overflowY:'scroll',

    width: "100%",
    height: "100%",
    overflowY: "scroll",
    padding: "10px 30px 20px 30px",

}))