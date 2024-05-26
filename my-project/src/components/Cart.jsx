// src/components/Cart.js
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../redux/cartSlice";
import { Delete } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const order = {
      cartItems,
      name,
      phone,
      address,
      totalAmount,
    };

    try {
      const response = await axios.post('http://localhost:3000/orders', order);
      console.log(response.data);
      dispatch(cartActions.clearCart()); // Xóa giỏ hàng sau khi thanh toán thành công
      alert('Payment successful!');
      handleClose()
    } catch (error) {
      console.error('Error during payment:', error);
      alert('Payment failed!');
      
    }
  };

  const formatCash = (str) => {
    return str
      .toString()
      .split("")
      .reverse()
      .reduce((prev, next, index) => {
        return (index % 3 ? next : next + ".") + prev;
      });
  };


  const removeItemHandler = (id) => {
    dispatch(cartActions.removeItem(id));
  };

  const clearCartHandler = () => {
    dispatch(cartActions.clearCart());
  };

  return (
    <div className="h-[95%]">
      {cartItems.length === 0 && <p>No items in cart.</p>}
      {cartItems.length > 0 && (
        <div className="h-full flex justify-between flex-col">
          <ul>
            {cartItems.map((item) => (
              <li className="flex justify-between items-center" key={item.id}>
                <img className="w-10 " src={item.image} alt={item.name} />
                <p>
                  {" "}
                  {formatCash(item.price)} <sup className="underline">đ</sup>
                </p>
                <p>x {item.quantity}</p>
                <h2>
                  Tổng: {formatCash(item.totalPrice)} <sup className="underline">đ</sup>
                </h2>
                <button onClick={() => removeItemHandler(item.id)}>
                  <Delete />
                </button>
              </li>
            ))}
          </ul>
          <div>
            <div>
              <h2 className="text-xl">Tổng số lượng: {totalQuantity}</h2>
              <h2 className="text-xl">
                Tổng tiền: {formatCash(totalAmount)} <sup className="underline">đ</sup>
              </h2>
            </div>
            <div className="flex gap-3">
              <button
                className="border p-3 w-full bg-red-300 rounded-md"
                onClick={clearCartHandler}
              >
                Xoá tất cả
              </button>
              <button onClick={handleOpen} className="border p-3 w-full bg-blue-300">
                Đặt hàng
              </button>
            </div>
          </div>
        </div>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Xác nhận đơn hàng
          </Typography>
          <div className="flex flex-col gap-3">
            <div className="flex gap-3">

          <TextField fullWidth onChange={(e)=>setName(e.target.value)} placeholder="Họ và tên"/>
          <TextField fullWidth onChange={(e)=>setPhone(e.target.value)} placeholder="Số điện thoại"/>
            </div>
          <TextField fullWidth onChange={(e)=>setAddress(e.target.value)} placeholder="Địa chỉ"/>
          <ul>
            {cartItems.map((item) => (
              <li className="flex justify-between items-center" key={item.id}>
                <img className="w-10 " src={item.image} alt={item.name} />
                <p>
                  {" "}
                  {formatCash(item.price)} <sup className="underline">đ</sup>
                </p>
                <p>x {item.quantity}</p>
                <h1>
                  : {formatCash(item.totalPrice)} <sup className="underline">đ</sup>
                </h1>
                <button onClick={() => removeItemHandler(item.id)}>
                  <Delete />
                </button>
              </li>
            ))}
          </ul>
          <div className="flex gap-3">
              <button
                className="border p-3 w-full bg-red-300 rounded-md"
                onClick={clearCartHandler}
              >
                 Huỷ
              </button>
              <button onClick={handleSubmit} className="border p-3 w-full bg-blue-300">
                Xác nhận
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Cart;
