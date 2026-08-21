// Key Termly Ceremonies - Meeting Data
const CEREMONIES_DATA = {
  personas: [
    { id: "pdm", name: "Portfolio Delivery Manager", shortName: "PDM", active: true },
    { id: "adm", name: "Agile Delivery Manager", shortName: "ADM", active: false },
    { id: "po", name: "Product Owner", shortName: "PO", active: false },
    { id: "pl", name: "Portfolio Lead", shortName: "PL", active: false }
  ],

  sprints: [
    { id: "sprint-1", name: "Sprint 1", shortName: "Sprint 1", position: 1 },
    { id: "sprint-2", name: "Sprint 2", shortName: "Sprint 2", position: 2 },
    { id: "sprint-3", name: "Sprint 3", shortName: "Sprint 3", position: 3 },
    { id: "sprint-4", name: "Sprint 4", shortName: "Sprint 4", position: 4 },
    { id: "sprint-5", name: "Sprint 5", shortName: "Sprint 5", position: 5 },
    { id: "sprint-6-ia", name: "Sprint 6 (I&A)", shortName: "I&A", position: 6 }
  ],

  categories: [
    { id: "ti-planning", name: "TI Planning", color: "#500778", icon: "📋" },
    { id: "delivery", name: "Delivery", color: "#0097A9", icon: "🚀" },
    { id: "finances", name: "Finances", color: "#E87722", icon: "💰" },
    { id: "lbcs-ddtc", name: "LBCs & DDTC", color: "#8C1515", icon: "📊" }
  ],

  // Artefacts that meetings link to
  artefacts: [
    {
      id: "cio-lt-playback-deck",
      name: "CIO LT Playback Deck",
      description: "The PDM gathers all committed outcomes, highlights the key risks and resource challenges in the CIO LT Playback Deck.",
      outcome: "The CIO LT Playback Deck is updated.",
      preparedBy: "Change Portfolio Manager",
      screenshots: ["Images/cio-lt-playback-deck.png.png"]
    },
    {
      id: "ti-planning-risks-dependencies",
      name: "TI Planning Risks & Dependencies",
      description: "A cross-portfolio view of key risks, dependencies, and planned initiatives identified during TI Planning. Enables portfolios to share a high-level view of work and ensures interdependencies are incorporated into planning activities.",
      outcome: "All risks and cross-portfolio dependencies are outlined.",
      preparedBy: "Portfolio Delivery Manager",
      screenshots: ["Images/ti-planning-risks-dependencies.png.png"]
    },
    {
      id: "ti-planning-management-review-deck",
      name: "TI Planning Management Review Deck",
      description: "Slides capturing confirmed planned outcomes, remaining delivery risks, dependencies and delivery confidence ahead of the TI start.",
      outcome: "Confirmed alignment across portfolios, agreed key priorities and dependency resolutions, and actions to address outstanding risks.",
      preparedBy: "PDMs",
      screenshots: ["Images/ti-planning-management-review-deck.png.png"]
    },
    {
      id: "portfolio-vision-slide-deck",
      name: "Portfolio Vision Slide Deck",
      description: "A set of prepared slides capturing strategic inputs, priorities, and insights that the portfolio updates ahead of the session to support defining the future vision.",
      outcome: "Portfolio Vision slides are updated with aligned strategic direction, key priorities, and a clearly articulated future state for the portfolio.",
      preparedBy: "Change Portfolio Chair, Product Management, Platform and Product team representatives",
      screenshots: ["Images/portfolio-vision-slide-deck-1.png.png", "Images/portfolio-vision-slide-deck-2.png.png"]
    },
    {
      id: "extended-delivery-report",
      name: "Extended Delivery Report",
      description: "Updated Extended Delivery slides capturing progress against termly outcomes, key risks, dependencies, and required interventions.",
      outcome: "Clear, shared visibility of progress against termly outcomes, with risks, dependencies, and interventions identified and aligned.",
      preparedBy: "Change Portfolio Delivery Manager",
      screenshots: ["Images/extended-delivery-report-1.png.png", "Images/extended-delivery-report-2.png.png"]
    },
    {
      id: "itppd-staff-log",
      name: "ITPPD Staff Log",
      description: "A record of resource assignments, vacancies, subcontractor contract dates, and budgets used to review workforce capacity.",
      outcome: "Clear view of resource allocation and capacity across portfolios.",
      preparedBy: "Staff Operations Manager",
      screenshots: []
    },
    {
      id: "finance-plan",
      name: "Finance Plan",
      description: "A monthly update of portfolio financial plans with actual spend provided by the Lean Portfolio Group, reviewed by the PDM to validate forecasts and ensure alignment within allocated budgets.",
      outcome: "Accurate and aligned financial plans, with forecasts validated and managed within budget.",
      preparedBy: "Change Portfolio Manager, Lean Portfolio Group Rep",
      screenshots: []
    },
    {
      id: "portfolio-status-update",
      name: "Portfolio Status Update",
      description: "Updated portfolio performance slides with delivery status, financials, risks, and progress information.",
      outcome: "Clear visibility of portfolio health and progress for governance review.",
      preparedBy: "Change Portfolio Delivery Manager",
      screenshots: ["Images/portfolio-status-update.png.png"]
    },
    {
      id: "portfolio-delivery-updates",
      name: "Portfolio Delivery Updates",
      description: "Slides capturing delivery progress, achievements, and any blockers or changes since the last reporting period.",
      outcome: "Stakeholders have a clear picture of delivery performance across portfolios.",
      preparedBy: "Change Portfolio Delivery Manager",
      screenshots: ["Images/portfolio-delivery-updates.png.png"]
    },
    {
      id: "portfolio-roadmap",
      name: "Portfolio Roadmap",
      description: "A visual representation of planned delivery across Now/Next/Future horizons, categorised by Strategic Change, Enhance, and Maintain.",
      outcome: "Clear visibility of planned work and strategic direction for the portfolio.",
      preparedBy: "Product Owners, Portfolio Delivery Manager",
      screenshots: ["Images/portfolio-roadmap.png.png"]
    },
    {
      id: "lean-business-case",
      name: "Lean Business Case",
      description: "A structured document for each investment request, capturing objectives, benefits, costs, risks, and delivery approach for DDTC approval.",
      outcome: "Approved investment decisions with clear alignment on priorities and risks.",
      preparedBy: "Product and Platform Owners",
      screenshots: ["Images/lean-business-case.png.png"]
    },
    {
      id: "committed-outcomes",
      name: "Committed Outcomes",
      description: "The agreed set of outcomes that each portfolio and product team has committed to deliver during the term.",
      outcome: "Clear visibility of what each team has committed to delivering.",
      preparedBy: "Product Teams, ADMs",
      screenshots: ["Images/committed-outcomes.png.png"]
    },
    {
      id: "risk-issues-dependencies",
      name: "Risks, Issues & Dependencies",
      description: "A log of identified risks, active issues, and cross-team or cross-portfolio dependencies that require coordination.",
      outcome: "All risks and dependencies are tracked, visible, and actively managed.",
      preparedBy: "PDM, ADMs",
      screenshots: ["Images/risk-issues-dependencies.png.png"]
    },
    {
      id: "jira-backlog",
      name: "JIRA Backlog",
      description: "The prioritised product backlog in JIRA containing user stories, bugs, and tasks ready for sprint planning.",
      outcome: "A refined and prioritised backlog ready for team commitment.",
      preparedBy: "Product Owner",
      screenshots: ["Images/jira-backlog.png.png"]
    },
    {
      id: "sprint-updates",
      name: "Sprint Updates",
      description: "Updates on sprint progress, completed work, and any changes to scope or commitments during the sprint.",
      outcome: "Transparency on sprint progress and any impediments.",
      preparedBy: "ADM, Product Team",
      screenshots: ["Images/sprint-updates.png.png"]
    },
    {
      id: "inspect-adapt-slides",
      name: "Inspect & Adapt Slides",
      description: "A consolidated summary of progress, metrics, insights, and key improvement areas captured from the term review.",
      outcome: "Portfolio Inspect & Adapt slides are updated with portfolio progress against term outcomes, including metrics and key insights.",
      preparedBy: "Change Portfolio Delivery Manager",
      screenshots: []
    },
    {
      id: "vision-of-visions-slides",
      name: "Vision of Visions Slides",
      description: "Updated Vision of Vision slides and a dependency tracking spreadsheet capturing cross-portfolio dependencies, priorities, and alignment inputs.",
      outcome: "Clear cross-portfolio visibility, aligned priorities, and readiness for coordinated TI planning.",
      preparedBy: "Change Portfolio Delivery Manager",
      screenshots: []
    }
  ],

  // Meetings only
  meetings: [
    {
      id: "cio-lt-commitments",
      name: "CIO LT – TI Commitments",
      category: "ti-planning",
      activityGroup: "CIO",
      sprints: ["sprint-1"],
      presenter: "PDMs",
      why: "Playback key planned Outcomes, key risks, and highlight practice and resource challenges.",
      outcome: "Ensures CIO LT is aligned on planned term outcomes, key risks, dependencies, resource constraints and financial implications, and provides a forum for leaders to resolve issues, remove barriers and support successful delivery.",
      content: ["cio-lt-playback-deck"],
      whoAttends: "CIO LT, PDMs and LPG"
    },
    {
      id: "ti-planning-meeting",
      name: "TI Planning",
      category: "ti-planning",
      activityGroup: "TIP",
      sprints: ["sprint-6-ia"],
      presenter: "Various",
      why: "A quarterly, collaborative event that serves as the heartbeat of agile working at UCL, aligning all the teams to a shared mission and vision. This event includes stakeholders from outside ISD, ISD Leadership and all Product/Platform Team members and occurs within the Innovation and Planning (IP) Iteration.",
      outcome: "Aligned iteration plans and objectives across all teams, with clear priorities, dependencies identified, and commitment to delivering the Termly Increment goals.",
      content: [],
      whoAttends: "Product and Platform Teams, Product and Platform Owners, Change Portfolio Leadership Teams, Lean Portfolio Group, Centre of Excellence, ISD Leadership, Relevant key stakeholders external to ISD"
    },
    {
      id: "day-1-management-review",
      name: "Day 1 Management Review",
      category: "ti-planning",
      activityGroup: "TIP",
      sprints: ["sprint-6-ia"],
      presenter: "PDMs",
      why: "To review alignment across all portfolios, assess open and emerging risks & dependencies.",
      outcome: "Outstanding risks and dependencies are understood, decisions are made where required, and actions are agreed to minimise delivery impacts.",
      content: ["ti-planning-risks-dependencies"],
      whoAttends: "CIO, Director of Delivery, Director of Strategic Change, Portfolio Leadership Groups (PDMs, Portfolio Owners, Portfolio Leads, Portfolio BAs, Portfolio Architects) and Capability Leads"
    },
    {
      id: "day-2-management-review",
      name: "Day 2 Management Review",
      category: "ti-planning",
      activityGroup: "TIP",
      sprints: ["sprint-6-ia"],
      presenter: "PDMs",
      why: "Play back confirmed planned Outcomes for the term including any remaining delivery risks, dependencies and delivery confidence ahead of the start of the TI.",
      outcome: "Confirmed alignment across the portfolios, communicate agreed key priorities and dependency resolutions, and identified actions required to address outstanding risks.",
      content: ["ti-planning-management-review-deck"],
      whoAttends: "CIO, Director of Delivery, Director of Strategic Change, Portfolio Leadership Groups (PDMs, Portfolio Owners, Portfolio Leads, Portfolio BAs, Portfolio Architects) and Capability Leads"
    },
    {
      id: "ti-playback",
      name: "TI Playback",
      category: "ti-planning",
      activityGroup: "TIP",
      sprints: ["sprint-6-ia"],
      presenter: "Various",
      why: "To demonstrate what has been delivered during the Planning Increment and review any outstanding challenge.",
      outcome: "Stakeholders have confidence in delivery outcomes and understand any remaining risks, carry-over work and implications for the next Termly Increment.",
      content: ["portfolio-vision-slide-deck"],
      whoAttends: "Portfolio Owner, Portfolio Lead, PDM, Product & Platform Owners, Relevant Platform and Product team representatives, LPG Rep for Change Portfolio"
    },
    {
      id: "portfolio-vision",
      name: "Portfolio Vision",
      category: "ti-planning",
      activityGroup: "PV",
      sprints: ["sprint-6-ia"],
      presenter: "Various",
      why: "A session to define a clear, shared future vision for the portfolio that aligns strategy, guides investment decisions, and motivates teams.",
      outcome: "A well-defined and aligned portfolio vision that provides strategic direction and clarity for teams and stakeholders.",
      content: ["portfolio-vision-slide-deck"],
      whoAttends: "Portfolio Owner, Portfolio Lead, PDM, Product & Platform Owners, Relevant Platform and Product team representatives, LPG Rep for Change Portfolio"
    },
    {
      id: "extended-delivery-sync",
      name: "Extended Delivery Sync",
      category: "delivery",
      activityGroup: "EDS",
      sprints: ["sprint-1", "sprint-2", "sprint-3", "sprint-4", "sprint-5", "sprint-6-ia"],
      presenter: "PDMs",
      why: "Sprintly playback of progress against agreed termly Outcomes to Director of Delivery.",
      outcome: "The Director of Delivery and PDMs share visibility of progress against termly outcomes, addressing risks, dependencies, and any required interventions.",
      content: ["extended-delivery-report"],
      whoAttends: "Director of Delivery, PDMs, Head of Portfolio Operations"
    },
    {
      id: "delivery-health-portfolio-review",
      name: "Delivery Health & Portfolio Review",
      category: "delivery",
      activityGroup: "DHPR",
      sprints: ["sprint-2", "sprint-4"],
      presenter: "PDMs",
      why: "Review updates and progress against committed Outcomes, highlight outstanding or emerging risks and issues and review Financial position for each Change Portfolio.",
      outcome: "Provides clear visibility and opportunity for scrutiny of delivery confidence, dependencies, risks, and financial position across portfolios, enabling escalation of issues and risks, and informed decisions and resolutions.",
      content: ["extended-delivery-report"],
      whoAttends: "Director of Delivery, PDMs, Head of Portfolio Operations"
    },
    {
      id: "resource-meeting",
      name: "Resource Meeting ITPPD (Delivery and Dev & Test)",
      category: "delivery",
      activityGroup: "RM",
      sprints: ["sprint-2", "sprint-4"],
      presenter: "Various",
      why: "A monthly session to review resource allocation, vacancies, contracts, and budgets, while identifying workforce risks and cross-portfolio development opportunities.",
      outcome: "A clear, aligned view of resource capacity and actions to optimise utilisation and support staff development.",
      content: ["itppd-staff-log"],
      whoAttends: "ITPPD Director, Staff Operations Manager, Head of LPG, Portfolio Delivery Managers, Dev & Test Representatives"
    },
    {
      id: "jamboree",
      name: "Jamboree",
      category: "delivery",
      activityGroup: "JAM",
      sprints: ["sprint-5"],
      presenter: "Various",
      why: "A quarterly session to share insights, strengthen connections, and improve collaboration across teams.",
      outcome: "Shared understanding, stronger cross-team collaboration, and key insights that support effective delivery.",
      content: [],
      whoAttends: "ITTPD Director, Change Portfolio Delivery Manager, Agile Delivery Manager, IT Delivery Support Officer, Lean Portfolio Group"
    },
    {
      id: "showcase-demo",
      name: "ISD & ARC Showcase Demo",
      category: "delivery",
      activityGroup: "SD",
      sprints: ["sprint-3", "sprint-4"],
      presenter: "Various",
      why: "To showcase progress and demonstrate delivered value across the digital change portfolios, enabling visibility, engagement, and shared learning.",
      outcome: "Stakeholders gain visibility of recent delivery achievements, provide feedback.",
      content: [],
      whoAttends: "ISD, and various institutional stakeholders"
    },
    {
      id: "monthly-finance-review",
      name: "Monthly Finance LT Review Meeting",
      category: "finances",
      activityGroup: "MFKT",
      sprints: ["sprint-1", "sprint-3", "sprint-5"],
      presenter: "PDMs",
      why: "A monthly meeting to review portfolio financial performance, including spend, forecasts, delivery progress, and financial risks against approved budgets.",
      outcome: "Clear alignment on portfolio financial position, with risks identified and actions agreed to maintain budget and delivery performance.",
      content: ["finance-plan"],
      whoAttends: "Change Portfolio Owner, Change Portfolio Manager, Change Portfolio Lead"
    },
    {
      id: "ddtc-meeting",
      name: "Digital Delivery and Transformation Committee (DDTC)",
      category: "lbcs-ddtc",
      activityGroup: "DDTC",
      sprints: ["sprint-6-ia"],
      presenter: "Various",
      why: "To maintain a single portfolio of investment in digital delivery and transformation and ensure continued alignment with the University's overarching strategy and digital strategy.",
      outcome: "Approved investment decisions and Lean Business Cases sign-off, with clear alignment on priorities, risks, and progress against portfolio outcomes.",
      content: ["portfolio-status-update", "portfolio-delivery-updates", "portfolio-roadmap", "lean-business-case"],
      whoAttends: "CIO, Director of Delivery, Portfolio Owners"
    },
    {
      id: "scrum-of-scrums",
      name: "Scrum of Scrums",
      category: "ti-planning",
      activityGroup: "",
      sprints: ["sprint-1", "sprint-2", "sprint-3", "sprint-4", "sprint-5", "sprint-6-ia"],
      presenter: "PDMs",
      why: "To coordinate dependencies, manage cross-team risks and impediments, and ensure alignment across all Product Teams within the portfolio.",
      outcome: "Cross-team dependencies, risks and blockers are actively managed, enabling coordinated delivery of portfolio outcomes.",
      content: ["committed-outcomes", "risk-issues-dependencies"],
      whoAttends: "PDM and ADMs"
    },
    {
      id: "sprint-planning",
      name: "Sprint Planning",
      category: "ti-planning",
      activityGroup: "",
      sprints: ["sprint-1", "sprint-2", "sprint-3", "sprint-4", "sprint-5", "sprint-6-ia"],
      presenter: "Product Owner (priorities) and ADM (facilitation)",
      why: "To agree the work that will be delivered in the sprint and establish a realistic plan based on priorities, dependencies and team capacity.",
      outcome: "Sprint objectives, scope and delivery commitments are agreed and aligned to product and portfolio priorities.",
      content: ["jira-backlog", "sprint-updates"],
      whoAttends: "Product Owner, Product Team, ADM"
    }
  ]
};
