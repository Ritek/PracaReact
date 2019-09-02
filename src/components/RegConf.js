import React, {useContext, useState} from 'react';
import '../App.css';
import {Link, Redirect} from 'react-router-dom';

function RegConf() {

    const cardStyle = {
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '40vw',
        minWidth: '300px',
    }

    return (
        <div> 
            <div className={cardStyle}>
                <h1>Thank you for registering.</h1>
                <h3>Confirmation link was sent to the provided email address. You will be able to activate your account by clickng link in the message!</h3>
            </div>
        
        </div>
    );
}

export default RegConf;