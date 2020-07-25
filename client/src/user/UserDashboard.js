import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { getPurchaseHistory } from "./apiUser";
import moment from "moment";

const Dashboard = () => {
    const [history, setHistory] = useState([]);

    const {
        user: { _id, name, email, role }
    } = isAuthenticated();
    const token = isAuthenticated().token;

    const init = (userId, token) => {
        getPurchaseHistory(userId, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setHistory(data);
            }
        });
    };

    useEffect(() => {
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
                 <h3 className="card-header">Purchase history <br/><h4 className="badge-primary mt-2 text-wrap">Total Orders  {history.length}</h4></h3>
                
                <ul className="list-group">
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
                </ul>
            </div>
        );
    };

    return (
        <Layout
            title="Dashboard"
            description={`G'day ${name}!`}
            className="container-fluid"
        >
            <div className="row">
                <div className="col-3">{userLinks()}</div>
                <div className="col-9">
                    {userInfo()}
                    {purchaseHistory(history)}
                    {console.log(history)}
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;
