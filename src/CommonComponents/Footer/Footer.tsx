import { Link } from "react-router-dom";
// import { FaLinkedin, FaTwitter, FaYoutube, FaPodcast } from "react-icons/fa";
import "./Footer.scss"; // Import SCSS file

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/agent-list">Explore AI Agents</Link></li>
            <li><Link to="/">Agent Seller Portal</Link></li>
            {/* <li><Link to="/">Get Started</Link></li> */}
            <li><Link to="https://synergetics.ai/contact/" target="_blank">Contact Us</Link></li>
            <li><Link to="https://synergetics.ai/privacy-policy/" target="_blank">Privacy Policy</Link></li>
            <li><Link to="https://synergetics.ai/terms-and-conditions/" target="_blank">Terms of Service</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Resources</h3>
          <ul>
            <li><Link to="https://docs.synergetics.ai/" target="_blank">Documentation</Link></li>
            {/* <li><Link to="/">API Access</Link></li> */}
            <li><Link to="https://docs.synergetics.ai/" target="_blank">Integration Guides</Link></li>
            <li><Link to="https://synergetics.ai/resources/" target="_blank">Whitepapers</Link></li>
            {/* <li><Link to="/">Security & Compliance</Link></li> */}
          </ul>
        </div>

        <div className="footer-section">
          <h3>Company</h3>
          <ul>
            <li><Link to="https://synergetics.ai/about-us/" target="_blank">About Synergetics</Link></li>
            {/* <li><Link to="/">Careers</Link></li> */}
            <li><Link to="https://synergetics.ai/events/" target="_blank">News & Events</Link></li>
            <li><Link to="https://synergetics.ai/blog/" target="_blank">Blog</Link></li>
          </ul>
        </div>

        <div className="footer-section newsletter">
          <h3>Newsletter</h3>
          <p>Get product updates, AI insights & exclusive offers</p>
          <div className="newsletter-input">
            <input type="email" placeholder="you@example.com" />
            <button>Subscribe</button>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="centerBox">
            <p>© {new Date().getFullYear()} Synergetics.ai – All Rights Reserved</p>
            <div className="social-icons">
            {/* <a href="#"><FaLinkedin /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaYoutube /></a>
            <a href="#"><FaPodcast /></a> */}
            </div>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;
