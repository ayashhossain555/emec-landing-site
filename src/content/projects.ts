import type { CaseStudy, Project, ProjectCategory } from "./types";

export const categories: Record<ProjectCategory, { label: string; color: string }> = {
  river: { label: "Rivers & bridges", color: "#1f7fae" },
  water: { label: "Drainage & water", color: "#3f8a78" },
  env: { label: "Environment & social", color: "#7a8f3a" },
  plan: { label: "AI, GIS & planning", color: "#a07a10" },
};

type Row = [name: string, duration: string, client: string, location: string, category: ProjectCategory];

const rows: Row[] = [
  ["Hydro-morphological Study and Drainage and Flood Protection Design for Mulavibazar Solar Power Plant", "Ongoing", "—", "Bangladesh", "water"],
  ["Hydro-morphological Study and Drainage and Flood Protection Design for Patuakhali Solar Power Plant", "6 months", "RPCL", "Bangladesh", "water"],
  ["Drainage Design for Nobinagar-EPZ-Kalikair (Chandra) (N-540) Highway from Balibhadra to Chandra", "3 months", "RHD / DECL", "Bangladesh", "water"],
  ["Feasibility study of Dhour-Kadda-Salna Road", "3 months", "Bangladesh Planning Commission / EPC", "Bangladesh", "plan"],
  ["Global Urban Flood Detection Using ML and SAR Imagery", "Ongoing", "Pacific Consultants (PCKK)", "Japan / Worldwide", "plan"],
  ["SURF IT Project — real-time flood and wave prediction with WRF, ADCIRC, SWAN and ML", "Ongoing", "North South University / Action Against Hunger", "Bangladesh", "plan"],
  ["Enhancement of River Morphology and Structure Monitoring in Jamuna River — ML bathymetry detection from SAR and gauge data", "Ongoing", "JICA", "Bangladesh", "plan"],
  ["Design and Development of a Web-Based GIS Interface for Real-Time Operations and Maintenance Tracking (Nodi Project)", "Ongoing", "JICA", "Bangladesh", "plan"],
  ["Initial Environmental Examination for Flood Risk Management Plan, Matamuhuri and Sangu river basins", "Ongoing", "JICA", "Bangladesh", "env"],
  ["Implementation of AI System for Store Stocking and Image Detection", "5 months", "Faztrack LLC", "USA", "plan"],
  ["Khulna WASA Water Supply Project Phase 2 — feasibility, river hydraulic and salinity modelling", "24 months", "Khulna WASA (ADB)", "Bangladesh", "water"],
  ["Baseline and Technical Assessment on \"Strengthening Resilience through Gender-Responsive and Integrated Services (RISE)\" project in Barishal City", "Ongoing", "BRAC", "Bangladesh", "env"],
  ["Baseline Study under the CONNECT Project – Better Protection of Mangroves, Swamp Forests and Marine Areas", "Ongoing", "GIZ", "Bangladesh", "env"],
  ["Project for planning capacity enhancement and establishment of a technology adaptation cycle on comprehensive river management", "36 months", "JICA, BWDB", "Bangladesh", "river"],
  ["Detailed design of 4-lane Buriganga Bridge at Postagola and preliminary design of Buriganga Bridge at Fatulla", "8 months", "Roads and Highways Department", "Bangladesh", "river"],
  ["Hydrological and morphological study for the development of Pabna, Kushtia, Narail and Chandpur Economic Zones", "15 months", "BEZA", "Bangladesh", "river"],
  ["Cumilla University water network, sewer, drainage, hydrology and hydraulic modeling, water and wastewater treatment", "12 months", "Cumilla University / Bangladesh Army 14th Brigade", "Bangladesh", "water"],
  ["BSMSN – Mirsarai Economic Zone’s Storm Water Drainage System Assessment and Re-Design", "12 months", "BEZA", "Bangladesh", "water"],
  ["Detailed Hydro Morphological Assessment for the Proposed Power Plant at Amin Bazar, Dhaka", "8 months", "RAJUK", "Bangladesh", "river"],
  ["Biodiversity Management Plan for Construction Supervision of Kewatkhali Bridge at Mymensingh", "8 months", "RHD / AIIB", "Bangladesh", "env"],
  ["Hydrology and hydraulic modeling of Stormwater Drainage for the Feasibility Study of Nobinagar-EPZ-Kalikair (Chandra) (N-540) Highway", "3 months", "RHD / DECL", "Bangladesh", "water"],
  ["Large Bridge Hydrological and morphological study of 41 bridges over 100 m", "12 months", "LGED", "Bangladesh", "river"],
  ["Detailed hydro morphologic study of proposed 400 and 500 m bridge at Birampur and Aditmari Upazila, Dinajpur", "3 months", "LGED", "Bangladesh", "river"],
  ["Hydrological and morphological modeling for proposed bridges over 100 m in Gaibandha, Nilphamari, Pirganj, Ranishkali, Thakurgaon", "3 months", "LGED", "Bangladesh", "river"],
  ["Transaction and review of the feasibility of Meghna Bridge PPP", "12 months", "Bangladesh Bridge Authority", "Bangladesh", "river"],
  ["Hydro Morphology study of two canals in Jalshiri Abashan", "7 days", "14th Brigade Bangladesh Army", "Bangladesh", "river"],
  ["Hydro Morphology study of 890 m span bridge over river Dhaleshwari on proposed Dhaka Middle Ring Road", "5 months", "Roads and Highways Department", "Bangladesh", "river"],
  ["Feasibility Study and Detailed Design of Kewatkhali Bridge over the Brahmaputra at Mymensingh with Railway Overpass and 4-Lane Approach", "8 months", "Roads and Highways Department", "Bangladesh", "river"],
  ["Small Scale Water Resources Development Project – Hydrologist", "1.5 years", "LGED", "Bangladesh", "water"],
  ["Strategic Master Plan for Mongla Port, Morphology Study", "6 months", "Mongla Port Authority", "Bangladesh", "river"],
  ["Hydro Morphology Feasibility Study of Balu River Bridge", "6 months", "RAJUK", "Bangladesh", "river"],
  ["TA 9546 BAN: Hydrology for Implementing the Emergency Assistance Project", "5 months", "DPHE", "Bangladesh", "water"],
  ["Hydrology and Morphology assessment for Jamalpur Joydevpur New Railway Project", "5 months", "Bangladesh Railway", "Bangladesh", "river"],
  ["Hydrology and Morphology assessment Mirsarai EZ Connecting Railway Project", "5 months", "Bangladesh Railway", "Bangladesh", "river"],
  ["Hydrological and Morphological Study of 14 Bridges in Kishoreganj, Mymensingh, Jamalpur, Rajbari, Kushtia, Narayanganj, Tangail and Gazipur", "6 months", "LGED", "Bangladesh", "river"],
  ["Model, design and BOQ for water network, sewer, drainage, water and wastewater treatment", "6 months", "Sirajganj Economic Zone", "Bangladesh", "water"],
  ["Design and Feasibility Assessment of Graphic Textiles 40 MLD Effluent Treatment Plant", "3 months", "Graphic Textiles", "Bangladesh", "water"],
  ["Jal Marg Vikas Project (JMVP) for capacity augmentation of navigation on National Waterway-1", "1 month", "Inland Waterways Authority of India", "India", "river"],
  ["Feasibility Study for 500 MLD Surface Water Treatment Plant of Narayanganj City Corporation", "18 months", "Narayanganj City Corporation", "Bangladesh", "water"],
  ["Dhaka North Water Supply Improvement Project (ADB)", "13 months", "Dhaka WASA", "Bangladesh", "water"],
  ["Climate Smart Agricultural Water Development Project", "12 months", "BWDB", "Bangladesh", "water"],
  ["Project Implementation Support Consultant (PISC), Climate-Resilient Omchhu River Basin Project (ADB Loan 4634-BHU)", "Ongoing", "Phuentsholing Thromde / ADB", "Bhutan", "river"],
  ["Asset Management System — Business and Functional Requirements, Omchhu River Basin", "Ongoing", "Phuentsholing Thromde / ADB", "Bhutan", "plan"],
];

export const projects: Project[] = rows.map(([name, duration, client, location, category]) => ({
  name, duration, client, location, category,
}));

export const featured: CaseStudy[] = [
  {
    slug: "comprehensive-river-management",
    short: "Comprehensive river management capacity enhancement",
    name: "Project for Planning Capacity Enhancement and Establishment of a Technology Adaptation Cycle on Comprehensive River Management",
    client: "JICA · BWDB",
    location: "Jamuna, Sangu and Matamuhuri Rivers",
    country: "Bangladesh",
    facts: [
      { k: "Client", v: "Japan International Cooperation Agency (JICA), Bangladesh Water Development Board (BWDB)" },
      { k: "Location", v: "Jamuna River, Sangu River and Matamuhuri River" },
      { k: "Duration", v: "Ongoing since 2022" },
      { k: "Associated consultants", v: "Oriental Consultants Global Co. Ltd, Pacific Consultants Co., Ltd." },
    ],
    narrative:
      "The project aims to develop systematic river management methods suited to Bangladesh's diverse rivers. It focuses on major rivers like the Jamuna, and smaller rivers in the southeast, while enhancing BWDB staff capacity through knowledge tools and management plans. By tackling riverbank erosion, sedimentation, and channel shifting, the project supports sustainable river management in line with Bangladesh’s Delta Plan 2100 and the SDGs.",
    services: [
      "Baseline Study", "Socio-economic Study", "River Migration Analysis",
      "Hydrological Data Collection and Analysis", "Drone Survey",
      "Multibeam Echo Sounder Survey, Side Scan Sonar Survey, and Sub-bottom Profiler Survey",
      "FGD and Questionnaire Survey", "Stakeholders Meetings", "Development of Database System",
    ],
  },
  {
    slug: "mirsarai-stormwater-drainage",
    short: "Stormwater drainage model, design and BOQ — Mirsarai Economic Zone",
    name: "Consultancy Service for the Model, Design, BOQ for Stormwater Drainage of Mirsarai Economic Zone",
    client: "BEZA",
    location: "Mirsarai",
    country: "Bangladesh",
    facts: [
      { k: "Client", v: "Bangladesh Economic Zone Authority (BEZA)" },
      { k: "Location", v: "Mirsarai, Bangladesh" },
      { k: "Duration", v: "12 months" },
    ],
    narrative:
      "The project involved providing consultancy services for the modeling, detailed design, and preparation of Bill of Quantities (BOQ) for the stormwater drainage system of Mirsarai Economic Zone. The objective was to develop an efficient and sustainable drainage network capable of managing stormwater runoff, minimizing flood risks, and supporting industrial and infrastructural development within the economic zone.",
    services: [
      "Site assessment and data collection on topography, rainfall, and drainage patterns",
      "Hydrological and hydraulic modeling to design the stormwater management system",
      "Design of drainage network",
      "Preparation of detailed drawings and technical specifications",
      "Preparation of Bill of Quantities (BOQ) and cost estimation",
      "Recommendations for sustainable drainage solutions and flood mitigation measures",
    ],
  },
  {
    slug: "kewatkhali-bridge-biodiversity",
    short: "Biodiversity and noise assessment — Kewatkhali Bridge",
    name: "Biodiversity and Noise Assessment for the Construction of the Mymensingh Kewatkhali Bridge Project",
    client: "RHD",
    location: "Mymensingh",
    country: "Bangladesh",
    facts: [
      { k: "Client", v: "Roads and Highways Department (RHD)" },
      { k: "Location", v: "Mymensingh, Bangladesh" },
      { k: "Duration", v: "8 months" },
    ],
    narrative:
      "The project involved conducting a biodiversity and noise assessment for the proposed construction of the Kewatkhali Bridge over the Brahmaputra River in Mymensingh. The objective was to evaluate potential impacts of the bridge construction on local ecosystems, flora and fauna, and ambient noise levels, and to recommend mitigation measures to ensure environmental compliance and sustainable project development.",
    services: [
      "Baseline survey of terrestrial and aquatic biodiversity in the project area",
      "Assessment of sensitive species, habitats, and ecological hotspots",
      "Measurement and analysis of existing ambient noise levels",
      "Prediction of noise impacts during construction and operation phases",
      "Identification of potential ecological risks and disturbances",
      "Development of mitigation and management plans for biodiversity and noise control",
      "Preparation of assessment reports in accordance with national environmental regulations and project requirements",
    ],
  },
  {
    slug: "buriganga-bridge",
    short: "4-lane Buriganga Bridge at Postagola and Fatulla",
    name: "Detailed Design of 4-Lane Buriganga Bridge at Postagola and Preliminary Design of Buriganga Bridge at Fatulla",
    client: "RHD · DECL",
    location: "Dhaka",
    country: "Bangladesh",
    facts: [
      { k: "Client", v: "Roads and Highways Department (RHD)" },
      { k: "Location", v: "Dhaka, Bangladesh" },
      { k: "Duration", v: "8 months" },
      { k: "Associated consultants", v: "Delight Engineers and Consultants Ltd. (DECL)" },
    ],
    narrative:
      "The project involved the detailed design of a new 4-lane bridge over the Buriganga River at Postagola and the preliminary design of another bridge at Fatulla to improve connectivity in Dhaka and Narayanganj regions. The assignment focused on enhancing transport infrastructure to reduce congestion, support regional economic growth, and ensure safe, sustainable river crossings through modern structural and hydraulic design practices.",
    services: [
      "Hydrological Data Collection and Analysis", "Hydraulic Analysis", "Morphological Analysis",
      "Sediment Transport Modeling", "River Training Work Necessity Assessment, Design and Cost Estimation",
    ],
  },
];
