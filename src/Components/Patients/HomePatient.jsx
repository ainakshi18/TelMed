import React from "react";
import { useTranslation } from "react-i18next";
import PatientNavbar from "../NavBar/PatientNavbar";
import { FaHeartbeat, FaUserMd, FaHandsHelping, FaPhone, FaHospitalAlt, FaClipboardList, FaMedkit, FaStethoscope, FaClock, FaCheckCircle, FaSmile, FaVideo, FaCloud, FaWifi, FaShippingFast, FaLanguage, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import "./HomePatient.css";

const HomePatient = () => {
  const { t } = useTranslation(); // Initialize translation hook

  return (
    <div className="home-patient-container">
      <PatientNavbar />
      <header className="home-header">
        <h1 className="home-title">{t('Aarogya Disha')}</h1>
        <p className="home-subtitle">{t('Your Gateway to Health and Healing')}</p>
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
          <div className="quote-box">{t('Health is the greatest wealth.')}</div>
          <div className="quote-box">{t('An ounce of prevention is worth a pound of cure.')}</div>
          <div className="quote-box">{t('Your health is an investment, not an expense.')}</div>
        </div>
      </section>
      {/* Ayushmann Bharat Section */}
      <section className="ayushmann-bharat-section">
  <h2 className="section-title">Ayushmann Bharat Mission</h2>
  <div className="ayushmann-bharat-container flex flex-col md:flex-row items-center justify-between">
    {/* Image Column */}
    <div className="ayushmann-bharat-logo-container w-full md:w-1/2 mb-4 md:mb-0">
      <img
        src="https://upload.wikimedia.org/wikipedia/en/1/1a/Ayushman_Bharat_logo.png"
        alt="Ayushmann Bharat Logo"
        className="ayushmann-bharat-logo mx-auto"
      />
    </div>
    {/* Information Column */}
    <div className="ayushmann-bharat-info-container w-full md:w-1/2 text-center md:text-left">
      <p>
        The <strong>Ayushmann Bharat Yojna</strong> is India's flagship healthcare scheme, offering free medical treatment up to ₹5 lakh annually to underprivileged families. It ensures that every citizen has access to quality healthcare without the financial burden. With over 10 crore families covered, it's a major step towards building a healthier nation.
      </p>
      <p>
        Whether it's for hospitalization, surgery, or medical tests, Ayushmann Bharat is here to make healthcare affordable for all.
      </p>
      <a 
        href="https://pmjay.gov.in/" 
        target="_blank" 
        rel="noopener noreferrer"
        className="ayushmann-bharat-btn bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Visit Ayushmann Bharat Official Website
      </a>
    </div>
  </div>
</section>
      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">{t('Our Features')}</h2>
        <div className="features-container">
          <div className="feature">
            <FaVideo className="feature-icon" />
            <h3>{t('Video Consultation with AI Assistance')}</h3>
            <p>{t('Virtual doctor consultations supported by AI for preliminary symptom analysis.')}</p>
          </div>
          <div className="feature">
            <FaCloud className="feature-icon" />
            <h3>{t('Digital Health Records')}</h3>
            <p>{t('Cloud-based storage for patients’ medical histories, accessible from any location.')}</p>
          </div>
          <div className="feature">
            <FaWifi className="feature-icon" />
            <h3>{t('Offline Accessibility')}</h3>
            <p>{t('Access records and consult via SMS for areas with poor internet connectivity.')}</p>
          </div>
          <div className="feature">
            <FaShippingFast className="feature-icon" />
            <h3>{t('Medication Delivery Integration')}</h3>
            <p>{t('Tie-ups with local pharmacies to deliver prescribed medications to your doorstep.')}</p>
          </div>
          <div className="feature">
            <FaLanguage className="feature-icon" />
            <h3>{t('Multilingual Support')}</h3>
            <p>{t('Interface available in regional languages for better accessibility and comfort.')}</p>
          </div>
        </div>
      </section>

      {/* Top Specialists Section */}
      <section className="specialists-section">
        <h2 className="section-title">{t('Our Top Specialists')}</h2>
        <div className="specialists-container">
          <div className="specialist">
            <img
              src="https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Dr. John Doe"
              className="specialist-image"
            />
            <h3>{t('Dr. John Doe')}</h3>
            <p>{t('Cardiologist')}</p>
          </div>
          <div className="specialist">
            <img
              src="https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Dr. Jane Smith"
              className="specialist-image"
            />
            <h3>{t('Dr. Jane Smith')}</h3>
            <p>{t('Dermatologist')}</p>
          </div>
          <div className="specialist">
            <img
              src="https://th.bing.com/th/id/OIP.s3mQLGK7nHMzwrv3BNgQTAHaEl?w=306&h=189&c=7&r=0&o=5&dpr=1.3&pid=1.7"
              alt="Dr. Mark Lee"
              className="specialist-image"
            />
            <h3>{t('Dr. Mark Lee')}</h3>
            <p>{t('Pediatrician')}</p>
          </div>
          {/* New Specialist Images */}
          <div className="specialist">
            <img
              src="https://th.bing.com/th/id/OIP.r-OqjcGJBXrmNiMk-Cx3aAHaEO?w=294&h=186&c=7&r=0&o=5&dpr=1.3&pid=1.7"
              alt="Dr. Emily Davis"
              className="specialist-image"
            />
            <h3>{t('Dr. Emily Davis')}</h3>
            <p>{t('Gynecologist')}</p>
          </div>
          <div className="specialist">
            <img
              src="https://th.bing.com/th/id/OIP.M0FZeVMZa_n7zHGbAcJF1wHaFj?w=238&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
              alt="Dr. Alex Turner"
              className="specialist-image"
            />
            <h3>{t('Dr. Alex Turner')}</h3>
            <p>{t('Orthopedic Surgeon')}</p>
          </div>
          <div className="specialist">
            <img
              src="https://th.bing.com/th?q=Royalty+Free+Doctor&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.3&pid=InlineBlock&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247"
              alt="Dr. Sarah Brown"
              className="specialist-image"
            />
            <h3>{t('Dr. Sarah Brown')}</h3>
            <p>{t('Neurologist')}</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <h2 className="section-title">{t('Frequently Asked Questions')}</h2>
        <div className="faq-container">
          <details>
            <summary>{t('How do I make an appointment?')}</summary>
            <p>{t('You can make an appointment by clicking on the Doctors image in the Doctor section.')}</p>
          </details>
          <details>
            <summary>{t('Do I need to create an account to book an appointment?')}</summary>
            <p>{t('Yes, to streamline the booking process and provide better services, we recommend creating an account. You can register with your email address.')}</p>
          </details>
          <details>
            <summary>{t('Can I reschedule or cancel my appointment?')}</summary>
            <p>{t('Yes, you can reschedule or cancel your appointment with at least 24 hours\' notice.')}</p>
          </details>
          <details>
            <summary>{t('What types of specialists are available on your platform?')}</summary>
            <p>{t('We offer a wide range of medical specialists including cardiologists, dermatologists, pediatricians, orthopedists, neurologists, and more. You can browse the specialists and find the one that best suits your needs.')}</p>
          </details>
          <details>
            <summary>{t('Do you offer telehealth consultations?')}</summary>
            <p>{t('Yes, we offer telehealth consultations for some services. Contact us for more information.')}</p>
          </details>
          <details>
            <summary>{t('What should I do if I miss my appointment?')}</summary>
            <p>{t('If you miss an appointment, we encourage you to reschedule it as soon as possible. You can contact our support team for assistance in rescheduling or finding another available time slot.')}</p>
          </details>
        </div>
      </section>

      {/* About Us Section */}
      <section className="healthcare-info">
        <h2 className="section-title">{t('About Us')}</h2>
        <p>{t('We are a healthcare platform committed to providing affordable and accessible medical services. Our goal is to connect patients with trusted doctors and healthcare providers to offer high-quality care.')}</p>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-left">
            <h3 className="footer-logo">{t('HealthTech')}</h3>
            <p>{t('Your health, our priority. Empowering healthcare with technology.')}</p>
          </div>
          <div className="footer-right">
            <div className="footer-links">
              <ul>
                <li><a href="#home">{t('Home')}</a></li>
                <li><a href="#about">{t('About Us')}</a></li>
                <li><a href="#services">{t('Services')}</a></li>
                <li><a href="#contact">{t('Contact')}</a></li>
              </ul>
            </div>
            <div className="footer-socials">
              <a href="https://facebook.com"><FaFacebook /></a>
              <a href="https://twitter.com"><FaTwitter /></a>
              <a href="https://instagram.com"><FaInstagram /></a>
              <a href="https://linkedin.com"><FaLinkedin /></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePatient;
