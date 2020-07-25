import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { getProducts, deleteProduct } from "./apiAdmin";

const ManageProducts = () => {
    const [products, setProducts] = useState([]);

    const { user, token } = isAuthenticated();

    const loadProducts = () => {
        getProducts().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setProducts(data);
            }
        });
    };

    const destroy = productId => {
        deleteProduct(productId, user._id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                loadProducts();
            }
        });
    };

    useEffect(() => {
        loadProducts();
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
                        Total {products.length} products
                    </h2>
                    <hr />
                    <ul className="list-group">
                        <li  className="active list-group-item d-flex justify-content-between align-items-center">
                             <div className="active col-1"><strong>No.</strong> </div>
                             <div className="active col-2">   <strong>NAME</strong></div>
                             <div className="active col-2">   <strong>CATEGORY</strong></div>
                             <div className="active col-1">   <strong>PRICE</strong></div>
                             <div className="active col-1">   <strong>QTY</strong></div>
                            <div className="active col-1">   <strong>SOLD</strong></div>
                            <span className="">
                            
                                   
                                        Update
                                    
                            
                                </span>
                                <span>
                                    Delete
                                </span>
                        </li >
                        {products.map((p, i) => (
                            <li
                                key={i}
                                className="list-group-item d-flex justify-content-between align-items-center"
                            >
                              <div className="col-1"> <strong>{i+1}</strong></div>
                             <div className="col-2">   <strong>{p.name}</strong></div>
                             <div className="col-2">   <strong>{p.category.name}</strong></div>
                             <div className="col-1">   <strong>&#8377;{p.price}</strong></div>
                        <div className="col-1">   <strong>{p.quantity}</strong></div>
                        <div className="col-1">   <strong>{p.sold}</strong></div>
                                <span className="badge badge-warning badge-pill">
                                <Link style={{color:"black",textDecoration:"none"}} to={`/admin/product/update/${p._id}`}>
                                   
                                        Update
                                    
                                </Link>
                                </span>
                                <span
                                style={{cursor:"pointer"}}
                                    onClick={() => destroy(p._id)}
                                    className="badge badge-danger badge-pill"
                                >
                                    Delete
                                </span>
                            </li>
                        ))}
                    </ul>
                    <br />
                </div>
            </div>
        </Layout>
    );
};

export default ManageProducts;
