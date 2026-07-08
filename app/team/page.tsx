"use client";

import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const DEFAULT_TEAM = [
  {
    id: "team-1",
    name: "Dr. Ananya Sharma",
    role: "Senior Consultant",
    specialty: "Medical Oncology & Immunotherapy",
    image: ""
  },
  {
    id: "team-2",
    name: "Dr. Rajesh Iyer",
    role: "Consultant",
    specialty: "Radiation Oncology & CyberKnife",
    image: ""
  },
  {
    id: "team-3",
    name: "Dr. Sneha Patil",
    role: "Coordinator",
    specialty: "Clinical Nurse Specialist & Care Coordinator",
    image: ""
  }
];

export default function TeamPage() {
  const [team, setTeam] = useState(DEFAULT_TEAM);

  useEffect(() => {
    const isLocalNodeDev = typeof window !== "undefined" && window.location.hostname === "localhost" && window.location.port === "3000";
    if (isLocalNodeDev) {
      return;
    }

    fetch("../api.php?action=get_data")
      .then((res) => res.json())
      .then((resData) => {
        if (resData.status === "success" && resData.data && resData.data.team) {
          setTeam(resData.data.team);
        }
      })
      .catch((err) => {
        console.warn("Using fallback local data on Team page", err);
      });
  }, []);

  return (
    <div className="portfolio-container">
      <Header />

      <main className="subpage-main">
        <section className="team-intro">
          <span className="team-badge">Surgical support</span>
          <h1>The Core Oncology Team</h1>
          <p>We work in unison with multidisciplinary tumor boards to coordinate personalized care, ensuring safe surgeries and optimized postoperative timelines.</p>
        </section>

        <section className="team-grid-section">
          <div className="team-grid">
            {team.map((member) => (
              <div key={member.id} className="team-card-expanded glass-panel">
                <div className="avatar-section">
                  {member.image ? (
                    <img src={member.image} alt={member.name} className="avatar-img" />
                  ) : (
                    <div className="avatar-fallback">
                      <span>{member.name.split(" ").map(n => n[0]).join("")}</span>
                    </div>
                  )}
                </div>
                
                <div className="info-section">
                  <span className="role-lbl">{member.role}</span>
                  <h3>{member.name}</h3>
                  <p className="spec-lbl">{member.specialty}</p>
                  
                  <div className="divider"></div>
                  
                  <p className="description-p">
                    Dedicated coordinator assisting with patient evaluation, pre-operative screening, and custom treatment planning across the oncology department at Manipal Hospital.
                  </p>
                </div>
              </div>
            ))}
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

        .team-intro {
          text-align: center;
          margin-bottom: 4rem;
        }

        .team-badge {
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

        .team-intro h1 {
          font-family: var(--font-accent);
          font-size: 2.75rem;
          font-weight: 800;
          margin-bottom: 1rem;
          background: linear-gradient(135deg, white, var(--text-secondary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .team-intro p {
          color: var(--text-secondary);
          font-size: 1.05rem;
          max-width: 650px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 2.5rem;
        }

        .team-card-expanded {
          padding: 2.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .avatar-section {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.03);
          border: 2px solid var(--border-color);
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 1.5rem;
          transition: var(--transition-smooth);
        }

        .team-card-expanded:hover .avatar-section {
          border-color: var(--primary);
          box-shadow: 0 0 15px var(--border-glow);
          transform: scale(1.05);
        }

        .avatar-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .avatar-fallback {
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--primary);
        }

        .role-lbl {
          display: inline-block;
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--primary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.5rem;
        }

        .info-section h3 {
          font-family: var(--font-accent);
          font-size: 1.25rem;
          font-weight: 700;
          color: white;
          margin-bottom: 0.25rem;
        }

        .spec-lbl {
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .divider {
          width: 40px;
          height: 1px;
          background: var(--border-color);
          margin: 1.25rem auto;
        }

        .description-p {
          font-size: 0.85rem;
          color: var(--text-muted);
          line-height: 1.5;
        }

        @media (max-width: 768px) {
          .team-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
