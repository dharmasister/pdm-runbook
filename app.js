// Key Termly Ceremonies - Application Logic
(function() {
    'use strict';

    // ========== STATE ==========
    let currentSprint = 'sprint-1';
    let currentCategory = 'all';
    let viewAll = false;
    let lastOpenedMeetingId = null;

    // ========== DOM ELEMENTS ==========
    const timelineNodes = document.querySelectorAll('.timeline-node');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const meetingsGrid = document.getElementById('meetingsGrid');
    const sprintTitle = document.getElementById('sprintTitle');
    const sprintCount = document.getElementById('sprintCount');
    const detailOverlay = document.getElementById('detailOverlay');
    const detailClose = document.getElementById('detailClose');
    const artefactOverlay = document.getElementById('artefactOverlay');
    const artefactClose = document.getElementById('artefactClose');
    const backToMeetingBtn = document.getElementById('backToMeetingBtn');
    const viewAllBtn = document.getElementById('viewAllBtn');

    // ========== HELPERS ==========
    function getSprintName(sprintId) {
        const sprint = CEREMONIES_DATA.sprints.find(s => s.id === sprintId);
        return sprint ? sprint.name : sprintId;
    }

    function getCategoryInfo(categoryId) {
        return CEREMONIES_DATA.categories.find(c => c.id === categoryId);
    }

    function getMeetingById(id) {
        return CEREMONIES_DATA.meetings.find(m => m.id === id);
    }

    function getArtefactById(id) {
        return CEREMONIES_DATA.artefacts.find(a => a.id === id);
    }

    function getFilteredMeetings() {
        let meetings = CEREMONIES_DATA.meetings;

        // Filter by sprint
        if (!viewAll) {
            meetings = meetings.filter(m => m.sprints.includes(currentSprint));
        }

        // Filter by category
        if (currentCategory !== 'all') {
            meetings = meetings.filter(m => m.category === currentCategory);
        }

        // Sort alphabetically by name
        meetings.sort((a, b) => a.name.localeCompare(b.name));

        return meetings;
    }

    // ========== RENDER FUNCTIONS ==========
    function renderMeetings() {
        const meetings = getFilteredMeetings();

        if (meetings.length === 0) {
            meetingsGrid.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">📭</div>
                    <p class="empty-state-text">No ceremonies found for this selection</p>
                </div>
            `;
            sprintCount.textContent = '0 meetings';
            return;
        }

        sprintCount.textContent = `${meetings.length} meeting${meetings.length !== 1 ? 's' : ''}`;

        meetingsGrid.innerHTML = meetings.map(meeting => {
            const category = getCategoryInfo(meeting.category);
            
            // Content/artefact pills
            const contentPills = meeting.content.map(contentId => {
                const artefact = getArtefactById(contentId);
                return artefact ? `<span class="card-content-pill">${artefact.name}</span>` : '';
            }).join('');

            // Truncate why text for card
            const whyShort = meeting.why.length > 120 ? meeting.why.substring(0, 120) + '...' : meeting.why;

            return `
                <div class="meeting-card" data-id="${meeting.id}" data-category="${meeting.category}">
                    <div class="card-top">
                        <span class="card-category" data-category="${meeting.category}">${category.icon} ${category.name}</span>
                        <span class="card-presenter">🎤 ${meeting.presenter}</span>
                    </div>
                    <h3 class="card-title">${meeting.name}</h3>
                    <p class="card-why">${whyShort}</p>
                    ${meeting.content.length > 0 ? `<div class="card-content-row"><span class="card-content-label">📎 Content:</span> ${contentPills}</div>` : ''}
                    <div class="card-footer">
                        <span class="card-who">👥 ${meeting.whoAttends.split(',').slice(0, 2).join(', ').trim()}${meeting.whoAttends.split(',').length > 2 ? '...' : ''}</span>
                    </div>
                </div>
            `;
        }).join('');

        // Add click handlers to cards
        document.querySelectorAll('.meeting-card').forEach(card => {
            card.addEventListener('click', () => {
                const id = card.getAttribute('data-id');
                openMeetingDetail(id);
            });
        });
    }

    function openMeetingDetail(meetingId) {
        const meeting = getMeetingById(meetingId);
        if (!meeting) return;

        lastOpenedMeetingId = meetingId;
        const category = getCategoryInfo(meeting.category);

        // Category badge
        const categoryBadge = document.getElementById('detailCategoryBadge');
        categoryBadge.textContent = `${category.icon} ${category.name}`;
        categoryBadge.style.background = `${category.color}15`;
        categoryBadge.style.color = category.color;

        // Sprint badge
        const sprintBadge = document.getElementById('detailSprintBadge');
        const sprintNames = meeting.sprints.map(s => getSprintName(s)).join(', ');
        sprintBadge.textContent = `🗓️ ${sprintNames}`;

        // Title
        document.getElementById('detailTitle').textContent = meeting.name;

        // Presenter
        document.getElementById('detailPresenter').textContent = meeting.presenter;

        // Why
        document.getElementById('detailWhy').textContent = meeting.why;

        // Outcome
        document.getElementById('detailOutcome').textContent = meeting.outcome;

        // Content (artefacts as clickable links)
        const contentSection = document.getElementById('contentSection');
        const contentContainer = document.getElementById('detailContent');
        
        if (meeting.content.length > 0) {
            contentSection.style.display = 'block';
            contentContainer.innerHTML = meeting.content.map(contentId => {
                const artefact = getArtefactById(contentId);
                if (!artefact) return '';
                return `<a class="content-link" data-artefact-id="${artefact.id}">📄 ${artefact.name}</a>`;
            }).join('');

            // Add click handlers to content links
            contentContainer.querySelectorAll('.content-link').forEach(link => {
                link.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const artefactId = link.getAttribute('data-artefact-id');
                    openArtefactDetail(artefactId);
                });
            });
        } else {
            contentSection.style.display = 'none';
        }

        // Who attends
        const attendeesContainer = document.getElementById('detailAttendees');
        const attendees = meeting.whoAttends.split(',').map(a => a.trim()).filter(a => a);
        attendeesContainer.innerHTML = `
            <div class="attendees-list">
                ${attendees.map(a => `<span class="attendee-tag">${a}</span>`).join('')}
            </div>
        `;

        // Show overlay
        detailOverlay.classList.add('visible');
        document.body.style.overflow = 'hidden';
    }

    function closeMeetingDetail() {
        detailOverlay.classList.remove('visible');
        document.body.style.overflow = '';
    }

    function openArtefactDetail(artefactId) {
        const artefact = getArtefactById(artefactId);
        if (!artefact) return;

        // Fill artefact panel
        document.getElementById('artefactTitle').textContent = artefact.name;
        document.getElementById('artefactDescription').textContent = artefact.description;
        document.getElementById('artefactOutcome').textContent = artefact.outcome;
        document.getElementById('artefactPreparedBy').textContent = artefact.preparedBy;

        // Hide meeting overlay, show artefact overlay
        detailOverlay.classList.remove('visible');
        artefactOverlay.classList.add('visible');
    }

    function closeArtefactDetail() {
        artefactOverlay.classList.remove('visible');
        document.body.style.overflow = '';
    }

    function backToMeeting() {
        artefactOverlay.classList.remove('visible');
        if (lastOpenedMeetingId) {
            openMeetingDetail(lastOpenedMeetingId);
        }
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
            renderMeetings();
        });
    });

    // View All button
    viewAllBtn.addEventListener('click', () => {
        viewAll = !viewAll;
        viewAllBtn.classList.toggle('active', viewAll);
        updateTimelineActive();
        updateSprintTitle();
        renderMeetings();
    });

    // Category filter clicks
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            currentCategory = btn.getAttribute('data-category');
            updateFilterActive();
            renderMeetings();
        });
    });

    // Close meeting detail panel
    detailClose.addEventListener('click', closeMeetingDetail);
    detailOverlay.addEventListener('click', (e) => {
        if (e.target === detailOverlay) {
            closeMeetingDetail();
        }
    });

    // Close artefact detail panel
    artefactClose.addEventListener('click', closeArtefactDetail);
    artefactOverlay.addEventListener('click', (e) => {
        if (e.target === artefactOverlay) {
            closeArtefactDetail();
        }
    });

    // Back to meeting button
    backToMeetingBtn.addEventListener('click', backToMeeting);

    // Keyboard escape to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (artefactOverlay.classList.contains('visible')) {
                closeArtefactDetail();
            } else if (detailOverlay.classList.contains('visible')) {
                closeMeetingDetail();
            }
        }
    });

    // ========== INIT ==========
    function init() {
        updateTimelineActive();
        updateSprintTitle();
        updateFilterActive();
        renderMeetings();
    }

    init();
})();
