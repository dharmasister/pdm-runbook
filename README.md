# PDM Runbook — Day in the Life of a Term

An interactive web reference for Portfolio Delivery Managers (PDMs) at UCL, providing a single source of truth for all ceremonies, meetings, and artefacts across the sprint cycle.

## 🚀 Quick Start

**To view the site locally:**
1. Open `index.html` in any web browser (Chrome, Edge, Firefox, Safari)
2. Or open `preview.html` for a single-file version

That's it — no installation, no build step required.

## 📁 Project Structure

```
pdm-runbook/
├── index.html      ← Main page structure
├── styles.css      ← UCL-branded styling
├── data.js         ← All ceremony data (edit this to update content)
├── app.js          ← Interactive functionality
├── preview.html    ← Self-contained single file (for easy sharing)
└── README.md       ← This file
```

## ✏️ How to Update Content

All ceremony data lives in `data.js`. To add, edit, or remove a ceremony:

1. Open `data.js` in any text editor
2. Find the `ceremonies` array
3. Add or modify entries following this structure:

```javascript
{
    id: "unique-id",                    // lowercase, hyphenated
    name: "Ceremony Name",             // display name
    category: "delivery",              // ti-planning | delivery | finances | lbcs-ddtc
    type: "meeting",                   // meeting | artefact
    activityGroup: "EDS",             // group code linking related items
    sprints: ["sprint-1", "sprint-3"], // which sprints this occurs in
    description: "What this is...",    // main description
    outcome: "Expected outcome...",    // what success looks like
    whoAttends: "Role 1, Role 2",     // comma-separated attendees
    keyResponsibilities: "Task 1\nTask 2",  // newline-separated (\n)
    relatedArtefact: "artefact-id"    // or relatedMeeting for artefacts
}
```

## 🌐 Deployment Options

### Option A: GitHub Pages (Free, Quick)
1. Create a GitHub repository
2. Push these files to the repository
3. Go to Settings → Pages → Source: Deploy from branch (main)
4. Site will be live at: `https://your-org.github.io/pdm-runbook/`

### Option B: UCL Web Hosting
1. Contact UCL ISD/Digital web team
2. Request a hosted space or subdomain
3. Upload these files to the allocated space

### Option C: Azure Static Web Apps
1. Create an Azure Static Web App resource
2. Connect to your GitHub repository
3. Files are deployed automatically on push

## 🎨 Branding

The site uses UCL's purple (#500778) as the primary colour. To modify branding, edit the CSS variables at the top of `styles.css`:

```css
:root {
    --ucl-purple: #500778;
    --ucl-purple-light: #6B2D8B;
    /* ... other variables ... */
}
```

## 📋 Features

- **Interactive Timeline**: Click any sprint to see its ceremonies
- **Category Filtering**: Filter by TI Planning, Delivery, Finances, or LBCs & DDTC
- **Detail Panels**: Click any ceremony card to see full details
- **Related Links**: Meetings link to their preparation artefacts and vice versa
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Persona Selector**: Ready for future expansion (ADM, PO, Portfolio Lead views)

## 🔮 Future Enhancements

- [ ] Add Governance category ceremonies
- [ ] Add ADM, PO, and Portfolio Lead persona views
- [ ] Artefact screenshots and template downloads
- [ ] CMS backend for non-technical editing
- [ ] UCL single sign-on integration
- [ ] Email notifications for upcoming ceremonies
