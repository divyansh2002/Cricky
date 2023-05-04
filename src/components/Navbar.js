import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import axios from "axios";
// import InputAdornment from "@material-ui/core/InputAdornment";
import InputAdornment from "@material-ui/core/InputAdornment";
import { Box } from "@material-ui/core";
import {
  Button,
  IconButton,
  InputBase,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "#f2f2f2",
    "&:hover": {
      backgroundColor: "#e6e6e6",
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Navbar = ( ) => {
  const classes = useStyles();
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showresult, setshowresult] = useState(false);
  
  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };
const onSearch = async (searchText)=>{
  
      await axios
        .get(
          `https://api.cricapi.com/v1/players?apikey=19344f52-8c6e-4e40-9b92-76fc0fc75d9b&offset=0&search=${searchText}`
        )
        .then(response=> {
          setSearchResults(response.data.data);
          
        }).then(function () {
          // setSearchResults(response.data.data);
          console.log("search result :",searchResults);
          setshowresult(true);
          console.log(showresult);

        });
      
    };
    
  
  
  const handlecloseresult = () => {
  setshowresult(false);
}
  const handleSearchSubmit = () => {
    onSearch(searchText);
  };

  return (
    <div className={classes.root}>
      <AppBar color="primary" position="static">
        <Toolbar>
          {/* <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" className={classes.title}>
            Cricky
          </Typography>
          <Typography variant="h6" className={classes.title}>
            Live Score
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search Player"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
              value={searchText}
              onChange={handleSearchChange}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  handleSearchSubmit();
                }
              }}
              style={{
                color: "white",
                backgroundColor: "black",
                borderRadius: "4px", // Adjust this value to change the curve of the borders
              }}
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon style={{ color: "white" }} />
                </InputAdornment>
              }
            />
          </div>
          <Button color="inherit" onClick={handleSearchSubmit}>
            Search
          </Button>
        </Toolbar>
      </AppBar>
      {showresult && searchResults.lenght !== 0 && (
        <div style={{ color: "white" }}>
          <Box
            style={{
              backgroundColor: "white",
              color: "black",
              padding: "10px",
              borderRadius: "20px",
              marginTop: "20px",
              width: "300px",
              height: "300px",
              overflow: "scroll",
              position: "absolute",
              left: "70%",

              // Adjust this value to change the width of the box
            }}
          >
            <ol>
              {searchResults.map(function (oneresult) {
                return (
                  <li>
                    {oneresult.name}, {oneresult.country}
                  </li>
                );
              })}
            </ol>
            <button onClick={handlecloseresult}>Close result</button>
          </Box>
          {/* <h1>{searchResults[0].name}</h1>
          <h1>{searchResults[0].country}</h1> */}
        </div>
      )}
    </div>
  );
};

export default Navbar;
