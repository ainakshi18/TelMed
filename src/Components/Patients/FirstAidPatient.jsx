import React, { useState } from 'react';
import { useTranslation } from 'react-i18next'; // Import useTranslation
import snakeImage from "../../Images/snake.jpeg"; // Correct relative path
import heartImage from "../../Images/heart.png";
import strokeImage from "../../Images/stroke.png";
import burnImage from "../../Images/burn.png";
import PatientNavbar from '../NavBar/PatientNavbar';

// Example first aid instructions for various situations
const firstAidInstructions = [
  {
    id: 1,
    title: "Snake Bite",
    disease: "Snake Bite",
    image: snakeImage, // Example snake icon
    description:
      "A snake bite can be dangerous, depending on the type of snake. Immediate first aid is crucial to prevent venom from spreading.",
    steps: [
      "Keep the patient calm and still.",
      "Call emergency services immediately.",
      "Keep the bitten area below the level of the heart.",
      "Apply a bandage above the bite to slow venom spread.",
      "Do not attempt to suck out venom or apply ice.",
    ]
  },
  {
    id: 2,
    title: "Heart Attack",
    disease: "Heart Attack",
    image: heartImage, // Example heart attack icon
    description:
      "A heart attack is a medical emergency that requires immediate attention. First aid can save a person's life while waiting for medical help.",
    steps: [
      "Call emergency services immediately.",
      "Have the person chew and swallow an aspirin, unless allergic.",
      "Keep the person calm and still.",
      "Perform CPR if the person loses consciousness and stops breathing.",
    ]
  },
  {
    id: 3,
    title: "Stroke",
    disease: "Stroke",
    image: strokeImage, // Example stroke icon
    description:
      "A stroke happens when blood flow to a part of the brain is interrupted. Immediate action is required.",
    steps: [
      "Call emergency services immediately.",
      "Note the time symptoms began to help doctors with treatment.",
      "Keep the person lying on their back with their head elevated.",
      "Do not give the person anything to eat or drink.",
    ]
  },
  {
    id: 4,
    title: "Burns",
    disease: "Burns",
    image: burnImage, // Example burn icon
    description:
      "Burns can result from heat, chemicals, or electricity. Immediate care can prevent further injury.",
    steps: [
      "Cool the burn under running cold water for at least 10 minutes.",
      "Cover the burn with a clean, non-stick bandage.",
      "Avoid applying ointments or ice directly to the burn.",
      "Seek medical attention if the burn is severe or covers a large area.",
    ]
  }
];

const FirstAidPage = () => {
  const { t } = useTranslation(); // Destructure t from useTranslation
  const [filter, setFilter] = useState("");

  // Filter instructions based on disease
  const filteredInstructions = firstAidInstructions.filter(
    (instruction) =>
      instruction.disease.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div
      style={{
        fontFamily: 'Roboto, sans-serif',
        minHeight: '100vh',
        backgroundImage: 'url("https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjg3MC10YW5nLTMxXzEuanBn.jpg")', // Background image URL
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#fff',
        padding: '0',
        backgroundAttachment: 'fixed',
      }}
    >
      <PatientNavbar/>
      {/* Header */}
      <header
        style={{
          padding: '50px 20px',
          textAlign: 'center',
          backgroundColor: 'rgba(0, 123, 255, 0.7)',
          borderBottom: '5px solid #fff',
        }}
      >
        <h1 style={{ fontSize: '3.5em', marginBottom: '20px', color: '#fff', fontWeight: 'bold' }}>
          {t("First Aid Instructions")}
        </h1>
        <p style={{ fontSize: '1.5em', fontWeight: 'lighter', color: '#fff' }}>
          {t("Learn essential first aid techniques for emergency situations")}
        </p>
      </header>

      {/* Filter Section */}
      <div
        style={{
          padding: '20px',
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
      >
        <input
          type="text"
          placeholder={t("Search by disease (e.g., Snake Bite)")}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{
            padding: '12px 20px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            width: '300px',
            backgroundColor: '#fff',
            color: '#333',
            fontSize: '1.1em',
          }}
        />
      </div>

      {/* First Aid Instructions List */}
      <div
        style={{
          padding: '40px 20px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '30px',
        }}
      >
        {filteredInstructions.length > 0 ? (
          filteredInstructions.map((instruction) => (
            <div
              key={instruction.id}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                padding: '30px',
                borderRadius: '12px',
                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
                transition: 'transform 0.3s ease',
                cursor: 'pointer',
                marginBottom: '20px',
                maxWidth: '100%',
                textAlign: 'center',
                overflow: 'hidden',
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <img
                  src={instruction.image}
                  alt={instruction.title}
                  style={{
                    width: '60px',
                    height: '60px',
                    marginRight: '15px',
                    objectFit: 'contain',
                  }}
                />
                <h2 style={{ color: '#007bff', fontSize: '2.2em', marginBottom: '10px' }}>
                  {instruction.title}
                </h2>
              </div>
              <p style={{ fontSize: '1.1em', marginBottom: '20px', color: '#333' }}>
                {instruction.description}
              </p>
              <ul style={{ paddingLeft: '20px', fontSize: '1.1em', listStyleType: 'circle', color: '#333' }}>
                {instruction.steps.map((step, idx) => (
                  <li key={idx} style={{ marginBottom: '12px' }}>
                    {step}
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p style={{ fontSize: '1.5em', color: '#f44336', textAlign: 'center' }}>
            {t("No instructions found for this disease. Try a different search.")}
          </p>
        )}
      </div>

      {/* Downloadable First Aid PDF */}
      <div
        style={{
          padding: '40px 20px',
          textAlign: 'center',
          backgroundColor: '#28a745',
          color: 'white',
          marginTop: '40px',
          borderRadius: '10px',
        }}
      >
        <h2 style={{ fontSize: '2.5em' }}>{t("Download First Aid Manual")}</h2>
        <p style={{ fontSize: '1.2em', marginBottom: '20px' }}>
          {t("Click the link below to download a comprehensive first aid guide.")}
        </p>
        <a
          href="/files/first-aid-manual.pdf"
          download
          style={{
            padding: '15px 30px',
            backgroundColor: '#ffffff',
            color: '#28a745',
            textDecoration: 'none',
            borderRadius: '8px',
            fontSize: '1.3em',
            fontWeight: 'bold',
            transition: 'background-color 0.3s ease, color 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#218838';
            e.currentTarget.style.color = '#fff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#ffffff';
            e.currentTarget.style.color = '#28a745';
          }}
        >
          {t("Download Manual")}
        </a>
      </div>
    </div>
  );
};

export default FirstAidPage;
