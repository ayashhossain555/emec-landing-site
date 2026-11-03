export const site = {
  name: "EMEC",
  fullName: "Environmental Management & Engineering Consultant",
  url: "https://emecbd.com",
  founded: 2018,
  city: "Dhaka",
  description:
    "EMEC combines hydro-morphologic and computational fluid dynamics modeling with machine learning, remote sensing and WebGIS platforms to solve complex problems in bridge, river embankment, revetment and drainage design.",
  address: "Apt 1-B, House No.-4/1, Block A, Lalmatia, Dhaka-1207, Bangladesh",
  addressShort: "Lalmatia, Dhaka-1207",
  phone: { display: "+880 1706 499827", href: "tel:+8801706499827" },
  emails: {
    primary: "emec.servicesbd@gmail.com",
    secondary: "info@emecbd.com",
  },
  countries: ["Bangladesh", "Bhutan", "India", "Ireland", "Japan", "USA"],
} as const;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/digital", label: "AI & Digital" },
  { href: "/projects", label: "Projects" },
  { href: "/team", label: "Team" },
  { href: "/contact", label: "Contact" },
] as const;

export const footerExpertise = [
  { label: "Rivers & bridges", href: "/services" },
  { label: "Drainage & water", href: "/services" },
  { label: "Environment", href: "/services" },
  { label: "AI & machine learning", href: "/digital" },
  { label: "WebGIS & remote sensing", href: "/digital" },
] as const;

export const pillars = [
  {
    color: "var(--c-blue)",
    title: "Specialized modeling",
    text: "The combination of EMEC staff knowledge and experience and the expertise in modeling and developing state of the art artificial intelligence have resulted in many satisfied and repeat clients.",
  },
  {
    color: "var(--c-sage)",
    title: "Adaptive management",
    text: "Since its inception, staff at EMEC have applied a multidisciplinary, adaptive management approach to the projects we undertake, finding solutions that are cost-effective and environmentally sound.",
  },
  {
    color: "var(--c-gold)",
    title: "Quality assurance",
    text: "EMEC is committed to providing services with quality assurance and standard-keeping backup support of all data and information, as required by clients.",
  },
];

export const software = [
  "Plaxis 2D/3D", "Civil 3D", "AutoCAD", "ArcGIS", "ArcGIS Pro", "ERDAS IMAGINE",
  "HEC-RAS", "HEC-SSP", "HEC-DSSVue", "MIKE Zero", "Aquaveo SMS 13.2", "PCSWMM",
  "GPS-X", "SPSS", "Photoshop", "Illustrator",
];

export const stack = [
  "Python", "PyTorch", "FastAPI", "React", "Node.js", "PostgreSQL / PostGIS",
  "GeoServer", "SNAP", "ArcGIS Pro", "Docker",
];

export const stackFull = [
  "Python", "PyTorch", "TensorFlow", "FastAPI", "React", "Node.js", "PostgreSQL",
  "PostGIS", "GeoServer", "SNAP", "Sentinel-1 SAR", "ArcGIS Pro", "ERDAS IMAGINE",
  "QGIS", "Docker", "PM2", "S3 / MinIO", "DBeaver", "HEC-RAS", "MIKE 21",
];
