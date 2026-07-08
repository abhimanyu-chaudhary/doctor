"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import Header from "../components/Header";
import Footer from "../components/Footer";

// Dynamically import Three.js scene to prevent SSR errors
const Doctor3DScene = dynamic(() => import("../components/Doctor3DScene"), {
  ssr: false,
  loading: () => <div className="loading-canvas">Loading Simulation...</div>,
});

// Seed data matching updated data.json.php
const DEFAULT_DATA = {
  doctor: {
    name: "Dr. Devesh S. Ballal",
    title: "Consultant - Surgical Oncology & Robotic Surgery",
    hospital: "Manipal Hospital Old Airport Road, Bangalore",
    experience: "8+ Years",
    image: "./images/doctor_image.png",
    bio_paragraphs: [
      "Dr. Devesh S. Ballal is a premier surgical oncologist in Old Airport Road, Bangalore, currently practising as a Consultant - Surgical Oncology and Robotic Surgery at Manipal Hospital Old Airport Road. With over 8 years of comprehensive surgical training, including 4 years dedicated to oncology at India's largest cancer centre (Tata Memorial Hospital, Mumbai), Dr. Devesh Ballal brings a wealth of expertise and a strong commitment to patient care.",
      "His surgical acumen spans a diverse range of specialities, including Colorectal, Urological, Head and Neck, Breast, Thoracic, Hepatopancreatobiliary, Gynaecological, Bone, and Soft Tissue Cancers. He is adept in advanced endoscopic, minimally invasive, and robotic surgeries, consistently applying his critical thinking and organizational skills in high-pressure environments."
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
    social: {
      instagram: "https://www.instagram.com/onco_matters/",
      youtube: "https://www.youtube.com/@oncomatters"
    }
  },
  team: [
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
    }
  ],
  articles: [
    {
      id: "art-1",
      title: "Can compartment based complete mesocolic excision improve outcomes in patients with right colon cancer with metastatic D3 nodes?",
      authors: "Ballal DS, et al.",
      journal: "AME Clin Trials Rev",
      year: "2024",
      link: "#"
    },
    {
      id: "art-2",
      title: "Abdominoperineal Resection for T4 Low Rectal Cancer After Neoadjuvant Therapy—Are the Outcomes Acceptable?",
      authors: "Ballal DS, et al.",
      journal: "Indian Journal of Surgical Oncology",
      year: "2024",
      link: "https://doi.org/10.1007/S13193-024-02028-3"
    }
  ],
  blogs: [
    {
      id: "blog-1",
      title: "Everything You Need To Know About Robot-Assisted Hysterectomy",
      date: "Aug 01, 2025",
      readTime: "7 min read",
      link: "https://www.manipalhospitals.com/oldairportroad/blog/robot-assisted-hysterectomy/",
      image: "https://www.manipalhospitals.com/uploads/blog/Robot_Assisted_Hysterectomy.png",
      summary: "Robotic hysterectomies are transforming gynecological surgeries with unprecedented precision. Dr. Devesh S. Ballal explains the benefits, staging recovery, and patient-centered workflows."
    },
    {
      id: "blog-2",
      title: "Robotic Surgery: Transforming the Future of Minimally Invasive Care",
      date: "Aug 01, 2025",
      readTime: "6 min read",
      link: "https://www.manipalhospitals.com/oldairportroad/blog/robotic-surgery-benefits-procedures/",
      image: "https://www.manipalhospitals.com/uploads/blog/How_Robotic_Surgery_is_Revolutionizing_Minimally_Invasive_Procedures.png",
      summary: "Robotic technology provides surgeons with detailed 3D visualization and superior range of motion, translating directly to smaller incisions, shorter hospital stays, and safer resections."
    }
  ],
  videos: [
    {
      id: "vid-1",
      title: "Colorectal Cancer Is Rising in Young Adults",
      description: "With no nationwide screening program in India, colorectal cancer is often caught too late. Dr. Devesh S Ballal, Consultant – Surgical Oncology & Robotic Surgery at Manipal Hospital Old Airport Road, explains the factors behind this rise.",
      url: "https://www.youtube.com/watch?v=deuGmg4nIgo",
      thumbnail: "https://www.manipalhospitals.com/uploads/videos/deuGmg4nIgo-HD_(1).jpg"
    },
    {
      id: "vid-2",
      title: "Postmenopausal Bleeding: A Warning Sign",
      description: "Bleeding after menopause isn't something to brush off. It could point to endometrial (uterine) cancer, which is among the most common cancers in postmenopausal women. Dr. Devesh S Ballal explains the critical warning indicators.",
      url: "https://www.youtube.com/watch?v=ospJUohwJOE",
      thumbnail: "https://www.manipalhospitals.com/uploads/videos/ospJUohwJOE-HD_(1).jpg"
    },
    {
      id: "vid-3",
      title: "How Robots Assist in Complex Hysterectomies",
      description: "Robots are reshaping the way surgeons operate with precision and promise. Complex hysterectomy procedures have become safer as highly calibrated robotic systems assist in deep pelvic resections.",
      url: "https://www.youtube.com/watch?v=3yy8yPGYyUs",
      thumbnail: "https://www.manipalhospitals.com/uploads/videos/3yy8yPGYyUs-HD_(3).jpg"
    }
  ]
};

// Simulated real-looking Instagram Posts
const INSTAGRAM_POSTS = [
  {
    id: "ig-1",
    imageUrl: "./instagram1.jpg",
    likes: 142,
    comments: 18,
    caption: "Honored to present our work on Robotic Levator Transection at ASCRS 2024. Minimal invasive surgery changing patient recovery timeline! #Oncology #RoboticSurgery",
    link: "https://www.instagram.com/onco_matters/"
  },
  {
    id: "ig-2",
    imageUrl: "./instagram2.jpg",
    likes: 210,
    comments: 24,
    caption: "Tumor Board Discussion: Why multidisciplinary approaches are vital in complex hepatobiliary cases. Evidence-based medicine saves lives. #CancerCare #TeamMedicine",
    link: "https://www.instagram.com/onco_matters/"
  },
  {
    id: "ig-3",
    imageUrl: "./instagram3.jpg",
    likes: 188,
    comments: 12,
    caption: "Understanding early warning signs of colorectal cancer. Primary screening and awareness is our strongest shield. Link in bio to watch full video. #ColorectalCancer #Awareness",
    link: "https://www.instagram.com/onco_matters/"
  }
];

export default function Home() {
  const [data, setData] = useState(DEFAULT_DATA);
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);

  // Carousel Swipe State
  const [carouselIndex, setCarouselIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    const isLocalNodeDev = typeof window !== "undefined" && window.location.hostname === "localhost" && window.location.port === "3000";
    if (isLocalNodeDev) {
      // Local development fallback is already loaded in default state
      return;
    }

    fetch("./api.php?action=get_data")
      .then((res) => res.json())
      .then((resData) => {
        if (resData.status === "success" && resData.data) {
          // Merge safely
          setData(prev => ({
            ...prev,
            doctor: resData.data.doctor || prev.doctor,
            team: resData.data.team || prev.team,
            articles: resData.data.articles || prev.articles,
            blogs: resData.data.blogs || prev.blogs,
            videos: resData.data.videos || prev.videos
          }));
        }
      })
      .catch((err) => {
        console.warn("Using fallback local data", err);
      });
  }, []);

  // Carousel Swipe Actions
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 50; // pixels
    if (diff > threshold) {
      // Swiped Left -> Next
      nextSlide();
    } else if (diff < -threshold) {
      // Swiped Right -> Prev
      prevSlide();
    }
  };

  const nextSlide = () => {
    const maxIndex = data.videos.length - 1;
    setCarouselIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    const maxIndex = data.videos.length - 1;
    setCarouselIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const getYoutubeEmbedUrl = (url: string) => {
    try {
      let regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      let match = url.match(regExp);
      if (match && match[2].length === 11) {
        return `https://www.youtube.com/embed/${match[2]}?autoplay=1`;
      }
    } catch (e) {
      console.warn("Invalid YouTube URL", url);
    }
    return url;
  };

  const getSpecialtyIcon = (spec: string) => {
    const s = spec.toLowerCase();
    if (s.includes("robotic") || s.includes("laparoscopic")) {
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2v20M2 12h20M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />
        </svg>
      );
    }
    if (s.includes("endoscopic") || s.includes("endoluminal")) {
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="3" />
          <path d="M3 12c0-3.87 3.13-7 7-7h4c3.87 0 7 3.13 7 7s-3.13 7-7 7h-4c-3.87 0-7-3.13-7-7z" />
          <path d="M12 5V3M12 21v-2" />
        </svg>
      );
    }
    if (s.includes("breast") || s.includes("sentinel")) {
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22s-4-6.5-4-9.5A4 4 0 0 1 12 8.5a4 4 0 0 1 4 4c0 3-4 9.5-4 9.5z" />
          <circle cx="12" cy="5" r="2" />
        </svg>
      );
    }
    if (s.includes("cytoreductive") || s.includes("hipec")) {
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2v6M12 16v6M2 12h6M16 12h6M7.76 7.76l4.24 4.24M16.24 16.24L20 20" />
          <circle cx="12" cy="12" r="2" fill="currentColor" />
        </svg>
      );
    }
    if (s.includes("hepatobiliary")) {
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 14c0-3.3 2.7-6 6-6s6 2.7 6 6M20 14c0-2.2-1.8-4-4-4" />
          <path d="M12 8V4M8 4h8" />
          <circle cx="12" cy="15" r="4" />
        </svg>
      );
    }
    if (s.includes("gi ") || s.includes("peritoneal")) {
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L4.35 20.3a1 1 0 0 0 1.35 1.35l2.69-.62C9.93 21.26 10.93 21.5 12 21.5c4.97 0 9-4.03 9-9s-4.03-9-9-9z" />
          <path d="M9 12h6" />
        </svg>
      );
    }
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M12 8v8M8 12h8" />
      </svg>
    );
  };

  return (
    <div className="portfolio-container">
      <Header />

      {/* Hero */}
      <section className="hero-section">
        <div className="hero-grid">
          <div className="hero-content">
            <div className="badge">Consultant Surgical Oncology</div>
            <h1 className="hero-title">
              Pioneering <span className="gradient-text text-glow">Robotic Surgery</span> & Precision Oncology
            </h1>
            <p className="hero-subtitle">
              {data.doctor.name}, {data.doctor.title}. Providing advanced, minimally invasive surgical cures at Manipal Hospital, Bangalore.
            </p>
            <div className="hero-stats">
              <div className="stat-card">
                <h3>{data.doctor.experience}</h3>
                <p>Oncology Training</p>
              </div>
              <div className="stat-card">
                <h3>Robotic</h3>
                <p>Console Surgeon</p>
              </div>
              <div className="stat-card">
                <h3>Tata Memorial</h3>
                <p>Alumnus</p>
              </div>
            </div>
            <div className="hero-actions">
              <Link href="/about" className="btn-primary">Explore Career Bio</Link>
              <Link href="/contact" className="btn-secondary">Hospital Coordinates</Link>
            </div>
          </div>
          
          <div className="hero-canvas-container">
            <div className="canvas-wrapper">
              <Doctor3DScene />
            </div>
            <div className="canvas-info-tag glass-panel">
              <div className="tag-dot"></div>
              <span>Interactive DNA Helix - Drag & Scroll to interact</span>
            </div>
          </div>
        </div>
      </section>

      {/* Summarized Profile Section */}
      <section id="bio-preview" className="bio-preview-section">
        <div className="section-header">
          <h2 className="section-title">Meet the <span className="gradient-text">Oncology Surgeon</span></h2>
        </div>
        
        <div className="bio-preview-grid">
          <div className="bio-img-wrapper glass-panel">
            {data.doctor.image ? (
              <img src={data.doctor.image} alt={data.doctor.name} className="bio-img" />
            ) : (
              <div className="bio-img-placeholder">DSB</div>
            )}
          </div>
          
          <div className="bio-text glass-panel">
            <h3>{data.doctor.name}</h3>
            <p className="sub-title">{data.doctor.title}</p>
            <p className="hospital-tag">{data.doctor.hospital}</p>
            {data.doctor.bio_paragraphs.slice(0, 2).map((p, i) => (
              <p key={i} className="bio-p">{p}</p>
            ))}
            <Link href="/about" className="explore-bio-link">Explore Complete Bio & Awards →</Link>
          </div>
        </div>
      </section>

      {/* Specialties */}
      <section id="specialties" className="specialties-section">
        <div className="section-header">
          <h2 className="section-title">Fields of <span className="gradient-text">Oncological Expertise</span></h2>
          <p className="section-desc">Pioneering precision techniques and robotic-guided console surgery to target tumors safely.</p>
        </div>

        <div className="specialties-grid">
          {data.doctor.specializations.map((spec, index) => (
            <div key={index} className="spec-card glass-panel">
              <div className="spec-icon">
                {getSpecialtyIcon(spec)}
              </div>
              <h4>{spec}</h4>
              <p>Specialized clinical procedures aimed at optimal resection and patient-centered recovery timelines.</p>
            </div>
          ))}
        </div>
      </section>

      {/* Doctor's Speak Swipeable Carousel */}
      <section id="doctors-speak" className="speak-section">
        <div className="section-header">
          <h2 className="section-title">Doctor's <span className="gradient-text">Speak</span></h2>
          <p className="section-desc">Watch clinical guides and cancer awareness videos featuring Dr. Devesh S. Ballal.</p>
        </div>

        <div className="carousel-outer-wrapper">
          <button onClick={prevSlide} className="carousel-control prev">‹</button>
          
          <div
            className="carousel-container-inner"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="carousel-slider-track"
              style={{ transform: `translateX(-${carouselIndex * 100}%)` }}
            >
              {data.videos.map((vid) => (
                <div key={vid.id} className="speak-carousel-slide">
                  <div className="video-card-carousel glass-panel">
                    <div className="thumbnail-wrapper">
                      <img src={vid.thumbnail} alt={vid.title} className="thumb-img" />
                      <button onClick={() => setActiveVideoUrl(getYoutubeEmbedUrl(vid.url))} className="play-circle-btn">
                        <span className="play-icon-triangle"></span>
                      </button>
                    </div>
                    <div className="video-card-content">
                      <h4>{vid.title}</h4>
                      <p>{vid.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <button onClick={nextSlide} className="carousel-control next">›</button>
        </div>

        <div className="carousel-dots">
          {data.videos.map((_, i) => (
            <span
              key={i}
              className={`dot ${i === carouselIndex ? "active" : ""}`}
              onClick={() => setCarouselIndex(i)}
            ></span>
          ))}
        </div>
      </section>

      {/* Blogs Preview Section */}
      <section id="home-blogs" className="blogs-preview-home">
        <div className="section-header">
          <h2 className="section-title">Doctor's <span className="gradient-text">Blogs</span></h2>
        </div>

        <div className="home-blogs-grid">
          {data.blogs.slice(0, 2).map((post) => (
            <div key={post.id} className="blog-home-card glass-panel">
              <div className="blog-home-image">
                <img src={post.image} alt={post.title} />
              </div>
              <div className="blog-home-body">
                <span className="blog-home-meta">{post.date} • {post.readTime}</span>
                <h4>{post.title}</h4>
                <p>{post.summary}</p>
                <a href={post.link} target="_blank" rel="noopener noreferrer" className="read-blog-btn">Read on Manipal Portal →</a>
              </div>
            </div>
          ))}
        </div>

        <div className="view-more-container" style={{ marginTop: "2.5rem" }}>
          <Link href="/blogs" className="btn-secondary">Browse All Healthcare Blogs →</Link>
        </div>
      </section>

      {/* Publications Preview */}
      <section id="publications" className="publications-preview-section">
        <div className="section-header">
          <h2 className="section-title">Recent <span className="gradient-text">Publications</span></h2>
        </div>

        <div className="publications-list">
          {data.articles.slice(0, 3).map((art) => (
            <div key={art.id} className="article-card glass-panel">
              <div className="article-meta">
                <span className="article-year">{art.year}</span>
                <span className="article-journal">{art.journal}</span>
              </div>
              <h4 className="article-title">{art.title}</h4>
              <p className="article-authors">{art.authors}</p>
            </div>
          ))}
        </div>

        <div className="view-more-container" style={{marginTop: "2.5rem"}}>
          <Link href="/publications" className="btn-secondary">Browse All Publications & Papers →</Link>
        </div>
      </section>

      {/* Social Hub */}
      <section id="social" className="social-section">
        <div className="section-header">
          <h2 className="section-title">Oncology <span className="gradient-text">Social Hub</span></h2>
          <p className="section-desc">Stay updated on cancer awareness lectures, surgical case insights, and community health tips.</p>
        </div>

        <div className="social-grid">
          {/* Instagram */}
          <div className="social-widget glass-panel">
            <div className="widget-header">
              <div className="ig-brand">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ig-icon">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01" />
                </svg>
                <div>
                  <h4>@onco_matters</h4>
                  <p>Instagram Feed Live Updates</p>
                </div>
              </div>
              <a href={data.doctor.social.instagram} target="_blank" rel="noopener noreferrer" className="follow-btn">Follow</a>
            </div>
            
            <div className="ig-feed-grid">
              {INSTAGRAM_POSTS.map((post) => (
                <div key={post.id} className="ig-post-card">
                  <div className="ig-post-image">
                    <img src={post.imageUrl} alt="Instagram Post" />
                    <div className="ig-post-overlay">
                      <span>❤️ {post.likes}</span>
                      <span>💬 {post.comments}</span>
                    </div>
                  </div>
                  <p className="ig-post-caption">{post.caption}</p>
                </div>
              ))}
            </div>
          </div>

          {/* YouTube */}
          <div className="social-widget glass-panel">
            <div className="widget-header">
              <div className="yt-brand">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="red" stroke="red" className="yt-icon">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                  <polygon fill="white" points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                </svg>
                <div>
                  <h4>@oncomatters</h4>
                  <p>YouTube Cancer Care Channel</p>
                </div>
              </div>
              <a href={data.doctor.social.youtube} target="_blank" rel="noopener noreferrer" className="subscribe-btn">Subscribe</a>
            </div>
            
            <div className="youtube-video-container">
              <div className="youtube-embed-facade">
                <img src="https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80" alt="Robotic Surgery Intro" />
                <a href={data.doctor.social.youtube} target="_blank" rel="noopener noreferrer" className="play-button-trigger">
                  <span className="play-triangle"></span>
                </a>
                <div className="facade-title-overlay">
                  <h5>Robotic Colorectal Surgery: Breakthrough Minimal Resection Case Study</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal Player */}
      {activeVideoUrl && (
        <div className="video-player-modal" onClick={() => setActiveVideoUrl(null)}>
          <div className="modal-inner" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal-btn" onClick={() => setActiveVideoUrl(null)}>×</button>
            <div className="iframe-wrapper">
              <iframe
                src={activeVideoUrl}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}

      <Footer />

      <style jsx>{`
        .portfolio-container {
          background-color: var(--bg-primary);
          color: var(--text-primary);
          min-height: 100vh;
        }

        /* Hero */
        .hero-section {
          padding: 10rem 5% 5rem 5%;
          min-height: 100vh;
          display: flex;
          align-items: center;
          position: relative;
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 4rem;
          width: 100%;
          align-items: center;
        }

        .hero-content {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .badge {
          padding: 0.35rem 1rem;
          background: rgba(0, 242, 254, 0.08);
          border: 1px solid rgba(0, 242, 254, 0.2);
          border-radius: 20px;
          color: var(--primary);
          font-size: 0.85rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 1.5rem;
        }

        .hero-title {
          font-family: var(--font-accent);
          font-weight: 800;
          font-size: 3.5rem;
          line-height: 1.15;
          margin-bottom: 1.5rem;
          letter-spacing: -0.02em;
        }

        .hero-subtitle {
          color: var(--text-secondary);
          font-size: 1.1rem;
          line-height: 1.6;
          margin-bottom: 2.5rem;
          max-width: 90%;
        }

        .hero-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          width: 100%;
          margin-bottom: 2.5rem;
        }

        .stat-card {
          padding: 1.25rem;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          text-align: left;
        }

        .stat-card h3 {
          font-family: var(--font-accent);
          font-size: 1.6rem;
          font-weight: 700;
          color: var(--primary);
          margin-bottom: 0.25rem;
        }

        .stat-card p {
          font-size: 0.8rem;
          color: var(--text-secondary);
        }

        .hero-actions {
          display: flex;
          gap: 1.25rem;
        }

        .btn-primary {
          padding: 0.85rem 1.75rem;
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          color: #000;
          font-weight: 600;
          border-radius: 8px;
          box-shadow: 0 4px 15px rgba(0, 242, 254, 0.25);
          transition: var(--transition-fast);
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 242, 254, 0.45);
        }

        .btn-secondary {
          padding: 0.85rem 1.75rem;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: var(--text-primary);
          font-weight: 500;
          border-radius: 8px;
          transition: var(--transition-fast);
        }

        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.2);
        }

        .hero-canvas-container {
          position: relative;
          height: 500px;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .canvas-wrapper {
          width: 100%;
          height: 100%;
        }

        .loading-canvas {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
          color: var(--text-secondary);
          font-size: 0.9rem;
          border: 1px dashed var(--border-color);
          border-radius: 12px;
        }

        .canvas-info-tag {
          position: absolute;
          bottom: 10px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.75rem;
          color: var(--text-secondary);
          white-space: nowrap;
        }

        .tag-dot {
          width: 6px;
          height: 6px;
          background: var(--primary);
          border-radius: 50%;
          animation: pulseGlow 1.5s infinite;
        }

        /* Generic Section Headers */
        .section-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .section-title {
          font-family: var(--font-accent);
          font-size: 2.25rem;
          font-weight: 800;
          margin-bottom: 0.75rem;
        }

        .section-desc {
          color: var(--text-secondary);
          font-size: 1rem;
          max-width: 600px;
          margin: 0 auto;
        }

        /* Bio Preview Section */
        .bio-preview-section {
          padding: 6rem 5%;
          background: linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
        }

        .bio-preview-grid {
          display: grid;
          grid-template-columns: 0.8fr 1.2fr;
          gap: 4rem;
          align-items: center;
        }

        .bio-img-wrapper {
          width: 100%;
          aspect-ratio: 0.85;
          overflow: hidden;
          padding: 1rem;
        }

        .bio-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 12px;
        }

        .bio-img-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          background: rgba(255, 255, 255, 0.02);
          font-size: 3rem;
          font-weight: 800;
          color: var(--primary);
        }

        .bio-text {
          padding: 2.5rem;
        }

        .bio-text h3 {
          font-family: var(--font-accent);
          font-size: 1.85rem;
          margin-bottom: 0.25rem;
          color: white;
        }

        .bio-text .sub-title {
          font-size: 1.05rem;
          color: var(--primary);
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .bio-text .hospital-tag {
          font-size: 0.85rem;
          color: var(--text-secondary);
          margin-bottom: 1.5rem;
        }

        .bio-p {
          color: var(--text-secondary);
          font-size: 0.95rem;
          line-height: 1.6;
          margin-bottom: 1.25rem;
        }

        .explore-bio-link {
          display: inline-block;
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--primary);
          margin-top: 1rem;
          transition: var(--transition-fast);
        }

        .explore-bio-link:hover {
          color: var(--secondary);
          transform: translateX(4px);
        }

        /* Specialties */
        .specialties-section {
          padding: 6rem 5%;
        }

        .specialties-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 2rem;
        }

        .spec-card {
          padding: 2rem;
        }

        .spec-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: rgba(0, 242, 254, 0.08);
          border: 1px solid rgba(0, 242, 254, 0.15);
          color: var(--primary);
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .spec-card h4 {
          font-family: var(--font-accent);
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 0.75rem;
          line-height: 1.35;
        }

        .spec-card p {
          color: var(--text-secondary);
          font-size: 0.85rem;
          line-height: 1.5;
        }

        /* Doctor's Speak Video Carousel styling */
        .speak-section {
          padding: 6rem 5%;
          background: var(--bg-secondary);
        }

        .carousel-outer-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          max-width: 800px;
          margin: 0 auto;
          position: relative;
          gap: 1rem;
        }

        .carousel-container-inner {
          flex: 1;
          overflow: hidden;
          border-radius: 12px;
        }

        .carousel-slider-track {
          display: flex;
          transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
        }

        .speak-carousel-slide {
          min-width: 100%;
          box-sizing: border-box;
          padding: 0.5rem;
        }

        .video-card-carousel {
          display: flex;
          flex-direction: column;
          overflow: hidden;
          width: 100%;
        }

        .thumbnail-wrapper {
          position: relative;
          width: 100%;
          aspect-ratio: 1.77;
          background: #000;
        }

        .thumb-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.8;
        }

        .play-circle-btn {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: rgba(0, 242, 254, 0.9);
          border: none;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          box-shadow: 0 4px 20px rgba(0, 242, 254, 0.4);
          transition: var(--transition-fast);
        }

        .play-circle-btn:hover {
          transform: translate(-50%, -50%) scale(1.08);
          background: #00f2fe;
          box-shadow: 0 6px 25px rgba(0, 242, 254, 0.6);
        }

        .play-icon-triangle {
          width: 0;
          height: 0;
          border-top: 10px solid transparent;
          border-bottom: 10px solid transparent;
          border-left: 16px solid #000;
          margin-left: 4px;
        }

        .video-card-content {
          padding: 2rem;
        }

        .video-card-content h4 {
          font-family: var(--font-accent);
          font-size: 1.25rem;
          font-weight: 700;
          color: white;
          margin-bottom: 0.75rem;
        }

        .video-card-content p {
          color: var(--text-secondary);
          font-size: 0.85rem;
          line-height: 1.55;
        }

        .carousel-control {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: white;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          font-size: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: var(--transition-fast);
        }

        .carousel-control:hover {
          background: var(--primary);
          color: black;
          border-color: var(--primary);
        }

        .carousel-dots {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: 2rem;
        }

        .carousel-dots .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          cursor: pointer;
          transition: var(--transition-fast);
        }

        .carousel-dots .dot.active {
          background: var(--primary);
          width: 24px;
          border-radius: 4px;
        }

        /* Blogs preview styling */
        .blogs-preview-home {
          padding: 6rem 5%;
        }

        .home-blogs-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2.5rem;
          max-width: 1000px;
          margin: 0 auto;
        }

        .blog-home-card {
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .blog-home-image {
          width: 100%;
          aspect-ratio: 1.8;
          overflow: hidden;
          background: #222;
        }

        .blog-home-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .blog-home-body {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .blog-home-meta {
          font-size: 0.75rem;
          color: var(--text-secondary);
          margin-bottom: 0.5rem;
          display: block;
        }

        .blog-home-body h4 {
          font-family: var(--font-accent);
          font-size: 1.2rem;
          font-weight: 700;
          margin-bottom: 0.75rem;
          color: white;
          line-height: 1.35;
        }

        .blog-home-body p {
          color: var(--text-secondary);
          font-size: 0.85rem;
          line-height: 1.5;
          margin-bottom: 1.25rem;
          flex: 1;
        }

        .read-blog-btn {
          color: var(--primary);
          font-size: 0.85rem;
          font-weight: 700;
          text-decoration: none;
          transition: var(--transition-fast);
        }

        .read-blog-btn:hover {
          color: var(--secondary);
          transform: translateX(4px);
        }

        /* Publications Preview */
        .publications-preview-section {
          padding: 6rem 5%;
          background: var(--bg-secondary);
        }

        .publications-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .article-card {
          padding: 1.75rem 2rem;
        }

        .article-meta {
          display: flex;
          gap: 1rem;
          font-size: 0.75rem;
          font-weight: 600;
          margin-bottom: 0.75rem;
        }

        .article-year {
          color: var(--primary);
          padding: 0.15rem 0.5rem;
          background: rgba(0, 242, 254, 0.08);
          border-radius: 4px;
        }

        .article-journal {
          color: var(--text-secondary);
          align-self: center;
        }

        .article-title {
          font-family: var(--font-accent);
          font-size: 1.15rem;
          font-weight: 600;
          line-height: 1.4;
          margin-bottom: 0.5rem;
        }

        .article-authors {
          color: var(--text-muted);
          font-size: 0.85rem;
        }

        /* Social Section */
        .social-section {
          padding: 6rem 5%;
        }

        .social-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 3rem;
        }

        .social-widget {
          padding: 2.25rem;
          display: flex;
          flex-direction: column;
        }

        .widget-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 1.25rem;
        }

        .ig-brand, .yt-brand {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .ig-brand h4, .yt-brand h4 {
          font-family: var(--font-accent);
          font-size: 1.05rem;
          font-weight: 700;
        }

        .ig-brand p, .yt-brand p {
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        .ig-icon {
          color: #e1306c;
        }

        .follow-btn {
          padding: 0.4rem 1.25rem;
          border-radius: 20px;
          background: #e1306c;
          color: white;
          font-weight: 600;
          font-size: 0.8rem;
        }

        .subscribe-btn {
          padding: 0.4rem 1.25rem;
          border-radius: 20px;
          background: red;
          color: white;
          font-weight: 600;
          font-size: 0.8rem;
        }

        .ig-feed-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
        }

        .ig-post-card {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .ig-post-image {
          position: relative;
          aspect-ratio: 1;
          border-radius: 8px;
          overflow: hidden;
          background: #222;
        }

        .ig-post-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .ig-post-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.6);
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 12px;
          opacity: 0;
          transition: var(--transition-fast);
          color: white;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .ig-post-image:hover .ig-post-overlay {
          opacity: 1;
        }

        .ig-post-caption {
          font-size: 0.7rem;
          color: var(--text-secondary);
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .youtube-video-container {
          width: 100%;
          aspect-ratio: 16/9;
          border-radius: 12px;
          overflow: hidden;
          background: #000;
          position: relative;
          margin-bottom: 1.5rem;
        }

        .youtube-embed-facade {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .youtube-embed-facade img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.75;
        }

        .play-button-trigger {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 60px;
          height: 60px;
          background: red;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          box-shadow: 0 4px 15px rgba(255, 0, 0, 0.4);
          transition: var(--transition-fast);
        }

        .play-button-trigger:hover {
          transform: translate(-50%, -50%) scale(1.1);
          box-shadow: 0 6px 20px rgba(255, 0, 0, 0.6);
        }

        .play-triangle {
          width: 0;
          height: 0;
          border-top: 10px solid transparent;
          border-bottom: 10px solid transparent;
          border-left: 16px solid white;
          margin-left: 4px;
        }

        .view-more-container {
          display: flex;
          justify-content: center;
        }

        /* Video Modal Player */
        .video-player-modal {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.95);
          z-index: 10000;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 2rem;
        }

        .modal-inner {
          position: relative;
          width: 100%;
          max-width: 800px;
          background: #000;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 0 30px rgba(0, 242, 254, 0.2);
        }

        .close-modal-btn {
          position: absolute;
          top: 10px;
          right: 15px;
          background: transparent;
          border: none;
          color: white;
          font-size: 2rem;
          font-weight: 300;
          cursor: pointer;
          z-index: 100;
        }

        .iframe-wrapper {
          position: relative;
          width: 100%;
          aspect-ratio: 1.77;
        }

        .iframe-wrapper iframe {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }

        /* Mobile responsive */
        @media (max-width: 1024px) {
          .hero-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .hero-content {
            align-items: center;
            text-align: center;
          }

          .hero-subtitle {
            margin-left: auto;
            margin-right: auto;
          }

          .hero-actions {
            justify-content: center;
          }

          .hero-canvas-container {
            height: 320px;
          }

          .bio-preview-grid, .social-grid, .home-blogs-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          
          .bio-img-wrapper {
            max-width: 320px;
            margin: 0 auto;
          }
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.25rem;
          }

          .hero-stats {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .hero-canvas-container {
            height: 250px;
          }

          .section-title {
            font-size: 1.75rem;
          }

          .ig-feed-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .carousel-outer-wrapper {
            gap: 0;
          }

          .carousel-control {
            display: none;
          }

          .video-card-content {
            padding: 1.25rem;
          }

          .video-card-content h4 {
            font-size: 1.1rem;
          }

          .spec-card, .blog-home-body, .article-card {
            padding: 1.25rem;
          }

          .bio-text {
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}
