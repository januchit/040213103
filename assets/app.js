(function () {
  const C = window.COURSE, S = window.SLIDES, D = window.DOCS || [];
  const docById = (id) => D.find((d) => d.id === id);
  const docSrc = (id, p) => `docs/doc${id}/p-${pad(p)}.jpg`;
  const app = document.getElementById("app");
  const pad = (n) => String(n).padStart(2, "0");
  const slideById = (id) => S.find((s) => s.id === id);
  const pageSrc = (id, p) => `slides/ch${id}/p-${pad(p)}.jpg`;
  const seg = (cls = "") => `<div class="seg-bar ${cls}" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div>`;
  const icon = {
    doc: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M8 13h8M8 17h5"/></svg>',
    ext: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg>',
    slides: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M12 16v4M8 20h8"/></svg>',
    dl: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12M7 10l5 5 5-5M5 21h14"/></svg>',
    full: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>',
    left: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>',
    right: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>'
  };

  /* ---------------- หน้าแรก ---------------- */
  function renderHome() {
    const total = S.reduce((a, s) => a + s.pages, 0);
    const weeks = C.weeks.filter((w) => w.w).length;
    app.innerHTML = `
      <section class="home-hero">
        <div class="hero3d" id="hero3d" aria-hidden="true"></div>
        <div class="hero-shade" aria-hidden="true"></div>
        <div class="wrap hero-inner">
          <div class="hero-copy">
            <div class="hero-eyebrow"><span class="dot"></span>${C.code} · ภาคการศึกษา ${C.term}</div>
            <h1 class="hero-title">คณิตศาสตร์<span class="x">×</span><br><span class="red">การเขียนโปรแกรม</span></h1>
            <p class="hero-sub">เปลี่ยนสมการให้เป็นโค้ด เปลี่ยนโค้ดให้เป็นคำตอบ — เรียนรู้ Python ตั้งแต่พื้นฐานจนถึง NumPy เพื่อแก้ปัญหาทางคณิตศาสตร์</p>
            <div class="hero-cta">
              <a class="btn primary lg" href="#plan">ดูแผนการสอน</a>
              <a class="btn ghost lg" href="#slides">เปิดสไลด์</a>
            </div>
          </div>
          <div class="code-card" aria-label="ตัวอย่างโค้ด">
            <div class="code-top"><i></i><i></i><i></i><span>surface.py</span></div>
<pre><code><span class="k">import</span> numpy <span class="k">as</span> np

x = np.linspace(-np.pi, np.pi, <span class="n">150</span>)
X, Y = np.meshgrid(x, x)
Z = np.sin(X) * np.cos(Y)   <span class="c"># z = sin x · cos y</span>
<span class="k">print</span>(Z.max())            <span class="c"># 1.0</span></code></pre>
          </div>
        </div>
        <div class="wrap hero-stats">
          <div><b>${S.length}</b><span>บทเรียน</span></div>
          <div><b>${total}</b><span>หน้าสไลด์</span></div>
          <div><b>${weeks}</b><span>สัปดาห์</span></div>
          <div><b>Python</b><span>บน Google Colab</span></div>
        </div>
      </section>

      <section class="wrap home-cards">
        <a class="hcard" href="#plan">
          <span class="hnum">01</span>
          <h3>แผนการสอน</h3>
          <p>จุดมุ่งหมาย คำอธิบายรายวิชา หัวข้อ 15 สัปดาห์ การวัดผล และอาจารย์ผู้สอน</p>
          <span class="go">เปิดดู →</span>
        </a>
        <a class="hcard" href="#slides">
          <span class="hnum">02</span>
          <h3>สไลด์ประกอบการเรียน</h3>
          <p>อ่านสไลด์รายบทบนเว็บได้ทันที ทั้งบนคอมพิวเตอร์และมือถือ หรือดาวน์โหลดเป็น PDF</p>
          <span class="go">เปิดดู →</span>
        </a>
        <a class="hcard" href="#docs">
          <span class="hnum">03</span>
          <h3>เอกสารประกอบการสอน</h3>
          <p>เนื้อหาละเอียดรายบท พร้อมตัวอย่างโค้ดและคำอธิบาย อ่านบนเว็บหรือดาวน์โหลด PDF</p>
          <span class="go">เปิดดู →</span>
        </a>
        <div class="hcard soon">
          <span class="hnum">04</span>
          <h3>แบบฝึกหัดบน Colab</h3>
          <p>ฝึกเขียนโปรแกรมจริงผ่าน Google Colab — กดเปิดแล้วเริ่มเขียนได้เลย ไม่ต้องติดตั้งโปรแกรม</p>
          <span class="go">เร็ว ๆ นี้</span>
        </div>
      </section>`;

    const el = document.getElementById("hero3d");
    if (window.Hero3D) window.__heroUnmount = window.Hero3D.mount(el);
    else window.__heroPending = el;
  }

  /* ---------------- แผนการสอน ---------------- */
  function renderPlan() {
    const facts = `
      <div class="facts">
        <div class="fact"><div class="k">หน่วยกิต</div><div class="v">${C.credits}</div><div class="s">${C.creditsNote}</div></div>
        <div class="fact"><div class="k">วิชาบังคับก่อน</div><div class="v">${C.prereq}</div><div class="s">เริ่มจากศูนย์ได้ ไม่ต้องมีพื้นฐานเขียนโปรแกรม</div></div>
        <div class="fact"><div class="k">ภาษา / เครื่องมือ</div><div class="v">Python</div><div class="s">เขียนและรันบน Google Colab</div></div>
        <div class="fact"><div class="k">ภาคการศึกษา</div><div class="v">${C.term}</div><div class="s">15 สัปดาห์ + สอบกลางภาค / ปลายภาค</div></div>
      </div>`;

    const objectives = C.objectives.map((o, i) => `<li><span class="n">${i + 1}</span><span>${o}</span></li>`).join("");

    const weeks = C.weeks.map((w) => {
      if (w.exam) return `<div class="exam">${w.exam}</div>`;
      const links = w.ch.map((id) => {
        const s = slideById(id);
        return s ? `<a class="chip" href="#slides/${id}" title="สไลด์บทที่ ${parseInt(id, 10)}">${icon.slides}สไลด์ ${parseInt(id, 10)}</a>` : "";
      }).join("") + w.ch.map((id) => {
        const d = docById(id);
        return d ? `<a class="chip" href="#docs/${id}" title="เอกสารประกอบการสอนบทที่ ${parseInt(id, 10)}">${icon.doc}เอกสาร ${parseInt(id, 10)}</a>` : "";
      }).join("");
      return `
        <div class="wk">
          <div class="no">สัปดาห์<b>${w.w}</b></div>
          <div><div class="t">${w.title}</div><div class="d">${w.detail}</div></div>
          <div class="links">${links}</div>
        </div>`;
    }).join("");

    const shades = ["var(--red)", "var(--red-dark)", "var(--gray)", "var(--gray-2)"];
    const stack = C.grading.map((g) => `<span style="flex:${g.pct}" title="${g.label} ${g.pct}%"></span>`).join("");
    const grows = C.grading.map((g, i) => `
      <div class="g-row"><span class="sw" style="background:${shades[i]}"></span><span>${g.label}</span><span class="p">${g.pct}%</span></div>`).join("");

    const people = C.instructors.map((p) => {
      const initial = p.name.replace(/^.*ดร\./, "").trim().charAt(0);
      return `
      <div class="card person">
        <div class="avatar" aria-hidden="true">${initial}</div>
        <div>
          <div class="sec">ตอนเรียนที่ ${p.sec}</div>
          <div class="name">${p.name}</div>
          <dl class="kv">
            <dt>เวลาเรียน</dt><dd>${p.time}</dd>
            <dt>ห้องเรียน</dt><dd>${p.room}</dd>
            <dt>เวลาเข้าพบ</dt><dd>${p.office.join("<br>")}</dd>
          </dl>
        </div>
      </div>`;
    }).join("");

    const head = (n, title, aside = "") => `
      <div class="section-head"><div><h2><span class="num">${pad(n)}</span>${title}</h2>${seg()}</div>${aside ? `<div class="aside">${aside}</div>` : ""}</div>`;

    app.innerHTML = `
      <div class="page">
        <section class="hero">
          <div class="eyebrow"><b>แผนการสอนวิชา ${C.code}</b> · ภาคการศึกษาที่ ${C.term}</div>
          <h1>${C.nameTh}</h1>
          <p class="en">${C.nameEn}</p>
          ${seg()}
          <div class="meta">${C.dept} ${C.faculty} ${C.uni}</div>
          ${facts}
        </section>

        <section class="section" id="objectives">
          ${head(1, "จุดมุ่งหมาย")}
          <ol class="objectives">${objectives}</ol>
        </section>

        <section class="section" id="description">
          ${head(2, "คำอธิบายรายวิชา")}
          <div class="two-col">
            <div class="card"><h3>ภาษาไทย</h3><p class="lead">${C.descTh}</p></div>
            <div class="card"><h3>ENGLISH</h3><p class="lead">${C.descEn}</p></div>
          </div>
        </section>

        <section class="section" id="schedule">
          ${head(3, "หัวข้อการสอนรายสัปดาห์", "กดที่ป้ายเพื่อเปิดสไลด์หรือเอกสารของบทนั้น")}
          <div class="schedule">${weeks}</div>
        </section>

        <section class="section" id="grading">
          ${head(4, "การวัดผล")}
          <div class="grading">
            <div class="card"><h3>สัดส่วนคะแนน</h3><div class="stack">${stack}</div>${grows}</div>
            <div class="card grade-note"><h3>แนวทางการตัดเกรด</h3><p class="big">${C.gradingNote}</p></div>
          </div>
        </section>

        <section class="section" id="instructors">
          ${head(5, "อาจารย์ผู้สอน")}
          <div class="people">${people}</div>
        </section>

        <section class="section" id="books">
          ${head(6, "ตำราอ่านประกอบ")}
          <div class="two-col">
            <div class="card"><h3>ตำรา</h3><ol class="refs">${C.textbooks.map((t) => `<li>${t}</li>`).join("")}</ol></div>
            <div class="card"><h3>หมายเหตุ</h3><ul class="refs">${C.notes.map((t) => `<li>${t}</li>`).join("")}</ul></div>
          </div>
        </section>
      </div>`;
  }

  /* ---------------- รายการสไลด์ ---------------- */
  function renderSlideList() {
    const total = S.reduce((a, s) => a + s.pages, 0);
    const cards = S.map((s) => `
      <a class="deck" href="#slides/${s.id}">
        <div class="thumb"><img src="slides/ch${s.id}/thumb.jpg" alt="หน้าปกบทที่ ${parseInt(s.id, 10)}" loading="lazy"></div>
        <div class="body">
          <div class="ch">บทที่ ${parseInt(s.id, 10)}</div>
          <div class="tt">${s.title}</div>
          <div class="en">${s.en}</div>
          <div class="foot"><span>${s.weeks}</span><span>${s.pages} หน้า</span></div>
        </div>
      </a>`).join("");
    app.innerHTML = `
      <div class="page">
        <section class="hero">
          <div class="eyebrow"><b>สไลด์ประกอบการเรียน</b> · ${C.code} · ${C.term}</div>
          <h1>สไลด์รายบท</h1>
          <p class="en">${S.length} บท · ${total} หน้า — เปิดอ่านบนเว็บได้ทันที หรือดาวน์โหลดเป็น PDF</p>
          ${seg()}
        </section>
        <div class="slide-grid">${cards}</div>
      </div>`;
  }

  /* ---------------- ตัวอ่านสไลด์ ---------------- */
  let viewer = null;
  function renderViewer(id, page) {
    const s = slideById(id);
    if (!s) return renderSlideList();
    const idx = S.indexOf(s);
    const prev = S[idx - 1], next = S[idx + 1];
    page = Math.min(Math.max(1, page || 1), s.pages);

    const strip = Array.from({ length: s.pages }, (_, i) => `
      <button type="button" data-p="${i + 1}" aria-label="หน้า ${i + 1}"><img src="${pageSrc(id, i + 1)}" alt="" loading="lazy"><span class="pn">${i + 1}</span></button>`).join("");

    app.innerHTML = `
      <div class="page viewer">
        <div class="viewer-top">
          <div>
            <a class="back" href="#slides">${icon.left} สไลด์ทั้งหมด</a>
            <div class="viewer-title"><div class="ch">บทที่ ${parseInt(id, 10)} · ${s.weeks}</div><h1>${s.title}</h1></div>
          </div>
          <div class="btns">
            <button class="btn" type="button" id="fs">${icon.full}เต็มจอ</button>
            <a class="btn primary" href="slides/ch${id}.pdf" download>${icon.dl}ดาวน์โหลด PDF</a>
          </div>
        </div>

        <div class="stage" id="stage">
          <div class="frame"><img id="slideImg" alt=""></div>
          <button class="nav-zone prev" id="zPrev" type="button" aria-label="หน้าก่อนหน้า"><span>${icon.left}</span></button>
          <button class="nav-zone next" id="zNext" type="button" aria-label="หน้าถัดไป"><span>${icon.right}</span></button>
        </div>
        <div class="progress"><i id="bar"></i></div>

        <div class="controls">
          <button class="btn" type="button" id="bPrev" aria-label="หน้าก่อนหน้า">${icon.left}</button>
          <span class="count" id="count"></span>
          <button class="btn" type="button" id="bNext" aria-label="หน้าถัดไป">${icon.right}</button>
        </div>
        <div class="strip" id="strip">${strip}</div>
        <div class="hint">ใช้ปุ่มลูกศร ← → บนคีย์บอร์ด หรือปัดซ้าย/ขวาบนมือถือเพื่อเปลี่ยนหน้า</div>

        <nav class="pager">
          ${prev ? `<a href="#slides/${prev.id}"><div class="lbl">← บทก่อนหน้า</div><div class="nm">บทที่ ${parseInt(prev.id, 10)} ${prev.title}</div></a>` : "<span></span>"}
          ${next ? `<a class="r" href="#slides/${next.id}"><div class="lbl">บทถัดไป →</div><div class="nm">บทที่ ${parseInt(next.id, 10)} ${next.title}</div></a>` : "<span></span>"}
        </nav>
      </div>`;

    viewer = { s, page };
    const img = document.getElementById("slideImg");
    const stripEl = document.getElementById("strip");

    function show(p, push = true) {
      p = Math.min(Math.max(1, p), s.pages);
      viewer.page = p;
      img.src = pageSrc(id, p);
      img.alt = `${s.title} หน้า ${p}`;
      document.getElementById("count").innerHTML = `<b>${p}</b> / ${s.pages}`;
      document.getElementById("bar").style.width = (p / s.pages * 100) + "%";
      ["zPrev", "bPrev"].forEach((k) => document.getElementById(k).disabled = p === 1);
      ["zNext", "bNext"].forEach((k) => document.getElementById(k).disabled = p === s.pages);
      stripEl.querySelectorAll("button").forEach((b) => b.classList.toggle("on", +b.dataset.p === p));
      const on = stripEl.querySelector(`button[data-p="${p}"]`);
      if (on) stripEl.scrollTo({ left: on.offsetLeft - stripEl.clientWidth / 2 + on.clientWidth / 2, behavior: "smooth" });
      // preload neighbours
      [p + 1, p - 1].forEach((q) => { if (q >= 1 && q <= s.pages) new Image().src = pageSrc(id, q); });
      if (push) history.replaceState(null, "", `#slides/${id}/${p}`);
    }
    viewer.show = show;

    document.getElementById("zPrev").onclick = document.getElementById("bPrev").onclick = () => show(viewer.page - 1);
    document.getElementById("zNext").onclick = document.getElementById("bNext").onclick = () => show(viewer.page + 1);
    stripEl.onclick = (e) => { const b = e.target.closest("button"); if (b) show(+b.dataset.p); };

    const stage = document.getElementById("stage");
    document.getElementById("fs").onclick = () => {
      if (document.fullscreenElement) document.exitFullscreen();
      else if (stage.requestFullscreen) stage.requestFullscreen();
      else if (stage.webkitRequestFullscreen) stage.webkitRequestFullscreen();
      else window.open(pageSrc(id, viewer.page), "_blank");
    };

    let x0 = null;
    stage.addEventListener("touchstart", (e) => { x0 = e.touches[0].clientX; }, { passive: true });
    stage.addEventListener("touchend", (e) => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0; x0 = null;
      if (Math.abs(dx) > 45) show(viewer.page + (dx < 0 ? 1 : -1));
    });

    show(page, false);
  }

  document.addEventListener("keydown", (e) => {
    if (!viewer || !document.getElementById("slideImg")) return;
    if (e.key === "ArrowRight" || e.key === "PageDown" || e.key === " ") { e.preventDefault(); viewer.show(viewer.page + 1); }
    else if (e.key === "ArrowLeft" || e.key === "PageUp") { e.preventDefault(); viewer.show(viewer.page - 1); }
    else if (e.key === "Home") viewer.show(1);
    else if (e.key === "End") viewer.show(viewer.s.pages);
  });


  /* ---------------- เอกสารประกอบการสอน ---------------- */
  function renderDocList() {
    const total = D.reduce((a, d) => a + d.pages, 0);
    const cards = D.map((d) => `
      <a class="doccard" href="#docs/${d.id}">
        <div class="dthumb"><img src="docs/doc${d.id}/thumb.jpg" alt="หน้าแรกเอกสารบทที่ ${parseInt(d.id, 10)}" loading="lazy"></div>
        <div class="body">
          <div class="ch">บทที่ ${parseInt(d.id, 10)}</div>
          <div class="tt">${d.title}</div>
          <div class="en">${d.en}</div>
          <div class="foot"><span>${d.weeks}</span><span>${d.pages} หน้า · PDF</span></div>
        </div>
      </a>`).join("");
    app.innerHTML = `
      <div class="page">
        <section class="hero">
          <div class="eyebrow"><b>เอกสารประกอบการสอน</b> · ${C.code} · ${C.term}</div>
          <h1>เอกสารประกอบการสอนรายบท</h1>
          <p class="en">${D.length} บท · ${total} หน้า — อ่านเนื้อหาละเอียดพร้อมตัวอย่างโค้ดบนเว็บ หรือดาวน์โหลดเป็น PDF</p>
          ${seg()}
        </section>
        <div class="doc-grid">${cards}</div>
      </div>`;
  }

  let reader = null;
  function renderDocReader(id, page) {
    const d = docById(id);
    if (!d) return renderDocList();
    const idx = D.indexOf(d), prev = D[idx - 1], next = D[idx + 1];
    const slide = d.slide && slideById(d.slide);
    const sheets = Array.from({ length: d.pages }, (_, i) => `
      <div class="sheet" id="pg-${i + 1}" data-p="${i + 1}">
        <img src="${docSrc(id, i + 1)}" alt="${d.title} หน้า ${i + 1}" loading="${i < 2 ? "eager" : "lazy"}" decoding="async">
      </div>`).join("");

    app.innerHTML = `
      <div class="page reader">
        <div class="viewer-top">
          <div>
            <a class="back" href="#docs">${icon.left} เอกสารทั้งหมด</a>
            <div class="viewer-title"><div class="ch">เอกสารประกอบการสอน บทที่ ${parseInt(id, 10)} · ${d.weeks}</div><h1>${d.title}</h1></div>
          </div>
          <div class="btns">
            ${slide ? `<a class="btn" href="#slides/${slide.id}">${icon.slides}สไลด์บทนี้</a>` : ""}
            <a class="btn" href="docs/doc${id}.pdf" target="_blank" rel="noopener">${icon.ext}เปิด PDF</a>
            <a class="btn primary" href="docs/doc${id}.pdf" download>${icon.dl}ดาวน์โหลด PDF</a>
          </div>
        </div>

        <div class="rbar">
          <div class="rbar-inner">
            <button class="btn sm" type="button" id="rPrev" aria-label="หน้าก่อนหน้า">${icon.left}</button>
            <label class="pgjump">หน้า <input id="rPage" type="number" min="1" max="${d.pages}" value="${page}" inputmode="numeric"> / ${d.pages}</label>
            <button class="btn sm" type="button" id="rNext" aria-label="หน้าถัดไป">${icon.right}</button>
            <span class="sp"></span>
            <button class="btn sm" type="button" id="zOut" aria-label="ย่อ">−</button>
            <span class="zoomv" id="zVal"></span>
            <button class="btn sm" type="button" id="zIn" aria-label="ขยาย">+</button>
          </div>
          <div class="progress"><i id="rBar"></i></div>
        </div>

        <div class="sheets" id="sheets">${sheets}</div>

        <nav class="pager">
          ${prev ? `<a href="#docs/${prev.id}"><div class="lbl">← บทก่อนหน้า</div><div class="nm">บทที่ ${parseInt(prev.id, 10)} ${prev.title}</div></a>` : "<span></span>"}
          ${next ? `<a class="r" href="#docs/${next.id}"><div class="lbl">บทถัดไป →</div><div class="nm">บทที่ ${parseInt(next.id, 10)} ${next.title}</div></a>` : "<span></span>"}
        </nav>
      </div>`;

    const sheetsEl = document.getElementById("sheets");
    const input = document.getElementById("rPage");
    const ZOOMS = [60, 70, 80, 90, 100];
    let zi = 4;
    try { const z = +localStorage.getItem("docZoom"); if (ZOOMS.includes(z)) zi = ZOOMS.indexOf(z); } catch (e) {}
    function applyZoom() {
      sheetsEl.style.setProperty("--zoom", ZOOMS[zi] / 100);
      document.getElementById("zVal").textContent = ZOOMS[zi] + "%";
      try { localStorage.setItem("docZoom", ZOOMS[zi]); } catch (e) {}
    }
    applyZoom();

    reader = { d, page };
    function setCurrent(p) {
      if (p === reader.page) return;
      reader.page = p;
      if (document.activeElement !== input) input.value = p;
      document.getElementById("rBar").style.width = (p / d.pages * 100) + "%";
      history.replaceState(null, "", `#docs/${id}/${p}`);
    }
    function go(p, smooth = true) {
      p = Math.min(Math.max(1, p), d.pages);
      const el = document.getElementById("pg-" + p);
      const off = document.querySelector(".site-header").offsetHeight + document.querySelector(".rbar").offsetHeight + 12;
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - off, behavior: smooth ? "smooth" : "auto" });
      input.value = p; reader.page = p;
      document.getElementById("rBar").style.width = (p / d.pages * 100) + "%";
      history.replaceState(null, "", `#docs/${id}/${p}`);
    }
    reader.go = go;

    // หน้าปัจจุบัน = หน้าที่กินพื้นที่จอมากที่สุด
    const ratios = new Map();
    const io = new IntersectionObserver((ents) => {
      ents.forEach((e) => ratios.set(+e.target.dataset.p, e.intersectionRatio));
      let best = reader.page, bv = -1;
      ratios.forEach((v, k) => { if (v > bv) { bv = v; best = k; } });
      if (bv > 0) setCurrent(best);
    }, { threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] });
    sheetsEl.querySelectorAll(".sheet").forEach((s) => io.observe(s));
    reader.io = io;

    document.getElementById("rPrev").onclick = () => go(reader.page - 1);
    document.getElementById("rNext").onclick = () => go(reader.page + 1);
    input.onchange = () => go(+input.value || 1);
    input.onkeydown = (e) => { if (e.key === "Enter") { e.preventDefault(); go(+input.value || 1); input.blur(); } };
    document.getElementById("zIn").onclick = () => { if (zi < ZOOMS.length - 1) { const p = reader.page; zi++; applyZoom(); go(p, false); } };
    document.getElementById("zOut").onclick = () => { if (zi > 0) { const p = reader.page; zi--; applyZoom(); go(p, false); } };

    document.getElementById("rBar").style.width = (page / d.pages * 100) + "%";
    if (page > 1) requestAnimationFrame(() => go(page, false));
  }

  /* ---------------- router ---------------- */
  let lastRoute = "";
  function route() {
    const parts = (location.hash.replace(/^#\/?/, "") || "home").split("/");
    const tab = ["slides", "plan", "docs"].includes(parts[0]) ? parts[0] : "home";
    document.querySelectorAll(".tab").forEach((t) => {
      const on = t.dataset.tab === tab;
      t.classList.toggle("active", on);
      t.setAttribute("aria-selected", on);
    });

    const key = parts.slice(0, 2).join("/");
    if (tab === "slides" && parts[1] && key === lastRoute && viewer) { viewer.show(+parts[2] || 1, false); return; }
    if (tab === "docs" && parts[1] && key === lastRoute && reader) { reader.go(+parts[2] || 1); return; }
    lastRoute = key;
    viewer = null;
    if (reader && reader.io) reader.io.disconnect();
    reader = null;
    if (window.__heroUnmount) { window.__heroUnmount(); window.__heroUnmount = null; }
    window.__heroPending = null;
    app.className = tab === "home" ? "" : "wrap";
    document.body.classList.toggle("is-home", tab === "home");

    if (tab === "home") { renderHome(); document.title = `${C.code} ${C.nameTh}`; }
    else if (tab === "plan") { renderPlan(); document.title = `แผนการสอน · ${C.code}`; }
    else if (tab === "docs") {
      const d = parts[1] && docById(parts[1]);
      window.scrollTo(0, 0);
      if (d) { renderDocReader(parts[1], +parts[2] || 1); document.title = `เอกสารบทที่ ${parseInt(d.id, 10)} ${d.title} · ${C.code}`; }
      else { renderDocList(); document.title = `เอกสารประกอบการสอน · ${C.code}`; }
      return;
    }
    else if (parts[1]) { renderViewer(parts[1], +parts[2] || 1); const s = slideById(parts[1]); document.title = `${s ? "บทที่ " + parseInt(s.id, 10) + " " + s.title : "สไลด์"} · ${C.code}`; }
    else { renderSlideList(); document.title = `สไลด์ · ${C.code}`; }
    window.scrollTo(0, 0);
  }
  window.addEventListener("hashchange", route);
  route();
})();
