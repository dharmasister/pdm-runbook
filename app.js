// PDM Runbook - Application Logic
(function() {
    'use strict';

    // ========== STATE ==========
    let currentSprint = 'sprint-1';
    let currentCategory = 'all';
    let viewAll = false;

    // ========== DOM ELEMENTS ==========
    const timelineNodes = document.querySelectorAll('.timeline-node');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const ceremoniesGrid = document.getElementById('ceremoniesGrid');
    const sprintTitle = document.getElementById('sprintTitle');
    const sprintCount = document.getElementById('sprintCount');
    const detailOverlay = document.getElementById('detailOverlay');
    const detailPanel = document.getElementById('detailPanel');
    const detailClose = document.getElementById('detailClose');
    const viewAllBtn = document.getElementById('viewAllBtn');

    // ========== HELPERS ==========
    function getSprintName(sprintId) {
        const sprint = CEREMONIES_DATA.sprints.find(s => s.id === sprintId);
        return sprint ? sprint.name : sprintId;
    }

    function getCategoryInfo(categoryId) {
        return CEREMONIES_DATA.categories.find(c => c.id === categoryId);
    }

    function getCeremonyById(id) {
        return CEREMONIES_DATA.ceremonies.find(c => c.id === id);
    }

    function getFilteredCeremonies() {
        let ceremonies = CEREMONIES_DATA.ceremonies;

        // Filter by sprint
        if (!viewAll) {
            ceremonies = ceremonies.filter(c => c.sprints.includes(currentSprint));
        }

        // Filter by category
        if (currentCategory !== 'all') {
            ceremonies = ceremonies.filter(c => c.category === currentCategory);
        }

        // Sort: meetings first, then artefacts; within each type, sort alphabetically
        ceremonies.sort((a, b) => {
            if (a.type !== b.type) {
                return a.type === 'meeting' ? -1 : 1;
            }
            return a.name.localeCompare(b.name);
        });

        return ceremonies;
    }

    // ========== RENDER FUNCTIONS ==========
    function renderCeremonies() {
        const ceremonies = getFilteredCeremonies();

        if (ceremonies.length === 0) {
            ceremoniesGrid.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">📭</div>
                    <p class="empty-state-text">No ceremonies found for this selection</p>
                </div>
            `;
            sprintCount.textContent = '0 items';
            return;
        }

        const meetingCount = ceremonies.filter(c => c.type === 'meeting').length;
        const artefactCount = ceremonies.filter(c => c.type === 'artefact').length;
        sprintCount.textContent = `${meetingCount} meeting${meetingCount !== 1 ? 's' : ''} · ${artefactCount} artefact${artefactCount !== 1 ? 's' : ''}`;

        ceremoniesGrid.innerHTML = ceremonies.map(ceremony => {
            const category = getCategoryInfo(ceremony.category);
            const description = ceremony.description.split('\n')[0]; // First paragraph only

            // Sprint dots
            const allSprints = CEREMONIES_DATA.sprints;
            const sprintDots = allSprints.map(s => 
                `<span class="card-sprint-dot ${ceremony.sprints.includes(s.id) ? 'active' : ''}"></span>`
            ).join('');

            // Related indicator
            const hasRelated = ceremony.relatedArtefact || ceremony.relatedMeeting;
            const relatedText = ceremony.type === 'meeting' && ceremony.relatedArtefact 
                ? '📎 Has artefact' 
                : ceremony.type === 'artefact' && ceremony.relatedMeeting 
                ? '🔗 Linked to meeting' 
                : '';

            return `
                <div class="ceremony-card" data-id="${ceremony.id}" data-category="${ceremony.category}">
                    <div class="card-header">
                        <span class="card-title">${ceremony.name}</span>
                        <span class="card-type-badge ${ceremony.type}">${ceremony.type}</span>
                    </div>
                    <p class="card-description">${description}</p>
                    <div class="card-footer">
                        <span class="card-category" data-category="${ceremony.category}">${category.icon} ${category.name}</span>
                        ${hasRelated ? `<span class="card-link-indicator">${relatedText}</span>` : `<div class="card-sprints">${sprintDots}</div>`}
                    </div>
                </div>
            `;
        }).join('');

        // Add click handlers to cards
        document.querySelectorAll('.ceremony-card').forEach(card => {
            card.addEventListener('click', () => {
                const id = card.getAttribute('data-id');
                openDetail(id);
            });
        });
    }

    function openDetail(ceremonyId) {
        const ceremony = getCeremonyById(ceremonyId);
        if (!ceremony) return;

        const category = getCategoryInfo(ceremony.category);

        // Type badge
        const typeBadge = document.getElementById('detailTypeBadge');
        typeBadge.textContent = ceremony.type === 'meeting' ? '🗓️ Meeting' : '📄 Artefact';
        typeBadge.className = `detail-type-badge ${ceremony.type}`;

        // Category badge
        const categoryBadge = document.getElementById('detailCategoryBadge');
        categoryBadge.textContent = `${category.icon} ${category.name}`;
        categoryBadge.style.background = `${category.color}15`;
        categoryBadge.style.color = category.color;

        // Title
        document.getElementById('detailTitle').textContent = ceremony.name;

        // Description (split by outcome if present)
        const descParts = ceremony.description.split(/\n+/);
        document.getElementById('detailDescription').textContent = descParts[0];

        // Outcome
        document.getElementById('detailOutcome').textContent = ceremony.outcome;

        // Attendees
        const attendeesContainer = document.getElementById('detailAttendees');
        const attendees = ceremony.whoAttends.split(',').map(a => a.trim()).filter(a => a);
        attendeesContainer.innerHTML = `
            <div class="attendees-list">
                ${attendees.map(a => `<span class="attendee-tag">${a}</span>`).join('')}
            </div>
        `;

        // Key Responsibilities
        const responsibilitiesSection = document.getElementById('responsibilitiesSection');
        const responsibilitiesList = document.getElementById('detailResponsibilities');
        if (ceremony.keyResponsibilities && ceremony.keyResponsibilities.trim()) {
            responsibilitiesSection.style.display = 'block';
            const responsibilities = ceremony.keyResponsibilities.split('\n').filter(r => r.trim());
            responsibilitiesList.innerHTML = responsibilities.map(r => `<li>${r.trim()}</li>`).join('');
        } else {
            responsibilitiesSection.style.display = 'none';
        }

        // Sprints
        const sprintsContainer = document.getElementById('detailSprints');
        sprintsContainer.innerHTML = ceremony.sprints.map(s => 
            `<span class="sprint-tag">${getSprintName(s)}</span>`
        ).join('');

        // Related
        const relatedSection = document.getElementById('relatedSection');
        const relatedContainer = document.getElementById('detailRelated');
        const relatedId = ceremony.relatedArtefact || ceremony.relatedMeeting;
        
        if (relatedId) {
            const relatedCeremony = getCeremonyById(relatedId);
            if (relatedCeremony) {
                relatedSection.style.display = 'block';
                const relatedType = relatedCeremony.type === 'meeting' ? '🗓️' : '📄';
                relatedContainer.innerHTML = `
                    <a class="related-link" data-related-id="${relatedId}">
                        ${relatedType} ${relatedCeremony.name} →
                    </a>
                `;
                // Add click handler
                relatedContainer.querySelector('.related-link').addEventListener('click', (e) => {
                    e.preventDefault();
                    openDetail(relatedId);
                });
            } else {
                relatedSection.style.display = 'none';
            }
        } else {
            relatedSection.style.display = 'none';
        }

        // Show overlay
        detailOverlay.classList.add('visible');
        document.body.style.overflow = 'hidden';
    }

    function closeDetail() {
        detailOverlay.classList.remove('visible');
        document.body.style.overflow = '';
    }

    function updateTimelineActive() {
        timelineNodes.forEach(node => {
            const sprint = node.getAttribute('data-sprint');
            if (viewAll) {
                node.classList.remove('active');
            } else {
                node.classList.toggle('active', sprint === currentSprint);
            }
        });
    }

    function updateSprintTitle() {
        if (viewAll) {
            sprintTitle.textContent = 'All Sprints';
        } else {
            sprintTitle.textContent = getSprintName(currentSprint);
        }
    }

    function updateFilterActive() {
        filterBtns.forEach(btn => {
            const cat = btn.getAttribute('data-category');
            btn.classList.toggle('active', cat === currentCategory);
        });
    }

    // ========== EVENT LISTENERS ==========

    // Timeline node clicks
    timelineNodes.forEach(node => {
        node.addEventListener('click', () => {
            currentSprint = node.getAttribute('data-sprint');
            viewAll = false;
            viewAllBtn.classList.remove('active');
            updateTimelineActive();
            updateSprintTitle();
            renderCeremonies();
        });
    });

    // View All button
    viewAllBtn.addEventListener('click', () => {
        viewAll = !viewAll;
        viewAllBtn.classList.toggle('active', viewAll);
        updateTimelineActive();
        updateSprintTitle();
        renderCeremonies();
    });

    // Category filter clicks
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            currentCategory = btn.getAttribute('data-category');
            updateFilterActive();
            renderCeremonies();
        });
    });

    // Close detail panel
    detailClose.addEventListener('click', closeDetail);
    detailOverlay.addEventListener('click', (e) => {
        if (e.target === detailOverlay) {
            closeDetail();
        }
    });

    // Keyboard escape to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && detailOverlay.classList.contains('visible')) {
            closeDetail();
        }
    });

    // ========== INIT ==========
    function init() {
        updateTimelineActive();
        updateSprintTitle();
        updateFilterActive();
        renderCeremonies();
    }

    init();
})();
