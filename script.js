/* ===================================
   NOSSA HISTÓRIA NAS ESTRELAS
   JavaScript - Funcionalidades
   =================================== */

// ===== NAVEGAÇÃO =====
function navigateTo(page) {
    // Remove active de todas as páginas
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(page).classList.add('active');
    
    // Remove active de todos os links
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
    document.querySelector(`[data-page="${page}"]`).classList.add('active');
    
    // Fecha o menu mobile
    document.getElementById('nav').classList.remove('active');
    
    // Scroll para o topo
    window.scrollTo(0, 0);
}

// ===== MENU TOGGLE (Mobile) =====
document.getElementById('menuToggle').addEventListener('click', function() {
    document.getElementById('nav').classList.toggle('active');
});

// ===== NAVIGATION LINKS =====
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const page = this.getAttribute('data-page');
        navigateTo(page);
    });
});

// ===== GALLERY FILTER =====
function filterGallery(category) {
    // Atualiza botões ativos
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Filtra itens
    document.querySelectorAll('.gallery-item').forEach(item => {
        if (category === 'all' || item.getAttribute('data-category') === category) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// ===== MODAL =====
function openModal(element) {
    const img = element.querySelector('img');
    const title = element.querySelector('.gallery-title').textContent;
    const description = element.querySelector('.gallery-description').textContent;
    
    document.getElementById('modalImage').src = img.src;
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalDescription').textContent = description;
    document.getElementById('modal').classList.add('active');
}

function closeModal() {
    document.getElementById('modal').classList.remove('active');
}

// Fecha modal ao clicar fora
document.getElementById('modal').addEventListener('click', function(e) {
    if (e.target === this) closeModal();
});

// ===== CONTACT FORM =====
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Mensagem enviada com sucesso! 💕');
    this.reset();
});

// ===== MUSIC PLAYER =====
const audio = document.getElementById('audio');
let isPlaying = false;
let isMuted = false;

function togglePlayer() {
    const playerExpanded = document.getElementById('playerExpanded');
    playerExpanded.style.display = playerExpanded.style.display === 'none' ? 'block' : 'none';
}

function toggleAudio() {
    if (isPlaying) {
        audio.pause();
        isPlaying = false;
    } else {
        audio.play();
        isPlaying = true;
    }
    updatePlayerUI();
}

function toggleMute() {
    isMuted = !isMuted;
    audio.volume = isMuted ? 0 : parseFloat(document.getElementById('volumeSlider').value);
    updatePlayerUI();
}

function setVolume(value) {
    audio.volume = value;
    if (value > 0) isMuted = false;
    updatePlayerUI();
}

function seekAudio(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    audio.currentTime = percent * audio.duration;
}

function updatePlayerUI() {
    document.getElementById('playPauseIcon').textContent = isPlaying ? '⏸️' : '▶️';
    document.getElementById('volumeIcon').textContent = isMuted ? '🔇' : '🔊';
    document.getElementById('playerStatus').textContent = isPlaying ? '🎵 Tocando...' : '⏸️ Pausado';
}

// Atualiza progresso da música
audio.addEventListener('timeupdate', function() {
    const percent = (audio.currentTime / audio.duration) * 100;
    document.getElementById('progressBar').style.width = percent + '%';
    document.getElementById('currentTime').textContent = formatTime(audio.currentTime);
    document.getElementById('duration').textContent = formatTime(audio.duration);
});

function formatTime(time) {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

// Inicializa o player
audio.volume = 0.3;
audio.play().then(() => {
    isPlaying = true;
    updatePlayerUI();
}).catch(() => {
    isPlaying = false;
    updatePlayerUI();
});
