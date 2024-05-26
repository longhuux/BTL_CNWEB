import React, { useCallback, useEffect, useState } from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SentimentSatisfiedRoundedIcon from "@mui/icons-material/SentimentSatisfiedRounded";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import { Link } from "react-router-dom";
import { ChevronLeft, ShoppingCart } from "@mui/icons-material";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {
  Autocomplete,
  Badge,
  Box,
  Drawer,
  InputAdornment,
  TextField,
} from "@mui/material";
import axios from "axios";
import debounce from "lodash.debounce";
import Cart from "./Cart";
import { useSelector } from "react-redux";

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [query, setQuery] = useState();
  const [results, setResults] = useState([]);
  const [open, setOpen] = React.useState(false);
  const cartItems = useSelector((state) => state.cart.items);


  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box
      sx={{ width: 450, padding: 2, height: "100%" }}
      role="presentation"
    //   onClick={toggleDrawer(false)}
    >
      <h1 className="text-2xl mb-3">Giỏ hàng</h1>
      <Cart />
    </Box>
  );

  // Hàm gọi API tìm kiếm
  const fetchBooks = async (searchQuery) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/books?name=${searchQuery}`
      );
      setResults(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  // Sử dụng debounce để trì hoãn việc gọi API
  const debouncedFetchBooks = useCallback(debounce(fetchBooks, 1000), []);

  useEffect(() => {
    if (query) {
      debouncedFetchBooks(query);
    } else {
      setResults([]);
    }
  }, [query, debouncedFetchBooks]);

  const formatCash = (str) => {
    return str
      .toString()
      .split("")
      .reverse()
      .reduce((prev, next, index) => {
        return (index % 3 ? next : next + ".") + prev;
      });
  };

  return (
    <>
      <div className="hidden sm:hidden md:block lg:block xl:block">
        <div className="w-full p-3 bg-white flex justify-around gap-10 items-center">
          <div className="w-max">
            <img
              width={"100px"}
              src="https://salt.tikicdn.com/ts/upload/0e/07/78/ee828743c9afa9792cf20d75995e134e.png"
              alt="Tiki"
            />
            <span className="flex justify-center text-blue-800 w-max m-auto">
              Tốt & Nhanh
            </span>
          </div>
          <div className="w-[60%] relative">
            <input
              className="w-full border p-3 px-10"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Tìm kiếm sách..."
            />
            <div className="absolute top-3 pl-3">
              <SearchIcon />
            </div>
            {query && (
              <div className="absolute z-10 bg-white drop-shadow-2xl w-full h-80 overflow-scroll">
                {results.length ? (
                  results.map((book) => (
                    <Link
                      to={`/${book._id}`}
                      key={book._id}
                      onClick={() => setQuery()}
                    >
                      <div className="p-5 flex justify-between items-center border">
                        <div className="flex gap-4">
                          <img
                            src={book.thumbnail}
                            className="h-10 border"
                            alt=""
                          />
                          <h3>{book.name}</h3>
                        </div>
                        <h4 className="">
                          {formatCash(book.price)}{" "}
                          <sup className="underline">đ</sup>
                        </h4>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p className=" h-full flex justify-center items-center">
                    Nothing found...
                  </p>
                )}
              </div>
            )}
          </div>
          <Link to={"/"}>
            <div className="flex items-center gap-2">
              <HomeOutlinedIcon />
              <p className="w-max">Trang chủ</p>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <SentimentSatisfiedRoundedIcon />
            <p className="w-max">Tài khoản</p>
          </div>
          <div className="cursor-pointer border-l-2 pl-6">
            <Badge badgeContent={cartItems.length} color="primary">

            <ShoppingCartOutlinedIcon
              onClick={toggleDrawer(true)}
              color="primary"
            />
            </Badge>
          </div>
        </div>
      </div>
      <div className="w-full block sm:block md:hidden lg:hidden xl:hidden">
        <Paper
          component="form"
          sx={{
            p: "10px 8px",
            display: "flex",
            alignItems: "center",
            width: "100%",
            backgroundColor: "#1BA7FF",
            borderRadius: "0px",
          }}
        >
          <IconButton sx={{ p: "10px" }} aria-label="menu">
            <ChevronLeft fontSize="large" sx={{ color: "white" }} />
          </IconButton>
          <IconButton sx={{ p: "10px" }} aria-label="menu">
            <MenuIcon fontSize="large" sx={{ color: "white" }} />
          </IconButton>
          <InputBase
            sx={{
              ml: 1,
              flex: 1,
              backgroundColor: "white",
              padding: 1,
              borderRadius: 2,
            }}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Bạn đang tìm kiếm gì"
            inputProps={{ "aria-label": "search google maps" }}
            startAdornment={
              <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                <SearchIcon />
              </IconButton>
            }
          />

          <IconButton
            color="primary"
            sx={{ p: "10px" }}
            aria-label="directions"
          >
            <Badge badgeContent={cartItems.length} color="primary">
              <ShoppingCartOutlinedIcon
                fontSize="large"
                sx={{ color: "white" }}
                onClick={toggleDrawer(true)}
              />
            </Badge>
          </IconButton>
        </Paper>
        {query && (
          <div className="absolute z-10 bg-white drop-shadow-2xl w-full h-80 overflow-scroll">
            {results.length ? (
              results.map((book) => (
                <Link
                  to={`/${book._id}`}
                  key={book._id}
                  onClick={() => setQuery()}
                >
                  <div className="p-5 flex justify-between items-center border">
                    <div className="flex gap-4">
                      <img
                        src={book.thumbnail}
                        className="h-10 border"
                        alt=""
                      />
                      <h3>{book.name}</h3>
                    </div>
                    <h4 className="">
                      {formatCash(book.price)}{" "}
                      <sup className="underline">đ</sup>
                    </h4>
                  </div>
                </Link>
              ))
            ) : (
              <p className=" h-full flex justify-center items-center">
                Nothing found...
              </p>
            )}
          </div>
        )}
      </div>
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </>
  );
};

export default Header;
