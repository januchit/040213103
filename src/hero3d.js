// ฉาก 3 มิติของหน้าแรก — build: npx esbuild src/hero3d.js --bundle --minify --format=iife --outfile=assets/hero3d.js
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";

const RED = new THREE.Color("#C1132F");
const TOKENS = [
  ["∑", 1], ["π", 1], ["∫", 1], ["√2", 0], ["λ", 1], ["∞", 0], ["f(x)", 0], ["e^{iπ}+1=0", 0],
  ["def", 1], ["for i in range(n):", 0], ["import numpy as np", 0], ["return", 1], ["[ ]", 0],
  ["{ }", 1], ["x²", 0], ["while", 0], ["dy/dx", 0], ["np.linalg", 0], ["print()", 0], ["Δ", 1], ["θ", 0], ["if", 1]
];

function tokenSprite(text, red) {
  const c = document.createElement("canvas");
  const ctx = c.getContext("2d");
  const fs = 64;
  const font = `500 ${fs}px "JetBrains Mono", ui-monospace, Menlo, monospace`;
  ctx.font = font;
  const w = Math.ceil(ctx.measureText(text).width) + 24;
  c.width = w; c.height = fs * 1.5;
  ctx.font = font;
  ctx.textBaseline = "middle";
  ctx.fillStyle = red ? "#ff3355" : "#e9e9e9";
  ctx.fillText(text, 12, c.height / 2);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, opacity: red ? 0.85 : 0.5, depthWrite: false });
  const s = new THREE.Sprite(mat);
  const h = 0.34;
  s.scale.set(h * (c.width / c.height), h, 1);
  return s;
}

export function mount(container) {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: "high-performance" });
  } catch (e) {
    container.classList.add("no-webgl");
    return () => {};
  }
  const maxPR = Math.min(window.devicePixelRatio || 1, 2);
  renderer.setPixelRatio(maxPR);
  renderer.setClearColor(0x000000, 1);
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x000000, 0.055);
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);

  const world = new THREE.Group();
  scene.add(world);

  /* --- 1) พื้นผิวคณิตศาสตร์ z = sin(x)·cos(y) + คลื่นวงกลม (จุดนับหมื่น) --- */
  const N = 150, SIZE = 26;
  const pos = new Float32Array(N * N * 3);
  let k = 0;
  for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) {
    pos[k++] = (i / (N - 1) - 0.5) * SIZE;
    pos[k++] = 0;
    pos[k++] = (j / (N - 1) - 0.5) * SIZE;
  }
  const surfGeo = new THREE.BufferGeometry();
  surfGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  const surfMat = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    uniforms: {
      uTime: { value: 0 }, uPR: { value: maxPR }, uSize: { value: 3.0 },
      uRed: { value: RED }, uFog: { value: 0.055 }
    },
    vertexShader: `
      uniform float uTime, uPR, uSize;
      varying float vH; varying float vDepth;
      void main(){
        vec3 p = position;
        float r = length(p.xz);
        float h = 0.85*sin(p.x*0.42 + uTime*0.55)*cos(p.z*0.42 + uTime*0.4)
                + 0.9*sin(r*0.75 - uTime*1.1)/(1.0 + r*0.22);
        p.y = h;
        vH = h;
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        vDepth = -mv.z;
        gl_PointSize = uSize * uPR * (20.0 / vDepth);
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader: `
      uniform vec3 uRed; uniform float uFog;
      varying float vH; varying float vDepth;
      void main(){
        vec2 c = gl_PointCoord - 0.5;
        float d = length(c);
        if (d > 0.5) discard;
        float a = smoothstep(0.5, 0.05, d);
        float t = clamp((vH + 0.6) / 1.9, 0.0, 1.0);
        vec3 gray = vec3(0.32);
        vec3 col = mix(gray, uRed, smoothstep(0.35, 0.75, t));
        col = mix(col, vec3(1.0, 0.86, 0.88), smoothstep(0.88, 1.0, t));
        float fog = exp(-pow(uFog * vDepth, 2.0) * 2.2);
        gl_FragColor = vec4(col, a * (0.35 + 0.65 * t) * fog);
      }`
  });
  const surface = new THREE.Points(surfGeo, surfMat);
  surface.position.y = -1.9;
  world.add(surface);

  /* --- 2) เส้นกริดจาง ๆ ด้านล่าง --- */
  const grid = new THREE.GridHelper(40, 40, 0x2a2a2a, 0x151515);
  grid.position.y = -3.6;
  grid.material.transparent = true; grid.material.opacity = 0.5;
  world.add(grid);

  /* --- 3) วัตถุหลัก: Torus knot (p,q) = (2,3) แบบ wireframe + แกนกลาง --- */
  const hero = new THREE.Group();
  world.add(hero);
  const knotGeo = new THREE.TorusKnotGeometry(1.25, 0.36, 220, 18, 2, 3);
  const knot = new THREE.LineSegments(
    new THREE.WireframeGeometry(knotGeo),
    new THREE.LineBasicMaterial({ color: RED, transparent: true, opacity: 0.55 })
  );
  hero.add(knot);
  const knotSolid = new THREE.Mesh(knotGeo, new THREE.MeshBasicMaterial({ color: 0x120204, transparent: true, opacity: 0.85 }));
  knotSolid.scale.setScalar(0.985);
  hero.add(knotSolid);
  const ico = new THREE.LineSegments(
    new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(2.55, 1)),
    new THREE.LineBasicMaterial({ color: 0x9a9a9a, transparent: true, opacity: 0.22 })
  );
  hero.add(ico);

  /* --- 4) วงโคจร: เส้นโค้ง Lissajous 3 มิติ + จุดวิ่ง --- */
  const lissPts = [];
  for (let i = 0; i <= 600; i++) {
    const t = (i / 600) * Math.PI * 2;
    lissPts.push(new THREE.Vector3(3.3 * Math.sin(3 * t + Math.PI / 2), 1.1 * Math.sin(2 * t), 3.3 * Math.sin(t)));
  }
  const lissCurve = new THREE.CatmullRomCurve3(lissPts, true);
  const liss = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(lissCurve.getPoints(800)),
    new THREE.LineBasicMaterial({ color: 0xdedede, transparent: true, opacity: 0.28 })
  );
  hero.add(liss);
  const runners = [];
  for (let i = 0; i < 3; i++) {
    const m = new THREE.Mesh(new THREE.SphereGeometry(0.06, 16, 16), new THREE.MeshBasicMaterial({ color: i === 0 ? 0xffffff : 0xff2a48 }));
    hero.add(m); runners.push({ m, off: i / 3 });
  }

  /* --- 5) แกน x y z เล็ก ๆ --- */
  const axes = new THREE.Group();
  const axMat = (c, o) => new THREE.LineBasicMaterial({ color: c, transparent: true, opacity: o });
  [[new THREE.Vector3(3.4, 0, 0), 0xc1132f, 0.7], [new THREE.Vector3(0, 3.4, 0), 0xd0d0d0, 0.45], [new THREE.Vector3(0, 0, 3.4), 0x707070, 0.45]]
    .forEach(([v, c, o]) => axes.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([v.clone().multiplyScalar(-1), v]), axMat(c, o))));
  hero.add(axes);

  /* --- 6) สัญลักษณ์คณิต/โค้ดลอยรอบ ๆ --- */
  const tokens = [];
  const rand = (a, b) => a + Math.random() * (b - a);
  TOKENS.forEach(([txt, red], i) => {
    const s = tokenSprite(txt, red);
    const ang = (i / TOKENS.length) * Math.PI * 2 + rand(-0.2, 0.2);
    const rad = rand(4.2, 7.5);
    s.position.set(Math.cos(ang) * rad, rand(-0.8, 3.6), Math.sin(ang) * rad - 1.5);
    s.userData = { base: s.position.clone(), ph: rand(0, Math.PI * 2), sp: rand(0.3, 0.7) };
    world.add(s); tokens.push(s);
  });

  /* --- 7) ฝุ่นดาว --- */
  const dustN = 700, dust = new Float32Array(dustN * 3);
  for (let i = 0; i < dustN; i++) { dust[i * 3] = rand(-22, 22); dust[i * 3 + 1] = rand(-3, 12); dust[i * 3 + 2] = rand(-25, 6); }
  const dustGeo = new THREE.BufferGeometry(); dustGeo.setAttribute("position", new THREE.BufferAttribute(dust, 3));
  const dustPts = new THREE.Points(dustGeo, new THREE.PointsMaterial({ color: 0x8a8a8a, size: 0.035, transparent: true, opacity: 0.6, depthWrite: false }));
  scene.add(dustPts);

  /* --- post-processing: bloom --- */
  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  const bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), 0.6, 0.5, 0.32);
  composer.addPass(bloom);
  composer.addPass(new OutputPass());

  /* --- layout --- */
  let wide = true;
  function resize() {
    const w = container.clientWidth, h = container.clientHeight;
    renderer.setSize(w, h, false);
    composer.setSize(w, h);
    camera.aspect = w / h;
    wide = w / h > 1.15;
    camera.fov = wide ? 42 : 58;
    camera.updateProjectionMatrix();
    hero.position.set(wide ? 3.9 : 0, wide ? 1.25 : 2.1, 0);
    hero.scale.setScalar(wide ? 1 : 0.78);
  }
  const ro = new ResizeObserver(resize); ro.observe(container); resize();

  /* --- interaction --- */
  const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
  const onMove = (e) => {
    const r = container.getBoundingClientRect();
    mouse.tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
    mouse.ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
  };
  window.addEventListener("pointermove", onMove, { passive: true });

  let visible = true;
  const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; }, { threshold: 0 });
  io.observe(container);

  const clock = new THREE.Clock();
  let raf = 0, t = 0;
  function frame() {
    raf = requestAnimationFrame(frame);
    if (!visible || document.hidden) { clock.getDelta(); return; }
    const dt = Math.min(clock.getDelta(), 0.05) * (reduce ? 0.15 : 1);
    t += dt;
    mouse.x += (mouse.tx - mouse.x) * 0.04; mouse.y += (mouse.ty - mouse.y) * 0.04;

    surfMat.uniforms.uTime.value = t;
    knot.rotation.set(t * 0.18, t * 0.27, 0); knotSolid.rotation.copy(knot.rotation);
    ico.rotation.set(-t * 0.06, t * 0.09, 0);
    liss.rotation.y = t * 0.12; axes.rotation.y = t * 0.12;
    runners.forEach((r) => {
      const p = lissCurve.getPointAt((t * 0.06 + r.off) % 1);
      r.m.position.copy(p).applyAxisAngle(new THREE.Vector3(0, 1, 0), liss.rotation.y);
    });
    tokens.forEach((s) => {
      const u = s.userData;
      s.position.y = u.base.y + Math.sin(t * u.sp + u.ph) * 0.25;
    });
    world.rotation.y = Math.sin(t * 0.05) * 0.12 + mouse.x * 0.12;
    dustPts.rotation.y = t * 0.01;

    const camR = 11.5;
    camera.position.set(Math.sin(mouse.x * 0.15) * camR * 0.2, 3.6 - mouse.y * 0.6, camR);
    camera.lookAt(wide ? 1.2 : 0, 0.3, 0);
    composer.render();
  }
  frame();

  return function unmount() {
    cancelAnimationFrame(raf);
    ro.disconnect(); io.disconnect();
    window.removeEventListener("pointermove", onMove);
    scene.traverse((o) => {
      if (o.geometry) o.geometry.dispose();
      if (o.material) { if (o.material.map) o.material.map.dispose(); o.material.dispose(); }
    });
    composer.dispose && composer.dispose();
    renderer.dispose();
    renderer.domElement.remove();
  };
}

window.Hero3D = { mount };
if (window.__heroPending) { const el = window.__heroPending; window.__heroPending = null; window.__heroUnmount = mount(el); }
