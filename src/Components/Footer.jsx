import React from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaTwitter, FaFacebookF, FaLinkedinIn, FaInstagram } from 'react-icons/fa';


const Footer = () => {
    return (
        <div className="container-fluid footer-container">
            <div className="row pt-5">
                <div className="col-lg-4 col-md-12 mb-5 footer-column">
                    <a href="/" className="navbar-brand footer-brand">
                        <img src="/static/media/petsetlogo.5c819f7b0874ad5e80d4.png" alt="petSetLogo" />
                    </a>
                    <p className="m-0 pt-2">
                        PetSet: Your pet's ultimate haven. Elevate their experience with our exclusive services – from memory storing and lost pet assistance to gourmet cuisine and tailored care. Trust us for a world of joy, health, and unmatched pet delight.
                    </p>
                </div>
                <div className="col-lg-4 col-md-12 mb-5 footer-column">
                    <h5 className="text-primary mb-4">Get In Touch</h5>
                    <p><FaMapMarkerAlt className="mr-2" />United City, Madani Avenue, Badda, Dhaka 1212</p>
                    <p><FaPhoneAlt className="mr-2" />+012 345 67890</p>
                    <p><FaEnvelope className="mr-2" />contact@uiu.com</p>
                    <div className="footer-icons mt-4">
                        <a href="https://twitter.com"><FaTwitter /></a>
                        <a href="https://facebook.com"><FaFacebookF /></a>
                        <a href="https://linkedin.com"><FaLinkedinIn /></a>
                        <a href="https://instagram.com"><FaInstagram /></a>
                    </div>
                </div>
                <div className="col-lg-4 col-md-12 mb-5 footer-column">
                    <h5 className="text-primary mb-4">Popular Links</h5>
                    <div className="footer-links">
                        <a href="/"><i className="fa fa-angle-right mr-2"></i>Home</a>
                        <a href="/memories"><i className="fa fa-angle-right mr-2"></i>Memories</a>
                        <a href="/adoption"><i className="fa fa-angle-right mr-2"></i>Adoption</a>
                        <a href="/services"><i className="fa fa-angle-right mr-2"></i>Services</a>
                        <a href="/store"><i className="fa fa-angle-right mr-2"></i>Store</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
