// ---------------- Navbar Elements ----------------
const navbar = document.getElementById('navbar');
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');
const navButtons = document.querySelector('.nav-buttons');
const backToTop = document.createElement('button');

// Navbar shadow + Back to top
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
    backToTop.style.display = 'block';
  } else {
    navbar.classList.remove('scrolled');
    backToTop.style.display = 'none';
  }
});

// Create Back to Top button
backToTop.id = 'backToTop';
backToTop.innerHTML = '↑';
document.body.appendChild(backToTop);

// Smooth scroll to top
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ---------------- Active Link Logic ----------------
const navItems = document.querySelectorAll('.nav-links li a');
const quizBtn = document.querySelector('.quiz-btn');
const loginBtn = document.querySelector('.login-btn');

// 当点击普通导航项时
navItems.forEach(link => {
  link.addEventListener('click', () => {
    navItems.forEach(l => l.classList.remove('active'));
    quizBtn.classList.remove('active');
    loginBtn.classList.remove('active');
    link.classList.add('active');
  });
});

// 点击 Quiz 按钮时
quizBtn.addEventListener('click', () => {
  navItems.forEach(l => l.classList.remove('active'));
  quizBtn.classList.add('active');
  loginBtn.classList.remove('active');
});

// 点击 Login 按钮时
loginBtn.addEventListener('click', () => {
  navItems.forEach(l => l.classList.remove('active'));
  loginBtn.classList.add('active');
  quizBtn.classList.remove('active');
});

// 自动检测当前页面高亮
const currentPage = window.location.pathname.split("/").pop();
navItems.forEach(link => {
  if (link.getAttribute("href") === currentPage) {
    link.classList.add("active");
  }
});

// ---------------- Toggle Mobile Menu ----------------
menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  navButtons.classList.toggle('active');
  menuToggle.classList.toggle('active');
});

// ---------------- Login Overlay ----------------
const overlay = document.getElementById('overlay');
const openLogin = document.querySelector('.login-btn');
const btn = document.getElementById('login-btn');
const form = document.getElementById('loginForm');
const uname = document.getElementById('uname');
const pass = document.getElementById('pass');
const msg = document.getElementById('msg');

btn.disabled = true;

uname.addEventListener('input', showMsg);
pass.addEventListener('input', showMsg);

openLogin.addEventListener('click', (e) => {
  e.preventDefault();
  overlay.classList.add('active');
});

overlay.addEventListener('click', (e) => {
  if (e.target === overlay) overlay.classList.remove('active');
});

function showMsg() {
  const isEmpty = uname.value === '' || pass.value === '';
  btn.classList.toggle('no-shift', !isEmpty);

  if (isEmpty) {
    btn.disabled = true;
    msg.style.color = 'rgb(218,49,49)';
    msg.style.fontSize = '14px';
    msg.innerText = 'Please fill the input fields before proceeding~';
  } else {
    msg.innerText = 'Great! Now you can proceed~';
    msg.style.color = '#ffb457';
    btn.disabled = false;
    btn.classList.add('no-shift');
  }
}

// ✅ 这就是关键逻辑：当点击 “Log In” 时执行的动作
btn.addEventListener('click', (e) => {
  e.preventDefault();

  const email = uname.value.trim();
  const password = pass.value.trim();

  if (email && password) {
    // 模拟登录成功
    msg.innerText = 'Login successful!';
    msg.style.color = '#008404ff';

    // 模拟存储用户
    const fakeUser = {
      name: email.split('@')[0],
      email: email,
      picture: 'images/login/fakeuser.png'
    };
    localStorage.setItem('starkit_user', JSON.stringify(fakeUser));

    // 更新导航栏头像
    const navAvatar = document.getElementById('nav-avatar');
    navAvatar.src = fakeUser.picture;
    navAvatar.style.display = 'inline-block';

    // 关闭登录弹窗
    setTimeout(() => {
      overlay.classList.remove('active');
    }, 800);
  } else {
    msg.innerText = 'Please fill in all fields!';
    msg.style.color = 'rgb(218,49,49)';
  }
});

// ---------------- Google Sign-In ----------------
const googleLoginBtn = document.getElementById('googleLogin');
googleLoginBtn.addEventListener('click', (e) => {
  e.preventDefault();
  google.accounts.id.prompt(); // ✅ 触发 Google 登录窗口
});

function decodeJwtResponse(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  return JSON.parse(jsonPayload);
}

function handleCredentialResponse(response) {
  const payload = decodeJwtResponse(response.credential);
  console.log('✅ Google 登录成功:', payload);

  // 存储用户资料
  localStorage.setItem('starkit_user', JSON.stringify(payload));

  // 更新导航栏头像
  const navAvatar = document.getElementById('nav-avatar');
  navAvatar.src = payload.picture;
  navAvatar.style.display = 'inline-block';

  // 显示用户信息（如果有 user-info 区块）
  const avatar = document.getElementById('avatar');
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  if (avatar && name && email) {
    avatar.src = payload.picture;
    name.innerText = payload.name;
    email.innerText = payload.email;
    document.getElementById('user-info').style.display = 'block';
  }

  overlay.classList.remove('active');
}

// // 页面加载时检测登录状态
// window.addEventListener('DOMContentLoaded', () => {
//   const user = JSON.parse(localStorage.getItem('starkit_user'));
//   if (user) {
//     const navAvatar = document.getElementById('nav-avatar');
//     navAvatar.src = user.picture;
//     navAvatar.style.display = 'inline-block';
//   }
// });
