import { rgbToHex } from "@material-ui/core";

const grayColor = [
  "#f0feff",
  "#ece7e780",
  "#999", 
  "#777",
  "#3C4858",
  "#AAAAAA",
  "#D2D2D2",
  "#DDD",
  "#555555",
  "#333",
  "#eee",
  "#ccc",
  "#e4e4e4",
  "#E5E5E5",
  "#f9f9f9",
  "#f5f5f5",
  "#495057",
  "#e7e7e7",
  "#212121",
  "#c8c8c8",
  "#505050",
  '#bababa', 
  "#c1c1c1"

];
export const styleInitialPage = (theme) => ({
  modal:{
    background:
    "linear-gradient(60deg," + "rgb(247,247,247,0.63)" + "," +"rgb(247,247,247,0.2)" + ")",
      width: '400px', 
    height: '300px', 
    top:'-10%', 
    margin:'auto',
    backgroundColor: "rgb(246,246,246,0.03)",
    display: 'flex',
    alignItems: 'center',
    justifyContent : 'center'
  },
  iconRed:{
    color: 'red',
  },
  iconBlue:{
    color: 'blue'
  },
  iconGreen:{
    color: 'green'
  },
  iconYellow:{
    color: 'yellow'
  },
  colorSelected:{
    "&,&:focus,&:hover": {
    padding: '0px',
    background: 'black !important',
    margin: '10px'
    }
  },
  wrapper: {
    height: "auto",
    minHeight: "100vh",
    position: "relative",
    top: "0"
  },
  fullPage: {
    padding: "10px 0",
    position: "relative",
    minHeight: "100vh",
    display: "flex!important",
    margin: "0",
    border: "0",
    color: 'white',
    alignItems: "center",
    backgroundSize: "cover",
    backgroundPosition: "center center",
    height: "100%",
    [theme.breakpoints.down("sm")]: {
      minHeight: "700px!important"
    },
  },
  fadeStyle:{
    display: 'flowRoot', 
    flexWrap:'wrap', 
    position:'relative', 
    textAlign: 'center'
  },
  typography:{
    fontSize:'17px', 
    marginTop:"-114px", 
    color: 'black', 
    width: '100%', 
    display: 'flex', 
    justifyContent:'center'
  },
  divColor:{
    marginBottom: '-36px', 
    marginTop: '7px', 
    display:'block', 
    position:'absolute'
  },
  inputName:{
    marginBottom: '15px', 
    width: '238px', 
    marginTop: '77px'
  },
  button:{
    background: 'white', 
    marginBottom:'-185px', 
    height: '39px'
  }



})

export default styleInitialPage;
