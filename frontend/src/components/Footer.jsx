import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white text-black pt-16 pb-12">
      <div className="container mx-auto px-6 md:px-12">
        {/* Footer Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 mb-12">

          {/* Contact Information */}
          <div className="flex flex-col items-start space-y-6">
            <h3 className="text-2xl font-semibold">Contact Us</h3>
            <p className="text-lg">
              <i className="fas fa-phone-alt mr-2"></i> +1 (800) 123-4567
            </p>
            <p className="text-lg">
              <i className="fas fa-envelope mr-2"></i> support@example.com
            </p>
            <div className="text-lg">
              <i className="fas fa-map-marker-alt mr-2"></i>
              1234 Street Name, City, Country
            </div>
          </div>

          {/* Payment Methods (Right Side) */}
          <div className="flex flex-col items-start space-y-6 lg:ml-auto">
            <h3 className="text-2xl font-semibold">Payment Methods</h3>
            <div className="flex flex-wrap gap-6">
              <i className="fab fa-cc-paypal text-3xl text-blue-600 hover:text-blue-700"></i>
              <i className="fab fa-apple text-3xl text-black hover:text-gray-700"></i>
              <i className="fab fa-google text-3xl text-black hover:text-gray-700"></i>
              <i className="fab fa-bitcoin text-3xl text-yellow-500 hover:text-yellow-600"></i>
              <i className="fab fa-ethereum text-3xl text-blue-600 hover:text-blue-700"></i> {/* Ethereum Icon */}
              <i className="fab fa-cc-visa text-3xl text-blue-600 hover:text-blue-700"></i>
              <i className="fab fa-cc-mastercard text-3xl text-red-600 hover:text-red-700"></i>
              <i className="fab fa-cc-stripe text-3xl text-blue-700 hover:text-blue-800"></i>
              <i className="fab fa-cc-discover text-3xl text-orange-500 hover:text-orange-600"></i>
              <i className="fab fa-cc-amex text-3xl text-blue-600 hover:text-blue-700"></i>
              <i className="fab fa-cc-mastercard text-3xl text-green-500 hover:text-green-600"></i>  {/* Placeholder for Cash App */}
              <i className="fab fa-cc-diners-club text-3xl text-blue-600 hover:text-blue-700"></i>  {/* Diners Club */}
            </div>
          </div>

          {/* Social Media Links (Bottom Right) */}
          <div className="flex flex-col items-start space-y-6 lg:col-span-1 lg:ml-auto">
            <h3 className="text-2xl font-semibold">Follow Us</h3>
            <div className="flex flex-wrap gap-6">
              <a href="#" className="text-3xl text-blue-600 hover:text-blue-700"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="text-3xl text-blue-400 hover:text-blue-500"><i className="fab fa-twitter"></i></a>
              <a href="#" className="text-3xl text-pink-500 hover:text-pink-600"><i className="fab fa-instagram"></i></a>
              <a href="#" className="text-3xl text-blue-700 hover:text-blue-800"><i className="fab fa-linkedin-in"></i></a>
              <a href="#" className="text-3xl text-red-600 hover:text-red-700"><i className="fab fa-youtube"></i></a>
              <a href="#" className="text-3xl text-pink-700 hover:text-pink-800"><i className="fab fa-pinterest"></i></a>
              <a href="#" className="text-3xl text-yellow-400 hover:text-yellow-500"><i className="fab fa-snapchat-ghost"></i></a>
              <a href="#" className="text-3xl text-black hover:text-gray-800"><i className="fab fa-tiktok"></i></a>
            </div>
          </div>

          {/* Google Maps & Address (Left Side) */}
          <div className="flex flex-col items-start space-y-6">
            <h3 className="text-2xl font-semibold">Visit Us</h3>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.905780952529!2d144.9634322157423!3d-37.813627979751235!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d45be5f5e1d%3A0x5045675218ce6e0!2sFederation%20Square!5e0!3m2!1sen!2sau!4v1601205466650!5m2!1sen!2sau"
              width="250" height="250" style={{ border: 0 }} allowFullScreen="" loading="lazy"
              title="Google Maps Location"
            />
            <p className="text-lg mt-4">
              <i className="fas fa-map-marker-alt mr-2"></i> 1234 Street Name, City, Country
            </p>
          </div>
        </div>

        {/* Footer Bottom Section: Newsletter, Privacy Policy, Copyright */}
        <div className="border-t-2 border-gray-200 pt-12">
          {/* Newsletter Section */}
          <div className="text-center mb-6">
            <h3 className="text-2xl font-semibold mb-2">Stay Updated</h3>
            <p className="text-lg mb-4">Subscribe to our newsletter to get the latest updates and offers.</p>
            <div className="flex justify-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="p-3 rounded-l-md text-black shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-black text-white p-3 rounded-r-md hover:bg-gray-800 transition-all">
                Subscribe
              </button>
            </div>
          </div>

          {/* Privacy Policy, Terms, & Other Links */}
          <div className="text-center mb-6">
            <a href="/privacy-policy" className="text-blue-600 hover:text-blue-700 mx-3">Privacy Policy</a>
            <a href="/terms" className="text-blue-600 hover:text-blue-700 mx-3">Terms of Service</a>
            <a href="/refund-policy" className="text-blue-600 hover:text-blue-700 mx-3">Refund Policy</a>
            <a href="/faq" className="text-blue-600 hover:text-blue-700 mx-3">FAQ</a>
            <a href="/about-us" className="text-blue-600 hover:text-blue-700 mx-3">About Us</a>
            <a href="/careers" className="text-blue-600 hover:text-blue-700 mx-3">Careers</a>
          </div>

          {/* Copyright */}
          <div className="text-center">
            <p className="text-sm">© 2024 GreenMart. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
