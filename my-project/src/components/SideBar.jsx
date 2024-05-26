import { Checkbox, Divider, Rating } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const SideBar = () => {
  const location = useLocation();
  const [category, setCategory] = useState("");

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get("category");
    setCategory(category);
  }, [location]);
  return (
    <div className="p-4 bg-white w-56 rounded-md top-4 sticky">
      <h4 className="mb-2">Danh mục sản phẩm</h4>
      <Link to={"/category/English%20Books"}>
        <p className="cursor-pointer ">English Books</p>
      </Link>
      <Link to={"/category/Sach%20tieng%20viet"}>
        <p className="cursor-pointer my-1">Sách tiếng Việt</p>
      </Link>
      <Link to={"/category/Van%20phong%20pham"}>
        <p className="cursor-pointer my-1">Văn phòng phẩm</p>
      </Link>
      <Link to={"/category/Qua%20luu%20niem"}>
        <p className="cursor-pointer">Quà lưu niệm</p>
      </Link>
      <Divider sx={{ marginY: 2 }} />
      <h4 className="mb-2">Nhà cung cấp</h4>
      <div className="flex gap-1 items-center">
        <Checkbox />
        <p className="cursor-pointer">Nhà sách Fahasa</p>
      </div>
      <div className="flex gap-1 items-center">
        <Checkbox />
        <p className="cursor-pointer">Bamboo Books</p>
      </div>
      <div className="flex gap-1 items-center">
        <Checkbox />
        <p className="cursor-pointer">Times Books</p>
      </div>
      <div className="flex gap-1 items-center">
        <Checkbox />
        <p className="cursor-pointer">Nhà sách trẻ online</p>
      </div>
      <div className="flex gap-1 items-center">
        <Checkbox />
        <p className="cursor-pointer">VBooks</p>
      </div>
      <div>
        <p className="text-blue-500">Xem thêm</p>
      </div>
      <Divider sx={{ marginY: 2 }} />
      <h4 className="mb-2">Đánh giá</h4>
      <div className="flex items-center gap-1">
        <Rating size="small" value={4.5} />
        <p className="cursor-pointer"> từ 5 sao</p>
      </div>
      <div className="flex items-center gap-1">
        <Rating size="small" value={4} />
        <p className="cursor-pointer"> từ 4 sao</p>
      </div>
      <div className="flex items-center gap-1">
        <Rating size="small" value={3} />

        <p className="cursor-pointer"> từ 3 sao</p>
      </div>
    </div>
  );
};

export default SideBar;
