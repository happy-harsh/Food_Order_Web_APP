import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { useCart, useDispatchCart } from '../components/CartContextReducer';
import axios from "axios";
export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();
  if (data.length === 0) {
    return (
      <div>
        <div className='bg-light m-5 w-100 text-center fs-3'>The Cart is Empty!</div>
      </div>
    )
  }

  const handleCheckOut = async (e) => {
    // console.log(data,localStorage.getItem("userEmail"),new Date())
    e.preventDefault();
    let userEmail = localStorage.getItem("userEmail");
    const userData = {
      order_data: data,
      email: userEmail,
      order_date: new Date().toDateString()
    };
    await axios
      .post("https://happyfood.onrender.com/api/orderData", userData)
      .then((response)=>{
        // console.log(response.data);
        if (response.status === 200) {
          dispatch({ type: "DROP" })
        }
      }).catch((error) => {
        console.log(error.response.data);
        console.log("Cannot checkout");
      }); 
  }

  let totalPrice = data.reduce((total, food) => total + food.price, 0)
  return (
    <div>

      {console.log(data)}
      <div className='container bg-light table-responsive  table-responsive-sm table-responsive-md' style={{borderRadius: "5px"}}>
        <table className='table table-hover '>
          <thead className=' fs-4'>
            <tr>
              <th scope='col' >#</th>
              <th scope='col' >Name</th>
              <th scope='col' >Quantity</th>
              <th scope='col' >Option</th>
              <th scope='col' >Amount</th>
              <th scope='col' ></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr>
                <th scope='row' >{index + 1}</th>
                <td >{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td ><button type="button" className="btn p-0" onClick={(index)=>{ dispatch({type:"REMOVE",index : index})}} ><DeleteIcon/></button></td></tr>
            ))}
          </tbody>
        </table>
        <div><h1 className='fs-4'>Total Price: Rs.{totalPrice}/-</h1></div>
        <div>
          <button className='btn bg-primary text-light m-3 ' onClick={handleCheckOut} > Check Out </button>
        </div>
      </div>



    </div>
  )
}