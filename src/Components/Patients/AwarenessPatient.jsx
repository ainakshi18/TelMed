import React from "react";
import PatientNavbar from "../NavBar/PatientNavbar";
import "./AwarenessPatient.css";
import ReactPlayer from "react-player";

const AwarenessPatient = () => {
  return (
    <div className="awareness-page">
      <PatientNavbar />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Your Health, Our Priority</h1>
          <p>Explore tips, campaigns, and resources to stay healthy and informed.</p>
          <a href="#health-posts" className="btn-primary">
            Learn More
          </a>
        </div>
        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1600508776759-dcdff6d336f6?w=800&q=80"
            alt="Health Awareness"
          />
        </div>
      </section>

      {/* Horizontal Scrolling Posts */}
      <section id="health-posts" className="scrolling-posts">
        <h2 className="section-title">Health Awareness Posts</h2>
        <div className="posts-container">
          <article className="post">
            <img
              src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8SGVhbHRoJTIwQXdhcmVuZXNzfGVufDB8fDB8fHww"
              alt="Health Awareness"
              loading="lazy"
            />
            <h3>Health Awareness</h3>
       
            <p>
              Stay informed and updated with tips to improve your health.
            </p>
            <blockquote>
              "Health is not just about what you're eating. It's also about what you're thinking and saying."
              — Unknown
            </blockquote>
            <a href="#" className="btn-secondary">
              Read More
            </a>
          </article>

          <article className="post">
            <img
              src="https://th.bing.com/th/id/OIP.md9TlIS1v7NYPprSHXJu2QHaE8?w=263&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
              alt="Boost Your Immunity"
              loading="lazy"
            />
            <h3>Boost Your Immunity</h3>
            <p>Learn how to enhance your body's natural defenses.</p>
            <blockquote>
              "The greatest wealth is health." — Virgil
            </blockquote>
            <a href="#" className="btn-secondary">
              Read More
            </a>
          </article>

          <article className="post">
            <img
              src="https://th.bing.com/th/id/OIP.O-fdHJwE2mQF-yY8KdnvlAHaFj?w=237&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
              alt="Managing Stress"
              loading="lazy"
            />
            <h3>Managing Stress</h3>
            <p>Discover effective techniques to handle stress and anxiety.</p>
            <blockquote>
              "It's not stress that kills us, it is our reaction to it." — Hans Selye
            </blockquote>
            <a href="#" className="btn-secondary">
              Read More
            </a>
          </article>

          <article className="post">
            <img
              src="https://images.pexels.com/photos/7991909/pexels-photo-7991909.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Healthy Eating Habits"
              loading="lazy"
            />
            <h3>Healthy Eating Habits</h3>
            <p>Adopt a balanced diet for a healthier life.</p>
            <blockquote>
              "Let food be thy medicine and medicine be thy food." — Hippocrates
            </blockquote>
            <a href="#" className="btn-secondary">
              Read More
            </a>
          </article>

          <article className="post">
            <img
              src="https://th.bing.com/th/id/OIP.zoUenNGHABS-MvmA49MyFQAAAA?w=199&h=199&c=7&r=0&o=5&dpr=1.3&pid=1.7"
              alt="The Importance of Hydration"
              loading="lazy"
            />
            <h3>The Importance of Hydration</h3>
            <p>Stay hydrated for better health and energy.</p>
            <blockquote>
              "Water is the driving force of all nature." — Leonardo da Vinci
            </blockquote>
            <a href="#" className="btn-secondary">
              Read More
            </a>
          </article>

          <article className="post">
            <img
              src="https://th.bing.com/th/id/OIP.REaMVQjJW-BySiDxiW00uwHaE8?w=286&h=191&c=7&r=0&o=5&dpr=1.3&pid=1.7"
              alt="Exercise for Mental Health"
              loading="lazy"
            />
            <h3>Exercise for Mental Health</h3>
            <p>Exercise isn't just for the body—it's for your mind, too.</p>
            <blockquote>
              "Exercise is a celebration of what your body can do, not a punishment for what you ate."
            </blockquote>
            <a href="#" className="btn-secondary">
              Read More
            </a>
          </article>

          <article className="post">
            <img
              src="https://th.bing.com/th/id/OIP.QzvaPqigJYgT1TMFvRag2QHaHa?w=150&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
              alt="Sleep Well, Live Well"
              loading="lazy"
            />
            <h3>Sleep Well, Live Well</h3>
            <p>Quality sleep is essential for your overall health.</p>
            <blockquote>
              "Sleep is the best meditation." — Dalai Lama
            </blockquote>
            <a href="#" className="btn-secondary">
              Read More
            </a>
          </article>

          <article className="post">
            <img
              src="https://th.bing.com/th/id/OIP.BhYRzNQeeAIbj6eEkw2WAAHaEi?w=294&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
              alt="Signs of Vitamin Deficiency"
              loading="lazy"
            />
            <h3>Signs of Vitamin Deficiency</h3>
            <p>Learn how to identify and prevent vitamin deficiencies.</p>
            <blockquote>
              "A vitamin a day keeps the deficiencies away."
            </blockquote>
            <a href="#" className="btn-secondary">
              Read More
            </a>
          </article>

          <article className="post">
            <img
              src="https://th.bing.com/th/id/OIP.etcUC1RhhDA0QcgXFcE1HwHaFp?w=189&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
              alt="The Power of Meditation"
              loading="lazy"
            />
            <h3>The Power of Meditation</h3>
            <p>Unlock the benefits of meditation for your mind and body.</p>
            <blockquote>
              "Meditation is the soul's perspective glass." — Owen Feltham
            </blockquote>
            <a href="#" className="btn-secondary">
              Read More
            </a>
          </article>
        </div>
      </section>

      {/* Video Section with Empty Image Placeholders */}
      <section id="health-videos" className="mt-16 px-4 py-8">
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-8">Health Awareness Videos</h2>
      <div className="flex justify-between gap-6">
        {/* Video 1 */}
        <div className="w-full sm:w-1/3">
          <div className="relative pt-[56.25%]"> {/* 16:9 Aspect Ratio */}
            <ReactPlayer
              url="https://youtu.be/cLRztK1zE6s?si=2-xyXVjq5Fv6eT3W"
              className="react-player absolute top-0 left-0 rounded-lg overflow-hidden"
              width="100%"
              height="100%"
              playing={false}  // Disable autoplay
              controls={true}  // Display play/pause and other controls
            />
          </div>
          <p className="text-center mt-2 text-lg text-gray-700">Video 1</p>
        </div>

        {/* Video 2 */}
        <div className="w-full sm:w-1/3">
          <div className="relative pt-[56.25%]"> {/* 16:9 Aspect Ratio */}
            <ReactPlayer
              url="https://youtu.be/tX8TgVR33KM?si=kld7p95JPMlURrKR"
              className="react-player absolute top-0 left-0 rounded-lg overflow-hidden"
              width="100%"
              height="100%"
              playing={false}  // Disable autoplay
              controls={true}  // Display play/pause and other controls
            />
          </div>
          <p className="text-center mt-2 text-lg text-gray-700">Video 2</p>
        </div>

        {/* Video 3 */}
        <div className="w-full sm:w-1/3">
          <div className="relative pt-[56.25%]"> {/* 16:9 Aspect Ratio */}
            <ReactPlayer
              url="https://youtu.be/DxIDKZHW3-E?si=gSV8ndIhClSulkPD"
              className="react-player absolute top-0 left-0 rounded-lg overflow-hidden"
              width="100%"
              height="100%"
              playing={false}  // Disable autoplay
              controls={true}  // Display play/pause and other controls
            />
          </div>
          <p className="text-center mt-2 text-lg text-gray-700">Video 3</p>
        </div>
      </div>
    </section>
      {/* Campaign Section */}
      <section id="upcoming-campaigns" className="campaign-section">
  <h2 className="section-title">Upcoming Health Campaigns</h2>
  <div className="campaign-container">
    <figure className="campaign">
      <img
        src="https://th.bing.com/th/id/OIP.SbKk40zHf3qLGTE2tPnKzgHaFj?w=217&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
        alt="Health Campaign 1"
        loading="lazy"
      />
      <figcaption className="campaign-details">
        <h3>Health for All Campaign</h3>
        <p className="campaign-date">Date: January 15, 2025</p>
        <p className="campaign-location">Location: Community Hall</p>
        <p>Join us for an inclusive health campaign focused on making healthcare accessible to all. We will provide free consultations, distribute health resources, and offer wellness tips to the community.</p>
        <a href="#health-campaigns" className="btn-primary">Join the Campaign</a>
      </figcaption>
    </figure>

    <figure className="campaign">
      <img
        src="https://th.bing.com/th/id/OIP.X-egIsTGIvPfSpmwkzGFXQHaJl?w=137&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
        alt="Immunity Boosters Event"
        loading="lazy"
      />
      <figcaption className="campaign-details">
        <h3>Immunity Boosters Event</h3>
        <p className="campaign-date">Date: January 20, 2025</p>
        <p className="campaign-location">Location: Local Park</p>
        <p>This event focuses on educating the public on ways to naturally boost immunity. It will include free supplements, workshops on diet, and physical activities to keep your immune system strong.</p>
        <a href="#immunity-boosters" className="btn-primary">Join the Event</a>
      </figcaption>
    </figure>

    <figure className="campaign">
      <img
        src="https://th.bing.com/th/id/OIP.pd5Igv-r5DXZQ_xQ6DQWowHaDX?w=350&h=159&c=7&r=0&o=5&dpr=1.3&pid=1.7"
        alt="Stress-Free Living Workshop"
        loading="lazy"
      />
      <figcaption className="campaign-details">
        <h3>Stress-Free Living Workshop</h3>
        <p className="campaign-date">Date: January 25, 2025</p>
        <p className="campaign-location">Location: Health Center</p>
        <p>This workshop will teach practical techniques for managing stress, such as mindfulness, meditation, and breathing exercises. Join us to reduce stress and live a more peaceful life.</p>
        <a href="#stress-free-workshop" className="btn-primary">Join the Workshop</a>
      </figcaption>
    </figure>
  </div>
</section>


    </div>
  );
};

export default AwarenessPatient;