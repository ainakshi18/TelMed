import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import DoctorNavbar from '../NavBar/DoctorNavbar';

// SuccessStory Component
const SuccessStory = () => {
  const { t } = useTranslation(); // Translation hook
  const [currentIndex, setCurrentIndex] = useState(0);
  const successImages = [
    {
      src: "https://media.istockphoto.com/id/1183364427/photo/disabled-senior-man-in-a-wheelchair-with-laptop-and-headphones.jpg?s=612x612&w=0&k=20&c=K4zXVln-BjVATFp1yuyPBwSFcMyM1IvlVS6yytFMMtw=",
      caption: t("Reaching Elderly Patients with Limited Mobility"),
      content: t("Telemedicine allows elderly patients with mobility limitations to consult doctors from the comfort of their homes, making healthcare more accessible and convenient for them.")
    },
    {
      src: "https://th.bing.com/th/id/OIP.xCzig3zg_FJJqjOH_Fs-EgHaEK?w=292&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
      caption: t("Access to Doctors Anytime, Anywhere"),
      content: t("Telemedicine has broken down geographical barriers, enabling patients in remote areas to receive medical consultations anytime, without the need for travel.")
    },
    // Add other images similarly...
  ];

  // Next Image Function
  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % successImages.length);
  };

  // Previous Image Function
  const prevImage = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + successImages.length) % successImages.length
    );
  };

  // Automatic Slide Show (every 5 seconds)
  useEffect(() => {
    const interval = setInterval(nextImage, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-r from-blue-100 to-green-100 p-8 rounded-lg shadow-lg mt-12">
      <h2 className="text-center text-3xl font-semibold text-gray-800 mb-8">
        {t("Wellness Wonders: Where Hope Meets Health")}
      </h2>

      <div className="flex flex-col items-center mb-4">
        <div className="relative w-full max-w-4xl mb-4">
          <img
            src={successImages[currentIndex].src}
            alt={successImages[currentIndex].caption}
            className="w-full h-96 object-cover rounded-lg shadow-md"
          />
          <div className="absolute top-1/2 left-2 transform -translate-y-1/2 text-white text-xl cursor-pointer" onClick={prevImage}>
            &#10094;
          </div>
          <div className="absolute top-1/2 right-2 transform -translate-y-1/2 text-white text-xl cursor-pointer" onClick={nextImage}>
            &#10095;
          </div>
        </div>

        <div className="text-center max-w-xl px-4">
          <h3 className="font-semibold text-xl mb-2 text-gray-800">{successImages[currentIndex].caption}</h3>
          <p className="text-lg text-gray-700">{successImages[currentIndex].content}</p>
        </div>
      </div>
    </div>
  );
};

// Story of the Day Component
const StoryOfTheDay = () => {
  const { t } = useTranslation(); // Translation hook

  return (
    <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-8 rounded-lg shadow-lg mt-12">
      <h2 className="text-center text-3xl font-semibold text-gray-800 mb-8">
        {t("Story of the Day: A Glimpse of Hope")}
      </h2>
      <div className="flex flex-col items-center mb-4">
        <div className="text-center max-w-xl px-4">
          <h3 className="font-semibold text-xl mb-2 text-gray-800">{t("Telemedicine Saves a Life")}</h3>
          <p className="text-lg text-gray-700">
            {t("A young woman in a rural area was able to receive life-saving treatment through telemedicine services after an emergency situation arose. The doctor, using telemedicine tools, diagnosed her condition and quickly advised her to get immediate treatment, ultimately saving her life. This story highlights the power of accessible healthcare.")}
          </p>
        </div>
      </div>
    </div>
  );
};

const DoctorHome = () => {
  const { t } = useTranslation(); // Translation hook

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-800 to-blue-500 text-white">
      <DoctorNavbar />

      <main className="max-w-6xl mx-auto p-8 flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2 text-center lg:text-left mb-4 lg:mb-0">
          <h1 className="text-4xl font-bold mb-6">
            ✨ <span className="bg-gradient-to-r from-teal-300 to-purple-400 text-transparent bg-clip-text">
              {t("You don’t just see patients—you see possibilities.")}
            </span> ✨
          </h1>
          <p className="text-lg font-light mt-4 leading-relaxed">
            {t("Your dedication turns challenges into triumphs, and your care creates brighter futures. Each moment spent with a patient reflects your incredible commitment to healing and hope.")}
          </p>
        </div>

        <div className="lg:w-1/2 flex justify-center">
          <div className="relative">
            <img
              src="https://images.ctfassets.net/4mpdf15r5lc4/6sbpwej7TDvaCVbuOVCaiE/a0abb620c7a8d5480366a09401a89b85/Hospital_doctor.webp"
              alt="Doctor"
              className="w-full h-auto "
            />
          </div>
        </div>
      </main>

      <SuccessStory />
      <StoryOfTheDay />

      <footer className="bg-blue-900 text-white py-4 mt-12">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <p className="text-sm">
            &copy; 2025 Wellness Health Solutions. {t("All Rights Reserved.")}
          </p>
          <div className="flex space-x-4">
            <a href="#home" className="hover:text-teal-300">{t("Home")}</a>
            <a href="#about" className="hover:text-teal-300">{t("About")}</a>
            <a href="#contact" className="hover:text-teal-300">{t("Contact")}</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DoctorHome;
