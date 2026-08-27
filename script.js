const header=document.getElementById('siteHeader');
const progress=document.getElementById('progressBar');
const toggle=document.getElementById('navToggle');
const nav=document.getElementById('nav');
const year=document.getElementById('year');
const toast=document.getElementById('toast');
year.textContent=new Date().getFullYear();

function updateScroll(){
  const max=document.documentElement.scrollHeight-window.innerHeight;
  progress.style.width=`${max>0?(window.scrollY/max)*100:0}%`;
  header.classList.toggle('scrolled',window.scrollY>15);
}
window.addEventListener('scroll',updateScroll,{passive:true});
updateScroll();

toggle.addEventListener('click',()=>{
  const open=nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded',String(open));
});

document.querySelectorAll('.nav a').forEach(link=>link.addEventListener('click',()=>{
  nav.classList.remove('open');
  toggle.setAttribute('aria-expanded','false');
}));

const navLinks=[...document.querySelectorAll('.nav a')];
const sections=[...document.querySelectorAll('main section[id]')];
const sectionObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      navLinks.forEach(link=>link.classList.toggle('active',link.getAttribute('href')===`#${entry.target.id}`));
    }
  });
},{rootMargin:'-38% 0px -52% 0px',threshold:0});
sections.forEach(section=>sectionObserver.observe(section));

const revealObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target);}
  });
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));

document.querySelectorAll('a[href^="#"]').forEach(anchor=>anchor.addEventListener('click',e=>{
  const target=document.querySelector(anchor.getAttribute('href'));
  if(!target)return;
  e.preventDefault();
  target.scrollIntoView({behavior:'smooth',block:'start'});
}));

const copyButton=document.getElementById('copyEmail');
copyButton.addEventListener('click',async()=>{
  const email='rishisharma8142@gmail.com';
  try{await navigator.clipboard.writeText(email);}catch{const area=document.createElement('textarea');area.value=email;document.body.appendChild(area);area.select();document.execCommand('copy');area.remove();}
  toast.classList.add('show');
  setTimeout(()=>toast.classList.remove('show'),1800);
});


// Light / dark mode toggle
const themeToggle=document.getElementById('themeToggle');
const savedTheme=localStorage.getItem('portfolio-theme');
if(savedTheme==='dark'){document.documentElement.classList.add('dark');}
function syncThemeButton(){
  const dark=document.documentElement.classList.contains('dark');
  themeToggle.setAttribute('aria-pressed',String(dark));
  themeToggle.setAttribute('aria-label',dark?'Switch to light mode':'Switch to dark mode');
  themeToggle.innerHTML=`<span class="theme-icon">${dark?'☀':'☾'}</span><span class="theme-label">${dark?'Light':'Dark'}</span>`;
}
syncThemeButton();
themeToggle.addEventListener('click',()=>{
  document.documentElement.classList.toggle('dark');
  localStorage.setItem('portfolio-theme',document.documentElement.classList.contains('dark')?'dark':'light');
  syncThemeButton();
});
