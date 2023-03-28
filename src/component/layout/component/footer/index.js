import React from "react";
import "../../../../static/css/component/footer/style.css";
function Footer() {
  return (
    <footer>
      <section className="space_footer"></section>
      <footer className="footer-02">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-10 col-lg-6">
              <div className="subscribe mb-5">
                <form action="#" className="subscribe-form">
                  <div className="form-group d-flex">
                    <input
                      type="text"
                      className="form-control rounded-left"
                      placeholder="Enter email address"
                    />
                    <input
                      type="submit"
                      value="Subscribe"
                      className="form-control submit px-3"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 col-lg-5">
              <div className="row">
                <div className="col-md-12 col-lg-8 mb-md-0 mb-4">
                  <h2 className="footer-heading">
                    <a href="#" className="logo">
                      Colorlib.com
                    </a>
                  </h2>
                  <p>
                    A small river named Duden flows by their place and supplies
                    it with the necessary regelialia.
                  </p>
                  <a href="#">
                    read more{" "}
                    <span className="ion-ios-arrow-round-forward"></span>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-8 col-lg-7">
              <div className="row">
                <div className="col-md-3 mb-md-0 mb-4 border-left">
                  <h2 className="footer-heading">Discover</h2>
                  <ul className="list-unstyled">
                    <li>
                      <a href="#" className="py-1 d-block">
                        Buy &amp; Sell
                      </a>
                    </li>
                    <li>
                      <a href="#" className="py-1 d-block">
                        Merchant
                      </a>
                    </li>
                    <li>
                      <a href="#" className="py-1 d-block">
                        Giving back
                      </a>
                    </li>
                    <li>
                      <a href="#" className="py-1 d-block">
                        Help &amp; Support
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="col-md-3 mb-md-0 mb-4 border-left">
                  <h2 className="footer-heading">About</h2>
                  <ul className="list-unstyled">
                    <li>
                      <a href="#" className="py-1 d-block">
                        Staff
                      </a>
                    </li>
                    <li>
                      <a href="#" className="py-1 d-block">
                        Team
                      </a>
                    </li>
                    <li>
                      <a href="#" className="py-1 d-block">
                        Careers
                      </a>
                    </li>
                    <li>
                      <a href="#" className="py-1 d-block">
                        Blog
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="col-md-3 mb-md-0 mb-4 border-left">
                  <h2 className="footer-heading">Resources</h2>
                  <ul className="list-unstyled">
                    <li>
                      <a href="#" className="py-1 d-block">
                        Security
                      </a>
                    </li>
                    <li>
                      <a href="#" className="py-1 d-block">
                        Global
                      </a>
                    </li>
                    <li>
                      <a href="#" className="py-1 d-block">
                        Charts
                      </a>
                    </li>
                    <li>
                      <a href="#" className="py-1 d-block">
                        Privacy
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="col-md-3 mb-md-0 mb-4 border-left">
                  <h2 className="footer-heading">Social</h2>
                  <ul className="list-unstyled">
                    <li>
                      <a href="#" className="py-1 d-block">
                        Facebook
                      </a>
                    </li>
                    <li>
                      <a href="#" className="py-1 d-block">
                        Twitter
                      </a>
                    </li>
                    <li>
                      <a href="#" className="py-1 d-block">
                        Instagram
                      </a>
                    </li>
                    <li>
                      <a href="#" className="py-1 d-block">
                        Googleplus
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="row partner-wrap mt-5">
            <div className="col-md-12">
              <div className="row align-items-center">
                <div className="col">
                  <h3 className="mb-0">Our Partner:</h3>
                </div>
                <div className="col-md-9">
                  <p className="partner-name mb-0">
                    <a href="#">
                      <span className="ion-logo-ionic mr-2"></span>Company 01
                    </a>
                    <a href="#">
                      <span className="ion-logo-ionic mr-2"></span>Company 02
                    </a>
                    <a href="#">
                      <span className="ion-logo-ionic mr-2"></span>Company 03
                    </a>
                    <a href="#">
                      <span className="ion-logo-ionic mr-2"></span>Company 04
                    </a>
                    <a href="#">
                      <span className="ion-logo-ionic mr-2"></span>Company 05
                    </a>
                    <a href="#">
                      <span className="ion-logo-ionic mr-2"></span>Company 06
                    </a>
                  </p>
                </div>
                <div className="col text-md-right">
                  <p className="mb-0">
                    <a href="#" className="btn-custom">
                      See All{" "}
                      <span className="ion-ios-arrow-round-forward"></span>
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-md-6 col-lg-8">
              <p className="copyright">
                Copyright &copy;
                <script>document.write(new Date().getFullYear());</script> All
                rights reserved | This template is made with{" "}
                <i className="ion-ios-heart" aria-hidden="true"></i> by{" "}
                <a href="https://colorlib.com" target="_blank">
                  Colorlib.com
                </a>
              </p>
            </div>
            <div className="col-md-6 col-lg-4 text-md-right">
              <p className="mb-0 list-unstyled">
                <a className="mr-md-3" href="#">
                  Terms
                </a>
                <a className="mr-md-3" href="#">
                  Privacy
                </a>
                <a className="mr-md-3" href="#">
                  Compliances
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>

      <script src="js/jquery.min.js"></script>
      <script src="js/popper.js"></script>
      <script src="js/bootstrap.min.js"></script>
      <script src="js/main.js"></script>
    </footer>
  );
}

export default Footer;
