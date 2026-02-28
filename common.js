/**
 * UdaanAI - Common JS
 * Shared utilities, auth, API helpers across all pages
 */

const API = 'http://localhost:5000/api';

// ─── USER STATE ──────────────────────────────────────────────────────────────

function getUser() {
    try { return JSON.parse(localStorage.getItem('udaan_user')) || null; } catch { return null; }
}
function setUser(u) { localStorage.setItem('udaan_user', JSON.stringify(u)); }
function clearUser() { localStorage.removeItem('udaan_user'); }
function isPro() { const u = getUser(); return u && u.is_pro == 1; }

// ─── API HELPERS ─────────────────────────────────────────────────────────────

async function apiGet(endpoint) {
    try {
        const res = await fetch(API + endpoint, { credentials: 'include' });
        return await res.json();
    } catch { return null; }
}

async function apiPost(endpoint, data) {
    try {
        const res = await fetch(API + endpoint, {
            method: 'POST', credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return await res.json();
    } catch { return null; }
}

async function apiPut(endpoint, data) {
    try {
        const res = await fetch(API + endpoint, {
            method: 'PUT', credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return await res.json();
    } catch { return null; }
}

async function apiDelete(endpoint) {
    try {
        const res = await fetch(API + endpoint, { method: 'DELETE', credentials: 'include' });
        return await res.json();
    } catch { return null; }
}

// ─── NAVBAR ──────────────────────────────────────────────────────────────────

function renderNavbar(activePage) {
    const user = getUser();
    const navLinks = [
        { href: 'index.html', label: 'Home', icon: 'bi-house-fill' },
        { href: 'jobs.html', label: 'Jobs', icon: 'bi-briefcase-fill' },
        { href: 'employer.html', label: 'Employers', icon: 'bi-building' },
        { href: 'resume.html', label: 'Resume', icon: 'bi-file-person-fill' },
        { href: 'resources.html', label: 'Resources', icon: 'bi-heart-fill' },
        { href: 'chat.html', label: 'AI Chat', icon: 'bi-robot' },
    ];
    const proBadge = user && user.is_pro ? '<span class="badge bg-warning text-dark ms-1">PRO</span>' : '';
    const authHTML = user
        ? `<div class="d-flex align-items-center gap-2">
               <span class="text-white fw-semibold small">${user.name}${proBadge}</span>
               ${!user.is_pro ? `<button class="btn btn-warning btn-sm fw-bold" onclick="upgradeToPro()"><i class="bi bi-lightning-fill"></i> Upgrade</button>` : ''}
               <button class="btn btn-outline-light btn-sm" onclick="logout()">Logout</button>
           </div>`
        : `<div class="d-flex gap-2">
               <button class="btn btn-outline-light btn-sm" data-bs-toggle="modal" data-bs-target="#loginModal">Login</button>
               <button class="btn btn-warning btn-sm fw-bold" data-bs-toggle="modal" data-bs-target="#registerModal">Get Started</button>
           </div>`;

    const linksHTML = navLinks.map(l => `
        <li class="nav-item">
            <a class="nav-link ${activePage === l.href ? 'active' : ''}" href="${l.href}">
                <i class="bi ${l.icon} me-1"></i>${l.label}
            </a>
        </li>`).join('');

    return `
    <nav class="navbar navbar-expand-lg navbar-dark sticky-top shadow-sm" style="background: linear-gradient(135deg,#1a0533 0%,#2d1b69 100%); border-bottom:2px solid rgba(255,180,50,0.3);">
        <div class="container-fluid px-4">
            <a class="navbar-brand d-flex align-items-center gap-2 fw-bold" href="index.html">
                <div style="width:36px;height:36px;background:linear-gradient(135deg,#ff6b35,#ffd700);border-radius:50%;display:flex;align-items:center;justify-content:center;">
                    <i class="bi bi-rocket-fill text-white"></i>
                </div>
                <span style="background:linear-gradient(90deg,#ffd700,#ff6b35);-webkit-background-clip:text;-webkit-text-fill-color:transparent;font-size:1.4rem;">UdaanAI</span>
            </a>
            <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav mx-auto gap-1">${linksHTML}</ul>
                <div class="ms-auto">${authHTML}</div>
            </div>
        </div>
    </nav>`;
}

function renderFooter() {
    return `
    <footer style="background:linear-gradient(135deg,#0d0221,#1a0533);border-top:2px solid rgba(255,180,50,0.2);" class="text-white py-5 mt-5">
        <div class="container">
            <div class="row g-4">
                <div class="col-lg-4">
                    <div class="d-flex align-items-center gap-2 mb-3">
                        <div style="width:40px;height:40px;background:linear-gradient(135deg,#ff6b35,#ffd700);border-radius:50%;display:flex;align-items:center;justify-content:center;">
                            <i class="bi bi-rocket-fill text-white"></i>
                        </div>
                        <span style="font-size:1.6rem;font-weight:700;background:linear-gradient(90deg,#ffd700,#ff6b35);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">UdaanAI</span>
                    </div>
                    <p class="text-white-50 small">Empowering transgender and LGBTQ+ individuals with safe, inclusive, and dignified career opportunities across India.</p>
                    <div class="d-flex gap-3 mt-3">
                        ${['twitter','instagram','linkedin','facebook'].map(s=>`<a href="#" class="text-white-50 fs-5 hover-orange"><i class="bi bi-${s}"></i></a>`).join('')}
                    </div>
                </div>
                <div class="col-lg-2 col-6">
                    <h6 class="text-warning fw-bold mb-3">Platform</h6>
                    <ul class="list-unstyled small">
                        ${[['jobs.html','Find Jobs'],['employer.html','Employers'],['resume.html','Resume Builder'],['chat.html','AI Advisor']].map(([h,l])=>`<li class="mb-2"><a href="${h}" class="text-white-50 text-decoration-none">${l}</a></li>`).join('')}
                    </ul>
                </div>
                <div class="col-lg-2 col-6">
                    <h6 class="text-warning fw-bold mb-3">Support</h6>
                    <ul class="list-unstyled small">
                        ${[['resources.html','NGOs & Help'],['resources.html','Legal Rights'],['resources.html','Scholarships'],['#','About Us']].map(([h,l])=>`<li class="mb-2"><a href="${h}" class="text-white-50 text-decoration-none">${l}</a></li>`).join('')}
                    </ul>
                </div>
                <div class="col-lg-4">
                    <h6 class="text-warning fw-bold mb-3">🏳️‍🌈 Safe Space Declaration</h6>
                    <p class="text-white-50 small">UdaanAI is a zero-discrimination platform. We believe every individual deserves dignity, opportunity, and safety in their career journey.</p>
                    <div class="mt-3 p-3 rounded" style="background:rgba(255,215,0,0.1);border:1px solid rgba(255,215,0,0.3);">
                        <small class="text-warning"><i class="bi bi-shield-check-fill me-2"></i>Verified Safe Employer Network</small>
                    </div>
                </div>
            </div>
            <hr class="border-secondary mt-4">
            <div class="d-flex flex-wrap justify-content-between align-items-center">
                <small class="text-white-50">© 2024 UdaanAI. Built with ❤️ for inclusion & dignity.</small>
                <small class="text-white-50">Privacy Policy · Terms of Use · Contact Us</small>
            </div>
        </div>
    </footer>`;
}

function renderAuthModals() {
    return `
    <!-- Login Modal -->
    <div class="modal fade" id="loginModal" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content" style="background:#1a0533;border:1px solid rgba(255,180,50,0.3);">
                <div class="modal-header border-0">
                    <h5 class="modal-title text-warning fw-bold"><i class="bi bi-person-circle me-2"></i>Welcome Back</h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body px-4 pb-4">
                    <div id="loginError" class="alert alert-danger d-none"></div>
                    <div class="mb-3">
                        <label class="text-white-50 small">Email Address</label>
                        <input type="email" id="loginEmail" class="form-control bg-dark text-white border-secondary" placeholder="you@email.com">
                    </div>
                    <div class="mb-3">
                        <label class="text-white-50 small">Password</label>
                        <input type="password" id="loginPassword" class="form-control bg-dark text-white border-secondary" placeholder="••••••••">
                    </div>
                    <button class="btn btn-warning w-100 fw-bold" onclick="doLogin()">Login <i class="bi bi-arrow-right"></i></button>
                    <p class="text-center text-white-50 small mt-3">Don't have an account? <a href="#" class="text-warning" onclick="switchToRegister()">Register free</a></p>
                </div>
            </div>
        </div>
    </div>
    <!-- Register Modal -->
    <div class="modal fade" id="registerModal" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content" style="background:#1a0533;border:1px solid rgba(255,180,50,0.3);">
                <div class="modal-header border-0">
                    <h5 class="modal-title text-warning fw-bold"><i class="bi bi-rocket-fill me-2"></i>Join UdaanAI Free</h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body px-4 pb-4">
                    <div id="registerError" class="alert alert-danger d-none"></div>
                    <div id="registerSuccess" class="alert alert-success d-none"></div>
                    <div class="mb-3">
                        <label class="text-white-50 small">Full Name</label>
                        <input type="text" id="regName" class="form-control bg-dark text-white border-secondary" placeholder="Your Name">
                    </div>
                    <div class="mb-3">
                        <label class="text-white-50 small">Email Address</label>
                        <input type="email" id="regEmail" class="form-control bg-dark text-white border-secondary" placeholder="you@email.com">
                    </div>
                    <div class="mb-3">
                        <label class="text-white-50 small">Password</label>
                        <input type="password" id="regPassword" class="form-control bg-dark text-white border-secondary" placeholder="Min 6 characters">
                    </div>
                    <button class="btn btn-warning w-100 fw-bold" onclick="doRegister()">Create Free Account <i class="bi bi-arrow-right"></i></button>
                </div>
            </div>
        </div>
    </div>`;
}

// ─── AUTH ACTIONS ─────────────────────────────────────────────────────────────

async function doLogin() {
    const email = document.getElementById('loginEmail').value;
    const pw = document.getElementById('loginPassword').value;
    if (!email || !pw) return;
    const res = await apiPost('/login', { email, password: pw });
    if (res && res.success) {
        setUser({ id: res.id, name: res.name, is_pro: res.is_pro });
        bootstrap.Modal.getInstance(document.getElementById('loginModal')).hide();
        window.location.reload();
    } else {
        const el = document.getElementById('loginError');
        el.textContent = res?.message || 'Login failed'; el.classList.remove('d-none');
    }
}

async function doRegister() {
    const name = document.getElementById('regName').value;
    const email = document.getElementById('regEmail').value;
    const pw = document.getElementById('regPassword').value;
    if (!name || !email || !pw) return;
    const res = await apiPost('/register', { name, email, password: pw });
    const errEl = document.getElementById('registerError');
    const sucEl = document.getElementById('registerSuccess');
    if (res && res.success) {
        sucEl.textContent = 'Registered! Please login.'; sucEl.classList.remove('d-none');
        errEl.classList.add('d-none');
    } else {
        errEl.textContent = res?.message || 'Registration failed'; errEl.classList.remove('d-none');
    }
}

function switchToRegister() {
    bootstrap.Modal.getInstance(document.getElementById('loginModal')).hide();
    setTimeout(() => new bootstrap.Modal(document.getElementById('registerModal')).show(), 300);
}

function logout() {
    clearUser(); window.location.href = 'index.html';
}

async function upgradeToPro() {
    const user = getUser();
    if (!user) { new bootstrap.Modal(document.getElementById('loginModal')).show(); return; }
    if (confirm('Upgrade to UdaanAI Pro? (Free demo - no payment needed)')) {
        const res = await apiPost('/upgrade', { user_id: user.id });
        if (res && res.success) {
            user.is_pro = 1; setUser(user);
            alert('🎉 Welcome to UdaanAI Pro! Unlimited access unlocked.');
            window.location.reload();
        }
    }
}

// ─── SCORE COLOR ─────────────────────────────────────────────────────────────

function scoreColor(s) {
    if (s >= 90) return '#22c55e';
    if (s >= 75) return '#eab308';
    if (s >= 60) return '#f97316';
    return '#ef4444';
}

function scoreBadge(s) {
    const color = scoreColor(s);
    const label = s >= 90 ? 'Excellent' : s >= 75 ? 'Good' : s >= 60 ? 'Average' : 'Low';
    return `<span class="badge" style="background:${color}">${s}% - ${label}</span>`;
}
