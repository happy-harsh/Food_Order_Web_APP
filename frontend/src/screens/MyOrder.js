import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import axios from "axios";

export default function MyOrder() {
  const [orderData, setorderData] = useState({});

  const fetchMyOrder = async () => {
    const userEmail = localStorage.getItem("userEmail"); // Assuming you store the email in local storage
    await axios
      .get(`http://localhost:3001/api/user?email=${userEmail}`)
      .then((response) => {
        const userData = response.data;
        setorderData(userData);

        orderData &&
          orderData.order_data &&
          orderData.order_data.map((arr) =>
            arr.map((obj) => {
              return Array(obj).map((arr, index) => {
                return console.log(arr.Order_date);
              });
            })
          );
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });
  };

  useEffect(() => {
    fetchMyOrder();
  },[]);

  return (
    <div>
      <div>
        <Navbar />
      </div>

      {orderData &&
        orderData.order_data &&
        orderData.order_data.map((arr, outerIndex) =>
          arr.map((obj, innerIndex) => (
            <p key={`${outerIndex}-${innerIndex}`}>
              <div
                class="card m-3 col-12 col-md-6 col-lg-3"
                style={{ width: "18rem" }}
              >
                <h5 class="card-title">{obj.Order_date}</h5>
                <h6 class="card-subtitle mb-2 text-muted">
                  {obj.qty} {obj.name} {obj.size} {obj.final_price}
                  <span style={{ color: "blue" }}>{obj.price}</span>
                </h6>
              </div>
            </p>
          ))
        )}

      <Footer />
    </div>
  );
}

