/* PORTAL DOCENTE UEES */

const MIN_GRADE = 6.0;

const DATA = {
  subjects: [
    {
      id: "bd",
      name: "Base de datos",
      group: "BD-01",
      cycle: "02-2026",
      students: 22,
      banner: "blue",
      icon: "bi bi-database",
      evaluations: [
        { id: "bd-t1", name: "Tarea 1",   type: "Tarea",    date: "10/08/2026" },
        { id: "bd-t2", name: "Tarea 2",   type: "Tarea",    date: "12/08/2026" },
        { id: "bd-p1", name: "Parcial 1", type: "Parcial",  date: "15/08/2026", due: "21/08/26" },
        { id: "bd-pr", name: "Proyecto",  type: "Proyecto", date: "30/08/2026" }
      ]
    },
    {
      id: "pw",
      name: "Programacion web",
      group: "PW-01",
      cycle: "02-2026",
      students: 27,
      banner: "orange",
      icon: "bi bi-code",
      evaluations: [
        { id: "pw-t1", name: "Tarea 1",        type: "Tarea",    date: "11/08/2026" },
        { id: "pw-t2", name: "Tarea 2",        type: "Tarea",    date: "13/08/2026" },
        { id: "pw-p1", name: "Parcial 1",      type: "Parcial",  date: "16/08/2026", due: "22/08/26" },
        { id: "pw-pr", name: "Proyecto Final", type: "Proyecto", date: "31/08/2026" }
      ]
    }
  ],

  studentsByEvaluation: {
    "bd-p1": [
      { cif: "2025010212", name: "Abbie Cordova",  grade: 8.5 },
      { cif: "2025010213", name: "Jackie Bolaños", grade: 9.2 },
      { cif: "2025010214", name: "Edgar Gonzalez", grade: 3.5 },
      { cif: "2025010215", name: "Mariana Garcia", grade: null },
      { cif: "2025010216", name: "Laura Martinez", grade: null }
    ]
  },

  transferStatus: {}
};

const state = {
  subjectId: null,
  evaluationId: null
};

const $  = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

function currentSubject(){
  return DATA.subjects.find(s => s.id === state.subjectId);
}
function currentEvaluation(){
  const subj = currentSubject();
  return subj?.evaluations.find(e => e.id === state.evaluationId);
}
function getStudents(evalId){
  if (!DATA.studentsByEvaluation[evalId]) {
    DATA.studentsByEvaluation[evalId] = generatePlaceholderStudents();
  }
  return DATA.studentsByEvaluation[evalId];
}
function generatePlaceholderStudents(){
  const names = ["Ana Reyes","Carlos Pineda","Diana Flores","Elmer Ruiz","Fátima Chávez"];
  return names.map((n,i) => ({
    cif: "2025010" + (300 + i),
    name: n,
    grade: null
  }));
}
function statusFor(grade){
  if (grade === null || grade === undefined || grade === "") {
    return { label: "PENDIENTE", cls: "status-pendiente" };
  }
  const g = parseFloat(grade);
  if (isNaN(g)) return { label: "PENDIENTE", cls: "status-pendiente" };
  return g >= MIN_GRADE
    ? { label: "APROBADO", cls: "status-aprobado" }
    : { label: "REPROBADO", cls: "status-reprobado" };
}
function isValidGradeValue(val){
  if (val === null || val === undefined || val === "") return true;
  const g = parseFloat(val);
  if (isNaN(g)) return false;
  return g >= 0 && g <= 10;
}
function isTransferred(evalId){
  return !!DATA.transferStatus[evalId];
}
function setTransferred(evalId, value){
  DATA.transferStatus[evalId] = value;
}
function showToast(msg){
  const toast = $("#toast");
  if (!toast) return;
  toast.textContent = msg;
  toast.hidden = false;
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => { toast.hidden = true; }, 2200);
}

const loginForm = $("#login-form");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const user = $("#login-user").value.trim();
    const pass = $("#login-pass").value.trim();
    const errorBox = $("#login-error");

    if (!user || !pass) {
      errorBox.hidden = false;
      return;
    }
    errorBox.hidden = true;

    window.location.href = "portal-docente.html";
  });
}

   /*PAGINA: portal-docente.html  */
const sidebar = $("#sidebar");
if (sidebar) {

  $("#logout-btn").addEventListener("click", () => {
    window.location.href = "index.html";
  });

  
  function navigateTo(page){
    $$(".page").forEach(p => p.classList.remove("active"));
    $("#page-" + page).classList.add("active");

    $$(".nav-item[data-nav]").forEach(n => n.classList.remove("active"));
    const navBtn = $(`.nav-item[data-nav="${page}"]`);
    if (navBtn) navBtn.classList.add("active");

    const titles = {
      dashboard: "Panel del Docente",
      evaluations: currentSubject() ? currentSubject().name.replace(/^\w/, c => c.toUpperCase()) : "Mis asignaturas",
      grades: currentEvaluation()
        ? `${currentSubject().name}/${currentEvaluation().name}`
        : "Calificaciones"
    };
    $("#topbar-title").textContent = titles[page] || "Portal Docente";
    $("#back-btn").hidden = page === "dashboard";

    closeMobileMenu();
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  $$(".nav-item[data-nav]").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const page = btn.dataset.nav;
      if (page === "evaluations" && !state.subjectId) state.subjectId = DATA.subjects[0].id;
      if (page === "grades" && !state.evaluationId) {
        const subj = currentSubject() || DATA.subjects[0];
        state.subjectId = subj.id;
        state.evaluationId = subj.evaluations[0].id;
        renderGrades();
      }
      if (page === "evaluations") renderEvaluations();
      navigateTo(page);
    });
  });

  $("#back-btn").addEventListener("click", () => {
    const activePage = $(".page.active").id;
    if (activePage === "page-grades") {
      renderEvaluations();
      navigateTo("evaluations");
    } else {
      navigateTo("dashboard");
    }
  });

  
  function renderDashboard(){
    const wrap = $("#subject-cards");
    wrap.innerHTML = DATA.subjects.map(s => `
      <article class="subject-card">
        <div class="subject-banner ${s.banner}"><i class="icon ${s.icon}" aria-hidden="true"></i></div>
        <div class="subject-body">
          <h3>${s.name}</h3>
          <span class="subject-meta">Ciclo: ${s.cycle}</span>
          <span class="subject-meta"><i class="icon icon-users" aria-hidden="true"></i>Estudiantes: ${s.students}</span>
          <button class="btn btn-primary" data-subject="${s.id}">Ingresar</button>
        </div>
      </article>
    `).join("");

    $$("#subject-cards [data-subject]").forEach(btn => {
      btn.addEventListener("click", () => {
        state.subjectId = btn.dataset.subject;
        renderEvaluations();
        navigateTo("evaluations");
      });
    });
  }

  
  function renderEvaluations(){
    const subj = currentSubject() || DATA.subjects[0];
    state.subjectId = subj.id;

    $("#eval-group-title").textContent = `Grupo: ${subj.group}`;
    $("#eval-group-count").textContent = `Estudiantes inscritos: ${subj.students}`;

    const filter = $("#eval-filter").value;
    const evals = subj.evaluations.filter(e => filter === "all" || e.type === filter);

    // tabla (desktop)
    $("#eval-table-body").innerHTML = evals.map(e => `
      <tr>
        <td>${e.name}</td>
        <td>${e.type}</td>
        <td>${e.date}</td>
        <td><button class="btn-select" data-eval="${e.id}">Seleccionar</button></td>
      </tr>
    `).join("");

    // lista (móvil)
    $("#eval-list").innerHTML = evals.map(e => `
      <div class="eval-row" data-eval="${e.id}">
        <div class="eval-row-main">
          <strong>${e.name}</strong>
          <span>${e.type}</span>
        </div>
        <div class="eval-row-right">
          <span>${e.date}</span>
          <i class="icon icon-caret" aria-hidden="true"></i>
        </div>
      </div>
    `).join("");

    $$("[data-eval]").forEach(el => {
      el.addEventListener("click", () => {
        state.evaluationId = el.dataset.eval;
        renderGrades();
        navigateTo("grades");
      });
    });
  }
  $("#eval-filter").addEventListener("change", renderEvaluations);

  
  function renderGrades(){
    const subj = currentSubject();
    const ev = currentEvaluation();
    if (!subj || !ev) return;

    const locked = isTransferred(ev.id);

    $("#grades-group-title").textContent = `Grupo: ${subj.group}`;
    $("#grades-eval-title").textContent = `Evaluación: ${ev.name}`;
    $("#grades-due-date").textContent = `Fecha límite: ${ev.due || ev.date}`;
    $("#min-grade").textContent = MIN_GRADE.toFixed(1);
    $("#locked-banner").hidden = !locked;

    const students = getStudents(ev.id);

    // tabla (desktop)
    $("#grades-table-body").innerHTML = students.map((st, i) => {
      const st1 = statusFor(st.grade);
      return `
        <tr data-row="${i}">
          <td>${i + 1}</td>
          <td>${st.cif}</td>
          <td>${st.name}</td>
          <td>
            <div class="grade-input-wrap">
              <input type="number" step="0.1" min="0" max="10" class="grade-input"
                    value="${st.grade ?? ""}" placeholder="--" data-idx="${i}" ${locked ? "disabled" : ""}>
              <p class="field-error" data-error="${i}" hidden>Nota entre 0.00 y 10.00</p>
            </div>
          </td>
          <td><span class="status-pill ${st1.cls}" data-status="${i}">${st1.label}</span></td>
        </tr>`;
    }).join("");

    // acordeón (móvil)
    $("#grades-accordion").innerHTML = students.map((st, i) => {
      const st1 = statusFor(st.grade);
      return `
        <div class="grade-card ${i === 0 ? "open" : ""}" data-card="${i}">
          <button class="grade-card-header" data-toggle="${i}">
            <span><strong>${i + 1}. ${st.name}</strong><span class="cif">${st.cif}</span></span>
            <i class="icon icon-chevron chev" aria-hidden="true"></i>
          </button>
          <div class="grade-card-body">
            <div class="grade-card-field">
              <label>Nota</label>
              <div class="grade-input-wrap">
                <input type="number" step="0.1" min="0" max="10" class="grade-input"
                       value="${st.grade ?? ""}" placeholder="--" data-idx="${i}" ${locked ? "disabled" : ""}>
                <p class="field-error" data-error="${i}" hidden>Nota entre 0.00 y 10.00</p>
              </div>
            </div>
            <div class="grade-card-field">
              <label>Estado</label>
              <span class="status-pill ${st1.cls}" data-status="${i}">${st1.label}</span>
            </div>
          </div>
        </div>`;
    }).join("");

    wireGradeInputs(students);
    wireAccordionToggles();

    $("#save-grades").hidden = locked;
    $("#translate-grades").hidden = locked;
    $("#save-grades").disabled = false;
    $("#translate-grades").disabled = false;
  }

  function setFieldError(idx, hasError){
    $$(`.grade-input[data-idx="${idx}"]`).forEach(inp => inp.classList.toggle("input-error", hasError));
    $$(`[data-error="${idx}"]`).forEach(msg => { msg.hidden = !hasError; });
  }

  function updateSaveButtonState(){
    const anyError = $$(".grade-input.input-error").length > 0;
    $("#save-grades").disabled = anyError;
  }

  function wireGradeInputs(students){
    $$(".grade-input").forEach(input => {
      input.addEventListener("input", () => {
        const idx = input.dataset.idx;
        const raw = input.value;
        const valid = isValidGradeValue(raw);

        setFieldError(idx, !valid);
        // sincroniza el mismo valor (válido o no) entre tabla y acordeón
        $$(`.grade-input[data-idx="${idx}"]`).forEach(other => {
          if (other !== input) other.value = raw;
        });

        if (valid) {
          const val = raw === "" ? null : parseFloat(raw);
          students[idx].grade = val;
          const st = statusFor(val);
          $$(`[data-status="${idx}"]`).forEach(pill => {
            pill.textContent = st.label;
            pill.className = `status-pill ${st.cls}`;
            pill.dataset.status = idx;
          });
        }
        updateSaveButtonState();
      });
    });
  }

  function wireAccordionToggles(){
    $$("[data-toggle]").forEach(btn => {
      btn.addEventListener("click", () => {
        btn.closest(".grade-card").classList.toggle("open");
      });
    });
  }

  $("#save-grades").addEventListener("click", () => {
    const ev = currentEvaluation();
    if (!ev || isTransferred(ev.id)) return;

    if ($$(".grade-input.input-error").length > 0) {
      showToast("Corrige las notas fuera de rango antes de guardar");
      return;
    }

    
    showToast("Calificaciones guardadas correctamente");
  });

  $("#translate-grades").addEventListener("click", () => {
    const ev = currentEvaluation();
    if (!ev || isTransferred(ev.id)) return;

    if ($$(".grade-input.input-error").length > 0) {
      showToast("Corrige las notas fuera de rango antes de trasladar");
      return;
    }

    
    setTransferred(ev.id, true);
    renderGrades();
    showToast("Calificaciones trasladadas correctamente");
  });

  $("#cancel-grades").addEventListener("click", () => {
    renderEvaluations();
    navigateTo("evaluations");
  });

  
  function openMobileMenu(){
    $("#sidebar").classList.add("open");
    $("#mobile-overlay").classList.add("active");
  }
  function closeMobileMenu(){
    $("#sidebar").classList.remove("open");
    $("#mobile-overlay").classList.remove("active");
  }
  $("#menu-toggle").addEventListener("click", openMobileMenu);
  $("#mobile-overlay").addEventListener("click", closeMobileMenu);

  renderDashboard();
  navigateTo("dashboard");
}