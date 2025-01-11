import React, { useTransition } from "react";
import PatientNavbar from "../NavBar/PatientNavbar";
import "./AwarenessPatient.css";
import ReactPlayer from "react-player";
import { useTranslation } from "react-i18next";

const AwarenessPatient = () => {
  const {t} = useTranslation();
  return (
    <div className="awareness-page">
    <PatientNavbar />

    {/* Hero Section */}
    <section className="hero-section">
      <div className="hero-content">
        <h1>{t("Your Health, Our Priority")}</h1>
        <p>{t("Explore tips, campaigns, and resources to stay healthy and informed.")}</p>
        <a href="#health-posts" className="btn-primary">
          {t("Learn More")}
        </a>
      </div>
      <div className="hero-image">
        <img
          src="https://images.unsplash.com/photo-1600508776759-dcdff6d336f6?w=800&q=80"
          alt={t("Health Awareness")}
        />
      </div>
    </section>

    {/* Horizontal Scrolling Posts */}
    <section id="health-posts" className="scrolling-posts">
      <h2 className="section-title">{t("Health Awareness Posts")}</h2>
      <div className="posts-container">
        <article className="post">
          <img
            src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8SGVhbHRoJTIwQXdhcmVuZXNzfGVufDB8fDB8fHww"
            alt={t("Health Awareness")}
            loading="lazy"
          />
          <h3>{t("Health Awareness")}</h3>
          <p>{t("Stay informed and updated with tips to improve your health.")}</p>
          <blockquote>
            {t('"Health is not just about what you\'re eating. It\'s also about what you\'re thinking and saying."')}
            {" — Unknown"}
          </blockquote>
          <a href="#" className="btn-secondary">
            {t("Read More")}
          </a>
        </article>

        <article className="post">
          <img
            src="https://th.bing.com/th/id/OIP.md9TlIS1v7NYPprSHXJu2QHaE8?w=263&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
            alt={t("Boost Your Immunity")}
            loading="lazy"
          />
          <h3>{t("Boost Your Immunity")}</h3>
          <p>{t("Learn how to enhance your body's natural defenses.")}</p>
          <blockquote>
            {t('"The greatest wealth is health." — Virgil')}
          </blockquote>
          <a href="#" className="btn-secondary">
            {t("Read More")}
          </a>
        </article>

        <article className="post">
          <img
            src="https://th.bing.com/th/id/OIP.O-fdHJwE2mQF-yY8KdnvlAHaFj?w=237&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
            alt={t("Managing Stress")}
            loading="lazy"
          />
          <h3>{t("Managing Stress")}</h3>
          <p>{t("Discover effective techniques to handle stress and anxiety.")}</p>
          <blockquote>
            {t('"It\'s not stress that kills us, it is our reaction to it."')}
            {" — Hans Selye"}
          </blockquote>
          <a href="#" className="btn-secondary">
            {t("Read More")}
          </a>
        </article>

        <article className="post">
          <img
            src="https://images.pexels.com/photos/7991909/pexels-photo-7991909.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt={t("Healthy Eating Habits")}
            loading="lazy"
          />
          <h3>{t("Healthy Eating Habits")}</h3>
          <p>{t("Adopt a balanced diet for a healthier life.")}</p>
          <blockquote>
            {t('"Let food be thy medicine and medicine be thy food."')}
            {" — Hippocrates"}
          </blockquote>
          <a href="#" className="btn-secondary">
            {t("Read More")}
          </a>
        </article>

        <article className="post">
          <img
            src="https://th.bing.com/th/id/OIP.zoUenNGHABS-MvmA49MyFQAAAA?w=199&h=199&c=7&r=0&o=5&dpr=1.3&pid=1.7"
            alt={t("The Importance of Hydration")}
            loading="lazy"
          />
          <h3>{t("The Importance of Hydration")}</h3>
          <p>{t("Stay hydrated for better health and energy.")}</p>
          <blockquote>
            {t('"Water is the driving force of all nature."')}
            {" — Leonardo da Vinci"}
          </blockquote>
          <a href="#" className="btn-secondary">
            {t("Read More")}
          </a>
        </article>

        <article className="post">
          <img
            src="https://th.bing.com/th/id/OIP.REaMVQjJW-BySiDxiW00uwHaE8?w=286&h=191&c=7&r=0&o=5&dpr=1.3&pid=1.7"
            alt={t("Exercise for Mental Health")}
            loading="lazy"
          />
          <h3>{t("Exercise for Mental Health")}</h3>
          <p>{t("Exercise isn't just for the body—it's for your mind, too.")}</p>
          <blockquote>
            {t('"Exercise is a celebration of what your body can do, not a punishment for what you ate."')}
          </blockquote>
          <a href="#" className="btn-secondary">
            {t("Read More")}
          </a>
        </article>

        <article className="post">
          <img
            src="https://th.bing.com/th/id/OIP.QzvaPqigJYgT1TMFvRag2QHaHa?w=150&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
            alt={t("Sleep Well, Live Well")}
            loading="lazy"
          />
          <h3>{t("Sleep Well, Live Well")}</h3>
          <p>{t("Quality sleep is essential for your overall health.")}</p>
          <blockquote>
            {t('"Sleep is the best meditation."')}
            {" — Dalai Lama"}
          </blockquote>
          <a href="#" className="btn-secondary">
            {t("Read More")}
          </a>
        </article>

        <article className="post">
          <img
            src="https://th.bing.com/th/id/OIP.BhYRzNQeeAIbj6eEkw2WAAHaEi?w=294&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
            alt={t("Signs of Vitamin Deficiency")}
            loading="lazy"
          />
          <h3>{t("Signs of Vitamin Deficiency")}</h3>
          <p>{t("Learn how to identify and prevent vitamin deficiencies.")}</p>
          <blockquote>
            {t('"A vitamin a day keeps the deficiencies away."')}
          </blockquote>
          <a href="#" className="btn-secondary">
            {t("Read More")}
          </a>
        </article>

        <article className="post">
          <img
            src="https://th.bing.com/th/id/OIP.etcUC1RhhDA0QcgXFcE1HwHaFp?w=189&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
            alt={t("The Power of Meditation")}
            loading="lazy"
          />
          <h3>{t("The Power of Meditation")}</h3>
          <p>{t("Unlock the benefits of meditation for your mind and body.")}</p>
          <blockquote>
            {t('"Meditation is the soul\'s perspective glass."')}
            {" — Owen Feltham"}
          </blockquote>
          <a href="#" className="btn-secondary">
            {t("Read More")}
          </a>
        </article>
      </div>
    </section>

    <h2 className="section-title">{t("Health Awareness Videos")}</h2>

    {/* Video Section */}
    <section id="health-videos" className="mt-16 px-4 py-8">
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-8">{t("Health Awareness Videos")}</h2>
      <div className="flex justify-between gap-6">
        {/* Video 1 */}
        <div className="w-full sm:w-1/3">
          <div className="relative pt-[56.25%]">
            <ReactPlayer
              url="https://youtu.be/cLRztK1zE6s?si=2-xyXVjq5Fv6eT3W"
              className="react-player absolute top-0 left-0 rounded-lg overflow-hidden"
              width="100%"
              height="100%"
              playing={false}
              controls={true}
            />
          </div>
          <p className="text-center mt-2 text-lg text-gray-700">{t("Video 1")}</p>
        </div>

        {/* Video 2 */}
        <div className="w-full sm:w-1/3">
          <div className="relative pt-[56.25%]">
            <ReactPlayer
              url="https://youtu.be/tX8TgVR33KM?si=kld7p95JPMlURrKR"
              className="react-player absolute top-0 left-0 rounded-lg overflow-hidden"
              width="100%"
              height="100%"
              playing={false}
              controls={true}
            />
          </div>
          <p className="text-center mt-2 text-lg text-gray-700">{t("Video 2")}</p>
        </div>

        {/* Video 3 */}
        <div className="w-full sm:w-1/3">
          <div className="relative pt-[56.25%]">
            <ReactPlayer
              url="https://youtu.be/DxIDKZHW3-E?si=gSV8ndIhClSulkPD"
              className="react-player absolute top-0 left-0 rounded-lg overflow-hidden"
              width="100%"
              height="100%"
              playing={false}
              controls={true}
            />
          </div>
          <p className="text-center mt-2 text-lg text-gray-700">{t("Video 3")}</p>
        </div>
      </div>
    </section>

{/* Campaign Section */}
<section id="upcoming-campaigns" className="campaign-section">
  <h2 className="section-title">{t("Upcoming Health Campaigns")}</h2>
  <div className="campaign-container">
    <figure className="campaign">
      <img
        src="https://th.bing.com/th/id/OIP.SbKk40zHf3qLGTE2tPnKzgHaFj?w=217&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
        alt={t("Health Campaign 1")}
        loading="lazy"
      />
      <figcaption className="campaign-details">
        <h3>{t("Health for All Campaign")}</h3>
        <p className="campaign-date">{t("Date")}: January 15, 2025</p>
        <p className="campaign-location">{t("Location")}: {t("Community Hall")}</p>
        <p>{t("Join us for an inclusive health campaign focused on making healthcare accessible to all. We will provide free consultations, distribute health resources, and offer wellness tips to the community.")}</p>
        <a href="#health-campaigns" className="btn-primary">{t("Join the Campaign")}</a>
      </figcaption>
    </figure>

    <figure className="campaign">
      <img
        src="https://th.bing.com/th/id/OIP.X-egIsTGIvPfSpmwkzGFXQHaJl?w=137&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
        alt={t("Immunity Boosters Event")}
        loading="lazy"
      />
      <figcaption className="campaign-details">
        <h3>{t("Immunity Boosters Event")}</h3>
        <p className="campaign-date">{t("Date")}: January 20, 2025</p>
        <p className="campaign-location">{t("Location")}: {t("Local Park")}</p>
        <p>{t("This event focuses on educating the public on ways to naturally boost immunity. It will include free supplements, workshops on diet, and physical activities to keep your immune system strong.")}</p>
        <a href="#immunity-boosters" className="btn-primary">{t("Join the Event")}</a>
      </figcaption>
    </figure>

    <figure className="campaign">
      <img
        src="https://th.bing.com/th/id/OIP.pd5Igv-r5DXZQ_xQ6DQWowHaDX?w=350&h=159&c=7&r=0&o=5&dpr=1.3&pid=1.7"
        alt={t("Stress-Free Living Workshop")}
        loading="lazy"
      />
      <figcaption className="campaign-details">
        <h3>{t("Stress-Free Living Workshop")}</h3>
        <p className="campaign-date">{t("Date")}: January 25, 2025</p>
        <p className="campaign-location">{t("Location")}: {t("Health Center")}</p>
        <p>{t("This workshop will teach practical techniques for managing stress, such as mindfulness, meditation, and breathing exercises. Join us to reduce stress and live a more peaceful life.")}</p>
        <a href="#stress-free-workshop" className="btn-primary">{t("Join the Workshop")}</a>
      </figcaption>
    </figure>

    <figure className="campaign">
      <img
        src="https://th.bing.com/th/id/OIP.i89wB5vMfh2cqw3IyxuhpwHaJl?w=186&h=241&c=7&r=0&o=5&dpr=1.3&pid=1.7"
        alt={t("Mental Health Awareness Campaign")}
        loading="lazy"
      />
      <figcaption className="campaign-details">
        <h3>{t("Mental Health Awareness Campaign")}</h3>
        <p className="campaign-date">{t("Date")}: February 1, 2025</p>
        <p className="campaign-location">{t("Location")}: {t("Wellness Center")}</p>
        <p>{t("This campaign aims to raise awareness about mental health, break stigmas, and provide valuable resources. There will be free counseling services, seminars, and discussions on mental well-being.")}</p>
        <a href="#mental-health-awareness" className="btn-primary">{t("Join the Campaign")}</a>
      </figcaption>
    </figure>

    <figure className="campaign">
      <img
        src="https://th.bing.com/th/id/OIP.1Ge14WnG-VrnX0DN5H8ZhgHaE8?w=255&h=183&c=7&r=0&o=5&dpr=1.3&pid=1.7"
        alt={t("Free Health Screening and Vaccination Drive")}
        loading="lazy"
      />
      <figcaption className="campaign-details">
        <h3>{t("Free Health Screening and Vaccination Drive")}</h3>
        <p className="campaign-date">{t("Date")}: February 10, 2025</p>
        <p className="campaign-location">{t("Location")}: {t("City Square")}</p>
        <p>{t("Join us for a day of free health screenings and vaccination services. We aim to promote preventive healthcare and ensure everyone has access to essential health services.")}</p>
        <a href="#health-screening-vaccination" className="btn-primary">{t("Join the Drive")}</a>
      </figcaption>
    </figure>
  </div>
</section>




    </div>
  );
};

export default AwarenessPatient;
