import type { Client, TeamMember } from "./types";

// Logos: local copies from Wikimedia Commons / Wikipedia or the organisation's own site. Add more by
// dropping files into public/clients/ and setting `logo: "/clients/<file>"`.
export const clients: Client[] = [
  { abbr: "World Bank", name: "The World Bank", logo: "/clients/world-bank.svg" },
  { abbr: "ADB", name: "Asian Development Bank", logo: "/clients/adb.svg" },
  { abbr: "JICA", name: "Japan International Cooperation Agency", logo: "/clients/jica.svg" },
  { abbr: "AIIB", name: "Asian Infrastructure Investment Bank", logo: "/clients/aiib.svg" },
  { abbr: "GIZ", name: "Deutsche Gesellschaft für Internationale Zusammenarbeit", logo: "/clients/giz.svg" },
  { abbr: "BWDB", name: "Bangladesh Water Development Board", logo: "/clients/bwdb.png" },
  { abbr: "PCKK", name: "Pacific Consultants Co., Ltd.", logo: "/clients/pckk.png" },
  { abbr: "OCG", name: "Oriental Consultants Global Co., Ltd.", logo: "/clients/ocg.png" },
  { abbr: "BRAC", name: "BRAC", logo: "/clients/brac.png" },
  { abbr: "RHD", name: "Roads and Highways Department", logo: "/clients/rhd.png" },
  { abbr: "BBA", name: "Bangladesh Bridge Authority", logo: "/clients/bba.png" },
  { abbr: "BEZA", name: "Bangladesh Economic Zones Authority", logo: "/clients/beza.svg" },
  { abbr: "LGED", name: "Local Government Engineering Department", logo: "/clients/lged.svg" },
  { abbr: "DWASA", name: "Dhaka Water Supply and Sewerage Authority", logo: "/clients/dwasa.svg" },
  { abbr: "RAJUK", name: "Rajdhani Unnayan Kartripakkha", logo: "/clients/rajuk.jpg" },
  { abbr: "DPHE", name: "Department of Public Health Engineering" },
  { abbr: "IIFC", name: "Infrastructure Investment Facilitation Company", logo: "/clients/iifc.jpg" },
  { abbr: "PT", name: "Phuentsholing Thromde, Bhutan" },
  { abbr: "KWASA", name: "Khulna WASA", logo: "/clients/kwasa.png" },
  { abbr: "14th Bde", name: "14th Brigade Bangladesh Army" },
  { abbr: "NSU", name: "North South University", logo: "/clients/nsu.svg" },
  { abbr: "JDI", name: "Japan Development Institute", logo: "/clients/jdi.png" },
  { abbr: "DECL", name: "Delight Engineers & Consultants Ltd" },
  { abbr: "EPC", name: "Engineering and Planning Consultants" },
  { abbr: "SPMC", name: "Strategic Planning and Management Consultants Ltd" },
  { abbr: "DDC", name: "Development Design Consultants Ltd.", logo: "/clients/ddc.png" },
  { abbr: "HTL", name: "HeptaTech Limited" },
  { abbr: "D.zignscape", name: "D.zignscape Consultants Ltd.", logo: "/clients/dzignscape.png" },
  { abbr: "AIA", name: "A. I. Associates Ltd." },
  { abbr: "CCECC", name: "China Civil Engineering Construction Corporation", logo: "/clients/ccecc.png" },
];

export const team: TeamMember[] = [
  { name: "Shahzad Khan", role: "CEO", qual: "M.Sc. in Water Resources and Environmental Engineering", years: 30, skills: ["Project Management and Coordination, Monitoring and Evaluation", "Hydro-morphological analysis of river", "Stormwater drainage master plan", "Water distribution network modeling and design"] },
  { name: "Syed Zakir Hossein", qual: "PhD Hydrology", years: 25, skills: ["Leakage and non-revenue water (NRW) analysis", "Morphological and hydrological study of river system and estuary", "Determination of scour depth, rate of siltation", "River management plans with necessary river training works"] },
  { name: "Sudhir Kumar Sharma", qual: "B.Sc in Civil Engineering", years: 31, skills: ["Morphological and hydrological study of river system and estuary", "Review of existing roads & highway alignments and hydraulic structures", "Planning, designing and operation of recurrent measures for river training"] },
  { name: "Khandakar Mohammad Abdul Qayum", qual: "M.Sc. in Environmental Sciences", years: 15, skills: ["Ecological Monitoring", "Digital Data Collection — Survey Solutions, OpenForis, KoboToolbox", "Geospatial Analysis in ArcGIS", "Climate Risk and Vulnerability Assessments and Nature-based Solutions"] },
  { name: "Abdul Baki", qual: "B.Sc in Civil Engineering", years: 10, skills: ["GIS data process & analysis, map preparing", "Topography Survey, Total Station, Hand GPS", "Transmission & Distribution Water Pipe Network drawings"] },
  { name: "Sowmitra Das", qual: "B.Sc in Civil Engineering (BUET)", years: 6, skills: ["Stormwater drainage, Water supply network master plan", "Watershed hydrology and hydraulics", "Predicting river migration using DSAS"] },
  { name: "Salemun Bahar", qual: "M.Sc. in Environmental Science and Management · B.Sc. in Civil and Environmental Engineering (NSU)", years: 6, skills: ["1-D and 2-D models using HEC RAS, Mike 21, Aquaveo SMS 13.2", "Determination of scour depth, rate of siltation", "Drawing, map and analysis using Civil 3D and GIS"] },
  { name: "Ayash Hossain Chowdhury", qual: "B.Sc. in Computer Science and Engineering (BRAC University), Magna Cum Laude", years: 5, skills: ["AI/ML pipelines: SAR and optical flood detection, deep learning", "Full-stack web apps and APIs: Next.js, Node.js, FastAPI, PostGIS", "RAG systems and real-time voice agents", "Urban Flood Detection (UFD): SAR/optical ML pipeline and on-demand API services"] },
  { name: "Shohel Dhali", role: "Operations Manager", years: 13, skills: ["Accounts and financial management", "Field work and survey management", "Project operations and logistics"] },
];
