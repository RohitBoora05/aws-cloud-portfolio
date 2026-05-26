export const ACCENT = "#7C6FD4";
export const ACCENT2 = "#A78BFA";
export const BG = "#0A0A0F";
export const BG2 = "#0F0F1A";
export const BG3 = "#13131F";
export const BORDER = "rgba(124,111,212,0.15)";
export const TEXT = "#E8E8F0";
export const MUTED = "#8888A8";

export const NAV_LINKS = ["About", "What I Do", "Experience", "Projects", "Stack", "Connect"];

export const SKILLS_WHAT = [
 {
  title: "AI Developer", icon: "🧠",
  points: [
   "3rd year BTech student in AI & Data Science",
   "Builds small models for analytics and data analysis",
   "Studies AI from a safety & security perspective",
   "Exploring mechanistic interpretability",
   "Understands models internally — not just uses them",
   "Daily LLM practitioner with a critical, research-oriented mindset",
  ],
 },
 {
  title: "Cloud Engineer", icon: "☁️",
  points: [
   "Building hands-on cloud infrastructure via this portfolio",
   "Preparing for AWS Cloud Practitioner certification",
   "Working with S3, CloudFront, Lambda, DynamoDB, EC2",
   "Infrastructure as Code with Terraform & Docker",
   "Learning from fundamentals — the right way",
  ],
 },
];

export const EXPERIENCE = [
  { period: "Q4 2024", title: "Fundamentals: C Programming", desc: "Studied core programming concepts, memory management, and control flow. Built a number guessing game with hot/cold proximity hints — first project beyond coursework." },
 { period: "Q2 2025", title: "Python & Scripting", desc: "Transitioned to Python, focused on scripting, automation, and building practical tools from scratch." },
 { period: "Q3 2025", title: "SIH Hackathon Preparation: Stream Selector", desc: "Developed an AI-based academic stream recommendation system during SIH preparation round. Processed student response data to classify suitable career streams." },
 { period: "Q1 2026 (Feb)", title: "Internship: ShadowFox | Python Development", desc: "Delivered Hangman game, a BeautifulSoup web scraper, and an advanced NLP analysis project. First production-level Python work in a structured environment." },
 { period: "Q1 2026", title: "BERT Architecture Analysis", desc: "Independent deep dive into transformer internals — analysed encoder layers, multi-head attention mechanisms, and token embeddings using HuggingFace. Fully documented on GitHub." },
 { period: "Q1 2026 (Mar)", title: "AWS Workshop: Cloud Foundations", desc: "Hands-on provisioning of core AWS services — S3, EC2, RDS, IAM, Elastic Load Balancer, CloudWatch, VPC. First structured exposure to cloud infrastructure management." },
 { period: "Q2 2026", title: "Mechanistic Interpretability", desc: "Encountered the MI review paper while researching model internals. Pivoted toward AI safety and interpretability research as a long-term focus area." },
 { period: "Q2 2026(May)", title: "AWS Portfolio + Certification Track", desc: "Building production-grade cloud infrastructure — S3, CloudFront, Lambda, DynamoDB, EC2, Terraform, Docker. Actively preparing for AWS Cloud Practitioner certification." },
];

export const PROJECTS = [
 { num: "01", title: "Explain My Mistake Engine", desc: "A cognitive mistake taxonomy framework for GATE CS exam analysis. Identifies which mental process failed at the moment of decision — 8 non-overlapping cognitive failure categories. Built for post-exam self-diagnosis, not topic tracking.", tags: ["Python", "Cognitive Science", "ML", "NLP"], link: "https://github.com/RohitBoora05/Explain-my-mistake-engine", status: "In Progress" },
 { num: "02", title: "BERT Architecture Analysis", desc: "Deep analysis of Google's BERT model — encoder layers, multi-head attention mechanisms, token embeddings. First hands-on study of transformer internals from a mechanistic perspective. Fully documented on GitHub.", tags: ["Python", "HuggingFace", "Transformers", "Jupyter"], link: "https://github.com/RohitBoora05/SHADOWFOX", status: "Complete" },
 { num: "03", title: "AWS Cloud Portfolio", desc: "Production-grade cloud infrastructure built from scratch — serverless visitor counter, FastAPI AI backend, CI/CD pipeline via GitHub Actions. Covers S3, CloudFront, Lambda, DynamoDB, EC2, Terraform, Docker.", tags: ["AWS", "React", "Lambda", "Terraform", "Docker"], link: "https://github.com/RohitBoora05/aws-cloud-portfolio", status: "In Progress" },
 { num: "04", title: "Career Stream Advisor", desc: "AI-based academic stream recommendation system. Processes student responses to classify suitable career paths between Science and Commerce streams. Built during SIH preparation round.", tags: ["Python", "AI", "Classification", "NLP"], link: "https://github.com/RohitBoora05/career-stream-advisor", status: "Complete" },
];

export const STACK_ROWS = [
 {
  label: "Languages & Web",
  color: "#7C6FD4",
  items: [
   { name: "Python", logo: "PY", color: "#3776AB" },
   { name: "JavaScript", logo: "JS", color: "#F7DF1E" },
   { name: "C", logo: "C", color: "#5C6BC0" },
   { name: "C++", logo: "C++", color: "#00599C" },
   { name: "R", logo: "R", color: "#276DC3" },
   { name: "React", logo: "⚛", color: "#61DAFB" },
   { name: "FastAPI", logo: "⚡", color: "#009688" },
   { name: "HTML", logo: "HT", color: "#E34F26" },
   { name: "CSS", logo: "CS", color: "#1572B6" },
   { name: "Vite", logo: "V", color: "#646CFF" },
  ],
 },
 {
  label: "AI / ML & Python Libraries",
  color: "#EE4C2C",
  items: [
   { name: "PyTorch", logo: "🔥", color: "#EE4C2C" },
   { name: "TensorFlow", logo: "TF", color: "#FF6F00" },
   { name: "HuggingFace", logo: "🤗", color: "#FFD21E" },
   { name: "Transformers", logo: "TR", color: "#A78BFA" },
   { name: "BERT", logo: "BE", color: "#4285F4" },
   { name: "Scikit-learn", logo: "SK", color: "#F7931E" },
   { name: "NumPy", logo: "NP", color: "#4DABCF" },
   { name: "Pandas", logo: "PD", color: "#150458" },
   { name: "Matplotlib", logo: "MP", color: "#11557C" },
   { name: "Seaborn", logo: "SB", color: "#4C72B0" },
   { name: "Mech. Interp.", logo: "MI", color: "#7C6FD4" },
   { name: "BeautifulSoup", logo: "BS", color: "#3E8B5E" },
   { name: "Jupyter", logo: "J", color: "#F37626" },
   { name: "Requests", logo: "RQ", color: "#2196F3" },
  ],
 },
 {
  label: "AWS Cloud",
  color: "#FF9900",
  items: [
   { name: "S3", logo: "S3", color: "#FF9900" },
   { name: "EC2", logo: "EC2", color: "#FF9900" },
   { name: "Lambda", logo: "λ", color: "#FF9900" },
   { name: "DynamoDB", logo: "DB", color: "#FF9900" },
   { name: "CloudFront", logo: "CF", color: "#FF9900" },
   { name: "API Gateway", logo: "AG", color: "#FF9900" },
   { name: "IAM", logo: "IAM", color: "#FF9900" },
   { name: "CloudWatch", logo: "CW", color: "#FF9900" },
   { name: "RDS", logo: "RDS", color: "#FF9900" },
   { name: "VPC", logo: "VPC", color: "#FF9900" },
   { name: "SNS", logo: "SNS", color: "#FF9900" },
   { name: "ELB", logo: "ELB", color: "#FF9900" },
   { name: "Aurora", logo: "AU", color: "#FF9900" },
   { name: "ElastiCache", logo: "EC", color: "#FF9900" },
   { name: "AMIs", logo: "AM", color: "#FF9900" },
  ],
 },
 {
  label: "DevOps, OS & Tools",
  color: "#7B42BC",
  items: [
   { name: "Docker", logo: "🐳", color: "#2496ED" },
   { name: "Terraform", logo: "TF", color: "#7B42BC" },
   { name: "GitHub Actions", logo: "GA", color: "#2088FF" },
   { name: "Git", logo: "GIT", color: "#F05032" },
   { name: "Linux", logo: "🐧", color: "#FCC624" },
   { name: "Ubuntu", logo: "UB", color: "#E95420" },
   { name: "WSL", logo: "WS", color: "#0078D4" },
   { name: "VS Code", logo: "VS", color: "#007ACC" },
   { name: "GitHub", logo: "GH", color: "#E8E8F0" },
   { name: "AWS CLI", logo: "CLI", color: "#FF9900" },
   { name: "Virtual Machines", logo: "VM", color: "#607D8B" },
   { name: "R Studio", logo: "RS", color: "#276DC3" },
  ],
 },
];
