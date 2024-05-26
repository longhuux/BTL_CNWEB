import React, { useEffect, useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Divider } from "@mui/material";
import FaceRetouchingNaturalIcon from "@mui/icons-material/FaceRetouchingNatural";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const BookPreview = (props) => {
  return (
    <div className="bg-white p-3 w-full sm:w-full md:w-full lg:w-[400px] xl:w-[400px] h-max rounded-md top-4 sticky">
      <img className="w-96 h-96 m-auto" src={props.data.thumbnail} alt="" />
      <div className="flex gap-2 justify-center mt-2 mb-4">
        <button
          autoFocus
          className="p-1 w-12 h-12 border rounded-md focus:border-blue-500 overflow-hidden"
        >
          <img className="" src={props.data.thumbnail} alt="" />
        </button>
        {props.data &&
          props.data.images.map((img) => (
            <button
              className="p-1 w-12 h-12 border rounded-md focus:border-blue-500 overflow-hidden"
              key={img}
            >
              <img className="" src={img} alt="" />
            </button>
          ))}
      </div>
      <h4 className="my-3">Đặc điểm nổi bật</h4>
      <div className="flex gap-3 items-center">
        <CheckCircleIcon fontSize="small" color="primary" />
        <p>Kích thước lớn và bìa cứng, tạo cảm giác sang trọng và bền bỉ</p>
      </div>
      <div className="flex gap-3">
        <CheckCircleIcon fontSize="small" color="primary" />
        <p>
          Cung cấp thông tin tổng quát về diện tích, dân số và ngôn ngữ của các
          quốc gia
        </p>
      </div>
      <div className="flex gap-3">
        <CheckCircleIcon fontSize="small" color="primary" />
        <p>Lorem ipsum dolor sit amet consectetur</p>
      </div>
      <Divider sx={{ marginTop: 3 }} />
      <div className="p-2 flex gap-2 items-center">
        <FaceRetouchingNaturalIcon fontSize="small" color="primary" />
        <p className="">Xem thêm </p>
        <div className="w-full flex justify-between">
          <span>Tóm tắt nội dung sách</span>
          <ChevronRightIcon />
        </div>
      </div>
    </div>
  );
};

export default BookPreview;
