import { Divider, Rating } from "@mui/material";
import React, { useEffect, useState } from "react";

const BookInformations = (props) => {
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
    <div className="bg-white p-4 rounded-md space-y-4">
      <div className="flex gap-4">
        <img
          srcSet="https://salt.tikicdn.com/ts/upload/d7/56/04/b93b8c666e13f49971483596ef14800f.png"
          width="89"
          height="20"
        ></img>
        <span>
          Tác giả: <span className=" text-blue-400">{props.data.author}</span>
        </span>
      </div>
      <h2 className="text-2xl">{props.data.name}</h2>
      <div className="flex gap-2 items-center">
        <p>{props.data.ratingAverage}</p>
        <Rating size="small" readOnly value={props.data.ratingAverage} />
        <p>(9)</p>
        <Divider orientation="vertical" flexItem />
        <p>Đã bán 5k+</p>
      </div>
      <div className="flex gap-3">
        <h1 className="text-3xl">
          {formatCash(props.data.price)} <sup className="underline">đ </sup>
        </h1>
        <p className="h-fit px-1 bg-gray-200 rounded-full">- {props.data.saleRatio} %</p>
      </div>
      <div>
        <h4 className="mt-10 mb-4">Thông tin chi tiết</h4>
        {props &&
          props.data.specifications.map((data) => (
            <div key={data._id}>
              <div className="flex p-3">
                <p className="w-1/2">{data.name}</p>
                <span className="w-1/2">{data.value}</span>
              </div>
              <Divider />
            </div>
          ))}
      </div>
    </div>
  );
};

export default BookInformations;
