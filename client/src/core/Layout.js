import React from "react";
import Menu from "./Menu";
import "../styles.css";
import Navbar from "react-bootstrap/esm/Navbar";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import {
    faYoutube,
    faFacebook,
    faTwitter,
    faInstagram,
    faLinkedin,
   faGoogle
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Layout = ({
    title = "Title",
    description = "Description",
    className,
    children
}) => (
        <div>
            <Menu />
            <div className="jumbotron">
                <h2>{title}</h2>
                <p className="lead">{description}</p>
            </div>
            <div className={className}>{children}</div>


            <footer sticky="bottom"  className="bg-dark" variant="dark">
               
                <div className="container-fluid">
                    <Row>
                   <Col xl={4} md={12}><h2 style={{color:"white"}} className="mt-5 ml-4"> The Indian Craftstore</h2></Col> 
                        <Col xl={6} md={12} className="mt-2 mb-2" >
                        <div className="mt-2 mb-2" style={{color:"white"}}>&copy; Copyright <strong>The Indian Craftstore</strong>. All Rights Reserved
                        </div>
                        <div  className="social-container align-content-center mb-2 mt-2" style={{color:"white"}}>Contact us
                            <a
                                href="https://www.facebook.com/sarthak.jain.507679"
                                className="facebook social fa-lg"
                            >
                                <FontAwesomeIcon icon={faFacebook} />
                            </a>
                            <a href="https://www.linkedin.com/in/sarthak-jain-b80639150/" className="twitter social fa-lg">
                                <FontAwesomeIcon icon={faLinkedin}  />
                            </a>
                            <a
                                href="https://www.instagram.com/sarthjain830/"
                                className="instagram social fa-lg"
                            >
                                <FontAwesomeIcon icon={faInstagram}  />
                            </a>
                            <a
                                href="https://mail.google.com/mail/u/0/?view=cm&fs=1&tf=1&source=mailto&to=sarthjain830@gmail.com"
                                className="google social fa-lg"
                            >
                                <FontAwesomeIcon icon={faGoogle}  />
                            </a>

                        </div>
                        <div className="mb-2 mt-2" style={{ color: "white" }}>
                            Designed by  <strong style={{ color: "orange" }} > Sarthak</strong>
                        </div>
                        </Col>
                    </Row>
                </div>
            </footer>



        </div>
    );

export default Layout;


