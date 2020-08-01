import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import ShowImage from './ShowImage';
import moment from 'moment';
import { addItem, updateItem, removeItem, itemTotal } from './cartHelpers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Modal from 'react-bootstrap/Modal'

import Button from 'react-bootstrap/Button'



const Card = ({
  product,
  showViewProductButton = true,
  showAddToCartButton = true,
  cartUpdate = false,
  showRemoveProductButton = false,
  setRun = f => f,
  run = undefined
  // changeCartSize
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const showViewButton = showViewProductButton => {
    return (
      showViewProductButton && (
        <Link to={`/product/${product._id}`} className="mr-2">
          <button className="btn btn-primary mt-2 mb-2 card-btn-1">View Product</button>
        </Link>
      )
    );
  };
  const addToCart = () => {
    // console.log('added');
    var link=(<Link to='/cart'>My Cart</Link>);
    toast.warning(`item added to cart.Total ${itemTotal()} ${link} items in cart`);
    addItem(product, setRedirect(true));

  };

  const shouldRedirect = redirect => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddToCartBtn = showAddToCartButton => {
    return (
      showAddToCartButton && product.quantity > 0 && (
        <button onClick={addToCart} className="btn btn-warning mt-2 mb-2 card-btn-1  ">
          Add to cart
        </button>
      )
    );
  };

  const showStock = quantity => {
    return quantity > 0 ? (
      <span className="badge badge-success badge-pill">In Stock </span>
    ) : (
        <span className="badge badge-danger badge-pill">Out of Stock </span>
      );
  };

  const handleChange = productId => event => {
    setRun(!run); // run useEffect in parent Cart

    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      if (event.target.value > product.quantity) {
        event.target.value = product.quantity
        setCount(0)
        alert(`max quantity can be ${product.quantity}`)
      }

      updateItem(productId, event.target.value);


    }
  };

  const showCartUpdateOptions = cartUpdate => {
    return (
      cartUpdate && (
        <div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Adjust Quantity</span>
            </div>
            <input type="number" className="form-control" value={count} onChange={handleChange(product._id)} />
          </div>
        </div>
      )
    );
  };
  const showRemoveButton = showRemoveProductButton => {
    return (
      showRemoveProductButton && (
        <button
          onClick={() => {
            toast.error(`1 item removed from cart`);
            removeItem(product._id);
            setRun(!run); // run useEffect in parent Cart
          }}
          className="btn btn-danger mt-2 mb-2"
        >
          Remove Product
        </button>
      )
    );
  };


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="card mb=3">
      <div className="card-header card-header-1" >{product.name}
        <div className="badge  badge-warning badge-pill">
          <span className="text-right" onClick={handleShow} >
            Demo
              </span>
        </div>
        <Modal size="lg" show={show} onHide={handleClose}>

          <iframe src={`${product.link}?autoplay=1`}
            frameborder='0'
            allow='autoplay; encrypted-media'
            allowfullscreen='true'
            title='video'
            height="550"

          />
          <Button variant="secondary" onClick={handleClose}>
            Close
                  </Button>

        </Modal>



      </div>
      <div className="card-body">
        {/* {shouldRedirect(redirect)} */}
        <ShowImage item={product} url="product" />
        {showViewProductButton ? <p className="card-p  mt-2">{product.description.substring(0, 20)} </p> : <p className="card-p  mt-2">{product.description} </p>}
        <p className="card-p black-10">&#8377; {product.price}</p>
        <p className="black-9">Category: {product.category && product.category.name}</p>
        <p className="black-8">Added on {moment(product.createdAt).fromNow()}</p>
        {showStock(product.quantity)}
        <br />

        {showViewButton(showViewProductButton)}
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        {showAddToCartBtn(showAddToCartButton)}

        {showRemoveButton(showRemoveProductButton)}

        {showCartUpdateOptions(cartUpdate)}
      </div>
    </div>
  );
};

export default Card;
