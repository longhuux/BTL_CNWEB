import { Divider, Rating } from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const BookCard = (props) => {
  const navigate = useNavigate();
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
    <Link
      to={`/${props.data._id}`}
      className="h-full cursor-pointer bg-white overflow-hidden block rounded-md shadow hover:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]"
    >
      <img className="h-60 w-60" src={props.data.thumbnail} alt="" />
      <div className="h-44 py-8 px-2">
        <div className="h-3/4">
          <p className="line-clamp-2">{props.data.name}</p>
          <div className="flex gap-2 item-center">
            <Rating size="small" readOnly value={props.data.ratingAverage} />
            <Divider
              orientation="vertical"
              variant="middle"
              sx={{ height: 10 }}
            />
            <p className="text-xs">Đã bán 5k+</p>
          </div>
        </div>
        <div className="h-1/4 gap-3 flex">
          <h3 className="text-xl">
            {formatCash(props.data.price)} <sup className="underline">đ</sup>
          </h3>
          <p className="h-fit px-1 bg-gray-200 rounded-full text-xs">- {props.data.saleRatio} %</p>
        </div>
      </div>
      <hr />
      <div>
        <p className="text-center p-2">Giao siêu tốc 2h</p>
      </div>
    </Link>
  );
};

export default BookCard;
