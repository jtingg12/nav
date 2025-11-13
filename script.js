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
    // 清除所有 nav 链接的 active
    navItems.forEach(l => l.classList.remove('active'));

    // 清除 Quiz / Login 的 active
    quizBtn.classList.remove('active');
    loginBtn.classList.remove('active');

    // 给当前点击的加上 active
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

// // Login google
// function decodeJwtResponse(token) {
//   const base64Url = token.split('.')[1];
//   const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//   const jsonPayload = decodeURIComponent(atob(base64).split('').map(c=>{
//     return '%' + ('00'+c.charCodeAt(0).toString(16)).slice(-2);
//   }).join(''));
//   return JSON.parse(jsonPayload);
// }

// function handleCredentialResponse(response) {
//   const payload = decodeJwtResponse(response.credential);
//   document.getElementById('avatar').src = payload.picture;
//   document.getElementById('name').innerText = payload.name;
//   document.getElementById('email').innerText = payload.email;
//   document.getElementById('user-info').style.display = 'block';
//   console.log('用户登录信息:', payload);
// }

// ---------------- Login Overlay ----------------
const overlay = document.getElementById('overlay');
const openLogin = document.querySelector('.login-btn');
const btnContainer = document.querySelector('.btn-container');
const btn = document.getElementById('login-btn');
const form = document.getElementById('loginForm');
const uname = document.getElementById('uname');
const pass = document.getElementById('pass');
const msg = document.getElementById('msg');

btn.disabled = true;

// 点击导航栏登录按钮弹出
openLogin.addEventListener('click', (e) => {
  e.preventDefault();
  overlay.classList.add('active');
});

// 点击遮罩关闭
overlay.addEventListener('click', (e) => {
  if (e.target === overlay) overlay.classList.remove('active');
});

// 输入检测
function showMsg() {
    const isEmpty = uname.value === '' || pass.value === '';
    btn.classList.toggle('no-shift', !isEmpty);

    if (isEmpty) {
        btn.disabled = true
         msg.style.color = 'rgb(218,49,49)';
         msg.style.fontSize = '14px';
         msg.innerText = 'Please fill the input fields before proceeding~';
    } else {
        msg.innerText = 'Great! Now you can proceed~';
        msg.style.color = '#ffb457';
        btn.disabled = false;
        btn.classList.add('no-shift')
    }
}

// ---------------- Google Sign-In ----------------

// 点击 Google 登录按钮时手动触发登录弹窗
const googleLoginBtn = document.getElementById('googleLogin');
googleLoginBtn.addEventListener('click', (e) => {
  e.preventDefault();
  google.accounts.id.prompt(); // ✅ 触发 Google 登录窗口
});

// 解码 Google 返回的 ID Token
function decodeJwtResponse(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  return JSON.parse(jsonPayload);
}

// Google 登录回调函数
function handleCredentialResponse(response) {
  const payload = decodeJwtResponse(response.credential);
  console.log('✅ Google 登录成功:', payload);

  // 存储用户资料
  localStorage.setItem('starkit_user', JSON.stringify(payload));

  // 更新导航栏头像
  const navAvatar = document.getElementById('nav-avatar');
  navAvatar.src = payload.picture;
  navAvatar.style.display = 'inline-block'; // 显示头像

  // 隐藏登录弹窗
  overlay.classList.remove('active');
}


  // 显示用户信息
  document.getElementById('avatar').src = payload.picture;
  document.getElementById('name').innerText = payload.name;
  document.getElementById('email').innerText = payload.email;
  document.getElementById('user-info').style.display = 'block';

  // 隐藏登录弹窗
  overlay.classList.remove('active');

  window.addEventListener('DOMContentLoaded', () => {
  const user = JSON.parse(localStorage.getItem('starkit_user'));
  if (user) {
    const navAvatar = document.getElementById('nav-avatar');
    navAvatar.src = user.picture;
    navAvatar.style.display = 'inline-block';
  }
});

  // ✅ 也可以储存用户登录状态
  localStorage.setItem('starkit_user', JSON.stringify(payload));
