import React, { useEffect, useState,useRef  } from "react";
import { useCart, useDispatchCart } from "./CartContextReducer";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
const Card = (props) => {
  let Options = props.foodOptions; //object with key as size and value as prize
  let priceOptions = Object.keys(Options); //array with keys only (size)
  const priceRef = useRef();
  const [qty , setQty] = useState(1);
  const [size , setSize] = useState("");
  
  const data = useCart();
  const dispatch = useDispatchCart();
  const AddToCart = async (item) =>{
    let food = []
    for (const item of data) {
      if (item.id === props.foodItem._id) {
        food = item;

        break;
      }
    }
    if (food !== []) {
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty })
        return
      }
      else if (food.size !== size) {
        await dispatch({type:"ADD", payload:{
          id: item._id, name: item.name, price: finalPrice, qty: qty, size: size,img: item.img
        }})
        return
      }
      return
    }




  }
  


  useEffect(()=>{
    setSize(priceRef.current.value);
  },[])

  let finalPrice = qty * parseInt(Options[size]);
  return (
    <div>
      <div
        className="card m-3"
        style={{ width: "18rem", maxHeight: "500", borderRadius: "5px" }}
      >
        <img
          src={props.foodItem.img}
          className="card-img-top"
          alt=""
          style={{ objectFit: "fill !important", height: "200px" }}
        />
        <div className="card-body">
          <h5 className="card-title">{props.foodItem.name}</h5>
          <p className="card-text ">{props.foodItem.description}</p>
          <div className="container w-100">
            {/* Quantity Selector */}
            <select className="m-1 h-100  bg-light rounded" onChange={(e)=>{setQty(e.target.value)}}>
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>
            {/* Size Selector  */}
            <select ref = {priceRef} className="m-1 h-100  bg-light rounded" onChange={(e)=>{setSize(e.target.value)}}>
              {priceOptions.map((data) => {
                return (
                  <option key={data} value={data}>
                    {data}
                  </option>
                );
              })}
            </select>
            <div
              className="mt-2"
              style={{
                borderRadius: "25px",
                background: "#73AD21",
                padding: "7px",
              }}
            >
              Total Price : Rs.<span>{finalPrice}/-</span>
            </div>
            <hr />
            <button className={`btn text-primary justify-center ms-2`} onClick={()=>AddToCart(props.foodItem)}>
              <AddShoppingCartIcon/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
