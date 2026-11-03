# Digital and software case studies

## 1. River Revetment Management GIS Application (JICA/BWDB Nodi project)

| | |
|---|---|
| Client | JICA and Bangladesh Water Development Board (BWDB); EMEC was sub-consultant to Oriental Consultants Global and Pacific Consultants |
| Parent project | Project for Planning Capacity Enhancement and Establishment of a Technology Adaptation Cycle on Comprehensive Nodi (River) Management in Bangladesh |
| Period | 2022 – January 2026 (completed, per L). The SDK documentation is dated 27 Oct 2023. Improvement list dated 29 Jan 2025 |
| Status | "delivered and in operational use" (L) |

**Purpose**
- A web-based GIS for sustainable river resource management.
- Tracks revetment inspections and construction activities in real time, replacing dispersed spreadsheet and paper reporting (L).

**Functional modules (SDK doc)**
- **Revetment Inventory:** all river revetment structures, with location, type, condition and maintenance history.
- **Revetment Design and Planning:** supports design of new or existing revetments, considering hydraulic conditions, bank stability and environmental impact.
- **Revetment Monitoring:** systematic performance monitoring, identifying potential failures and maintenance needs.
- **Revetment Management Decision Support:** actionable insights for construction, maintenance and rehabilitation decisions.

**Features (L)**
- Document management, issue tracking and progress tracking within the platform.
- A spatial data model for assets and works. Field inspection records are tied to mapped locations and kept as history rather than overwritten.
- Map-based operational views for non-specialist users, plus tabular views for data entry and review.

**Tech stack**
- React (frontend) and Node.js (backend and APIs).
- PostgreSQL + PostGIS, with a `gis` schema.
- GeoServer (OGC services/WMS; `revetment` workspace, PostGIS store, published `revetment` layer, custom SLD point style).
- Leaflet / OpenLayers.
- Python spatial data service (FastAPI/Uvicorn, conda environment `spatial-env`).
- Microservices for file processing, GeoServer integration and REST-based WMS layer creation.
- PM2 process management; Ubuntu Linux; DBeaver for backup/restore.
- L stresses it is all open source, with no proprietary licensing.

**Improvement round (29 January 2025)**
1. Colour-coded lines and legend by structure type and status. The 11 structure types listed are Revetment, Hardpoint, Spur, Crossbar, Embankment, Groyne, Guide Bund, Fish pass, Bridge, Regulator, and Bridge again; "Bridge" appears twice in the source. The 5 statuses are Exist, Exist_PartialDestroyed, Destroyed, OnGoing and Proposed. Also filter checkboxes on the map and table, and a colour guide.
2. Rename "Ledger" to fit its role in O&M activities.
3. Show revetment structures from the left bar. Each structure shows a single record (done) as an O&M activity series, with an option to add a new O&M activity from the map dashboard.
4. Update the form to capture O&M activity details.
5. Make the whole app mobile responsive, especially the O&M form and tables.
6. Super-admin profile/email edit option.
7. Remove AWS dependencies so the app can move to a new physical server.
8. Containerise the frontend, backend and SDS in Docker with a docker-compose.yml.

**Deliverables**
- A developer SDK/installation guide covering PostgreSQL/PostGIS, the app, GeoServer, backup/restore, microservices and a CORS fix.
- The deployed web GIS.

_Source: SDK Documentation for River Revetment GIS App.docx; Improvment of WebGIS_29 Jan_2025.docx; EMEC_Relevant_Portfolio_LIC_Dashboard.pdf; EMEC Profile.docx_

## 2. JICA Technical ToR: Web-based GIS for River Training Infrastructure Display

| | |
|---|---|
| Issuer | JICA Expert Team, Nodi Project |
| Date | April 16, 2023 |
| Nature | The client's technical Terms of Reference that the web GIS above was specified against (relationship inferred from project name and scope) |

**Objective**
- A web GIS using GeoNode, Leaflet, ReactJS and related technologies to display, manage and analyse infrastructure data.
- User registration with different access levels for viewing, editing and adding data.
- Support for shapefiles, KMZ, raster and georeferenced images.

**Required features**
- A spatial database for river training infrastructure data, with ingestion and update tools, validation and integrity checks.
- Background layers (Google Maps, OpenStreetMap, satellite) via the Mapbox API or another no-cost means.
- A ReactJS UI with Leaflet map, registration/authentication, and search/query/filter tools.
- Adding points and polygons with attribute forms and further records "as shown in the ledger sheet".
- Spatial analysis (buffering, overlays, spatial queries).
- Non-spatial file management (Excel, PDF, Word, CAD) linked to spatial features.

**Deliverables (from the ToC)**
- System design documentation.
- Spatial and non-spatial database schema and tools.
- The platform with registration, authentication and role-based access control.
- User manual and technical documentation.
- Deployment and maintenance guidelines.
- Server specifications (CPU, RAM, storage/IOPS, network, software, backup, security).

**Timeline (from the ToC):** 12 weeks.
- Kickoff and design: weeks 1–2.
- Core features: weeks 3–4.
- Geospatial and non-spatial features: weeks 5–6.
- Testing: weeks 7–8.
- Deployment and training: weeks 9–10.
- Closeout: weeks 11–12.

**Partial extraction:** the text stops in §3.2, so the later body sections are not available.

_Source: Webbased mapping_TOR_April 16 2023_JICA_260209_112856.pdf_

## 3. Urban Flood Detection (UFD) Sub-Tool and web application

| | |
|---|---|
| Client | Pacific Consultants Co., Ltd. (PCKK), Japan |
| Dates | PoC submitted 12/10/2025 (the API examples use 2025-10-12). L: February 2026 – ongoing |
| EMEC role | Full-stack application development: backend, geospatial processing, map front end (L) |

**Purpose**
- **PoC:** a lightweight, on-demand processing service that ingests Sentinel-1 SLC (zip) pre/post pairs from the client's main system ("GFIA or equivalent") via a POST API. It runs preprocessing and ML prediction and returns standardised outputs. Nothing runs continuously.
- **L:** a web application that detects flooding from SAR imagery and produces damage estimates, with a map front end showing flood extent and estimated damage.
- **Profile:** "AI model for flood detection from satellite image, create a web GIS system".

**API**
- `POST /jobs` takes the pre/post SLC URLs, an optional AOI polygon, an output path and an optional callback URL. It returns 202 with a `job_id`.
- `GET /jobs/{id}` returns status and artifacts: coherence_vv.tif, intensity_vv_db.tif, stack_8b.tif, quicklook.png, proc_log.txt, proc_report.json.
- `/healthz` is the health check.

**Processing pipeline**
1. Ingest and validate (SAFE manifest, orbit, AOI).
2. TOPS coregistration.
3. Interferometric coherence (VV/VH).
4. Radiometric calibration to σ⁰ and speckle filtering (e.g. Refined Lee).
5. Deburst and merge (IW/EW).
6. Range-Doppler terrain correction (e.g. Copernicus DEM).
7. ML inference (mask/score layers).
8. Packaging of GeoTIFFs, quick-looks and a JSON report.

The pipeline runs the SNAP toolchain headless; snappy is available if the client prefers it.

**Architecture**
- FastAPI web layer plus a worker process.
- Stateless, ephemeral containers that spin up per job, persist outputs and exit.
- Outputs go to the client's object store (S3/MinIO) or signed URLs.
- Gunicorn with Uvicorn workers behind Nginx.
- Docker (L).
- Portable across VM, Kubernetes or batch.
- CPU-optimised; no GPU needed for the SNAP stages.

**Security**
- Signed URLs or client-managed credentials; no data retained beyond the job.
- An isolated workspace per job.
- Per-job logs and a proc_report.json with parameters, versions, timing and output hashes.

**Deliverables**
- Container image(s).
- Configuration and runbook.
- OpenAPI spec.
- Sample payloads and outputs.
- Test plan (happy path + 2 failure cases).

**Acceptance**
- All artifacts produced within the agreed time window.
- Outputs geocoded and readable in GIS tools with the expected dimensions and CRS.
- Accurate status reporting.
- No processing without a POST.

**Timeline:** 3 weeks.
- Week 1: containers, API skeleton and SNAP graph.
- Week 2: end-to-end happy path.
- Week 3: hardening and test runs on client samples, then handover.

**Risks noted:** large inputs, orbit/DEM availability, SLC mode variations, long jobs on small hosts. Each has a stated mitigation.

_Source: Proof of Concept_UFD_Subtool.docx; EMEC_Relevant_Portfolio_LIC_Dashboard.pdf; EMEC Profile.docx_

## 4. Omchhu Asset Management System (AMS), Bhutan

| | |
|---|---|
| Client | Phuentsholing Thromde (PT) Project Management Unit, Bhutan; ADB-financed |
| Project | Climate-Resilient Omchhu River Basin Project (Grant 1038-BHU); Project Implementation Support Consultant (PISC) services |
| Period | January 2026 – to date (L) |
| EMEC role | Requirements analysis, COTS platform evaluation, system configuration and deployment (L) |
| Key document | AMS Business and Functional Requirements Specification, ref. CRORBP-AMS-BRS-FRS, v8.0 consolidated, issued 3 August 2026, "issued for review and procurement use". It supersedes v7.0. Prepared by the PISC "Asset Management Specialist / IT Expert". The document itself does not name EMEC |

**Purpose**
- Turn field observations into a permanent, shared, measured record, and use it to direct maintenance money where it prevents the most damage.
- **Four success outcomes:**
  - Continuity of knowledge: one permanent reference number per structure.
  - Evidence instead of impression: measured deterioration trends.
  - Defensible, risk-ranked priorities.
  - Evidence-backed budgets.

**Justifying case:** the retaining wall at the pedestrian bridge at Chainage 660 m collapsed in the flood of 15 June 2026 after 3–4 years of unmeasured foundation scour.

**Annual cycle implemented**
Asset Register → Inspection → Condition Assessment → Functional Assessment → Risk Assessment → Maintenance Planning → Annual O&M Plan → Multi-Year Budget → Emergency Materials and Machinery Plan → Maintenance Execution → Asset History Update → Annual Review.

History is never overwritten. Overrides of system recommendations are recorded.

**Scope (S-01 to S-10)**
- Asset register with drawings, photos, costs and history.
- Office and field inspections on connected devices.
- Condition, functional and risk assessment.
- Work orders through completion and write-back.
- Annual and multi-year O&M budgeting under a funding ceiling.
- Emergency material, machinery and supplier readiness; flood/hazard event recording.
- Community and local-leader reports.
- Map view only.
- Documents, reports, dashboards, notifications, security and audit.
- Configuration by PT staff without new software.

**Explicitly excluded:** flood forecasting and modelling, live telemetry, GIS functions, HR, accounting/procurement, capital works delivery, land records, offline operation, and AI/ML (X-09: "none shall be priced").

**Requirement families (IDs in the spec)**
- AR (asset register), HIER, LOC.
- DOC, HIS.
- INS, CON, FUN, MON, SCR (scour), SED (sediment).
- RSK.
- MNT, COM (community), EVT (events).
- OMP, BUD.
- RES, EMG.
- WFL, GOV, CFG.

**Configuration details**
- Seven starting structure categories: river and flood defence; bridges and drainage; sediment and slopes; landslide sites; monitoring equipment; emergency facilities; other.
- Six inspection types.
- A configurable 5×5 risk matrix (Low/Medium/High/Extreme).
- Configurable roles (14 listed, from System Administrator to Auditor).
- Bespoke development is allowed for only four requirements (AR-02, AR-03, DOC-02, HIS-02).
- 22-point acceptance checklist.

**Phases**
- Phase 1, Foundation (2026–2027): register, documents, inspections, map, scour/sediment alerts, work orders, resource registers, community reports, events, access/audit/backup.
- Phase 2, Operation (2027–2028): trends, functional and risk assessment, backlog, O&M planning, multi-year budget, readiness, approvals, dashboards.

**EMEC outputs to date (L)**
- A BRS/FRS covering 121 functional and 22 acceptance requirements.
- A desk-review compliance assessment scoring openMAINT 2.4 and CMDBuild 4.2 against every requirement.
- Configuration of the selected open-source platform: asset classes, inspection/maintenance workflows, role-based permissions, and map services via PostGIS, GeoServer and web mapping layers (being configured).

**Inception report:** only the title page and table of contents were recovered. They cover introduction, project area conditions, and approach, methodology and work plan.

_Source: AMS_BRS_FRS_v8.0_consolidated-10page.docx; EMEC_Relevant_Portfolio_LIC_Dashboard.pdf; Omchhu Inception Report Form.pdf_

## 5. LIC Dashboard proposal (Chattogram WASA / WSUP)

| | |
|---|---|
| Prospective client | Water & Sanitation for Urban Populations (WSUP) Bangladesh, for Chattogram WASA (CWASA) |
| Assignment | Design, development, deployment and support of a GIS-based LIC (low-income community) Information and Performance Management System |
| Document | EMEC Relevant Portfolio, dated 26 September 2026. A bid document; it contains yellow-highlighted placeholders still to be completed. It describes no delivered LIC Dashboard |

**What it shows**
- An eight-assignment portfolio mapped to the ToR's capabilities:
  1. JICA web GIS.
  2. Omchhu AMS.
  3. RISe Barishal LIC baseline.
  4. The key expert's Dhaka/Khulna WASA experience.
  5. GIZ CONNECT 3,100-household panel.
  6. PCKK flood detection app.
  7. Drone image processing SaaS.
  8. Last-mile route optimisation SaaS.
- Plus the Cumilla, Sirajganj and Narayanganj water assignments.
- **Proposed design ideas mentioned:**
  - An account-status classification that distinguishes unpaid accounts, no bill generated and meter never read.
  - Role-based masking.
  - NGO data isolation for CWASA customer records.
- **Required capabilities it cites:**
  - Map-based views.
  - Document upload.
  - Complaint/issue handling and action tracking.
  - API-ready architecture.
  - A requirements-traceable handover.

**In-house products described**
- **Drone Image Processing Platform** (May 2026, in development): Next.js, Node.js and PostgreSQL, with interactive mapping. It produces orthophotos and point clouds as a service.
- **Last-Mile Delivery Route Optimisation Platform** (February 2026, in development): Next.js with an interactive mapping library and a Node.js backend, doing constraint-based route optimisation for delivery companies.

_Source: EMEC_Relevant_Portfolio_LIC_Dashboard.pdf_

## 6. PDS V2 (Project Data Sheets)

PDS V2.docx is not a software project. It is a set of 12 standard project data sheets (assignment name, value, country/location, client, associated consultants, narrative and services). Its narratives are folded into [projects.md](projects.md). The only digital item in it is "Development of Database System" under the JICA/BWDB project (see §1).

_Source: PDS V2.docx_
