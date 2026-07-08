"use client";

import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

// Exhaustive local fallback data of all clinical details
const DEFAULT_DOCTOR = {
  name: "Dr. Devesh S. Ballal",
  title: "Consultant - Surgical Oncology & Robotic Surgery",
  hospital: "Manipal Hospital Old Airport Road, Bangalore",
  experience: "8+ Years",
  image: "https://www.manipalhospitals.com/oldairportroad/uploads/doctors_photo/dr-devesh-sanjeev-ballal-leading-surgical-oncologist.png",
  bio_paragraphs: [
    "Dr. Devesh S. Ballal is a premier surgical oncologist in Old Airport Road, Bangalore, currently practising as a Consultant - Surgical Oncology and Robotic Surgery at Manipal Hospital Old Airport Road. With over 8 years of comprehensive surgical training, including 4 years dedicated to oncology at India's largest cancer centre (Tata Memorial Hospital, Mumbai), Dr. Devesh Ballal brings a wealth of expertise and a strong commitment to patient care.",
    "His surgical acumen spans a diverse range of specialities, including Colorectal, Urological, Head and Neck, Breast, Thoracic, Hepatopancreatobiliary, Gynaecological, Bone, and Soft Tissue Cancers. He is adept in advanced endoscopic, minimally invasive, and robotic surgeries, consistently applying his critical thinking and organizational skills in high-pressure environments.",
    "Dr. Ballal's journey in medicine began at MS Ramaiah Medical College, where he excelled academically, earning top scores and accolades. He went on to pursue an MS - General Surgery at Kasturba Medical College, where he was awarded the Vivekananda Prabhu Gold Medal. He earned his M.Ch - Surgical Oncology at Tata Memorial Hospital, Mumbai, earning prestigious awards like the Dr. R.S. Rao Gold Medal for being the top scorer in Surgical Oncology and the Homi Bhabha National Institute Outstanding M.Ch Student Award. He then completed an Advanced Colorectal and Robotic fellowship at Advocate Lutheran Hospital in Illinois, USA. He holds Console Surgeon Certification for the Da Vinci robotic system."
  ],
  specializations: [
    "Advanced laparoscopic and robotic colon and rectal surgery",
    "Advanced endoscopic and endoluminal surgery",
    "Oncoplastic breast surgery and sentinel node biopsy",
    "Cytoreductive surgery and HIPEC",
    "Hepatobiliary oncology",
    "GI and peritoneal surface malignancy",
    "General surgical oncology"
  ],
  fellowships: [
    "American Society of Colon & Rectal Surgeons",
    "Society of American Gastrointestinal and Endoscopic Surgeons",
    "Indian Association of Surgical Oncology",
    "Association of Colon & Rectal Surgeons of India",
    "Association of Surgeons of India"
  ],
  languages: ["English", "Hindi", "Kannada"],
  awards: [
    "Secured the Vivekananda Prabhu Gold Medal for General Surgery in 2019",
    "Dr RS Rao Gold medal for Top scorer in Surgical Oncology in 2022",
    "Homi Bhabha National Institute Outstanding MCh Student Award 2023",
    "Department of Surgery Gold medal for best Outgoing student in 2022",
    "IASO Dr Gopinath Panda National Surgical Oncology quiz 2022 - First place",
    "ASICON National Surgical Quiz 2018 - Second prize",
    "Karnataka State level surgical quiz 2018 - First prize",
    "Top scorer - first year MBBS at MS Ramaiah Medical College",
    "Department of Anatomy 1st prize for Dissection at MS Ramaiah Medical College",
    "Top scorer in Ophthalmology at MS Ramaiah Medical College",
    "Top scorer in Pediatrics at MS Ramaiah Medical College",
    "MS Somaraj Memorial Award - Best outgoing student in Pediatrics",
    "Dr Tahira Agarwal Award - Best outgoing student in Ophthalmology"
  ],
  presentations: [
    "ASCRS 2024 annual scientific meeting, Baltimore Maryland - 'Small bowel obstruction after minimally invasive left colon and rectal resections: does the approach matter?'",
    "IASO Surgical oncology national conference, NATCON Madurai 2022 - 'Impact of post-hepatectomy biliary leaks on long-term survival: single-institute experience of 862 oncologic liver resections.'",
    "Received the IASO grant to present at the Surgical Society of Oncology (SSO) 2023 conference in Boston, Massachusetts.",
    "ACRSICON national colorectal conference, Mumbai, November 2021 - 'Safety of high-volume colorectal cancer surgery during the second wave of COVID-19 pandemic.'",
    "Indian Cancer Congress, Bangalore 2017 - 'Evaluation of Intraoperative Frozen Section with Final Histopathology Results for Sentinel Lymph Node Biopsy in Breast Cancer.'",
    "ASICON Chennai 2018 Best Paper - 'The role of abdominal X-rays in contemporary surgical practice.'",
    "ASICON Chennai 2018 Dr Palanivelu Best PG paper - 'A comparative analysis between standard closed pneumoperitoneum and a novel method of creating closed pneumoperitoneum.'",
    "Karnataka State conference KSASICON 2019 Best Poster - 'Delayed small bowel perforation following blunt trauma abdomen - A case report of an unusual presentation of a very common problem.'"
  ],
  video_presentations: [
    "ASCRS 2024 annual scientific meeting, Baltimore Maryland - 'Robotic APR with tailored intra-abdominal levator transection' (video abstract presentation).",
    "Laparoscopic right extended hemicolectomy with complete mesocolic excision and central venous ligation: a video vignette (ongoing presentation).",
    "National Surgical Conference - ASICON 2022 Mumbai - Dr Palanivelu Best Video First Prize ('Right hepatectomy and extrahepatic biliary tract excision for a perihilar cholangiocarcinoma')."
  ]
};

export default function AboutPage() {
  const [doctor, setDoctor] = useState(DEFAULT_DOCTOR);

  useEffect(() => {
    const isLocalNodeDev = typeof window !== "undefined" && window.location.hostname === "localhost" && window.location.port === "3000";
    if (isLocalNodeDev) {
      return;
    }

    fetch("../api.php?action=get_data")
      .then((res) => res.json())
      .then((resData) => {
        if (resData.status === "success" && resData.data && resData.data.doctor) {
          setDoctor(resData.data.doctor);
        }
      })
      .catch((err) => {
        console.warn("Using fallback local data on About page", err);
      });
  }, []);

  return (
    <div className="portfolio-container">
      <Header />
      
      <main className="subpage-main">
        {/* Bio block */}
        <section className="about-hero">
          <div className="about-hero-grid">
            <div className="doctor-image-wrapper glass-panel">
              {doctor.image ? (
                <img src={doctor.image} alt={doctor.name} className="doctor-photo" />
              ) : (
                <div className="doctor-photo-placeholder">DSB</div>
              )}
            </div>
            
            <div className="about-hero-content">
              <span className="about-badge">Professional Trajectory</span>
              <h1>{doctor.name}</h1>
              <h2>{doctor.title}</h2>
              <p className="hospital-txt">{doctor.hospital}</p>
              
              <div className="badge-row">
                {doctor.languages.map((lang, i) => (
                  <span key={i} className="lang-badge">🗣️ {lang}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Narrative bio */}
        <section className="about-story">
          <div className="about-story-card glass-panel">
            <h3>Medical Background & Surgical Philosophy</h3>
            {doctor.bio_paragraphs.map((para, i) => (
              <p key={i} className="story-para">{para}</p>
            ))}
          </div>
        </section>

        {/* Timeline block */}
        <section className="trajectory-timeline">
          <h3>Career & Education History</h3>
          <div className="timeline-grid">
            <div className="timeline-col">
              <div className="timeline-block glass-panel">
                <span className="block-year">2012</span>
                <h4>MBBS residency</h4>
                <p>MS Ramaiah Medical College. Top Scorer in Ophthalmology and Pediatrics. Winner of the Department of Anatomy Dissection Prize.</p>
              </div>
              <div className="timeline-block glass-panel">
                <span className="block-year">2019</span>
                <h4>MS - General Surgery</h4>
                <p>Kasturba Medical College. Awarded the Vivekananda Prabhu Gold Medal. First place in State-level surgical quizzes.</p>
              </div>
            </div>
            <div className="timeline-col">
              <div className="timeline-block glass-panel">
                <span className="block-year">2022</span>
                <h4>M.Ch - Surgical Oncology</h4>
                <p>Tata Memorial Hospital, Mumbai. Won Dr. R.S. Rao Gold Medal and Homi Bhabha National Institute Outstanding Student Award.</p>
              </div>
              <div className="timeline-block glass-panel">
                <span className="block-year">2023 - 2024</span>
                <h4>Advanced Colorectal & Robotic Fellowship</h4>
                <p>Advocate Lutheran Hospital, Illinois, USA. Console surgeon certification for Da Vinci systems at UIC, USA.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Achievements list */}
        <section className="detailed-achievements">
          <div className="awards-block-large glass-panel">
            <h3>Complete Roster of Awards & Prizes</h3>
            <ul className="detailed-awards-list">
              {doctor.awards.map((award, i) => (
                <li key={i}>🥇 {award}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* Presentations list */}
        <section className="presentations-section">
          <div className="presentations-block glass-panel">
            <h3>Conference Papers & Presentations</h3>
            <div className="presentations-list-wrapper">
              {doctor.presentations.map((pres, i) => (
                <div key={i} className="pres-item">
                  <span className="pres-marker">📄</span>
                  <p>{pres}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="video-presentations-block glass-panel">
            <h3>Video Vignettes & Surgical Showcases</h3>
            <div className="presentations-list-wrapper">
              {doctor.video_presentations.map((vid, i) => (
                <div key={i} className="pres-item">
                  <span className="pres-marker">🎥</span>
                  <p>{vid}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Fellowships */}
        <section className="fellowships-section-about glass-panel">
          <h3>Professional Fellowships & Society Memberships</h3>
          <div className="fellow-badges">
            {doctor.fellowships.map((fellow, i) => (
              <span key={i} className="fellow-badge">⚕️ {fellow}</span>
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

        .about-hero {
          margin-bottom: 4rem;
        }

        .about-hero-grid {
          display: grid;
          grid-template-columns: 0.8fr 1.2fr;
          gap: 4rem;
          align-items: center;
        }

        .doctor-image-wrapper {
          width: 100%;
          aspect-ratio: 0.85;
          overflow: hidden;
          padding: 1rem;
        }

        .doctor-photo {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 12px;
        }

        .doctor-photo-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          background: rgba(255, 255, 255, 0.03);
          font-size: 3rem;
          font-weight: 800;
          color: var(--primary);
        }

        .about-badge {
          padding: 0.35rem 0.8rem;
          background: rgba(0, 242, 254, 0.08);
          border: 1px solid rgba(0, 242, 254, 0.2);
          border-radius: 20px;
          color: var(--primary);
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          width: fit-content;
          margin-bottom: 1rem;
          display: inline-block;
        }

        .about-hero-content h1 {
          font-family: var(--font-accent);
          font-size: 2.75rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
          background: linear-gradient(135deg, white, var(--text-secondary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .about-hero-content h2 {
          font-family: var(--font-accent);
          font-size: 1.25rem;
          color: var(--primary);
          font-weight: 600;
          margin-bottom: 0.75rem;
        }

        .hospital-txt {
          color: var(--text-secondary);
          font-size: 0.95rem;
          margin-bottom: 1.5rem;
        }

        .badge-row {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .lang-badge {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 0.4rem 0.8rem;
          border-radius: 6px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .about-story {
          margin-bottom: 4rem;
        }

        .about-story-card {
          padding: 3rem;
        }

        .about-story-card h3 {
          font-family: var(--font-accent);
          font-size: 1.4rem;
          margin-bottom: 1.5rem;
          color: white;
        }

        .story-para {
          color: var(--text-secondary);
          line-height: 1.7;
          font-size: 0.95rem;
          margin-bottom: 1.25rem;
        }

        .story-para:last-child {
          margin-bottom: 0;
        }

        .trajectory-timeline {
          margin-bottom: 4rem;
        }

        .trajectory-timeline h3 {
          font-family: var(--font-accent);
          font-size: 1.4rem;
          margin-bottom: 2rem;
          text-align: center;
        }

        .timeline-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }

        .timeline-col {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .timeline-block {
          padding: 2rem;
        }

        .block-year {
          display: block;
          font-size: 1.2rem;
          font-weight: 800;
          color: var(--primary);
          margin-bottom: 0.5rem;
          font-family: var(--font-accent);
        }

        .timeline-block h4 {
          font-family: var(--font-accent);
          font-weight: 700;
          font-size: 1.05rem;
          margin-bottom: 0.5rem;
        }

        .timeline-block p {
          color: var(--text-secondary);
          font-size: 0.85rem;
          line-height: 1.5;
        }

        .detailed-achievements {
          margin-bottom: 4rem;
        }

        .awards-block-large {
          padding: 3rem;
        }

        .awards-block-large h3 {
          font-family: var(--font-accent);
          font-size: 1.4rem;
          margin-bottom: 2rem;
          color: white;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 1rem;
        }

        .detailed-awards-list {
          list-style: none;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem 2rem;
        }

        .detailed-awards-list li {
          font-size: 0.9rem;
          line-height: 1.5;
          color: var(--text-secondary);
        }

        .presentations-section {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          margin-bottom: 4rem;
        }

        .presentations-block, .video-presentations-block {
          padding: 2.5rem;
        }

        .presentations-block h3, .video-presentations-block h3 {
          font-family: var(--font-accent);
          font-size: 1.25rem;
          margin-bottom: 1.5rem;
          color: white;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 0.75rem;
        }

        .presentations-list-wrapper {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .pres-item {
          display: flex;
          gap: 12px;
          align-items: flex-start;
        }

        .pres-marker {
          font-size: 1.1rem;
        }

        .pres-item p {
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .fellowships-section-about {
          padding: 2.5rem 3rem;
          text-align: center;
        }

        .fellowships-section-about h3 {
          font-family: var(--font-accent);
          font-size: 1.25rem;
          margin-bottom: 1.5rem;
          color: white;
        }

        .fellow-badges {
          display: flex;
          gap: 1rem 1.5rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .fellow-badge {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 0.5rem 1rem;
          border-radius: 30px;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-secondary);
        }

        @media (max-width: 900px) {
          .about-hero-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
            text-align: center;
          }
          
          .doctor-image-wrapper {
            max-width: 320px;
            margin: 0 auto;
          }

          .badge-row, .fellow-badges {
            justify-content: center;
          }

          .timeline-grid, .detailed-awards-list, .presentations-section {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
