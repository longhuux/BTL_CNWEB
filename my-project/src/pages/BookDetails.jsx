import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BookPreview from "../components/BookPreview";
import BookInformations from "../components/BookInformations";
import Purchase from "../components/Purchase";
import BookDescription from "../components/BookDescription";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ChevronRight } from "@mui/icons-material";

const BookDetails = () => {
  const param = useParams();
  const [book, setBook] = useState();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/books/${param.id}`
      );
      setBook(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  console.log(book);
  return (
    <>
      {book && (
        <div>
          <Header />
          <div className="flex flex-col px-1 gap-4 m-6 justify-center sm:px-4 md:px-4 lg:px-4 xl:px-12 sm:flex-col md:flex-row lg:flex-row xl:flex-row">
            <div>
              <BookPreview data={book} />
            </div>
            <div className="space-y-4">
              <div className="w-full">
                <BookInformations data={book} />
              </div>
              <div className="w-full block sm:block md:block lg:hidden xl:hidden">
                <Purchase data={book} />
              </div>
              <div className="w-full hidden sm:hidden md:block lg:block xl:block">
                <BookDescription data={book} />
              </div>
            </div>
            <div className="w-full hidden sm:hidden md:hidden lg:block xl:block">
              <Purchase data={book} />
            </div>
            <div className="w-full block sm:block md:hidden lg:hidden xl:hidden">
              <BookDescription data={book} />
            </div>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default BookDetails;
