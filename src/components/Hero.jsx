import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero__inner">
        <div className="hero__content animate-in">
          <div className="hero__eyebrow">NEW IN STORE</div>
          <h1 className="hero__title">Gadgets worth<br />the upgrade.</h1>
          <p className="hero__text">Mobiles, audio and accessories from a shop you can walk into. Now online.</p>
          <div className="hero__actions">
            <a href="#categories" className="btn btn--primary">Shop by category</a>
            <Link to="/search" className="btn btn--secondary">Browse all</Link>
          </div>
        </div>
        <div className="hero__image-wrapper animate-in" style={{ animationDelay: '0.1s' }}>
          <div className="hero__image-container">
            <img src="/hero-image.jpg" alt="Premium Tech Gadgets" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }} />
          </div>
        </div>
      </div>
    </section>
  );
}
