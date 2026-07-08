"use client";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function ContactPage() {
  return (
    <div className="portfolio-container">
      <Header />

      <main className="subpage-main">
        <section className="contact-intro">
          <span className="contact-badge">Consultations</span>
          <h1>Clinical Coordinates</h1>
          <p>Please coordinate your clinical referrals, surgical follow-ups, or second opinions directly at Dr. Devesh S. Ballal's clinical desk at Manipal Hospital, Bangalore.</p>
        </section>

        <section className="contact-content-grid">
          {/* Timing details */}
          <div className="contact-details-panel glass-panel">
            <h3>Manipal Hospital Old Airport Road</h3>
            <p className="address-lbl">📍 98, HAL Old Airport Rd, Kodihalli, Bangalore, Karnataka - 560017</p>
            
            <div className="divider"></div>

            <h4>Clinic Coordinates & Timing</h4>
            <div className="timing-row">
              <span className="day-lbl">Monday - Friday</span>
              <span className="time-lbl">09:00 AM - 04:00 PM</span>
            </div>
            <div className="timing-row">
              <span className="day-lbl">Saturday</span>
              <span className="time-lbl">09:00 AM - 01:00 PM</span>
            </div>
            <div className="timing-row">
              <span className="day-lbl">Sunday</span>
              <span className="time-lbl closed">Closed</span>
            </div>
          </div>

          {/* Call support */}
          <div className="contact-support-panel glass-panel">
            <h3>Clinical Support Desk</h3>
            <p className="desc-p">Contact the hospital coordinators to schedule or reschedule consultations, evaluate surgical parameters, or transfer case notes.</p>
            
            <div className="divider"></div>

            <h4>Emergency & Appointment Booking</h4>
            <p className="call-info">☎️ Hospital Appointment Desk: 080-22221111 / 1800 102 5555</p>
            <p className="call-info">📧 Primary Email: contact@oncomatters.com</p>

            <div className="referral-note">
              <p><strong>Note for Referrals:</strong> If you are a referring physician, please send high-resolution radiology scans and pathology reports ahead of the patient's slot to coordinate staging assessments.</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <style jsx>{`
        .subpage-main {
          padding: 8rem 5% 4rem 5%;
          max-width: 1200px;
          margin: 0 auto;
        }

        .contact-intro {
          text-align: center;
          margin-bottom: 4rem;
        }

        .contact-badge {
          padding: 0.35rem 0.8rem;
          background: rgba(0, 242, 254, 0.08);
          border: 1px solid rgba(0, 242, 254, 0.2);
          border-radius: 20px;
          color: var(--primary);
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 1rem;
          display: inline-block;
        }

        .contact-intro h1 {
          font-family: var(--font-accent);
          font-size: 2.75rem;
          font-weight: 800;
          margin-bottom: 1rem;
          background: linear-gradient(135deg, white, var(--text-secondary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .contact-intro p {
          color: var(--text-secondary);
          font-size: 1.05rem;
          max-width: 650px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .contact-content-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
        }

        .contact-details-panel, .contact-support-panel {
          padding: 3.5rem;
        }

        .contact-details-panel h3, .contact-support-panel h3 {
          font-family: var(--font-accent);
          font-size: 1.4rem;
          margin-bottom: 0.5rem;
          color: white;
        }

        .address-lbl {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .desc-p {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .divider {
          height: 1px;
          background: var(--border-color);
          margin: 2rem 0;
        }

        .contact-details-panel h4, .contact-support-panel h4 {
          font-family: var(--font-accent);
          font-size: 1.1rem;
          margin-bottom: 1.25rem;
          color: var(--primary);
        }

        .timing-row {
          display: flex;
          justify-content: space-between;
          padding: 0.75rem 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.03);
          font-size: 0.9rem;
        }

        .day-lbl {
          color: var(--text-secondary);
          font-weight: 600;
        }

        .time-lbl {
          color: white;
          font-weight: 700;
        }

        .time-lbl.closed {
          color: #ef4444;
        }

        .call-info {
          font-size: 0.9rem;
          color: var(--text-secondary);
          margin-bottom: 0.75rem;
        }

        .referral-note {
          margin-top: 2rem;
          background: rgba(0, 242, 254, 0.02);
          border-left: 2px solid var(--primary);
          padding: 1.25rem;
          border-radius: 4px;
        }

        .referral-note p {
          font-size: 0.8rem;
          line-height: 1.5;
          color: var(--text-muted);
        }

        @media (max-width: 900px) {
          .contact-content-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
