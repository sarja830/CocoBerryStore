import React from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import axios from 'axios';
import { API,REACT_APP_FACEBOOK_APP_ID } from "../config";

const Facebook = ({ informParent = f => f }) => {
    const responseFacebook = response => {
        console.log(response);
        axios({
            method: 'POST',
            url: `${API}/facebook-login`,
            data: { userID: response.userID, accessToken: response.accessToken }
        })
            .then(response => {
                console.log('FACEBOOK SIGNIN SUCCESS', response);
                // inform parent component
                informParent(response);
            })
            .catch(error => {
                console.log('FACEBOOK SIGNIN ERROR', error.response);
                informParent(error.response);
            });
    };
    return (
        <div className="pb-3">
            <FacebookLogin
                appId={`${REACT_APP_FACEBOOK_APP_ID}`}
                autoLoad={false}
                callback={responseFacebook}
                render={renderProps => (
                    <button onClick={renderProps.onClick} className="btn btn-primary btn-lg btn-block">
                        <i className="fab fa-facebook pr-2"></i> Login with Facebook
                    </button>
                )}
            />
        </div>
    );
};

export default Facebook;
