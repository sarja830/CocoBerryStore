import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { getProducts, deleteProduct, getCategories } from "./apiAdmin";

const ManageCategories = () => {
    const [categories, setCategories] = useState([]);

    const { user, token } = isAuthenticated();

    const loadCategories = () => {
        getCategories().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setCategories(data);
            }
        });
    };

    // const destroy = productId => {
    //     deleteProduct(productId, user._id, token).then(data => {
    //         if (data.error) {
    //             console.log(data.error);
    //         } else {
    //             loadCategories();
    //         }
    //     });
    // };

    useEffect(() => {
        loadCategories();
    }, []);

    return (
        <Layout
            title="Manage Products"
            description="Perform CRUD on products"
            className="container-fluid"
        >
            <div className="row">
                <div className="col-12">
                    <h2 className="text-center">
                        Total {categories.length} categories
                    </h2>
                    <hr />
                    <ul className="list-group">
                        <li  className="active list-group-item d-flex justify-content-between align-items-center">
                             <div className="active col-2"><strong>No.</strong> </div>
                             <div className="active col-6">   <strong>CATEGORY NAME</strong></div>
                            
                            <span className="">
                            
                                   
                                        Update
                                    
                            
                                </span>
                                {/* <span>
                                    Delete
                                </span> */}
                        </li >
                        {categories.map((c, i) => (
                            <li
                                key={i}
                                className="list-group-item d-flex justify-content-between align-items-center"
                            >
                              <div className="col-2"> <strong>{i+1}</strong></div>
                             <div className="col-6">   <strong>{c.name}</strong></div>
                           
                                <span className="badge badge-warning badge-pill">
                                <Link style={{color:"black",textDecoration:"none"}} to={`/admin/category/update/${c._id}`} >
                                   
                                        Update
                                    
                                </Link>
                                </span>
                                {/* <span
                                style={{cursor:"pointer"}}
                                    onClick={() => destroy(c._id)}
                                    className="badge badge-danger badge-pill"
                                >
                                    Delete
                                </span> */}
                            </li>
                        ))}
                    </ul>
                    <br />
                </div>
            </div>
        </Layout>
    );
};

export default ManageCategories;
