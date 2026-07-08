"use client";

import { useEffect, useState, useRef } from "react";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  specialty: string;
  image: string;
}

interface Article {
  id: string;
  title: string;
  authors: string;
  journal: string;
  year: string;
  link: string;
}

interface Blog {
  id: string;
  title: string;
  date: string;
  readTime: string;
  link: string;
  image: string;
  summary: string;
}

interface Video {
  id: string;
  title: string;
  description: string;
  url: string;
  thumbnail: string;
}

interface UploadedImage {
  name: string;
  url: string;
  time?: number;
}

// Initial database seeding
const SEED_DATABASE = {
  doctor: {
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
    },
    {
      id: "team-3",
      name: "Dr. Sneha Patil",
      role: "Coordinator",
      specialty: "Clinical Nurse Specialist & Care Coordinator",
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

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  // Is Local Storage Fallback Mode Active (Dev Mode)
  const [isLocalDevMode, setIsLocalDevMode] = useState(false);

  // Active Tab: profile, team, articles, blogs, speak, media, settings
  const [activeTab, setActiveTab] = useState("profile");

  // CMS state
  const [doctor, setDoctor] = useState(SEED_DATABASE.doctor);
  const [team, setTeam] = useState<TeamMember[]>(SEED_DATABASE.team);
  const [articles, setArticles] = useState<Article[]>(SEED_DATABASE.articles);
  const [blogs, setBlogs] = useState<Blog[]>(SEED_DATABASE.blogs);
  const [videos, setVideos] = useState<Video[]>(SEED_DATABASE.videos);
  const [galleryImages, setGalleryImages] = useState<UploadedImage[]>([]);

  // Submitting statuses
  const [saveStatus, setSaveStatus] = useState({ loading: false, success: false, error: "" });
  
  // Modal states for CRUD
  const [newTeamMember, setNewTeamMember] = useState({ name: "", role: "", specialty: "", image: "" });
  const [newArticle, setNewArticle] = useState({ title: "", authors: "", journal: "", year: "", link: "" });
  const [newBlog, setNewBlog] = useState({ title: "", date: "", readTime: "", link: "", image: "", summary: "" });
  const [newVideo, setNewVideo] = useState({ title: "", description: "", url: "", thumbnail: "" });
  const [passwordChange, setPasswordChange] = useState({ current: "", new: "", confirm: "" });

  // Uploader ref
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadProgress, setUploadProgress] = useState(false);

  // Detect mode & check token on mount
  useEffect(() => {
    fetch("./api.php?action=get_data")
      .then((res) => {
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          setIsLocalDevMode(false);
          const token = localStorage.getItem("admin_token");
          if (token) {
            setIsAuthenticated(true);
            fetchDashboardData(token, false);
          }
        } else {
          throw new Error("Not PHP");
        }
      })
      .catch(() => {
        setIsLocalDevMode(true);
        console.info("CMS active in local storage dev mode (PHP offline)");
        const isAuthLocal = localStorage.getItem("local_admin_auth") === "true";
        if (isAuthLocal) {
          setIsAuthenticated(true);
          loadLocalStorageData();
        }
      });
  }, []);

  const loadLocalStorageData = () => {
    const localDoc = localStorage.getItem("local_doctor_db");
    const localTeam = localStorage.getItem("local_team_db");
    const localArt = localStorage.getItem("local_articles_db");
    const localBlogs = localStorage.getItem("local_blogs_db");
    const localVideos = localStorage.getItem("local_videos_db");
    const localImages = localStorage.getItem("local_images_db");

    if (localDoc) setDoctor(JSON.parse(localDoc));
    if (localTeam) setTeam(JSON.parse(localTeam));
    if (localArt) setArticles(JSON.parse(localArt));
    if (localBlogs) setBlogs(JSON.parse(localBlogs));
    if (localVideos) setVideos(JSON.parse(localVideos));
    if (localImages) setGalleryImages(JSON.parse(localImages));
  };

  const saveLocalStorageData = (updatedDoc?: any, updatedTeam?: any, updatedArt?: any, updatedBlogs?: any, updatedVideos?: any, updatedImages?: any) => {
    setSaveStatus({ loading: true, success: false, error: "" });
    setTimeout(() => {
      if (updatedDoc) {
        setDoctor(updatedDoc);
        localStorage.setItem("local_doctor_db", JSON.stringify(updatedDoc));
      }
      if (updatedTeam) {
        setTeam(updatedTeam);
        localStorage.setItem("local_team_db", JSON.stringify(updatedTeam));
      }
      if (updatedArt) {
        setArticles(updatedArt);
        localStorage.setItem("local_articles_db", JSON.stringify(updatedArt));
      }
      if (updatedBlogs) {
        setBlogs(updatedBlogs);
        localStorage.setItem("local_blogs_db", JSON.stringify(updatedBlogs));
      }
      if (updatedVideos) {
        setVideos(updatedVideos);
        localStorage.setItem("local_videos_db", JSON.stringify(updatedVideos));
      }
      if (updatedImages) {
        setGalleryImages(updatedImages);
        localStorage.setItem("local_images_db", JSON.stringify(updatedImages));
      }
      setSaveStatus({ loading: false, success: true, error: "" });
      setTimeout(() => setSaveStatus(prev => ({ ...prev, success: false })), 2000);
    }, 400);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setLoginLoading(true);

    if (isLocalDevMode) {
      setTimeout(() => {
        if (password === "doctor123") {
          localStorage.setItem("local_admin_auth", "true");
          setIsAuthenticated(true);
          loadLocalStorageData();
        } else {
          setLoginError("Invalid credentials (Dev Mode default: doctor123)");
        }
        setLoginLoading(false);
      }, 500);
      return;
    }

    try {
      const res = await fetch("./api.php?action=login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
      });
      const result = await res.json();
      if (res.ok && result.status === "success") {
        localStorage.setItem("admin_token", result.token);
        setIsAuthenticated(true);
        fetchDashboardData(result.token, false);
      } else {
        throw new Error(result.message || "Authentication failed");
      }
    } catch (err: any) {
      setLoginError(err.message || "Invalid credentials");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    if (isLocalDevMode) {
      localStorage.removeItem("local_admin_auth");
    } else {
      localStorage.removeItem("admin_token");
    }
    setIsAuthenticated(false);
  };

  const fetchDashboardData = async (token: string, devMode: boolean) => {
    if (devMode) {
      loadLocalStorageData();
      return;
    }

    try {
      const resData = await fetch("./api.php?action=get_data");
      const resultData = await resData.json();
      if (resultData.status === "success" && resultData.data) {
        setDoctor(resultData.data.doctor || SEED_DATABASE.doctor);
        setTeam(resultData.data.team || SEED_DATABASE.team);
        setArticles(resultData.data.articles || SEED_DATABASE.articles);
        setBlogs(resultData.data.blogs || SEED_DATABASE.blogs);
        setVideos(resultData.data.videos || SEED_DATABASE.videos);
      }

      fetchGalleryImages(token);
    } catch (err) {
      console.error("Error loading CMS data", err);
    }
  };

  const fetchGalleryImages = async (token: string) => {
    try {
      const res = await fetch("./api.php?action=get_images", {
        headers: { "X-Admin-Token": token }
      });
      const result = await res.json();
      if (result.status === "success") {
        setGalleryImages(result.data || []);
      }
    } catch (err) {
      console.warn("Could not load gallery images", err);
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLocalDevMode) {
      saveLocalStorageData(doctor, null, null, null, null, null);
      return;
    }

    triggerSave(async (token) => {
      const res = await fetch("./api.php?action=update_profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Admin-Token": token
        },
        body: JSON.stringify({ doctor })
      });
      return res.json();
    });
  };

  const triggerSave = async (apiCall: (token: string) => Promise<any>) => {
    setSaveStatus({ loading: true, success: false, error: "" });
    const token = localStorage.getItem("admin_token");
    if (!token) {
      setSaveStatus({ loading: false, success: false, error: "Authentication token missing. Please re-login." });
      return;
    }

    try {
      const result = await apiCall(token);
      if (result.status === "success") {
        setSaveStatus({ loading: false, success: true, error: "" });
        fetchDashboardData(token, false);
        setTimeout(() => setSaveStatus(prev => ({ ...prev, success: false })), 3000);
      } else {
        throw new Error(result.message || "Save failed");
      }
    } catch (err: any) {
      setSaveStatus({ loading: false, success: false, error: err.message || "Failed to update" });
    }
  };

  // CRUD Team
  const handleAddTeamMember = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedTeam = [...team, { ...newTeamMember, id: "team_" + Date.now() }];
    
    if (isLocalDevMode) {
      saveLocalStorageData(null, updatedTeam, null, null, null, null);
      setNewTeamMember({ name: "", role: "", specialty: "", image: "" });
      return;
    }

    triggerSave(async (token) => {
      const res = await fetch("./api.php?action=manage_team", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Admin-Token": token },
        body: JSON.stringify({ team: updatedTeam })
      });
      const data = await res.json();
      if (data.status === "success") {
        setNewTeamMember({ name: "", role: "", specialty: "", image: "" });
      }
      return data;
    });
  };

  const handleDeleteTeamMember = (id: string) => {
    if (!confirm("Are you sure you want to remove this team member?")) return;
    const updatedTeam = team.filter(m => m.id !== id);

    if (isLocalDevMode) {
      saveLocalStorageData(null, updatedTeam, null, null, null, null);
      return;
    }

    triggerSave(async (token) => {
      const res = await fetch("./api.php?action=manage_team", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Admin-Token": token },
        body: JSON.stringify({ team: updatedTeam })
      });
      return res.json();
    });
  };

  // CRUD Articles
  const handleAddArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedArticles = [...articles, { ...newArticle, id: "art_" + Date.now() }];
    updatedArticles.sort((a, b) => b.year.localeCompare(a.year));

    if (isLocalDevMode) {
      saveLocalStorageData(null, null, updatedArticles, null, null, null);
      setNewArticle({ title: "", authors: "", journal: "", year: "", link: "" });
      return;
    }

    triggerSave(async (token) => {
      const res = await fetch("./api.php?action=manage_articles", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Admin-Token": token },
        body: JSON.stringify({ articles: updatedArticles })
      });
      const data = await res.json();
      if (data.status === "success") {
        setNewArticle({ title: "", authors: "", journal: "", year: "", link: "" });
      }
      return data;
    });
  };

  const handleDeleteArticle = (id: string) => {
    if (!confirm("Are you sure you want to delete this publication?")) return;
    const updatedArticles = articles.filter(a => a.id !== id);

    if (isLocalDevMode) {
      saveLocalStorageData(null, null, updatedArticles, null, null, null);
      return;
    }

    triggerSave(async (token) => {
      const res = await fetch("./api.php?action=manage_articles", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Admin-Token": token },
        body: JSON.stringify({ articles: updatedArticles })
      });
      return res.json();
    });
  };

  // CRUD Blogs
  const handleAddBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedBlogs = [...blogs, { ...newBlog, id: "blog_" + Date.now() }];

    if (isLocalDevMode) {
      saveLocalStorageData(null, null, null, updatedBlogs, null, null);
      setNewBlog({ title: "", date: "", readTime: "", link: "", image: "", summary: "" });
      return;
    }

    triggerSave(async (token) => {
      const res = await fetch("./api.php?action=manage_blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Admin-Token": token },
        body: JSON.stringify({ blogs: updatedBlogs })
      });
      const data = await res.json();
      if (data.status === "success") {
        setNewBlog({ title: "", date: "", readTime: "", link: "", image: "", summary: "" });
      }
      return data;
    });
  };

  const handleDeleteBlog = (id: string) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;
    const updatedBlogs = blogs.filter(b => b.id !== id);

    if (isLocalDevMode) {
      saveLocalStorageData(null, null, null, updatedBlogs, null, null);
      return;
    }

    triggerSave(async (token) => {
      const res = await fetch("./api.php?action=manage_blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Admin-Token": token },
        body: JSON.stringify({ blogs: updatedBlogs })
      });
      return res.json();
    });
  };

  // CRUD Videos Speak
  const handleAddVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedVideos = [...videos, { ...newVideo, id: "vid_" + Date.now() }];

    if (isLocalDevMode) {
      saveLocalStorageData(null, null, null, null, updatedVideos, null);
      setNewVideo({ title: "", description: "", url: "", thumbnail: "" });
      return;
    }

    triggerSave(async (token) => {
      const res = await fetch("./api.php?action=manage_videos", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Admin-Token": token },
        body: JSON.stringify({ videos: updatedVideos })
      });
      const data = await res.json();
      if (data.status === "success") {
        setNewVideo({ title: "", description: "", url: "", thumbnail: "" });
      }
      return data;
    });
  };

  const handleDeleteVideo = (id: string) => {
    if (!confirm("Delete this video from Doctor's Speak?")) return;
    const updatedVideos = videos.filter(v => v.id !== id);

    if (isLocalDevMode) {
      saveLocalStorageData(null, null, null, null, updatedVideos, null);
      return;
    }

    triggerSave(async (token) => {
      const res = await fetch("./api.php?action=manage_videos", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Admin-Token": token },
        body: JSON.stringify({ videos: updatedVideos })
      });
      return res.json();
    });
  };

  // File Uploader logic
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadProgress(true);

    if (isLocalDevMode) {
      // Emulate upload locally
      setTimeout(() => {
        const mockUrl = "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80";
        const newImg: UploadedImage = {
          name: "mock_" + file.name,
          url: mockUrl,
          time: Date.now()
        };
        const updated = [newImg, ...galleryImages];
        saveLocalStorageData(null, null, null, null, null, updated);
        setUploadProgress(false);
        alert("Emulated image upload locally! Simulated image added to gallery.");
      }, 500);
      return;
    }

    const token = localStorage.getItem("admin_token") || "";
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("./api.php?action=upload_image", {
        method: "POST",
        headers: { "X-Admin-Token": token },
        body: formData
      });
      const data = await res.json();
      if (data.status === "success" && data.url) {
        fetchGalleryImages(token);
        alert("Image uploaded successfully!");
      } else {
        alert(data.message || "Failed to upload image");
      }
    } catch (err) {
      alert("Error uploading file to PHP server");
    } finally {
      setUploadProgress(false);
    }
  };

  const handleDeleteImage = async (name: string) => {
    if (!confirm("Are you sure you want to delete this image?")) return;

    if (isLocalDevMode) {
      const updated = galleryImages.filter(img => img.name !== name);
      saveLocalStorageData(null, null, null, null, null, updated);
      return;
    }

    const token = localStorage.getItem("admin_token") || "";
    try {
      const res = await fetch("./api.php?action=delete_image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Admin-Token": token
        },
        body: JSON.stringify({ name })
      });
      const data = await res.json();
      if (data.status === "success") {
        fetchGalleryImages(token);
      } else {
        alert(data.message || "Failed to delete");
      }
    } catch (err) {
      alert("Error deleting file");
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert("Public URL copied to clipboard!");
    });
  };

  const handleChangePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordChange.new !== passwordChange.confirm) {
      setSaveStatus({ loading: false, success: false, error: "New passwords do not match" });
      return;
    }

    if (isLocalDevMode) {
      alert("Password changed locally in Dev Mode!");
      setPasswordChange({ current: "", new: "", confirm: "" });
      return;
    }

    triggerSave(async (token) => {
      const res = await fetch("./api.php?action=change_password", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Admin-Token": token },
        body: JSON.stringify({ new_password: passwordChange.new })
      });
      const data = await res.json();
      if (data.status === "success") {
        setPasswordChange({ current: "", new: "", confirm: "" });
        alert("Password changed successfully. Please re-login.");
        handleLogout();
      }
      return data;
    });
  };

  return (
    <div className="admin-container">
      {!isAuthenticated ? (
        <div className="login-container">
          <form onSubmit={handleLogin} className="login-card glass-panel">
            <h2>Clinical Portal Access</h2>
            {isLocalDevMode ? (
              <div className="dev-notice">⚠️ DEV MODE fallback active (Password: doctor123)</div>
            ) : (
              <div className="dev-notice php">🔌 Connected to secure PHP API</div>
            )}
            <p>Please enter the administrative key to manage the dashboard.</p>
            <div className="form-group">
              <input
                type="password"
                placeholder="Admin Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {loginError && <p className="login-error">{loginError}</p>}
            <button type="submit" disabled={loginLoading} className="login-btn">
              {loginLoading ? "Verifying..." : "Access Dashboard"}
            </button>
            <a href="../" className="back-link">← Back to Patient Site</a>
          </form>
        </div>
      ) : (
        <div className="admin-layout-wrapper">
          {/* Sidebar */}
          <aside className="admin-sidebar">
            <div className="sidebar-brand">
              <h4>ONCO<span>PORTAL</span></h4>
              {isLocalDevMode ? (
                <span className="badge dev">LOCAL STORAGE DEV</span>
              ) : (
                <span className="badge">SECURE PHP DB</span>
              )}
            </div>
            <nav className="sidebar-nav">
              <button
                className={activeTab === "profile" ? "active" : ""}
                onClick={() => setActiveTab("profile")}
              >
                👤 Profile & Timeline
              </button>
              <button
                className={activeTab === "team" ? "active" : ""}
                onClick={() => setActiveTab("team")}
              >
                👥 Surgical Team
              </button>
              <button
                className={activeTab === "articles" ? "active" : ""}
                onClick={() => setActiveTab("articles")}
              >
                📚 Publications
              </button>
              <button
                className={activeTab === "blogs" ? "active" : ""}
                onClick={() => setActiveTab("blogs")}
              >
                ✍️ Blogs CMS
              </button>
              <button
                className={activeTab === "speak" ? "active" : ""}
                onClick={() => setActiveTab("speak")}
              >
                🎥 Doctor's Speak Videos
              </button>
              <button
                className={activeTab === "media" ? "active" : ""}
                onClick={() => setActiveTab("media")}
              >
                📁 Image Uploader folder
              </button>
              <button
                className={activeTab === "settings" ? "active" : ""}
                onClick={() => setActiveTab("settings")}
              >
                ⚙️ Password Key
              </button>
              <button onClick={handleLogout} className="logout-btn">
                🚪 Exit Console
              </button>
            </nav>
            <div className="sidebar-footer">
              <p>Logged in as Administrator</p>
              <a href="../" className="view-homepage-link">View Patient Site</a>
            </div>
          </aside>

          {/* Main workspace */}
          <main className="admin-main">
            {saveStatus.loading && <div className="toast toast-loading">Saving changes to database...</div>}
            {saveStatus.success && <div className="toast toast-success">Database synced successfully!</div>}
            {saveStatus.error && <div className="toast toast-error">Error: {saveStatus.error}</div>}

            <header className="main-header">
              <h2>CMS Control Center</h2>
              <div className="header-info">
                <span>{doctor.name || "Loading..."}</span>
              </div>
            </header>

            <div className="work-content">
              {activeTab === "profile" && (
                <div className="tab-card glass-panel">
                  <h3>Edit Profile & Specialties</h3>
                  <p className="tab-desc">Edit doctor name, titles, bio content, credentials, and image link.</p>
                  
                  <form onSubmit={handleSaveProfile} className="cms-form">
                    <div className="form-row-2">
                      <div className="form-group">
                        <label>Doctor Full Name</label>
                        <input
                          type="text"
                          value={doctor.name}
                          onChange={(e) => setDoctor({ ...doctor, name: e.target.value })}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Professional Title</label>
                        <input
                          type="text"
                          value={doctor.title}
                          onChange={(e) => setDoctor({ ...doctor, title: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="form-row-2">
                      <div className="form-group">
                        <label>Doctor Image URL (Upload first in folder then copy URL here)</label>
                        <input
                          type="text"
                          value={doctor.image}
                          onChange={(e) => setDoctor({ ...doctor, image: e.target.value })}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Hospital Coordinates</label>
                        <input
                          type="text"
                          value={doctor.hospital}
                          onChange={(e) => setDoctor({ ...doctor, hospital: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Bio Summary (Paragraph 1)</label>
                      <textarea
                        rows={4}
                        value={doctor.bio_paragraphs[0] || ""}
                        onChange={(e) => {
                          const updated = [...doctor.bio_paragraphs];
                          updated[0] = e.target.value;
                          setDoctor({ ...doctor, bio_paragraphs: updated });
                        }}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Bio Summary (Paragraph 2)</label>
                      <textarea
                        rows={4}
                        value={doctor.bio_paragraphs[1] || ""}
                        onChange={(e) => {
                          const updated = [...doctor.bio_paragraphs];
                          updated[1] = e.target.value;
                          setDoctor({ ...doctor, bio_paragraphs: updated });
                        }}
                      />
                    </div>
                    <div className="form-group">
                      <label>Bio Summary (Paragraph 3)</label>
                      <textarea
                        rows={4}
                        value={doctor.bio_paragraphs[2] || ""}
                        onChange={(e) => {
                          const updated = [...doctor.bio_paragraphs];
                          updated[2] = e.target.value;
                          setDoctor({ ...doctor, bio_paragraphs: updated });
                        }}
                      />
                    </div>

                    <div className="form-group">
                      <label>Specializations (One per line)</label>
                      <textarea
                        rows={5}
                        value={doctor.specializations.join("\n")}
                        onChange={(e) => setDoctor({ ...doctor, specializations: e.target.value.split("\n").filter(Boolean) })}
                      />
                    </div>

                    <div className="form-group">
                      <label>Fellowships & Memberships (One per line)</label>
                      <textarea
                        rows={5}
                        value={doctor.fellowships.join("\n")}
                        onChange={(e) => setDoctor({ ...doctor, fellowships: e.target.value.split("\n").filter(Boolean) })}
                      />
                    </div>

                    <div className="form-group">
                      <label>Awards & Achievements (One per line)</label>
                      <textarea
                        rows={5}
                        value={doctor.awards.join("\n")}
                        onChange={(e) => setDoctor({ ...doctor, awards: e.target.value.split("\n").filter(Boolean) })}
                      />
                    </div>

                    <div className="form-group">
                      <label>Conference Presentations (One per line)</label>
                      <textarea
                        rows={5}
                        value={doctor.presentations ? doctor.presentations.join("\n") : ""}
                        onChange={(e) => setDoctor({ ...doctor, presentations: e.target.value.split("\n").filter(Boolean) })}
                      />
                    </div>

                    <div className="form-group">
                      <label>Video Presentations (One per line)</label>
                      <textarea
                        rows={5}
                        value={doctor.video_presentations ? doctor.video_presentations.join("\n") : ""}
                        onChange={(e) => setDoctor({ ...doctor, video_presentations: e.target.value.split("\n").filter(Boolean) })}
                      />
                    </div>

                    <div className="form-row-2">
                      <div className="form-group">
                        <label>Instagram Handle URL</label>
                        <input
                          type="url"
                          value={doctor.social.instagram}
                          onChange={(e) => setDoctor({ ...doctor, social: { ...doctor.social, instagram: e.target.value } })}
                        />
                      </div>
                      <div className="form-group">
                        <label>YouTube Channel URL</label>
                        <input
                          type="url"
                          value={doctor.social.youtube}
                          onChange={(e) => setDoctor({ ...doctor, social: { ...doctor.social, youtube: e.target.value } })}
                        />
                      </div>
                    </div>

                    <button type="submit" disabled={saveStatus.loading} className="save-btn">
                      Save Profile & Timeline Details
                    </button>
                  </form>
                </div>
              )}

              {activeTab === "team" && (
                <div className="tab-grid-vertical">
                  <div className="tab-card glass-panel">
                    <h3>Add Team Doctor</h3>
                    <form onSubmit={handleAddTeamMember} className="cms-form">
                      <div className="form-row-3">
                        <div className="form-group">
                          <input
                            type="text"
                            placeholder="Doctor Name *"
                            value={newTeamMember.name}
                            onChange={(e) => setNewTeamMember({ ...newTeamMember, name: e.target.value })}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="text"
                            placeholder="Role (e.g. Consultant) *"
                            value={newTeamMember.role}
                            onChange={(e) => setNewTeamMember({ ...newTeamMember, role: e.target.value })}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="text"
                            placeholder="Specialty Area *"
                            value={newTeamMember.specialty}
                            onChange={(e) => setNewTeamMember({ ...newTeamMember, specialty: e.target.value })}
                            required
                          />
                        </div>
                      </div>
                      <button type="submit" className="add-btn" style={{marginTop: "1rem"}}>➕ Add Team Member</button>
                    </form>
                  </div>

                  <div className="tab-card glass-panel">
                    <h3>Team Roster</h3>
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Doctor Name</th>
                          <th>Role</th>
                          <th>Specialty Area</th>
                          <th style={{textAlign: "right"}}>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {team.length > 0 ? (
                          team.map((m) => (
                            <tr key={m.id}>
                              <td style={{fontWeight: 700}}>{m.name}</td>
                              <td>{m.role}</td>
                              <td>{m.specialty}</td>
                              <td style={{textAlign: "right"}}>
                                <button onClick={() => handleDeleteTeamMember(m.id)} className="delete-icon-btn">🗑️ Delete</button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={4} className="no-rows">No team members registered.</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === "articles" && (
                <div className="tab-grid-vertical">
                  <div className="tab-card glass-panel">
                    <h3>Add Published Article</h3>
                    <form onSubmit={handleAddArticle} className="cms-form">
                      <div className="form-group">
                        <label>Article Title *</label>
                        <input
                          type="text"
                          value={newArticle.title}
                          onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
                          required
                        />
                      </div>
                      <div className="form-row-3">
                        <div className="form-group">
                          <label>Authors *</label>
                          <input
                            type="text"
                            placeholder="Ballal DS, et al."
                            value={newArticle.authors}
                            onChange={(e) => setNewArticle({ ...newArticle, authors: e.target.value })}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>Journal *</label>
                          <input
                            type="text"
                            placeholder="Ann Surg Oncol"
                            value={newArticle.journal}
                            onChange={(e) => setNewArticle({ ...newArticle, journal: e.target.value })}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>Year *</label>
                          <input
                            type="text"
                            placeholder="2024"
                            value={newArticle.year}
                            onChange={(e) => setNewArticle({ ...newArticle, year: e.target.value })}
                            required
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label>URL Link (PubMed/DOI)</label>
                        <input
                          type="url"
                          placeholder="https://..."
                          value={newArticle.link}
                          onChange={(e) => setNewArticle({ ...newArticle, link: e.target.value })}
                        />
                      </div>
                      <button type="submit" className="add-btn">➕ Add Publication</button>
                    </form>
                  </div>

                  <div className="tab-card glass-panel">
                    <h3>Publications Directory</h3>
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Year</th>
                          <th>Article Title</th>
                          <th>Journal</th>
                          <th style={{textAlign: "right"}}>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {articles.length > 0 ? (
                          articles.map((art) => (
                            <tr key={art.id}>
                              <td style={{color: "#00f2fe", fontWeight: 700}}>{art.year}</td>
                              <td>
                                <p style={{fontWeight: 600, fontSize: "0.85rem"}}>{art.title}</p>
                                <span style={{color: "#9ca3af", fontSize: "0.75rem"}}>{art.authors}</span>
                              </td>
                              <td style={{fontSize: "0.8rem", color: "#9ca3af"}}>{art.journal}</td>
                              <td style={{textAlign: "right"}}>
                                <button onClick={() => handleDeleteArticle(art.id)} className="delete-icon-btn">🗑️ Delete</button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={4} className="no-rows">No publications recorded.</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === "blogs" && (
                <div className="tab-grid-vertical">
                  <div className="tab-card glass-panel">
                    <h3>Add Healthcare Blog Card</h3>
                    <form onSubmit={handleAddBlog} className="cms-form">
                      <div className="form-group">
                        <label>Blog Title *</label>
                        <input
                          type="text"
                          value={newBlog.title}
                          onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                          required
                        />
                      </div>
                      <div className="form-row-2">
                        <div className="form-group">
                          <label>Date *</label>
                          <input
                            type="text"
                            placeholder="Aug 01, 2025"
                            value={newBlog.date}
                            onChange={(e) => setNewBlog({ ...newBlog, date: e.target.value })}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>Read time *</label>
                          <input
                            type="text"
                            placeholder="5 min read"
                            value={newBlog.readTime}
                            onChange={(e) => setNewBlog({ ...newBlog, readTime: e.target.value })}
                            required
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Featured Image URL * (Upload image first, then paste URL)</label>
                        <input
                          type="text"
                          value={newBlog.image}
                          onChange={(e) => setNewBlog({ ...newBlog, image: e.target.value })}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Full Article External Link URL *</label>
                        <input
                          type="url"
                          value={newBlog.link}
                          onChange={(e) => setNewBlog({ ...newBlog, link: e.target.value })}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Short Summary *</label>
                        <textarea
                          rows={3}
                          value={newBlog.summary}
                          onChange={(e) => setNewBlog({ ...newBlog, summary: e.target.value })}
                          required
                        />
                      </div>
                      <button type="submit" className="add-btn">➕ Save Blog Article</button>
                    </form>
                  </div>

                  <div className="tab-card glass-panel">
                    <h3>Blogs Roster</h3>
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Blog Details</th>
                          <th>Date</th>
                          <th style={{textAlign: "right"}}>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {blogs.length > 0 ? (
                          blogs.map((b) => (
                            <tr key={b.id}>
                              <td>
                                <p style={{fontWeight: 700}}>{b.title}</p>
                                <span style={{fontSize: "0.75rem", color: "#9ca3af"}}>{b.readTime}</span>
                              </td>
                              <td>{b.date}</td>
                              <td style={{textAlign: "right"}}>
                                <button onClick={() => handleDeleteBlog(b.id)} className="delete-icon-btn">🗑️ Delete</button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={3} className="no-rows">No blogs found.</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === "speak" && (
                <div className="tab-grid-vertical">
                  <div className="tab-card glass-panel">
                    <h3>Add Doctor's Speak Video</h3>
                    <form onSubmit={handleAddVideo} className="cms-form">
                      <div className="form-group">
                        <label>Video Title *</label>
                        <input
                          type="text"
                          value={newVideo.title}
                          onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>YouTube Link URL *</label>
                        <input
                          type="url"
                          placeholder="https://www.youtube.com/watch?v=..."
                          value={newVideo.url}
                          onChange={(e) => setNewVideo({ ...newVideo, url: e.target.value })}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Thumbnail Image URL * (Upload thumbnail image first, copy URL here)</label>
                        <input
                          type="text"
                          value={newVideo.thumbnail}
                          onChange={(e) => setNewVideo({ ...newVideo, thumbnail: e.target.value })}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Short Description *</label>
                        <textarea
                          rows={3}
                          value={newVideo.description}
                          onChange={(e) => setNewVideo({ ...newVideo, description: e.target.value })}
                          required
                        />
                      </div>
                      <button type="submit" className="add-btn">➕ Add Video Slide</button>
                    </form>
                  </div>

                  <div className="tab-card glass-panel">
                    <h3>Videos Directory</h3>
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Video Title</th>
                          <th>YouTube URL</th>
                          <th style={{textAlign: "right"}}>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {videos.length > 0 ? (
                          videos.map((v) => (
                            <tr key={v.id}>
                              <td style={{fontWeight: 700}}>{v.title}</td>
                              <td><a href={v.url} target="_blank" style={{color: "#00f2fe"}}>{v.url}</a></td>
                              <td style={{textAlign: "right"}}>
                                <button onClick={() => handleDeleteVideo(v.id)} className="delete-icon-btn">🗑️ Delete</button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={3} className="no-rows">No videos Speak slide found.</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === "media" && (
                <div className="tab-card glass-panel">
                  <h3>Image Uploader folder</h3>
                  <p className="tab-desc">Upload files to the secure `/uploads/` directory on your server. Copy the public URLs to paste in the CMS forms.</p>
                  
                  <div className="uploader-dropzone" onClick={handleSaveProfile}>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="image/*"
                      style={{display: "none"}}
                    />
                    <button
                      type="button"
                      onClick={handleUploadClick}
                      disabled={uploadProgress}
                      className="upload-trigger-btn"
                    >
                      {uploadProgress ? "Uploading image to folder..." : "📁 Upload Image File"}
                    </button>
                    <p style={{fontSize: "0.8rem", color: "#6b7280", marginTop: "0.5rem"}}>Select JPG, PNG, GIF, or WEBP images to upload.</p>
                  </div>

                  <div className="divider" style={{margin: "2rem 0", height: "1px", background: "rgba(255, 255, 255, 0.05)"}}></div>

                  <h4>Uploaded Images Grid</h4>
                  <div className="media-gallery">
                    {galleryImages.length > 0 ? (
                      galleryImages.map((img, i) => (
                        <div key={i} className="media-item-card glass-panel">
                          <div className="media-preview">
                            <img src={img.url} alt={img.name} />
                          </div>
                          <div className="media-info-block">
                            <span className="media-name">{img.name}</span>
                            <div className="media-actions-row">
                              <button onClick={() => copyToClipboard(img.url)} className="copy-url-btn">🔗 Copy URL</button>
                              <button onClick={() => handleDeleteImage(img.name)} className="delete-img-btn">🗑️ Delete</button>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="no-media">No images uploaded to `/uploads/` folder yet.</p>
                    )}
                  </div>
                </div>
              )}

              {activeTab === "settings" && (
                <div className="tab-card glass-panel">
                  <h3>Update Administrative Password</h3>
                  <form onSubmit={handleChangePasswordSubmit} className="cms-form change-pass-form">
                    <div className="form-group">
                      <label>New Access Password</label>
                      <input
                        type="password"
                        value={passwordChange.new}
                        onChange={(e) => setPasswordChange({ ...passwordChange, new: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Confirm Access Password</label>
                      <input
                        type="password"
                        value={passwordChange.confirm}
                        onChange={(e) => setPasswordChange({ ...passwordChange, confirm: e.target.value })}
                        required
                      />
                    </div>
                    <button type="submit" className="save-btn">Update Password Key</button>
                  </form>
                </div>
              )}
            </div>
          </main>
        </div>
      )}

      <style jsx>{`
        .login-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          width: 100vw;
          background: #0a0e17;
          padding: 2rem;
          color: #f3f4f6;
        }
        .login-card {
          padding: 3rem;
          width: 100%;
          max-width: 420px;
          text-align: center;
        }
        .login-card h2 {
          font-family: var(--font-accent);
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
          background: linear-gradient(135deg, #00f2fe, #4facfe);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .dev-notice {
          font-size: 0.75rem;
          background: rgba(239, 68, 68, 0.08);
          border: 1px solid rgba(239, 68, 68, 0.2);
          color: #ef4444;
          padding: 0.4rem;
          border-radius: 4px;
          margin-bottom: 1.25rem;
          font-weight: 700;
        }
        .dev-notice.php {
          background: rgba(16, 185, 129, 0.08);
          border-color: rgba(16, 185, 129, 0.2);
          color: #10b981;
        }
        .login-card p {
          font-size: 0.85rem;
          color: #9ca3af;
          margin-bottom: 2rem;
        }
        .form-group {
          margin-bottom: 1.5rem;
        }
        .form-group input {
          width: 100%;
          padding: 0.8rem 1.25rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 6px;
          color: white;
          text-align: center;
          font-size: 1rem;
        }
        .form-group input:focus {
          border-color: #00f2fe;
          outline: none;
        }
        .login-btn {
          width: 100%;
          padding: 0.85rem;
          background: linear-gradient(135deg, #00f2fe, #4facfe);
          border: none;
          color: black;
          font-weight: 700;
          border-radius: 6px;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(0, 242, 254, 0.2);
          transition: all 0.2s ease;
        }
        .login-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(0, 242, 254, 0.35);
        }
        .login-error {
          color: #ef4444;
          font-size: 0.8rem;
          margin-bottom: 1rem;
        }
        .back-link {
          display: block;
          margin-top: 1.5rem;
          font-size: 0.8rem;
          color: #9ca3af;
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .back-link:hover {
          color: #00f2fe;
        }

        .admin-layout-wrapper {
          display: flex;
          width: 100vw;
          min-height: 100vh;
        }

        /* Sidebar */
        .admin-sidebar {
          width: 260px;
          background: #0f1524;
          border-right: 1px solid rgba(255, 255, 255, 0.08);
          padding: 2.25rem 1.5rem;
          display: flex;
          flex-direction: column;
          position: sticky;
          top: 0;
          height: 100vh;
        }
        .sidebar-brand {
          margin-bottom: 2.5rem;
        }
        .sidebar-brand h4 {
          font-family: var(--font-accent);
          font-weight: 800;
          font-size: 1.25rem;
          letter-spacing: 0.05em;
          margin-bottom: 0.25rem;
        }
        .sidebar-brand span {
          color: #00f2fe;
        }
        .sidebar-brand .badge {
          font-size: 0.65rem;
          background: rgba(16, 185, 129, 0.08);
          border: 1px solid rgba(16, 185, 129, 0.2);
          color: #10b981;
          padding: 0.25rem 0.5rem;
          border-radius: 12px;
          font-weight: 700;
        }
        .sidebar-brand .badge.dev {
          background: rgba(239, 68, 68, 0.08);
          border-color: rgba(239, 68, 68, 0.2);
          color: #ef4444;
        }
        .sidebar-nav {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          flex: 1;
        }
        .sidebar-nav button {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 1rem;
          border-radius: 6px;
          border: none;
          background: transparent;
          color: #9ca3af;
          font-size: 0.85rem;
          font-weight: 600;
          text-align: left;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .sidebar-nav button:hover, .sidebar-nav button.active {
          background: rgba(255, 255, 255, 0.04);
          color: #00f2fe;
        }
        .logout-btn {
          margin-top: auto;
          color: #ef4444 !important;
          border: 1px solid rgba(239, 68, 68, 0.2) !important;
        }
        .logout-btn:hover {
          background: rgba(239, 68, 68, 0.08) !important;
        }
        .sidebar-footer {
          margin-top: 2rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          font-size: 0.75rem;
          color: #6b7280;
        }
        .view-homepage-link {
          display: block;
          margin-top: 0.5rem;
          color: #00f2fe;
          text-decoration: none;
          font-weight: 600;
        }

        /* Main Workspace */
        .admin-main {
          flex: 1;
          padding: 2.5rem 3.5rem;
          display: flex;
          flex-direction: column;
          gap: 2rem;
          overflow-y: auto;
        }
        .main-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          padding-bottom: 1.25rem;
        }
        .main-header h2 {
          font-family: var(--font-accent);
          font-size: 1.5rem;
          font-weight: 700;
        }
        .header-info span {
          font-size: 0.85rem;
          color: #9ca3af;
        }
        .work-content {
          flex: 1;
        }
        .tab-card {
          padding: 2.5rem;
        }
        .tab-card h3 {
          font-family: var(--font-accent);
          font-size: 1.25rem;
          margin-bottom: 0.25rem;
        }
        .tab-desc {
          font-size: 0.8rem;
          color: #9ca3af;
          margin-bottom: 2.25rem;
        }

        /* Forms CMS */
        .cms-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .cms-form label {
          font-size: 0.75rem;
          font-weight: 700;
          color: #9ca3af;
          margin-bottom: 0.5rem;
        }
        .cms-form input, .cms-form textarea, .cms-form select {
          padding: 0.75rem 1rem;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 6px;
          color: white;
          font-size: 0.85rem;
          width: 100%;
        }
        .cms-form input:focus, .cms-form textarea:focus, .cms-form select:focus {
          border-color: #00f2fe;
          outline: none;
          background: rgba(255, 255, 255, 0.04);
        }
        .form-row-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }
        .form-row-3 {
          display: grid;
          grid-template-columns: 1.2fr 1fr 1fr;
          gap: 1.25rem;
        }
        .save-btn {
          padding: 0.85rem;
          background: linear-gradient(135deg, #00f2fe, #4facfe);
          color: black;
          font-weight: 700;
          border-radius: 6px;
          border: none;
          cursor: pointer;
          font-size: 0.85rem;
          transition: all 0.2s ease;
          width: fit-content;
          align-self: flex-start;
          padding-left: 2rem;
          padding-right: 2rem;
        }
        .save-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 15px rgba(0, 242, 254, 0.3);
        }
        .add-btn {
          padding: 0.75rem 1.5rem;
          background: #00f2fe;
          color: black;
          font-weight: 700;
          border-radius: 6px;
          border: none;
          cursor: pointer;
          font-size: 0.8rem;
          white-space: nowrap;
          height: fit-content;
        }
        .add-btn:hover {
          opacity: 0.9;
        }
        .tab-grid-vertical {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        /* Tables */
        .admin-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 1rem;
        }
        .admin-table th {
          text-align: left;
          font-size: 0.75rem;
          color: #6b7280;
          text-transform: uppercase;
          padding: 0.75rem 1rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }
        .admin-table td {
          padding: 1.25rem 1rem;
          font-size: 0.85rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.03);
          color: #f3f4f6;
        }
        .delete-icon-btn {
          background: transparent;
          border: 1px solid rgba(239, 68, 68, 0.15);
          color: #ef4444;
          padding: 0.35rem 0.75rem;
          font-size: 0.75rem;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .delete-icon-btn:hover {
          background: rgba(239, 68, 68, 0.1);
        }
        .no-rows {
          text-align: center;
          color: #6b7280;
          padding: 2.5rem !important;
        }

        /* Uploader styling */
        .uploader-dropzone {
          border: 2px dashed rgba(255, 255, 255, 0.1);
          padding: 3rem;
          border-radius: 8px;
          text-align: center;
          background: rgba(255, 255, 255, 0.01);
          cursor: pointer;
          transition: var(--transition-fast);
        }
        .uploader-dropzone:hover {
          border-color: #00f2fe;
          background: rgba(0, 242, 254, 0.02);
        }
        .upload-trigger-btn {
          background: #00f2fe;
          color: black;
          font-weight: 700;
          padding: 0.75rem 1.5rem;
          border-radius: 6px;
          border: none;
          cursor: pointer;
          font-size: 0.85rem;
        }

        /* Media Gallery */
        .media-gallery {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 1.5rem;
          margin-top: 1.5rem;
        }
        .media-item-card {
          padding: 0;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        .media-preview {
          width: 100%;
          aspect-ratio: 1;
          background: #222;
          overflow: hidden;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }
        .media-preview img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .media-info-block {
          padding: 0.85rem;
        }
        .media-name {
          display: block;
          font-size: 0.7rem;
          color: #9ca3af;
          margin-bottom: 0.5rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .media-actions-row {
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        }
        .copy-url-btn {
          flex: 1;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: white;
          font-size: 0.65rem;
          padding: 0.35rem;
          border-radius: 4px;
          cursor: pointer;
          font-weight: 600;
        }
        .copy-url-btn:hover {
          border-color: #00f2fe;
          color: #00f2fe;
        }
        .delete-img-btn {
          background: transparent;
          border: 1px solid rgba(239, 68, 68, 0.2);
          color: #ef4444;
          font-size: 0.65rem;
          padding: 0.35rem;
          border-radius: 4px;
          cursor: pointer;
        }
        .delete-img-btn:hover {
          background: rgba(239, 68, 68, 0.1);
        }
        .no-media {
          grid-column: 1 / -1;
          text-align: center;
          color: #6b7280;
          padding: 3rem 0;
          font-size: 0.85rem;
        }

        .change-pass-form {
          max-width: 400px;
        }

        /* Toasts */
        .toast {
          position: fixed;
          top: 2rem;
          right: 3rem;
          padding: 1rem 2rem;
          border-radius: 8px;
          font-size: 0.85rem;
          font-weight: 600;
          z-index: 10000;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
          animation: float 0.3s ease;
        }
        .toast-loading {
          background: #1e293b;
          color: #e2e8f0;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .toast-success {
          background: #064e3b;
          color: #a7f3d0;
          border: 1px solid #059669;
        }
        .toast-error {
          background: #7f1d1d;
          color: #fca5a5;
          border: 1px solid #dc2626;
        }
      `}</style>
    </div>
  );
}
