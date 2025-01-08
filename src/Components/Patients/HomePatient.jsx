import React from "react";
import PatientNavbar from "../NavBar/PatientNavbar";
import { FaHeartbeat, FaUserMd, FaHandsHelping, FaPhone, FaHospitalAlt, FaClipboardList, FaMedkit, FaStethoscope, FaClock, FaCheckCircle, FaSmile, FaVideo, FaCloud, FaWifi, FaShippingFast, FaLanguage, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import "./HomePatient.css";

const HomePatient = () => {
  return (
    <div className="home-patient-container">
      <PatientNavbar />
      <header className="home-header">
        <h1 className="home-title">Aarogya Dwaar</h1>
        <p className="home-subtitle">Your Gateway to Health and Healing</p>
      </header>

      {/* Image Gallery Section */}
      <section className="image-gallery">
        <div className="image-gallery-container">
          <div className="image-item">
            <div className="image-box">
              <img 
                src="https://th.bing.com/th/id/OIP.Ea8h9y11LD_7AIlub9YSwwHaEv?w=266&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" 
                alt="Image 1" 
                className="gallery-image" 
              />
            </div>
          </div>
          <div className="image-item">
            <div className="image-box">
              <img 
                src="https://th.bing.com/th/id/OIP.xCzig3zg_FJJqjOH_Fs-EgHaEK?w=292&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" 
                alt="Image 2" 
                className="gallery-image" 
              />
            </div>
          </div>
          <div className="image-item">
            <div className="image-box">
              <img 
                src="https://th.bing.com/th/id/OIP.Gk6wmRPzgT2o1OLRLLHxZgHaFS?w=262&h=188&c=7&r=0&o=5&dpr=1.3&pid=1.7" 
                alt="Image 3" 
                className="gallery-image" 
              />
            </div>
          </div>
          <div className="image-item">
            <div className="image-box">
              <img 
                src="https://th.bing.com/th/id/OIP.PI505YcvzoTZAlqAX1E6WgHaE7?w=271&h=181&c=7&r=0&o=5&dpr=1.3&pid=1.7" 
                alt="Image 4" 
                className="gallery-image" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quotes Section */}
      <section className="quotes-section">
        <div className="quotes-container">
          <div className="quote-box">"Health is the greatest wealth."</div>
          <div className="quote-box">"An ounce of prevention is worth a pound of cure."</div>
          <div className="quote-box">"Your health is an investment, not an expense."</div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">Our Features</h2>
        <div className="features-container">
          <div className="feature">
            <FaVideo className="feature-icon" />
            <h3>Video Consultation with AI Assistance</h3>
            <p>Virtual doctor consultations supported by AI for preliminary symptom analysis.</p>
          </div>
          <div className="feature">
            <FaCloud className="feature-icon" />
            <h3>Digital Health Records</h3>
            <p>Cloud-based storage for patients’ medical histories, accessible from any location.</p>
          </div>
          <div className="feature">
            <FaWifi className="feature-icon" />
            <h3>Offline Accessibility</h3>
            <p>Access records and consult via SMS for areas with poor internet connectivity.</p>
          </div>
          <div className="feature">
            <FaShippingFast className="feature-icon" />
            <h3>Medication Delivery Integration</h3>
            <p>Tie-ups with local pharmacies to deliver prescribed medications to your doorstep.</p>
          </div>
          <div className="feature">
            <FaLanguage className="feature-icon" />
            <h3>Multilingual Support</h3>
            <p>Interface available in regional languages for better accessibility and comfort.</p>
          </div>
        </div>
      </section>

      {/* Top Specialists Section */}
      <section className="specialists-section">
        <h2 className="section-title">Our Top Specialists</h2>
        <div className="specialists-container">
          <div className="specialist">
            <img
              src="https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Dr. John Doe"
              className="specialist-image"
            />
            <h3>Dr. John Doe</h3>
            <p>Cardiologist</p>
          </div>
          <div className="specialist">
            <img
              src="https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Dr. Jane Smith"
              className="specialist-image"
            />
            <h3>Dr. Jane Smith</h3>
            <p>Dermatologist</p>
          </div>
          <div className="specialist">
            <img
              src="https://th.bing.com/th/id/OIP.s3mQLGK7nHMzwrv3BNgQTAHaEl?w=306&h=189&c=7&r=0&o=5&dpr=1.3&pid=1.7"
              alt="Dr. Mark Lee"
              className="specialist-image"
            />
            <h3>Dr. Mark Lee</h3>
            <p>Pediatrician</p>
          </div>
          {/* New Specialist Images */}
          <div className="specialist">
            <img
              src="https://th.bing.com/th/id/OIP.r-OqjcGJBXrmNiMk-Cx3aAHaEO?w=294&h=186&c=7&r=0&o=5&dpr=1.3&pid=1.7"
              alt="Dr. Emily Davis"
              className="specialist-image"
            />
            <h3>Dr. Emily Davis</h3>
            <p>Gynecologist</p>
          </div>
          <div className="specialist">
            <img
              src="https://th.bing.com/th/id/OIP.M0FZeVMZa_n7zHGbAcJF1wHaFj?w=238&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
              alt="Dr. Alex Turner"
              className="specialist-image"
            />
            <h3>Dr. Alex Turner</h3>
            <p>Orthopedic Surgeon</p>
          </div>
          <div className="specialist">
            <img
              src="https://th.bing.com/th?q=Royalty+Free+Doctor&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.3&pid=InlineBlock&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247"
              alt="Dr. Sarah Brown"
              className="specialist-image"
            />
            <h3>Dr. Sarah Brown</h3>
            <p>Neurologist</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <h2 className="section-title">Frequently Asked Questions</h2>
        <div className="faq-container">
          <details>
            <summary>How do I make an appointment?</summary>
            <p>You can make an appointment by clicking on the Doctors image in the Doctor section.</p>
          </details>
          <details>
            <summary>Do I need to create an account to book an appointment?</summary>
            <p>Yes, to streamline the booking process and provide better services, we recommend creating an account. You can register with your email address.</p>
          </details>
          <details>
            <summary>Can I reschedule or cancel my appointment?</summary>
            <p>Yes, you can reschedule or cancel your appointment with at least 24 hours' notice.</p>
          </details>
          <details>
            <summary>What types of specialists are available on your platform?</summary>
            <p>We offer a wide range of medical specialists including cardiologists, dermatologists, pediatricians, orthopedists, neurologists, and more. You can browse the specialists and find the one that best suits your needs.</p>
          </details>
          <details>
            <summary>Do you offer telehealth consultations?</summary>
            <p>Yes, we offer telehealth consultations for some services. Contact us for more information.</p>
          </details>
          <details>
            <summary>What should I do if I miss my appointment?</summary>
            <p>If you miss an appointment, we encourage you to reschedule it as soon as possible. You can contact our support team for assistance in rescheduling or finding another available time slot.</p>
          </details>
        </div>
      </section>

      {/* About Us Section */}
      <section className="healthcare-info">
        <h2 className="section-title">About Us</h2>
        <p>
          We are a healthcare platform committed to providing affordable and accessible medical services. Our goal is to connect patients with trusted doctors and healthcare providers to offer high-quality care.
        </p>
      </section>

      <footer className="footer">
  <div className="footer-content">
    <div className="footer-left">
      <h3 className="footer-logo">HealthTech</h3>
      <p>Your health, our priority. Empowering healthcare with technology.</p>
    </div>
    <div className="footer-right">
      <div className="footer-links">
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About Us</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </div>
      <div className="footer-social">
        <a href="https://facebook.com" className="social-icon"><FaFacebook /></a>
        <a href="https://twitter.com" className="social-icon"><FaTwitter /></a>
        <a href="https://linkedin.com" className="social-icon"><FaLinkedin /></a>
        <a href="https://instagram.com" className="social-icon"><FaInstagram /></a>
      </div>
    </div>
  </div>
  <div className="footer-bottom">
    <p>&copy; 2025 HealthTech. All rights reserved.</p>
  </div>
</footer>

    </div>
  );
};

export default HomePatient;
