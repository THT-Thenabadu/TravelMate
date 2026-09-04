import './LandingPage.css';

function LandingPage({ onGetStarted }) {
  return (
    <div className="landing">
      <header className="landing-nav">
        <span className="logo">TravelMate<span className="logo-dot">.</span></span>
        <button className="nav-cta" onClick={onGetStarted}>Plan my trip</button>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <h1>
            Your Sri Lanka trip,
            <br />
            planned around you.
          </h1>
          <p className="hero-sub">
            Tell us your days, your budget, and what you're into.
            We'll lay out a route, the costs, and how to get between stops —
            built for solo travelers, not tour groups.
          </p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={onGetStarted}>
              Start planning
            </button>
            <a className="btn-text" href="#how-it-works">See how it works</a>
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <svg viewBox="0 0 280 340" className="route-svg">
            <path
              d="M60 30 Q40 90 90 120 T110 210 Q130 260 90 300"
              fill="none"
              stroke="#141414"
              strokeWidth="2"
              strokeDasharray="1 10"
              strokeLinecap="round"
            />
            <circle cx="60" cy="30" r="6" fill="#FF5E1A" />
            <circle cx="90" cy="120" r="6" fill="#141414" />
            <circle cx="110" cy="210" r="6" fill="#141414" />
            <circle cx="90" cy="300" r="6" fill="#FF5E1A" />
            <text x="72" y="24" className="route-label">Colombo</text>
            <text x="102" y="114" className="route-label">Kandy</text>
            <text x="122" y="204" className="route-label">Ella</text>
            <text x="20" y="298" className="route-label">Mirissa</text>
          </svg>
        </div>
      </section>

      <section className="manifesto" id="how-it-works">
        <div className="manifesto-item">
          <h3>Built around your budget</h3>
          <p>Set a number. Every stop and every day respects it — no surprises.</p>
        </div>
        <div className="manifesto-item">
          <h3>Routed, not just listed</h3>
          <p>An order that makes sense on a map, with realistic travel times between stops.</p>
        </div>
        <div className="manifesto-item">
          <h3>Made for traveling solo</h3>
          <p>Safety notes and local context baked into every itinerary, not bolted on after.</p>
        </div>
      </section>

      <section className="steps">
        <h2>Three things, one plan.</h2>
        <div className="steps-row">
          <div className="step">
            <span className="step-mark">Days &amp; budget</span>
            <p>How long you're here, and what you want to spend.</p>
          </div>
          <div className="step">
            <span className="step-mark">What you like</span>
            <p>Nature, culture, food, adventure — pick what fits.</p>
          </div>
          <div className="step">
            <span className="step-mark">Your itinerary</span>
            <p>A day-by-day plan with routes, costs, and safety notes.</p>
          </div>
        </div>
      </section>

      <footer className="landing-footer">
        <span>TravelMate Sri Lanka — built for SE3090 Mini Hackathon</span>
      </footer>
    </div>
  );
}

export default LandingPage;