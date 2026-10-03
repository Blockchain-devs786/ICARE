import React from 'react';

export default function TrustBenefits() {
  return (
    <section className="trust">
      <div className="container">
        <div className="trust__grid">
          <div className="trust__item">
            <div className="trust__icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2v20" />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </div>
            <div className="trust__title">Cash on delivery</div>
          </div>
          <div className="trust__item">
            <div className="trust__icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 18H3c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v11" />
                <path d="M14 9h4l4 4v4c0 .6-.4 1-1 1h-2" />
                <circle cx="7" cy="18" r="2" />
                <circle cx="17" cy="18" r="2" />
              </svg>
            </div>
            <div className="trust__title">Delivery across<br />Pakistan</div>
          </div>
          <div className="trust__item">
            <div className="trust__icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </div>
            <div className="trust__title">[X]-month<br />warranty</div>
          </div>
        </div>
      </div>
    </section>
  );
}
