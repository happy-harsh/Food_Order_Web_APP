import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import "../components/carousel.css"
import axios from "axios";

const Home = () => {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [search, setSearch] = useState("");

  const  fetchFood = async () => {
    await axios
      .post("https://happyfood.onrender.com/api/food")
      .then((response) => {
        const ans = response.data;
        // console.log(ans[0],ans[1]);
        setFoodItem(ans[0]);
        setFoodCat(ans[1]);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  useEffect(() => {
    fetchFood();
  }, []);

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
      <div
        id="carouselExampleFade"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
        style={{ objectFit: "contain !important" }}
      >
        <div className="carousel-inner" id="carousel">
        <div className="carousel-content fs-3 text-wrap" >
            <h1>Delicious Moments, Delivered to Your Doorstep!</h1>
          </div>
          <div className="carousel-caption" style={{zIndex:"5"}}>
            <div className="form-inline justify-content-center">
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                data-bs-theme="dark"
                value={search}
                onChange={(e)=>{setSearch(e.target.value)}}
              />
              
            </div>
          </div>
          <div className="carousel-item active">
            <img
              src="https://source.unsplash.com/random/900x700/?food"
              className="d-block w-100"
              alt="..."
              style={{filter:"brightness(80%)"}}
            />     
          </div>
          <div className="carousel-item">
            <img
              src="https://source.unsplash.com/random/900x700/?juice"
              className="d-block w-100"
              alt="..."
              style={{filter:"brightness(80%)"}}
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://source.unsplash.com/random/900x700/?cake"
              className="d-block w-100"
              alt="..."
              style={{filter:"brightness(80%)"}}
            />
          </div>
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      </div>
      <div className="container">
      {
          foodCat !== []
            ? foodCat.map((data) => {
              return (
                <div className='row mb-3'>
                  <div key={data.id} className='fs-3 m-3'>
                    {data.CategoryName}
                  </div>
                  <hr id="hr-success" style={{ height: "4px", backgroundImage: "-webkit-linear-gradient(left,rgb(0, 255, 137),rgb(0, 0, 0))" }} />
                  {foodItem !== [] ? foodItem.filter(
                    (items) => (items.CategoryName === data.CategoryName) && (items.name.toLowerCase().includes(search.toLowerCase())))
                    .map(filterItems => {
                      return (
                        <div key={filterItems.id} className='col-12 col-md-6 col-lg-3'>
                          <Card foodItem={filterItems} foodOptions={filterItems.options[0]} img={filterItems.img} ></Card>
                        </div>
                      )
                    }) : <div> No Such Data </div>}
                </div>
              )
            })
            : ""}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
