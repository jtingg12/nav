const navbar = document.getElementById('navbar');
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');
const navButtons = document.querySelector('.nav-buttons');
const backToTop = document.createElement('button');

// Navbar shadow on scroll
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
    backToTop.style.display = 'block';
  } else {
    navbar.classList.remove('scrolled');
    backToTop.style.display = 'none';
  }
});

// Keep underline on clicked nav link
const navItems = document.querySelectorAll('.nav-links li a');

navItems.forEach(link => {
  link.addEventListener('click', () => {
    navItems.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
  });
});

// For Quiz and Login buttons
const quizBtn = document.querySelector('.quiz-btn');
const loginBtn = document.querySelector('.login-btn');

// Remove highlight from nav links when these are clicked
quizBtn.addEventListener('click', () => {
  navItems.forEach(l => l.classList.remove('active'));
  quizBtn.classList.add('active');
  loginBtn.classList.remove('active');
});

loginBtn.addEventListener('click', () => {
  navItems.forEach(l => l.classList.remove('active'));
  loginBtn.classList.add('active');
  quizBtn.classList.remove('active');
});

// Auto-detect current page and highlight
const currentPage = window.location.pathname.split("/").pop();
navItems.forEach(link => {
  if (link.getAttribute("href") === currentPage) {
    link.classList.add("active");
  }
});

// Toggle mobile menu
menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  navButtons.classList.toggle('active');
  menuToggle.classList.toggle('active');
});

// Create Back to Top button
backToTop.id = 'backToTop';
backToTop.innerHTML = '↑';
document.body.appendChild(backToTop);

// Smooth scroll to top
backToTop.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Login google
function decodeJwtResponse(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(c=>{
    return '%' + ('00'+c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  return JSON.parse(jsonPayload);
}

function handleCredentialResponse(response) {
  const payload = decodeJwtResponse(response.credential);
  document.getElementById('avatar').src = payload.picture;
  document.getElementById('name').innerText = payload.name;
  document.getElementById('email').innerText = payload.email;
  document.getElementById('user-info').style.display = 'block';
  console.log('用户登录信息:', payload);
}