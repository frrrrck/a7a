const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');
let w, h, stars;
 
function resize(){
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
  const count = Math.floor((w * h) / 6000);
  stars = Array.from({ length: count }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 1.1 + 0.2,
    baseAlpha: Math.random() * 0.6 + 0.2,
    phase: Math.random() * Math.PI * 2,
    speed: Math.random() * 0.015 + 0.005
  }));
}
 
let t = 0;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 
function draw(){
  ctx.clearRect(0, 0, w, h);
  for(const s of stars){
    const twinkle = reduceMotion ? s.baseAlpha : s.baseAlpha + Math.sin(t * s.speed * 10 + s.phase) * 0.25;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${Math.max(0, Math.min(1, twinkle))})`;
    ctx.fill();
  }
  t += 1;
  requestAnimationFrame(draw);
}
 
resize();
window.addEventListener('resize', resize);
draw();
 