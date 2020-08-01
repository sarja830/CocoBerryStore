import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";
import { itemTotal } from "./cartHelpers";
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'


const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { color: "#ff9900" };
    } else {
        return { color: "#ffffff" };
    }
};

const Menu = ({ history }) => (
    <Navbar sticky="top"  collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="/"> 
                       The Indian Craftstore
              </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
                <Link  className="nav-link"
                            style={isActive(history, "/")}
                            to="/"
                >Home
                </Link>

                <Link className="nav-link"
                            style={isActive(history, "/shop")}
                            to="/shop"
                >Shop
                </Link>
{/*                
                <li className="nav-item">
                    <Link
                        className="nav-link"
                        style={isActive(history, "/")}
                        to="/"
                    >
                        Home
                </Link>
                </li>

                <li className="nav-item">
                    <Link
                        className="nav-link"
                        style={isActive(history, "/shop")}
                        to="/shop"
                    >
                        Shop
                </Link>
                </li> */}

            </Nav>


            <Nav>
                {isAuthenticated() && isAuthenticated().user.role === 0 && (  <Link className="nav-link"
                                            style={isActive(history, "/user/dashboard")}
                                            to="/user/dashboard"
                                        >
                                            Dashboard
                </Link>
                )}

                {isAuthenticated() && isAuthenticated().user.role === 1 && ( <Link  className="nav-link"
                                            style={isActive(history, "/admin/dashboard")}
                                            to="/admin/dashboard"
                                        >
                                            Dashboard
                        </Link>
                )}
                <Link  className="nav-link"
                                        style={isActive(history, "/cart")}
                                        to="/cart"
                 >Cart{" "}
                 </Link>
      
                 {isAuthenticated() && (
                   <Link  className="nav-link"
                            className="nav-link"
                            style={{ cursor: "pointer", color: "#ffffff" }}
                            onClick={() =>
                                signout(() => {
                                    history.push("/");
                                })
                            }
                        >
                            Signout
                   </Link>
                )}
          
                {/* <li className="nav-item">
                    <Link
                        className="nav-link"
                        style={isActive(history, "/cart")}
                        to="/cart"
                    >
                        Cart{" "} */}
                        {/* <sup>
                        <small className="cart-badge">{itemTotal()}</small>
                    </sup>  */}
                    {/* </Link>
                </li> */}

                {/* {isAuthenticated() && isAuthenticated().user.role === 0 && (
                    <li className="nav-item">
                        <Link
                            className="nav-link"
                            style={isActive(history, "/user/dashboard")}
                            to="/user/dashboard"
                        >
                            Dashboard
                    </Link>
                    </li>
                )} */}

                {/* {isAuthenticated() && isAuthenticated().user.role === 1 && (
                    <li className="nav-item">
                        <Link
                            className="nav-link"
                            style={isActive(history, "/admin/dashboard")}
                            to="/admin/dashboard"
                        >
                            Dashboard
                    </Link>
                    </li>
                )} */}

                {/* {!isAuthenticated() && (
                    <Fragment>
                        <li className="nav-item">
                            <Link
                                className="nav-link"
                                style={isActive(history, "/signin")}
                                to="/signin"
                            >
                                Signin
                        </Link>
                        </li>

                        <li className="nav-item">
                            <Link
                                className="nav-link"
                                style={isActive(history, "/signup")}
                                to="/signup"
                            >
                                Signup
                        </Link>
                        </li>
                    </Fragment>
                )} */}

                

               
                {!isAuthenticated() && ( 
                <>
                <Link  className="nav-link"
                                style={isActive(history, "/signin")}
                                to="/signin"
                            >
                                Signin</Link>


                    <Link  className="nav-link"
                                style={isActive(history, "/signup")}
                                to="/signup"
                            >
                                Signup </Link>
                </>
               )}
            </Nav>
             </Navbar.Collapse>
        </Navbar>
);

export default withRouter(Menu);
