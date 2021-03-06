import React from 'react';
import twitter from '../../../styles/assets/img/mykloud/twitter.png';
import linked from '../../../styles/assets/img/mykloud/linkedin.png';

const Footer = () => {
    return (
        <div className="footer">
            <div className="first-line">
                <div className="footer-logo" />
                <div className="link-container">
                    <a href="https://twitter.com/mykloudplatform" className="mr-8">
                        Terms of Service
                    </a>
                    <a href="https://twitter.com/mykloudplatform">Privacy Policy</a>
                </div>
            </div>
            <div className="second-line mt-8">
                <p className="copyright">Copyright © 2021. All rights reserved by myKloud Company.</p>

                <div className="flex">
                    <p className="join mr-6">Join our community</p>
                    <img src={twitter} alt="twitter" className="mr-3" />
                    <img alt="linked" src={linked} />
                </div>
            </div>
        </div>
    );
};

export default Footer;
