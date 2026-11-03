import type { DigitalCapability, DigitalCaseStudy, ServiceGroup } from "./types";

export const services: ServiceGroup[] = [
  {
    num: "01",
    color: "var(--c-blue)",
    title: "Rivers, bridges & hydro-morphology",
    blurb: "1D, 2D and 3D hydraulic and morphologic modeling and computational fluid dynamics for bridge, river embankment and revetment design.",
    items: ["1D, 2D and 3D Hydro Morphologic Modeling", "Hydro Morphologic Design of Bridges", "Fluvial Geomorphology", "Flood Plain Modeling", "Geotechnical Analysis and Design"],
  },
  {
    num: "02",
    color: "var(--c-sage)",
    title: "Water & municipal infrastructure",
    blurb: "Stormwater, water supply, sewer and treatment design for economic zones, cities and institutions.",
    items: ["Stormwater Management", "Storm Hydrologic Analysis", "Water Resources Engineering", "Municipal Infrastructure Design"],
  },
  {
    num: "03",
    color: "var(--c-lime)",
    title: "Environment & biodiversity",
    blurb: "Ecosystem-based studies by hydrogeologists, aquatic biologists and water quality specialists.",
    items: ["Environmental Impact Assessment (EIA)", "Biodiversity Assessment"],
  },
  {
    num: "04",
    color: "var(--c-gold)",
    title: "AI, WebGIS, remote sensing & web apps",
    blurb: "Machine-learning models, satellite and drone image processing, WebGIS platforms and full-stack web applications built in-house.",
    items: ["Artificial Intelligence for prediction and Image Analysis", "Web GIS Development", "Remote sensing & SAR image processing", "Drone Image Analysis", "Web application & API development", "GIS Technologies and Models", "Statistical Modeling and Analysis"],
  },
];

export const digitalCapabilities: DigitalCapability[] = [
  { num: "D1", color: "var(--c-gold)", title: "AI & machine learning", text: "Prediction and image-analysis models trained on hydrological, satellite and drone data.", items: ["Deep learning and computer vision", "Flood and river-migration prediction", "Generative ML and big-data analysis"] },
  { num: "D2", color: "var(--c-blue)", title: "Remote sensing & SAR", text: "Optical and radar processing pipelines that turn raw imagery into analysis-ready layers.", items: ["Sentinel-1 SLC coregistration, calibration, coherence", "Speckle filtering and terrain correction", "Shoreline and bank-line change with DSAS"] },
  { num: "D3", color: "var(--c-sage)", title: "WebGIS platforms", text: "Browser-based GIS for inventories of river training works, assets and O&M activities.", items: ["PostGIS spatial databases", "GeoServer layer publishing and styling", "Filterable maps, legends and dashboards"] },
  { num: "D4", color: "var(--c-lime)", title: "Web apps & APIs", text: "Full-stack applications and on-demand processing services that plug into client systems.", items: ["React and Node.js applications", "FastAPI job services and webhooks", "Mobile-responsive data-entry forms"] },
  { num: "D5", color: "var(--c-gold)", title: "Drone & field data", text: "Drone surveys and digital field collection feeding straight into models and maps.", items: ["Drone survey and image analysis", "Multibeam, side scan sonar, sub-bottom profiler", "KoboToolbox, Survey Solutions, OpenForis"] },
  { num: "D6", color: "var(--c-blue)", title: "Asset & data systems", text: "Requirements, design and delivery of asset management and database systems.", items: ["Business and functional requirements", "Database system development", "Training, documentation and handover"] },
];

export const digitalCaseStudies: DigitalCaseStudy[] = [
  {
    slug: "river-revetment-gis",
    short: "River Revetment Management GIS Application",
    name: "River Revetment Management GIS Application",
    client: "JICA Expert Team · Nodi Project",
    location: "Bangladesh river training infrastructure",
    country: "Bangladesh",
    shot: "screenshot — revetment map dashboard",
    summary: "A web-based GIS for sustainable river resource management, with four modules: inventory, design and planning, monitoring, and decision support for revetment structures.",
    tech: ["React", "Node.js", "PostGIS", "GeoServer"],
    facts: [
      { k: "Client", v: "JICA Expert Team (Nodi Project)" },
      { k: "Type", v: "Web-based GIS and asset system for river training infrastructure" },
      { k: "Stack", v: "React, Node.js, PostgreSQL / PostGIS, GeoServer, PM2, microservices" },
      { k: "Deliverables", v: "Application, SDK documentation, deployment and handover" },
    ],
    narrative:
      "The River Revetment Management GIS Application is a comprehensive web-based solution for sustainable river resource management, with a focus on user-friendly functionalities, accurate data integration, and scalability for future enhancements. Structures such as revetments, hardpoints, spurs, groynes, guide bunds and regulators are displayed on the base map by type and current status, with O&M activities recorded against each structure.",
    services: [
      "Revetment Inventory: location, type, condition and maintenance history", "Revetment Design and Planning",
      "Revetment Monitoring and failure identification", "Revetment Management Decision Support",
      "Colour-coded map layers and filters by structure type and status", "O&M activity series and data-entry forms",
      "Mobile-responsive interface", "PostGIS database, GeoServer publishing and SDK documentation",
    ],
  },
  {
    slug: "urban-flood-detection-subtool",
    short: "On-demand Urban Flood Detection (UFD) sub-tool",
    name: "On-Demand Urban Flood Detection Sub-Tool Service",
    client: "PCKK · Japan",
    location: "Cloud processing service",
    country: "Japan",
    shot: "diagram — SAR flood map output",
    summary: "A lightweight API service that ingests pre- and post-event Sentinel-1 SLC data, runs the full SAR preprocessing chain and ML prediction, and returns geocoded flood outputs on request.",
    tech: ["FastAPI", "SNAP", "ML", "Containers"],
    facts: [
      { k: "Client", v: "PCKK, Japan" },
      { k: "Type", v: "On-demand geospatial ML processing service" },
      { k: "Inputs", v: "Pre / post Sentinel-1 SLC archives, optional AOI" },
      { k: "Outputs", v: "Geocoded rasters to object storage or signed URLs" },
    ],
    narrative:
      "Deliver a lightweight, on-demand processing service (“Sub-Tool”) that ingests Sentinel-1 SLC (zip) inputs from the Client’s main system via a POST API, executes the required preprocessing and prediction workflow, and returns standardized outputs and status without running continuously.",
    services: [
      "FastAPI job endpoint and status polling", "Stateless containers that spin up on demand",
      "Coregistration, calibration and coherence", "Speckle filtering and terrain correction", "ML flood prediction",
      "Output to S3 / MinIO or signed download URLs", "Optional webhook callbacks",
    ],
  },
  {
    slug: "omchhu-asset-management-system",
    short: "Asset Management System — Omchhu River Basin",
    name: "Asset Management System — Business and Functional Requirements, Climate-Resilient Omchhu River Basin Project",
    client: "Phuentsholing Thromde · ADB",
    location: "Phuentsholing, Bhutan",
    country: "Bhutan",
    shot: "screenshot — asset register and inspection view",
    summary: "Business and functional requirements for an asset management system that turns field observations into a permanent, measured record used to direct maintenance funding.",
    tech: ["Requirements", "GIS assets", "O&M", "Procurement"],
    facts: [
      { k: "Client", v: "Phuentsholing Thromde (PT), Project Management Unit" },
      { k: "Funding", v: "Asian Development Bank" },
      { k: "Type", v: "Business and Functional Requirements Specification" },
      { k: "Use", v: "Procurement, system design, testing, acceptance and handover" },
    ],
    narrative:
      "To turn what PT staff already observe in the field into a permanent, shared, measured record, and to use that record to direct maintenance money to where it prevents the most damage.",
    services: [
      "Baseline assessment of current practice and field survey", "Business and functional requirements",
      "Configuration-first system specification", "Basis for supplier evaluation and procurement",
      "Testing, acceptance and handover criteria",
    ],
  },
];
