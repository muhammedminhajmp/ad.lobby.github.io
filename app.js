const $ = (s) => document.querySelector(s), app = $("#app"), S = SITE;
const wa = `https://wa.me/${S.whatsapp}`, ig = `https://instagram.com/${S.instagram}`;
const br = (t) => t.replace(/\n/g, "<br>");
const L = (t) => `<p class="label rv">${t}</p>`;
const B = (t, h, c = "") => `<a class="btn ${c}" href="${h}"${h.startsWith("http") ? ' target="_blank" rel="noopener"' : ""}>${t}</a>`;
const P = (src, alt, c = "") => `<div class="ph ${c}"><img src="${src}" alt="${alt}" loading="lazy" onerror="this.remove()"></div>`;
const pcard = (p, c = "rv") => `<a class="card ${c}" href="#/work/${p.id}"><div class="thumb">${P(p.thumbnail, `${p.title} — ${p.categoryLabel}`)}<span class="ov">VIEW PROJECT</span></div><div class="meta"><div><h3>${p.title}</h3><p>${p.categoryLabel}${p.sample ? " · SAMPLE" : ""}</p></div><span class="arr">↗</span></div></a>`;
const cta = (l, h, d, b, href, bg) => `<section class="cta">${bg ? P(bg, "", "bgimg") + '<div class="shade"></div>' : ""}<div class="wrap">${L(l)}<h2 class="big rv">${br(h)}</h2>${d ? `<p class="lead rv">${br(d)}</p>` : ""}<div class="rv">${B(b, href)}</div></div></section>`;
const phero = (l, h, d) => `<section class="phero"><div class="wrap">${L(l)}<h1 class="up">${br(h)}</h1><p class="lead up d1">${d}</p></div></section>`;

function home() {
  return `<section class="hero">${P("images/hero.jpg", "ad.lobby cinematic showreel still", "bgimg")}<div class="shade"></div>
  <div class="wrap hin"><p class="label up">CREATIVE VIDEO + DESIGN STUDIO</p>
  <h1 class="up d1"><img class="wm" src="images/logo.svg" alt="ad.lobby"></h1>
  <p class="tag up d2">IDEAS IN MOTION.<br>BRANDS IN FOCUS.</p>
  <p class="lead up d3">Video. Design. Marketing.<br>Built to make brands impossible to ignore.</p><div class="up d3">${B("VIEW OUR WORK →", "#/work")}</div></div>
  <button class="scroll" data-scroll="intro">SCROLL TO EXPLORE ↓</button></section>
  <section class="sec" id="intro"><div class="wrap two"><div>${L("WHAT WE DO")}<h2 class="rv">WE TURN IDEAS INTO<br>CONTENT PEOPLE REMEMBER.</h2></div>
  <div class="rv end"><p class="lead">Adlobby is a creative video + design marketing studio focused on creating content that looks good, feels right, and gets noticed.</p><br>${B("EXPLORE SERVICES →", "#/services")}</div></div></section>
  <section class="sec alt"><div class="wrap">${L("OUR EXPERTISE")}<h2 class="rv">WHAT WE CREATE</h2><div class="svc">
  ${services.map((s) => `<a class="scard rv" href="#/services"><div class="thumb">${P(s.preview, s.title + " preview")}</div><div class="meta"><span class="no">${s.no}</span><div><h3>${s.title}</h3><p>${s.short}</p></div><span class="arr">→</span></div></a>`).join("")}</div></div></section>
  <section class="sec"><div class="wrap">${L("SELECTED WORK")}<h2 class="rv">MADE TO BE SEEN.</h2><div class="grid3">${projects.filter((p) => p.featured).slice(0, 3).map((p) => pcard(p)).join("")}</div><div class="rv mt">${B("VIEW ALL WORK →", "#/work", "ghost")}</div></div></section>
  ${cta("", "GOT A PROJECT?\nLET’S TALK.", "Tell us what you’re working on.\nWe’ll help turn it into something people remember.", "LET’S WORK TOGETHER →", "#/contact", "images/cta.jpg")}`;
}

function servicesPage() {
  return phero("OUR SERVICES", "CREATIVE CONTENT\nBUILT FOR BRANDS.", "From cinematic productions to short-form content and visual design, we create content that helps brands communicate, connect and stand out.") +
  `<section class="wrap">${services.map((s, i) => `<article class="sd ${i % 2 ? "flip" : ""} rv"><div><span class="no">${s.no}</span><h2>${s.title}</h2><p class="lead">${s.desc}</p><ul>${s.items.map((x) => `<li>${x}</li>`).join("")}</ul><a class="arrl" href="#/contact">START A PROJECT →</a></div><div class="thumb">${P(s.image, s.title)}</div></article>`).join("")}</section>` +
  cta("START SOMETHING", "YOUR BRAND DESERVES\nBETTER CONTENT.", "Have an idea? Let’s turn it into something worth watching.", "START A PROJECT →", "#/contact");
}

const FIL = [["all", "ALL"], ["cinematic", "CINEMATIC VIDEOS"], ["reels", "REELS"], ["posters", "POSTERS"]];
function work() {
  return phero("OUR WORK", "FEATURED WORK.", "A selection of videos, campaigns and designs created to make brands stand out.") +
  `<section class="wrap"><div class="filters" role="group" aria-label="Filter projects">${FIL.map(([k, t], i) => `<button data-f="${k}" aria-pressed="${!i}" class="${i ? "" : "on"}">${t}</button>`).join("")}</div><div class="grid" id="grid"></div></section><div class="gap"></div>` +
  cta("", "GOT A PROJECT?\nLET’S TALK.", "", "LET’S WORK TOGETHER →", "#/contact");
}
function initWork() {
  const g = $("#grid"), btns = document.querySelectorAll("[data-f]");
  const draw = (k, fade) => {
    const l = projects.filter((p) => k === "all" || p.category === k);
    g.style.opacity = 0;
    setTimeout(() => { g.innerHTML = l.length ? l.map((p, i) => pcard(p, i % 5 === 0 ? "wide in" : "in")).join("") : '<p class="empty">No projects in this category yet.</p>'; g.style.opacity = 1; }, fade ? 220 : 0);
  };
  btns.forEach((b) => b.onclick = () => { btns.forEach((x) => { x.classList.toggle("on", x === b); x.setAttribute("aria-pressed", x === b); }); draw(b.dataset.f, true); });
  draw("all");
}

function project(id) {
  const i = projects.findIndex((p) => p.id === id), p = projects[i];
  if (!p) return phero("NOT FOUND", "PROJECT NOT FOUND.", "That project doesn’t exist.") + `<div class="wrap gap">${B("← ALL WORK", "#/work")}</div>`;
  const pr = projects[(i + projects.length - 1) % projects.length], nx = projects[(i + 1) % projects.length];
  return `<section class="phero"><div class="wrap">${L(p.categoryLabel + (p.sample ? " · SAMPLE CONTENT" : ""))}<h1 class="up">${p.title}</h1><p class="lead up d1">${p.description}</p></div></section>
  <section class="wrap"><div class="media">${P(p.thumbnail, p.title)}${p.video ? `<video controls playsinline preload="metadata" hidden data-src="${p.video}" poster="${p.thumbnail}" aria-label="${p.title} video"></video>` : ""}</div>
  <div class="facts">${p.client ? `<div><span class="label">CLIENT</span><p>${p.client}</p></div>` : ""}<div><span class="label">SERVICES</span><p>${p.services.join(" · ")}</p></div></div>
  ${p.gallery.length ? `<div class="grid">${p.gallery.map((g) => `<div class="thumb">${P(g, p.title + " gallery")}</div>`).join("")}</div>` : ""}
  <div class="pn"><a href="#/work/${pr.id}">← ${pr.title}</a><a href="#/work/${nx.id}">${nx.title} →</a></div></section>` +
  cta("", "LIKE WHAT YOU SEE?\nLET’S TALK.", "", "START A PROJECT →", "#/contact");
}

function about() {
  return `<section class="phero"><div class="wrap two"><div>${L("ABOUT " + S.name.replace(".", "").toUpperCase())}<h1 class="up">SMALL TEAM.<br>BIG IDEAS.</h1><p class="lead up d1">We are a creative team focused on video, design and digital storytelling. We help brands communicate better, connect with people and create work worth remembering.</p></div><div class="thumb rv">${P("images/about-studio.jpg", "The ad.lobby studio")}</div></div></section>
  <section class="sec alt"><div class="wrap">${L("MEET " + S.name.replace(".", "").toUpperCase())}<h2 class="rv">THIS IS WHO WE ARE.</h2>
  <div class="vbox rv" id="vbox">${P(S.introPoster, "ad.lobby introduction video poster", "bgimg")}<button class="pbtn" id="play" aria-label="Play introduction video">▶</button></div></div></section>
  <section class="sec"><div class="wrap">${L("WHAT DRIVES US")}<h2 class="rv">GOOD WORK STARTS<br>WITH GOOD IDEAS.</h2><div class="prin">${principles.map(([t, d], i) => `<div class="rv"><span class="no">0${i + 1}</span><h3>${t}</h3><p>${d}</p></div>`).join("")}</div></div></section>
  ${cta("", "LET’S CREATE SOMETHING\nWORTH REMEMBERING.", "", "WORK WITH US →", "#/contact")}`;
}
function initAbout() {
  const b = $("#play"), box = $("#vbox");
  b.onclick = () => {
    b.hidden = true;
    const v = document.createElement("video");
    v.controls = true; v.playsInline = true; v.hidden = true; v.setAttribute("aria-label", "ad.lobby introduction video");
    v.onerror = () => { v.remove(); box.insertAdjacentHTML("beforeend", `<p class="vfb" role="status">${S.videoFallback}</p>`); };
    v.oncanplay = () => { v.hidden = false; v.play().catch(() => {}); };
    v.src = S.introVideo; box.append(v);
  };
}

const OPTS = ["Cinematic Video", "Reels & Short-Form Content", "Posters & Design", "Branding", "Social Media Content", "Motion Graphics", "Other"];
function contact() {
  const f = (id, label, type, extra = "") => `<div class="fld"><label for="${id}">${label}</label><input id="${id}" name="${id}" type="${type}" ${extra}><span class="err" data-e="${id}" role="alert"></span></div>`;
  return phero("LET’S WORK TOGETHER", "GOT A PROJECT?\nLET’S TALK.", "Have an idea, campaign or brand that needs better content? Tell us what you’re building.") +
  `<section class="wrap two cf"><form id="f" novalidate>${f("name", "Full name", "text", 'autocomplete="name"')}${f("email", "Email address", "email", 'autocomplete="email"')}${f("phone", "Phone or WhatsApp number", "tel", 'autocomplete="tel"')}
  <div class="fld"><label for="service">Service required</label><select id="service" name="service"><option value="">Select a service</option>${OPTS.map((o) => `<option>${o}</option>`).join("")}</select><span class="err" data-e="service" role="alert"></span></div>
  <div class="fld"><label for="details">Project details</label><textarea id="details" name="details" rows="5"></textarea><span class="err" data-e="details" role="alert"></span></div>
  <button class="btn" id="sb" type="submit">SEND INQUIRY →</button><p class="st" id="st" role="status"></p></form>
  <div class="direct"><div><span class="label">EMAIL</span><a href="mailto:${S.email}">${S.email}</a></div><div><span class="label">INSTAGRAM</span><a href="${ig}" target="_blank" rel="noopener">@${S.instagram} ↗</a></div><div><span class="label">WHATSAPP</span><a href="${wa}" target="_blank" rel="noopener">${S.phoneDisplay} ↗</a></div></div></section>` +
  cta("", "EVERY GREAT PROJECT STARTS\nWITH A CONVERSATION.", "", "LET’S CREATE →", wa + "?text=" + encodeURIComponent("Hi, I'd like to start a project."));
}
function initContact() {
  const f = $("#f"), st = $("#st"), sb = $("#sb");
  f.onsubmit = async (e) => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(f)); let ok = true;
    const chk = (k, bad, m) => { f.querySelector(`[data-e=${k}]`).textContent = bad ? m : ""; if (bad) ok = false; };
    chk("name", !d.name.trim(), "Please enter your name.");
    chk("email", !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email), "Enter a valid email address.");
    chk("phone", d.phone.replace(/\D/g, "").length < 8, "Enter a valid phone or WhatsApp number.");
    chk("service", !d.service, "Please choose a service.");
    chk("details", d.details.trim().length < 10, "Tell us a little about your project.");
    if (!ok) return;
    sb.disabled = true; st.textContent = "";
    if (S.formEndpoint) {
      try { const r = await fetch(S.formEndpoint, { method: "POST", headers: { Accept: "application/json", "Content-Type": "application/json" }, body: JSON.stringify(d) }); if (!r.ok) throw 0; st.textContent = "Thank you — your inquiry has been sent."; f.reset(); }
      catch { st.textContent = "Couldn’t send your inquiry. Please message us on WhatsApp or email instead."; }
    } else {
      const m = `Hi, I'd like to discuss a project.\nName: ${d.name}\nEmail: ${d.email}\nPhone: ${d.phone}\nService: ${d.service}\nDetails: ${d.details}`;
      window.open(`${wa}?text=${encodeURIComponent(m)}`, "_blank", "noopener");
      st.textContent = "WhatsApp has opened with your message. Press send there to complete your inquiry.";
    }
    setTimeout(() => (sb.disabled = false), 4000);
  };
}

const R = { "": home, services: servicesPage, work, about, contact };
let io;
function route() {
  const [h, id] = location.hash.replace(/^#\/?/, "").split("/");
  app.innerHTML = h === "work" && id ? project(id) : (R[h] || home)();
  app.style.animation = "none"; void app.offsetWidth; app.style.animation = "";
  document.body.classList.toggle("home", !(h in R) || h === "");
  document.querySelectorAll("#menu a").forEach((a) => a.classList.toggle("active", a.dataset.r === (h in R ? h : "")));
  $("#menu").classList.remove("open"); $("#burger").setAttribute("aria-expanded", false);
  ({ work: initWork, about: initAbout, contact: initContact }[id ? "" : h] || (() => {}))();
  document.querySelectorAll("video[data-src]").forEach((v) => { v.addEventListener("loadeddata", () => { v.hidden = false; v.previousElementSibling.hidden = true; }); v.src = v.dataset.src; });
  io && io.disconnect(); io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.1 });
  document.querySelectorAll(".rv").forEach((n) => io.observe(n));
  document.title = (h && h in R ? h[0].toUpperCase() + h.slice(1) + " — " : "") + `${S.name} — Creative Video + Design Studio`;
  scrollTo(0, 0); nav();
}
const nav = () => $("#nav").classList.toggle("solid", scrollY > 40);

document.querySelectorAll(".brandtxt").forEach((e) => (e.textContent = S.name));
[["INSTAGRAM", ig], ["YOUTUBE", S.youtube], ["WHATSAPP", wa]].filter(([, u]) => u).forEach(([n, u]) => { const a = document.createElement("a"); a.href = u; a.target = "_blank"; a.rel = "noopener"; a.textContent = n + " ↗"; $("#social").append(a); });
$("#burger").onclick = () => { const o = $("#menu").classList.toggle("open"); $("#burger").setAttribute("aria-expanded", o); };
document.addEventListener("click", (e) => { const s = e.target.closest("[data-scroll]"); if (s) document.getElementById(s.dataset.scroll).scrollIntoView({ behavior: "smooth" }); });
addEventListener("scroll", nav, { passive: true });
addEventListener("hashchange", route);
route();
