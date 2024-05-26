import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch } from 'react-redux';
import { cartActions } from '../redux/cartSlice';
import RemoveIcon from "@mui/icons-material/Remove";
const Purchase = (props) => {
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(props.data.price);
  const dispatch = useDispatch();


  const addToCartHandler = () => {
    const book = {
        id: props.data._id,
        name: props.data.name,
        price: props.data.price,
        image: props.data.thumbnail
    }
    dispatch(cartActions.addItem({ ...book, quantity: quantity }));
  };
  

  console.log(props.data.price)
  useEffect(()=>{
    setPrice(props.data.price*quantity)
  }, [quantity])

  const inQuantity = () => {
    if (quantity < 999) {
      setQuantity(quantity + 1);
    }
  };
  const deQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
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
  return (
    <div className="w-full sm:w-full md:w-full lg:w-[250px] xl:w-[400px] h-max bg-white p-4 space-y-2 rounded-md top-4 sticky">
      <h4>Số Lượng</h4>
      <div className="flex gap-1">
        <button className="p-2 border rounded-md" onClick={deQuantity}>
          <RemoveIcon color="disabled" />
        </button>
        <input
          className="border rounded-md text-center px-3"
          type="number"
          min={1}
          max={100}
          value={quantity}
          onChange={(e) =>
            setQuantity(
              Math.min(999, Math.max(1, parseInt(e.target.value, 10)))
            )
          }
        />
        <button className="p-2 border rounded-md" onClick={inQuantity}>
          <AddIcon color="disabled" />
        </button>
      </div>
      <h4>Tạm tính</h4>
      <h3 className="text-3xl">{formatCash(price)} <sup className="underline">đ</sup></h3>
      <Button variant="contained" color="error" sx={{ width: "100%" }}>
        Mua ngay
      </Button>
      <Button onClick={()=>addToCartHandler()} variant="outlined" sx={{ width: "100%" }}>
        Thêm vào giỏ
      </Button>
      <Button variant="outlined" sx={{ width: "100%" }}>
        Mua trước trả sau
      </Button>
    </div>
  );
};

export default Purchase;
