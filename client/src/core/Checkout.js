import React, { useState, useEffect } from 'react';
import { getProducts, getBraintreeClientToken, processPayment, createOrder } from './apiCore';
import { emptyCart } from './cartHelpers';
import Card from './Card';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
// import "braintree-web"; // not using this package
//import DropIn from 'braintree-web-drop-in-react';

const Checkout = ({ products, setRun = f => f, run = undefined }) => {
    const [data, setData] = useState({
        loading: false,
        success: false,
        clientToken: null,
        error: '',
       // instance: {},
        address: '',
        phoneNo:'',
        comment:''
    });

    const userId = isAuthenticated() && isAuthenticated().user._id;
    const token = isAuthenticated() && isAuthenticated().token;

    // const getToken = (userId, token) => {
    //     getBraintreeClientToken(userId, token).then(data => {
    //         if (data.error) {
    //             console.log(data.error);
    //             setData({ ...data, error: data.error });
    //         } else {
    //             console.log(data);
    //             setData({ clientToken: data.clientToken });
    //         }
    //     });
    // };

    // useEffect(() => {
    //     // getToken(userId, token);
    // }, []);

    const handleAddress = event => {
        setData({ ...data, address: event.target.value });
    };

    const handlephoneNo = event => {
        setData({ ...data, phoneNo: event.target.value });
    };

    const handleComment = event => {
        setData({ ...data, comment: event.target.value });
    };

    const getTotal = () => {
        return products.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price;
        }, 0);
    };

    const showCheckout = () => {
        return isAuthenticated() ? (
            <div>{showDropIn()}</div>
        ) : (
                <Link to="/signin">
                    <button className="btn btn-primary">Sign in to checkout</button>
                </Link>
            );
    };

    let deliveryAddress = data.address;
    let conactNo= data.phoneNo;
    let comment=data.comment

    const buy = () => {

            if(!deliveryAddress) {
                alert('Address is required');
                return;
            }
            if(!conactNo){
                alert('phone number is required')
                return
            }
        // rest of code
    




        setData({ loading: true });
        // send the nonce to your server
        // nonce = data.instance.requestPaymentMethod()
        // let nonce;
        // let getNonce = data.instance
        //     .requestPaymentMethod()
        //     .then(data => {
        //         // console.log(data);
        //         nonce = data.nonce;
        //         // once you have nonce (card type, card number) send nonce as 'paymentMethodNonce'
        //         // and also tpaymentMethodNonceotal to be charged
        // console.log(
        //     "send nonce and total to process: ",
        //     nonce,
        //     getTotal(products)
        // );
        const paymentData = {
            paymentMethodNonce: "cod",
            //paymentMethodNonce: nonce,
            amount: getTotal(products)
        };
        //
        // processPayment(userId, token, paymentData)
        //     .then(response => {
        //         console.log(response);
        // empty cart
        // create order

        const createOrderData = {
            products: products,
            transaction_id: Date.now(),
            amount: getTotal(products),
            address: deliveryAddress,
            phoneNo:conactNo,
            comment:comment
        };
        

        createOrder(userId, token, createOrderData)
            .then(response => {
                alert(`Your Cash on delivery order was successful For order Summary go to dashboard `)
                emptyCart(() => {
                    setRun(!run); // run useEffect in parent Cart
                    console.log('payment success and empty cart');
                    setData({
                        loading: false,
                        success: true
                    });
                });
            })
            .catch(error => {
                console.log(error);
                setData({ loading: false });
            });
        // })
        // .catch(error => {
        //     console.log(error);
        //     setData({ loading: false });
        // });
        // })
        // .catch(error => {
        //     // console.log("dropin error: ", error);
        //     setData({ ...data, error: error.message });
        // });
    };

    const showDropIn = () => (
        <div onBlur={() => setData({ ...data, error: '' })}>
            {/* {data.clientToken !== null && products.length > 0 ? ( */}
            {products.length > 0 ? (
                <form>
                    <div className="gorm-group mb-3">
                        <label className="text-muted">Delivery address:</label>
                        <textarea
                            onChange={handleAddress}
                            className="form-control"
                            required
                            value={data.address}
                            placeholder="Type your delivery address here..."
                        />
                    </div>
                    <div className="gorm-group mb-3">
                        <label className="text-muted">Phone No:</label>
                        <input
                        type="number"
                            onChange={handlephoneNo}
                            className="form-control"
                            required
                            value={data.phoneNo}
                            placeholder="Provide your Contact number here..."
                        />
                    </div>
                    <div className="gorm-group mb-3">
                        <label className="text-muted">comment</label>
                        <textarea
                        type="text"
                            onChange={handleComment}
                            className="form-control"
                            required
                            value={data.comment}
                            placeholder="Any additional comment"
                        />
                    </div>
                    {/* 
                    <DropIn
                        options={{
                            authorization: data.clientToken,
                            paypal: {
                                flow: 'vault'
                            }
                        }}
                        onInstance={instance => (data.instance = instance)}
                    /> */}
                    <button onClick={buy} className="btn btn-success btn-block">
                        Proceed
                    </button>
                </form>
            ) : null}
        </div>
    );

    const showError = error => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = success => (
        <div className="alert alert-info" style={{ display: success ? '' : 'none' }}>
            Thanks! Your Order was successfuly placed!
        </div>
    );

    const showLoading = loading => loading && <h2 className="text-danger">Loading...</h2>;

    return (
        <div>
            <h2>Total: &#8377;{getTotal()}</h2>
            {showLoading(data.loading)}
            {showSuccess(data.success)}
            {showError(data.error)}
            {showCheckout()}
        </div>
    );
};

export default Checkout;
