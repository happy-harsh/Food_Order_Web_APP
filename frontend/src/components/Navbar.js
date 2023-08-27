import React,{ useState}from "react";
import { Link ,useNavigate} from "react-router-dom";
import Modal from "../Modal";
import Cart from "../screens/Cart";
import { useCart } from "./CartContextReducer";



const Navbar = () => {
  let data = useCart();
  const [CartView, setCartView] = useState(false);


  const navigate = useNavigate();
  const handleLogout = ()=>{
    localStorage.removeItem("authToken");
    navigate("/login");
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand fs-3" to="/">
            <div
              className="logo p-1"
              style={{ border: "solid black 1px", borderRadius: "4px" }}
            >
              <span style={{ color: "black" }}>Happy</span>
              <span style={{ color: "black" }}>F</span>
              <span style={{ color: "orange" }}>o</span>
              <span style={{ color: "orange" }}>o</span>
              <span style={{ color: "black" }}>d</span>
            </div>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              {localStorage.getItem("authToken") ? (
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/MyOrder">
                    My Orders
                  </Link>
                </li>
              ) : (
                ""
              )}
            </ul>
            {localStorage.getItem("authToken") ? (
              <div>
                <div className="btn btn-black text-primary" onClick={()=>{setCartView(true)}}>

                <button type="button" class="btn btn-primary">
  My Cart <span class="badge bg-light text-primary">{data.length}</span>
</button>
                {/* <AddShoppingCartIcon/> */}
              </div>
              {CartView ? <Modal onClose={()=>{setCartView(false)}}><Cart/></Modal>:null}
                <div className="btn text-danger" onClick={handleLogout}>
                Logout
              </div>
              </div>
            ) : (
              <div>
                <Link className="btn btn-black text-primary" to="/Login">
                  Login
                </Link>
                <Link className="btn btn-black text-primary" to="/Signup">
                  Signup
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
