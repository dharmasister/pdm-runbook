// Key Termly Ceremonies - Application Logic
(function() {
    'use strict';

    // ========== STATE ==========
    let currentSprint = 'sprint-1';
    let currentCategory = 'all';
    let viewAll = false;

    // ========== DOM ELEMENTS ==========
    const timelineNodes = document.querySelectorAll('.timeline-node');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const meetingsGrid = document.getElementById('meetingsGrid');
    const sprintTitle = document.getElementById('sprintTitle');
    const sprintCount = document.getElementById('sprintCount');
    const detailOverlay = document.getElementById('detailOverlay');
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

        // Content (artefacts as clickable links + inline preview)
        const contentSection = document.getElementById('contentSection');
        const contentContainer = document.getElementById('detailContent');
        const contentPreview = document.getElementById('contentPreview');
        
        if (meeting.content.length > 0) {
            contentSection.style.display = 'block';
            
            // Render artefact links
            contentContainer.innerHTML = meeting.content.map(contentId => {
                const artefact = getArtefactById(contentId);
                if (!artefact) return '';
                const hasImages = artefact.screenshots && artefact.screenshots.length > 0;
                return `<a class="content-link ${hasImages ? 'has-images' : ''}" data-artefact-id="${artefact.id}">📄 ${artefact.name} ${hasImages ? '🖼️' : ''}</a>`;
            }).join('');

            // Clear preview initially
            contentPreview.innerHTML = '';

            // Add click handlers to content links
            contentContainer.querySelectorAll('.content-link').forEach(link => {
                link.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const artefactId = link.getAttribute('data-artefact-id');
                    toggleArtefactPreview(artefactId, link);
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

    function toggleArtefactPreview(artefactId, clickedLink) {
        const artefact = getArtefactById(artefactId);
        if (!artefact) return;

        const contentPreview = document.getElementById('contentPreview');
        
        // Toggle: if already showing this artefact, hide it
        if (contentPreview.getAttribute('data-showing') === artefactId) {
            contentPreview.innerHTML = '';
            contentPreview.setAttribute('data-showing', '');
            clickedLink.classList.remove('expanded');
            return;
        }

        // Mark all links as not expanded, then expand this one
        document.querySelectorAll('.content-link').forEach(l => l.classList.remove('expanded'));
        clickedLink.classList.add('expanded');
        contentPreview.setAttribute('data-showing', artefactId);

        // Build preview content
        let previewHTML = `<div class="artefact-inline-preview">`;
        previewHTML += `<h4 class="preview-title">${artefact.name}</h4>`;
        previewHTML += `<p class="preview-description">${artefact.description}</p>`;
        
        // Screenshots
        if (artefact.screenshots && artefact.screenshots.length > 0) {
            previewHTML += `<div class="preview-screenshots">`;
            artefact.screenshots.forEach((src, index) => {
                previewHTML += `<div class="preview-screenshot-item" data-src="${src}">
                    <img src="${src}" alt="${artefact.name} - example ${index + 1}" class="preview-screenshot-img" />
                </div>`;
            });
            previewHTML += `<p class="screenshot-hint">Click image to enlarge</p>`;
            previewHTML += `</div>`;
        }

        previewHTML += `</div>`;
        contentPreview.innerHTML = previewHTML;

        // Add lightbox click handlers to screenshots
        contentPreview.querySelectorAll('.preview-screenshot-item').forEach(item => {
            item.addEventListener('click', () => {
                const src = item.getAttribute('data-src');
                openLightbox(src);
            });
        });

        // Scroll preview into view
        contentPreview.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    function openLightbox(imageSrc) {
        const lightboxOverlay = document.getElementById('lightboxOverlay');
        const lightboxImage = document.getElementById('lightboxImage');
        lightboxImage.src = imageSrc;
        lightboxOverlay.classList.add('visible');
    }

    function closeLightbox() {
        const lightboxOverlay = document.getElementById('lightboxOverlay');
        lightboxOverlay.classList.remove('visible');
    }

    function closeMeetingDetail() {
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

    // Lightbox close
    document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
    document.getElementById('lightboxOverlay').addEventListener('click', (e) => {
        if (e.target === document.getElementById('lightboxOverlay') || e.target === document.getElementById('lightboxImage')) {
            closeLightbox();
        }
    });

    // Keyboard escape to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const lightboxOverlay = document.getElementById('lightboxOverlay');
            if (lightboxOverlay.classList.contains('visible')) {
                closeLightbox();
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
