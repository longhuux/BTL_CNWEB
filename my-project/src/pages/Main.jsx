import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SideBar from "../components/SideBar";
import BookCard from "../components/BookCard";
import { Breadcrumbs, Pagination, Stack } from "@mui/material";
import axios from "axios";
import { ChevronRight } from "@mui/icons-material";

const Main = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/books");
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <div>
      <Header />
      <div className="flex gap-3 p-3 pl-24 pb-0">
        <p>Trang chủ</p>
        <ChevronRight />
        <span>Nhà sách Tiki</span>
      </div>
      <div className="flex px-[0.5px] gap-4 m-6 justify-center xl:px-12 lg:px-8 md:px-1 sm:px-1">
        <div className="hidden sm:hidden lg:block md:block xl:block">
          <SideBar />
        </div>
        <div className="">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {books.map((book) => (
              <BookCard data={book} key={book._id} />
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <Pagination
          size="large"
          className="hidden my-6 sm:hidden lg:block md:block xl:block"
          count={10}
          shape="rounded"
          color="primary"
        />
      </div>
      <Footer />
    </div>
  );
};

export default Main;
