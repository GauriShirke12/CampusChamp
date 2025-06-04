import React from 'react';

const AboutUs = () => {
  return (
    <div className="about-us">
      {/* Hero Section */}
      <section style={{ padding: '4rem 2rem', backgroundColor: '#f0f4ff', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#1e2a78' }}>About CampusChamp</h1>
        <p style={{ fontSize: '1.2rem', maxWidth: '700px', margin: '1rem auto', color: '#444' }}>
          CampusChamp is a smart platform to manage, participate in, and track campus events, competitions, and more. 
          Built for students and organizers to connect, compete, and celebrate talent.
        </p>
      </section>

      {/* Mission & Vision */}
      <section style={{ padding: '3rem 2rem', backgroundColor: '#ffffff' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ color: '#1e2a78' }}>Our Vision</h2>
          <p style={{ fontSize: '1.1rem', color: '#444', marginTop: '1rem' }}>
            To become the leading digital platform for fostering student talent and innovation through seamless event experiences.
          </p>

          <h2 style={{ color: '#1e2a78', marginTop: '3rem' }}>Our Mission</h2>
          <p style={{ fontSize: '1.1rem', color: '#444', marginTop: '1rem' }}>
            To simplify campus event management and empower every student with opportunities to learn, grow, and get recognized.
          </p>
        </div>
      </section>

      {/* Core Values Section */}
      <section style={{ padding: '3rem 2rem', backgroundColor: '#f8f9fc' }}>
        <h2 style={{ color: '#1e2a78', textAlign: 'center' }}>What We Stand For</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
          <div style={{ padding: '1.5rem', borderRadius: '8px', backgroundColor: '#e3ecff' }}>
            <h3>Empowerment</h3>
            <p>Giving students the tools and recognition they deserve.</p>
          </div>
          <div style={{ padding: '1.5rem', borderRadius: '8px', backgroundColor: '#e3ecff' }}>
            <h3>Collaboration</h3>
            <p>Bringing colleges, students, and organizers on one platform.</p>
          </div>
          <div style={{ padding: '1.5rem', borderRadius: '8px', backgroundColor: '#e3ecff' }}>
            <h3>Transparency</h3>
            <p>Public leaderboards, fair rankings, and clear feedback mechanisms.</p>
          </div>
          <div style={{ padding: '1.5rem', borderRadius: '8px', backgroundColor: '#e3ecff' }}>
            <h3>Innovation</h3>
            <p>Tech-driven event solutions for the future of campus engagement.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
