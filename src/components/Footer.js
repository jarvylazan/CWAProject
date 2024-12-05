import React from "react";

const Footer = () => (
  <footer className="bg-dark text-white py-4">
    <div className="container">
      <div className="row align-items-start">
        {" "}
        {/* Ensures both sections are aligned at the top */}
        {/* Quick Links on the Left */}
        <div className="col-md-4">
          <h5 className="mb-3 mt-1 fw-bold">QUICK LINKS</h5> {/* Adjusted mt-2 to move it up */}
          <a href="#privacy" className="d-block text-white text-decoration-underline">
            Privacy Policy
          </a>
          <a href="#terms" className="d-block text-white text-decoration-underline">
            Terms of Service
          </a>
          <a href="#contact" className="d-block text-white text-decoration-underline">
            Contact Us
          </a>
        </div>
        {/* Follow Us in the Center */}
        <div className="col-md-4 text-center ml-auto">
          <h5 className="mb-3 mt-1 fw-bold text-start">FOLLOW US</h5> {/* Adjusted mt-2 to move it up */}
          <div className="d-flex justify-content-center align-items-center mb-3">
            <a href="#facebook" className="mx-2 text-white text-decoration-none">
              <i className="bi bi-facebook fs-4" aria-label="Facebook"></i>
            </a>
            <a href="#twitter" className="mx-2 text-white text-decoration-none">
              <i className="bi bi-twitter fs-4" aria-label="Twitter"></i>
            </a>
            <a href="#instagram" className="mx-2 text-white text-decoration-none">
              <i className="bi bi-instagram fs-4" aria-label="Instagram"></i>
            </a>
            <a href="#linkedin" className="mx-2 text-white text-decoration-none">
              <i className="bi bi-linkedin fs-4" aria-label="LinkedIn"></i>
            </a>
          </div>
        </div>
        {/* Empty Space (Right) */}
        <div className="col-md-4"></div>
      </div>

      {/* Copyright Notice (Moved Further Down) */}
      <div className="text-center mt-4">
        <p className="mb-0">© 2024 CST Store. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
