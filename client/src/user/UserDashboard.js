import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { getPurchaseHistory } from "./apiUser";
import moment from "moment";
import Spinner from 'react-bootstrap/Spinner'
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
const Dashboard = () => {
    const [history, setHistory] = useState([]);
   const [loading, setLoading] = useState(false)
   
   const {
        user: { _id, name, email, role }
    } = isAuthenticated();
    const token = isAuthenticated().token;

    const init = (userId, token) => {
        getPurchaseHistory(userId, token).then(data => {
            if (data.error) {
                console.log(data.error);
                setLoading(false)
            } else {
                setLoading(false)
                setHistory(data);
            }
        });
    };

    useEffect(() => {
        setLoading(true)
        init(_id, token);
    }, []);

    const userLinks = () => {
        return (
            <div className="card">
                <h4 className="card-header">User Links</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link className="nav-link" to="/cart">
                            My Cart
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to={`/profile/${_id}`}>
                            Update Profile
                        </Link>
                    </li>
                </ul>
            </div>
        );
    };

    const userInfo = () => {
        return (
            <div className="card mb-5">
                <h3 className="card-header">User Information</h3>
                <ul className="list-group">
                    <li className="list-group-item">{name}</li>
                    <li className="list-group-item">{email}</li>
                    <li className="list-group-item">
                        {role === 1 ? "Admin" : "Registered User"}
                    </li>
                </ul>
            </div>
        );
    };

    const purchaseHistory = history => {
        return (
            <div className="card mb-5">
                <div className="card-header"><h3 >Purchase history</h3> 
                    </div> 
                 
           
        {loading?<div className="text-center mt-3 mb-3"><Spinner animation="grow" variant="success" size="lg"> <span className="sr-only">Loading...</span> </Spinner></div>:      
                <ul className="list-group">
                <li className=" bg-info list-group-item text-center">   Total Orders  {history.length}
                 </li>
                    <li className="list-group-item">
                        
                        {history.map((h, i) => {
                            return (
                                <div key={i}>
                                   
                                    <hr className="bg-primary " style={{border:"solid 2px indigo"}}/>
                                    <div  className="highlight bg-warning" >Status: {h.status}</div>
                                    <div className="active blackquote">Net Amount: {h.amount}</div>
                                    <div  className="active">Address: {h.address}</div>
                                    <div  className="active">Phone no: {h.phoneNo}</div>
                                    <div  className="active">Comment : {h.comment}</div>

                                    <h6>
                                                   
                                                    Purchased :{" "}
                                                    {moment(
                                                       h.createdAt
                                                    ).add( 'day').format('LLL')}
                                                </h6>
                                    {h.products.map((p, i) => {
                                        return (
                                            <div
                                        className="mb-4"
                                        key={i}
                                        style={{
                                            padding: "20px",
                                            border: "1px solid indigo"
                                        }}
                                    >
                                           
                                             
                                                <h6>Product name: {p.name}</h6>
                                                <h6>
                                                    Product price: ${p.price}
                                                </h6>
                                                <h6>
                                                    No of Products: {p.count}
                                                </h6>
                                             
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </li>
                </ul>}
            </div>
        );
    };

    return (
        <Layout
            title="Dashboard"
            description={`G'day ${name}!`}
            className="container-fluid"
        >
            <Row>
                <Col xl="3" lg="3" md="12">{userLinks()}</Col>
                <Col xl="9" lg="9" md="12">
                    {userInfo()}
                    {purchaseHistory(history)}
                    
                </Col>
            </Row>
        </Layout>
    );
};

export default Dashboard;
