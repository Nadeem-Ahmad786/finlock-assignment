import React from "react";

function Footer(){
    return (
        <div className="footer">
            <div className="flex">
                <p>Powered by</p>
                <img className="pow-image" src='images/ic_zaperon.png' alt="user icon" height="40px"/>
            </div>
            <div className="help">
                <a href="/">Need Help?</a>
                <p><a href="/">Privacy Policy</a> & <a href="/">Terms</a></p>
           </div> 
        </div>
    )
}

export default Footer;