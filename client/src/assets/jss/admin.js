
const styleAdmin = theme => ({
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
  }
});

export default styleAdmin;
