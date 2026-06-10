/**
 * app.js
 * ------------------------------------------------------------------
 * Interface and game logic for the Internet Skills Hub.
 *
 * Learning content is intentionally kept out of this file:
 * - data/glossary-data.js
 * - data/quiz-data.js
 * - data/scenario-data.js
 * ------------------------------------------------------------------
 */

const app = document.getElementById("app");
const themeToggle = document.getElementById("theme-toggle");
const themeLabel = document.getElementById("theme-label");
const menuToggle = document.getElementById("menu-toggle");
const siteNav = document.getElementById("site-nav");
const resetProgressButton = document.getElementById("reset-progress");

const STORAGE_KEY = "internet-skills-progress-v1";
const DEFAULT_PROGRESS = {
  glossaryViewed: [],
  quizBest: 0,
  quizAttempts: 0,
  matchBest: 0,
  matchAttempts: 0,
  sortBest: 0,
  sortAttempts: 0,
  lastRoute: "glossary"
};

let progress = loadProgress();
let pendingGlossarySearch = "";

const icons = {
  search: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"></circle><path d="m20 20-4-4"></path></svg>',
  book: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5.5A3.5 3.5 0 0 1 7.5 2H11v17H7.5A3.5 3.5 0 0 0 4 22V5.5ZM20 5.5A3.5 3.5 0 0 0 16.5 2H13v17h3.5A3.5 3.5 0 0 1 20 22V5.5Z"></path></svg>',
  quiz: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5h10M9 12h10M9 19h10M3 5l1 1 2-2M3 12l1 1 2-2M3 19l1 1 2-2"></path></svg>',
  match: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8.5 3v3.5H5a3 3 0 1 0 0 6h3.5V16H12v3.5a3 3 0 1 0 6 0V16h3v-3.5h-3.5V9H14V6.5h-2A3.5 3.5 0 0 0 8.5 3Z"></path></svg>',
  sort: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v18M4 7h16M6 7l-3 6h6L6 7ZM18 7l-3 6h6l-3-6ZM7 21h10"></path></svg>',
  shield: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 5 6v5c0 4.8 2.8 8.3 7 10 4.2-1.7 7-5.2 7-10V6l-7-3Z"></path><path d="m9 12 2 2 4-5"></path></svg>',
  wifi: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.9 9.9a10 10 0 0 1 14.2 0M7.8 12.8a6 6 0 0 1 8.4 0M10.6 15.6a2 2 0 0 1 2.8 0"></path><circle cx="12" cy="19" r=".8" fill="currentColor" stroke="none"></circle></svg>',
  mail: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"></rect><path d="m4 7 8 6 8-6"></path></svg>',
  check: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4 4L19 6"></path></svg>',
  alert: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 2.8 20h18.4L12 3Z"></path><path d="M12 9v5M12 17.5v.5"></path></svg>',
  arrow: '<svg class="button-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M14 7l5 5-5 5"></path></svg>'
};

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function shuffle(items) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const other = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[other]] = [copy[other], copy[index]];
  }
  return copy;
}

function loadProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return { ...DEFAULT_PROGRESS, ...(saved || {}) };
  } catch {
    return { ...DEFAULT_PROGRESS };
  }
}

function saveProgress() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

function setLastRoute(route) {
  if (route !== "home") {
    progress.lastRoute = route;
    saveProgress();
  }
}

function routeLabel(route) {
  return {
    glossary: "Glossary",
    quiz: "Quick Quiz",
    match: "Match the Terms",
    sort: "Safe or Risky"
  }[route] || "Glossary";
}

function routeIcon(route) {
  return {
    glossary: icons.book,
    quiz: icons.quiz,
    match: icons.match,
    sort: icons.sort
  }[route] || icons.book;
}

function getRoute() {
  const route = window.location.hash.replace("#", "").split("?")[0];
  return ["home", "glossary", "quiz", "match", "sort"].includes(route) ? route : "home";
}

function navigate(route) {
  window.location.hash = route;
}

function updateNavigation(route) {
  document.querySelectorAll("[data-route]").forEach(link => {
    const active = link.dataset.route === route;
    link.classList.toggle("active", active);
    if (active) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
  siteNav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}

function updateThemeLabel() {
  const dark = document.documentElement.dataset.theme === "dark";
  themeLabel.textContent = dark ? "Light mode" : "Dark mode";
  themeToggle.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
}

function render() {
  const route = getRoute();
  updateNavigation(route);
  setLastRoute(route);

  if (route === "home") renderHome();
  if (route === "glossary") renderGlossary();
  if (route === "quiz") renderQuizSetup();
  if (route === "match") renderMatchSetup();
  if (route === "sort") renderSortSetup();

  document.title = `${route === "home" ? "Internet Skills Hub" : `${routeLabel(route)} | Internet Skills Hub`}`;
  window.scrollTo({ top: 0, behavior: "auto" });
}

function calculateProgress() {
  const glossaryGoal = Math.min(progress.glossaryViewed.length, 12) / 12;
  const quizGoal = Math.min(progress.quizBest, 8) / 8;
  const matchGoal = Math.min(progress.matchBest, 8) / 8;
  const sortGoal = Math.min(progress.sortBest, 8) / 8;
  return Math.round(((glossaryGoal + quizGoal + matchGoal + sortGoal) / 4) * 100);
}

function renderHome() {
  const percent = calculateProgress();
  const lastRoute = progress.lastRoute || "glossary";
  const activities = [
    {
      route: "glossary",
      title: "Glossary",
      text: "Search clear definitions, examples and key Internet Skills terms.",
      icon: icons.book,
      accent: "var(--teal)",
      soft: "color-mix(in srgb, var(--teal) 13%, var(--surface))",
      button: "Browse all terms"
    },
    {
      route: "quiz",
      title: "Quick Quiz",
      text: "Answer ten multiple-choice questions and get feedback as you go.",
      icon: icons.quiz,
      accent: "var(--blue)",
      soft: "color-mix(in srgb, var(--blue) 12%, var(--surface))",
      button: "Start a quiz"
    },
    {
      route: "match",
      title: "Match",
      text: "Connect each key term with its correct plain-language definition.",
      icon: icons.match,
      accent: "var(--yellow)",
      soft: "var(--yellow-soft)",
      button: "Start matching"
    },
    {
      route: "sort",
      title: "Safe or Risky",
      text: "Decide whether realistic online choices are safer or riskier.",
      icon: icons.sort,
      accent: "var(--coral)",
      soft: "var(--coral-soft)",
      button: "Start sorting"
    }
  ];

  app.innerHTML = `
    <div class="page-shell">
      <section class="hero">
        <div class="hero-copy">
          <h1>Build useful internet skills with confidence.</h1>
          <p>Learn at your own pace with a searchable glossary, short revision games and clear feedback.</p>
          <div class="hero-actions">
            <a class="primary-button" href="#glossary">${icons.book}<span>Explore the glossary</span></a>
            <a class="secondary-button" href="#quiz">${icons.quiz}<span>Try a quick quiz</span></a>
          </div>
          <ul class="skill-points">
            <li>${icons.shield}<span><strong>Stay safer</strong>Spot risks and protect information.</span></li>
            <li>${icons.search}<span><strong>Find information</strong>Search and check sources.</span></li>
            <li>${icons.mail}<span><strong>Communicate</strong>Use email with confidence.</span></li>
          </ul>
        </div>
        <div class="hero-art" aria-hidden="true">
          <div class="learning-board">
            <svg class="board-globe" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="9"></circle>
              <path d="M3 12h18M12 3c2.7 2.5 4.1 5.5 4.1 9S14.7 18.5 12 21M12 3C9.3 5.5 7.9 8.5 7.9 12S9.3 18.5 12 21"></path>
            </svg>
            <div class="board-search"></div>
          </div>
          <span class="signal-bubble wifi">${icons.wifi}</span>
          <span class="signal-bubble shield">${icons.shield}</span>
          <span class="signal-bubble mail">${icons.mail}</span>
        </div>
      </section>

      <section class="progress-panel" aria-label="Your saved progress">
        <div class="progress-intro">
          <strong>Your progress</strong>
          <span>Saved in this browser</span>
        </div>
        <div>
          <div class="progress-track" aria-label="${percent}% complete">
            <div class="progress-fill" style="width: ${percent}%"></div>
          </div>
          <div class="progress-detail"><span>Overall revision progress</span><strong>${percent}%</strong></div>
        </div>
        <div class="progress-stat"><strong>${progress.glossaryViewed.length}</strong><span>terms explored</span></div>
        <div class="progress-stat"><strong>${progress.quizBest}/10</strong><span>best quiz</span></div>
        <div class="progress-stat"><strong>${progress.matchBest}</strong><span>matches found</span></div>
      </section>

      <section class="section-block">
        <div class="section-heading">
          <div>
            <h2>Choose an activity</h2>
            <p>Short, focused practice for key course skills.</p>
          </div>
        </div>
        <div class="activity-grid">
          ${activities.map(activity => `
            <article class="activity-card" style="--card-accent:${activity.accent};--card-soft:${activity.soft}">
              <div class="activity-icon">${activity.icon}</div>
              <h3>${activity.title}</h3>
              <p>${activity.text}</p>
              <a class="secondary-button" href="#${activity.route}">${activity.button} ${icons.arrow}</a>
            </article>
          `).join("")}
        </div>
      </section>

      <section class="section-block">
        <div class="section-heading">
          <div>
            <h2>Continue learning</h2>
            <p>Return to the activity you used most recently.</p>
          </div>
        </div>
        <div class="continue-panel">
          <div class="activity-icon" style="--card-soft:var(--surface);--card-accent:var(--blue)">${routeIcon(lastRoute)}</div>
          <div>
            <h3>${routeLabel(lastRoute)}</h3>
            <p>Your progress will still be here on this browser.</p>
          </div>
          <a class="primary-button" href="#${lastRoute}">Continue ${icons.arrow}</a>
        </div>
      </section>
    </div>
  `;
}

function renderGlossary() {
  app.innerHTML = `
    <div class="page-shell">
      <header class="page-heading">
        <div>
          <h1>Internet Skills Glossary</h1>
          <p>Search key words, browse by topic and read practical examples.</p>
        </div>
        <div class="count-badge"><strong id="term-count">${GLOSSARY.length}</strong><span>terms showing</span></div>
      </header>

      <div class="toolbar">
        <label class="search-field">
          <span class="sr-only">Search glossary</span>
          ${icons.search}
          <input id="glossary-search" type="search" placeholder="Search a term or definition..." autocomplete="off">
        </label>
        <div class="filter-row" id="glossary-filters" aria-label="Glossary categories">
          <button class="filter-button active" type="button" data-category="all">All terms</button>
          ${Object.entries(CATEGORIES).map(([key, meta]) =>
            `<button class="filter-button" type="button" data-category="${key}">${escapeHtml(meta.label)}</button>`
          ).join("")}
        </div>
      </div>

      <div class="glossary-grid" id="glossary-grid"></div>
    </div>
  `;

  const search = document.getElementById("glossary-search");
  const filters = document.getElementById("glossary-filters");
  let activeCategory = "all";

  function drawTerms(trackExploration = false) {
    const query = search.value.trim().toLowerCase();
    const filtered = GLOSSARY.filter(entry => {
      const categoryMatch = activeCategory === "all" || entry.tags.includes(activeCategory);
      const text = `${entry.term} ${entry.abbr || ""} ${entry.def} ${entry.example}`.toLowerCase();
      return categoryMatch && text.includes(query);
    });

    document.getElementById("term-count").textContent = filtered.length;
    const grid = document.getElementById("glossary-grid");

    if (!filtered.length) {
      grid.innerHTML = `<div class="empty-state"><strong>No terms found.</strong><br>Try a shorter search or choose All terms.</div>`;
      return;
    }

    grid.innerHTML = filtered.map(entry => {
      const categoryKey = entry.tags[0];
      const category = CATEGORIES[categoryKey];
      return `
        <article class="term-card" data-term="${escapeHtml(entry.term)}"
          style="--category-color:${category.color};--category-soft:${category.soft}">
          <span class="category-label">${escapeHtml(category.label)}</span>
          <h2>${escapeHtml(entry.term)}${entry.abbr ? ` <span>(${escapeHtml(entry.abbr)})</span>` : ""}</h2>
          <p>${escapeHtml(entry.def)}</p>
          <p class="example"><strong>Example:</strong> ${escapeHtml(entry.example)}</p>
        </article>
      `;
    }).join("");

    if (trackExploration) {
      filtered.forEach(entry => {
        if (!progress.glossaryViewed.includes(entry.term)) {
          progress.glossaryViewed.push(entry.term);
        }
      });
      saveProgress();
    }
  }

  search.addEventListener("input", () => drawTerms(true));
  filters.addEventListener("click", event => {
    const button = event.target.closest("[data-category]");
    if (!button) return;
    activeCategory = button.dataset.category;
    filters.querySelectorAll("button").forEach(item => item.classList.toggle("active", item === button));
    drawTerms(true);
  });

  if (pendingGlossarySearch) {
    search.value = pendingGlossarySearch;
    pendingGlossarySearch = "";
  }
  drawTerms(Boolean(search.value));
}

function categoryOptions() {
  return `
    <option value="all">All topics</option>
    ${Object.entries(CATEGORIES).map(([key, meta]) => `<option value="${key}">${escapeHtml(meta.label)}</option>`).join("")}
  `;
}

function renderQuizSetup() {
  app.innerHTML = `
    <div class="page-shell game-panel">
      <section class="game-intro">
        <h1>Quick Quiz</h1>
        <p>Answer up to ten questions. You will see a clear explanation after every answer.</p>
        <div class="setup-grid">
          <div class="setup-option select-field">
            <label for="quiz-category">Choose a topic</label>
            <select id="quiz-category">${categoryOptions()}</select>
          </div>
          <div class="setup-option">
            <strong>Current best</strong>
            <span>${progress.quizBest}/10 from ${progress.quizAttempts} attempt${progress.quizAttempts === 1 ? "" : "s"}</span>
          </div>
        </div>
        <button class="primary-button" id="start-quiz" type="button">Start quiz ${icons.arrow}</button>
      </section>
    </div>
  `;

  document.getElementById("start-quiz").addEventListener("click", () => {
    const category = document.getElementById("quiz-category").value;
    const pool = category === "all"
      ? QUIZ_QUESTIONS
      : QUIZ_QUESTIONS.filter(question => question.tags.includes(category));
    startQuiz(shuffle(pool).slice(0, Math.min(10, pool.length)));
  });
}

function startQuiz(questions) {
  let cursor = 0;
  let score = 0;
  let answered = false;

  function drawQuestion() {
    answered = false;
    const question = questions[cursor];
    const percent = Math.round((cursor / questions.length) * 100);
    app.innerHTML = `
      <div class="page-shell game-panel">
        <div class="game-status">
          <strong>Question ${cursor + 1} of ${questions.length}</strong>
          <div class="progress-track"><div class="progress-fill" style="width:${percent}%"></div></div>
          <strong>Score: ${score}</strong>
        </div>
        <section class="question-card">
          <h2>${escapeHtml(question.question)}</h2>
          <div class="answer-list" id="answer-list">
            ${question.options.map((option, index) => `
              <button class="choice-button" type="button" data-answer="${index}">
                <span class="choice-letter">${String.fromCharCode(65 + index)}</span>
                <span>${escapeHtml(option)}</span>
              </button>
            `).join("")}
          </div>
          <div id="answer-feedback"></div>
          <div class="question-actions" id="question-actions"></div>
        </section>
      </div>
    `;

    document.getElementById("answer-list").addEventListener("click", event => {
      const button = event.target.closest("[data-answer]");
      if (!button || answered) return;
      answered = true;
      const selected = Number(button.dataset.answer);
      const correct = selected === question.answer;
      if (correct) score += 1;

      document.querySelectorAll("[data-answer]").forEach(answerButton => {
        const index = Number(answerButton.dataset.answer);
        answerButton.disabled = true;
        if (index === question.answer) answerButton.classList.add("correct");
        if (index === selected && !correct) answerButton.classList.add("incorrect");
      });

      const feedback = document.getElementById("answer-feedback");
      feedback.innerHTML = `
        <div class="feedback" style="--feedback-color:${correct ? "var(--green)" : "var(--coral)"};--feedback-soft:${correct ? "var(--green-soft)" : "var(--coral-soft)"}">
          <strong>${correct ? "Correct" : "Not quite"}</strong>
          ${escapeHtml(question.explanation)}
        </div>
      `;

      document.getElementById("question-actions").innerHTML = `
        <button class="primary-button" id="next-question" type="button">
          ${cursor === questions.length - 1 ? "See my result" : "Next question"} ${icons.arrow}
        </button>
      `;
      document.getElementById("next-question").addEventListener("click", () => {
        cursor += 1;
        if (cursor >= questions.length) {
          finishQuiz();
        } else {
          drawQuestion();
        }
      });
    });
  }

  function finishQuiz() {
    const scoreOutOfTen = Math.round((score / questions.length) * 10);
    progress.quizBest = Math.max(progress.quizBest, scoreOutOfTen);
    progress.quizAttempts += 1;
    saveProgress();

    const message = scoreOutOfTen >= 8
      ? "Strong work. You are recognising the key ideas."
      : scoreOutOfTen >= 5
        ? "Good progress. Review a few terms and try again."
        : "This is a useful starting point. Use the glossary before another try.";

    app.innerHTML = `
      <div class="page-shell game-panel">
        <section class="result-card">
          <div class="result-ring">${score}/${questions.length}</div>
          <h2>Quiz complete</h2>
          <p>${message}</p>
          <div class="result-actions">
            <button class="primary-button" id="quiz-again" type="button">Try another quiz</button>
            <a class="secondary-button" href="#glossary">Review the glossary</a>
          </div>
        </section>
      </div>
    `;
    document.getElementById("quiz-again").addEventListener("click", renderQuizSetup);
  }

  drawQuestion();
}

function renderMatchSetup() {
  app.innerHTML = `
    <div class="page-shell game-panel">
      <section class="game-intro">
        <h1>Match the Terms</h1>
        <p>Select a term, then select its correct definition. The glossary supplies every pair.</p>
        <div class="setup-grid">
          <div class="setup-option select-field">
            <label for="match-category">Choose a topic</label>
            <select id="match-category">${categoryOptions()}</select>
          </div>
          <div class="setup-option">
            <strong>Number of pairs</strong>
            <div class="segmented-control" id="match-count">
              <button type="button" data-count="6">6</button>
              <button class="active" type="button" data-count="8">8</button>
              <button type="button" data-count="10">10</button>
            </div>
          </div>
        </div>
        <button class="primary-button" id="start-match" type="button">Start matching ${icons.arrow}</button>
      </section>
    </div>
  `;

  let pairCount = 8;
  const countControl = document.getElementById("match-count");
  countControl.addEventListener("click", event => {
    const button = event.target.closest("[data-count]");
    if (!button) return;
    pairCount = Number(button.dataset.count);
    countControl.querySelectorAll("button").forEach(item => item.classList.toggle("active", item === button));
  });

  document.getElementById("start-match").addEventListener("click", () => {
    const category = document.getElementById("match-category").value;
    const pool = GLOSSARY.filter(entry => entry.searchable !== false && (category === "all" || entry.tags.includes(category)));
    startMatch(shuffle(pool).slice(0, Math.min(pairCount, pool.length)));
  });
}

function startMatch(entries) {
  const pairs = entries.map((entry, index) => ({ id: index, entry }));
  const terms = shuffle(pairs);
  const definitions = shuffle(pairs);
  const matched = new Set();
  let selectedTerm = null;
  let selectedDefinition = null;
  let moves = 0;
  let locked = false;

  app.innerHTML = `
    <div class="page-shell game-panel">
      <div class="game-status">
        <strong><span id="match-found">0</span> of ${pairs.length} matched</strong>
        <div class="progress-track"><div class="progress-fill" id="match-progress" style="width:0%"></div></div>
        <strong>Tries: <span id="match-moves">0</span></strong>
      </div>
      <div class="match-board">
        <section class="match-column" id="term-column">
          <h2>Terms</h2>
          ${terms.map(pair => `
            <button class="match-item" type="button" data-kind="term" data-id="${pair.id}">
              <strong>${escapeHtml(pair.entry.abbr || pair.entry.term)}</strong>
              ${pair.entry.abbr ? `<br><small>${escapeHtml(pair.entry.term)}</small>` : ""}
            </button>
          `).join("")}
        </section>
        <section class="match-column" id="definition-column">
          <h2>Definitions</h2>
          ${definitions.map(pair => `
            <button class="match-item" type="button" data-kind="definition" data-id="${pair.id}">
              ${escapeHtml(pair.entry.def)}
            </button>
          `).join("")}
        </section>
      </div>
      <div id="match-message" aria-live="assertive"></div>
    </div>
  `;

  const matchBoard = document.querySelector(".match-board");
  matchBoard.addEventListener("click", handleMatchClick);

  function handleMatchClick(event) {
    const button = event.target.closest(".match-item");
    if (!button || locked || button.disabled) return;
    const id = Number(button.dataset.id);
    const kind = button.dataset.kind;

    if (kind === "term") {
      document.querySelectorAll('[data-kind="term"]').forEach(item => item.classList.remove("selected"));
      selectedTerm = id;
    } else {
      document.querySelectorAll('[data-kind="definition"]').forEach(item => item.classList.remove("selected"));
      selectedDefinition = id;
    }
    button.classList.add("selected");

    if (selectedTerm !== null && selectedDefinition !== null) {
      checkMatch();
    }
  }

  function checkMatch() {
    moves += 1;
    document.getElementById("match-moves").textContent = moves;
    const termButton = document.querySelector(`[data-kind="term"][data-id="${selectedTerm}"]`);
    const definitionButton = document.querySelector(`[data-kind="definition"][data-id="${selectedDefinition}"]`);

    if (selectedTerm === selectedDefinition) {
      matched.add(selectedTerm);
      [termButton, definitionButton].forEach(button => {
        button.classList.remove("selected");
        button.classList.add("matched");
        button.disabled = true;
      });
      selectedTerm = null;
      selectedDefinition = null;
      document.getElementById("match-found").textContent = matched.size;
      document.getElementById("match-progress").style.width = `${(matched.size / pairs.length) * 100}%`;

      if (matched.size === pairs.length) finishMatch();
      return;
    }

    locked = true;
    termButton.classList.add("wrong");
    definitionButton.classList.add("wrong");
    document.getElementById("match-message").innerHTML = `
      <div class="feedback" style="--feedback-color:var(--coral);--feedback-soft:var(--coral-soft)">
        <strong>Try a different pair.</strong> Read the key words in the definition.
      </div>
    `;

    window.setTimeout(() => {
      [termButton, definitionButton].forEach(button => button.classList.remove("selected", "wrong"));
      selectedTerm = null;
      selectedDefinition = null;
      locked = false;
      document.getElementById("match-message").innerHTML = "";
    }, 850);
  }

  function finishMatch() {
    matchBoard.removeEventListener("click", handleMatchClick);
    progress.matchBest = Math.max(progress.matchBest, pairs.length);
    progress.matchAttempts += 1;
    saveProgress();
    app.innerHTML = `
      <div class="page-shell game-panel">
        <section class="result-card">
          <div class="result-ring">${pairs.length}</div>
          <h2>All pairs matched</h2>
          <p>You completed ${pairs.length} pairs in ${moves} tries.</p>
          <div class="result-actions">
            <button class="primary-button" id="match-again" type="button">Play again</button>
            <a class="secondary-button" href="#glossary">Open the glossary</a>
          </div>
        </section>
      </div>
    `;
    document.getElementById("match-again").addEventListener("click", renderMatchSetup);
  }
}

function renderSortSetup() {
  app.innerHTML = `
    <div class="page-shell game-panel">
      <section class="game-intro">
        <h1>Safe or Risky?</h1>
        <p>Read each realistic situation and decide whether the online choice is safer or riskier.</p>
        <div class="setup-grid">
          <div class="setup-option">
            <strong>Ten scenarios</strong>
            <span>A new selection is chosen each time.</span>
          </div>
          <div class="setup-option">
            <strong>Current best</strong>
            <span>${progress.sortBest}/10 from ${progress.sortAttempts} attempt${progress.sortAttempts === 1 ? "" : "s"}</span>
          </div>
        </div>
        <button class="primary-button" id="start-sort" type="button">Start sorting ${icons.arrow}</button>
      </section>
    </div>
  `;

  document.getElementById("start-sort").addEventListener("click", () => {
    startSort(shuffle(SORT_SCENARIOS).slice(0, Math.min(10, SORT_SCENARIOS.length)));
  });
}

function startSort(scenarios) {
  let cursor = 0;
  let score = 0;
  let answered = false;

  function drawScenario() {
    answered = false;
    const scenario = scenarios[cursor];
    app.innerHTML = `
      <div class="page-shell game-panel">
        <div class="game-status">
          <strong>Scenario ${cursor + 1} of ${scenarios.length}</strong>
          <div class="progress-track"><div class="progress-fill" style="width:${(cursor / scenarios.length) * 100}%"></div></div>
          <strong>Score: ${score}</strong>
        </div>
        <section class="scenario-card">
          <h2>${escapeHtml(scenario.text)}</h2>
          <div class="sort-choices" id="sort-choices">
            <button class="sort-choice safe" type="button" data-choice="safe">${icons.check}<span>Safer choice</span></button>
            <button class="sort-choice risky" type="button" data-choice="risky">${icons.alert}<span>Risky choice</span></button>
          </div>
          <div id="sort-feedback"></div>
          <div class="question-actions" id="sort-actions"></div>
        </section>
      </div>
    `;

    document.getElementById("sort-choices").addEventListener("click", event => {
      const button = event.target.closest("[data-choice]");
      if (!button || answered) return;
      answered = true;
      const selected = button.dataset.choice;
      const correct = selected === scenario.choice;
      if (correct) score += 1;

      document.querySelectorAll("[data-choice]").forEach(choiceButton => {
        choiceButton.disabled = true;
        if (choiceButton.dataset.choice === scenario.choice) choiceButton.classList.add("correct");
        if (choiceButton === button && !correct) choiceButton.classList.add("incorrect");
      });

      document.getElementById("sort-feedback").innerHTML = `
        <div class="feedback" style="--feedback-color:${correct ? "var(--green)" : "var(--coral)"};--feedback-soft:${correct ? "var(--green-soft)" : "var(--coral-soft)"}">
          <strong>${correct ? "Good decision" : "Look again"}</strong>
          ${escapeHtml(scenario.explanation)}
        </div>
      `;
      document.getElementById("sort-actions").innerHTML = `
        <button class="primary-button" id="next-scenario" type="button">
          ${cursor === scenarios.length - 1 ? "See my result" : "Next scenario"} ${icons.arrow}
        </button>
      `;
      document.getElementById("next-scenario").addEventListener("click", () => {
        cursor += 1;
        if (cursor >= scenarios.length) finishSort();
        else drawScenario();
      });
    });
  }

  function finishSort() {
    const scoreOutOfTen = Math.round((score / scenarios.length) * 10);
    progress.sortBest = Math.max(progress.sortBest, scoreOutOfTen);
    progress.sortAttempts += 1;
    saveProgress();
    app.innerHTML = `
      <div class="page-shell game-panel">
        <section class="result-card">
          <div class="result-ring">${score}/${scenarios.length}</div>
          <h2>Sorting complete</h2>
          <p>${scoreOutOfTen >= 8 ? "You are making strong online safety choices." : "Review the explanations and try another set."}</p>
          <div class="result-actions">
            <button class="primary-button" id="sort-again" type="button">Try another set</button>
            <a class="secondary-button" href="#glossary">Review safety terms</a>
          </div>
        </section>
      </div>
    `;
    document.getElementById("sort-again").addEventListener("click", renderSortSetup);
  }

  drawScenario();
}

themeToggle.addEventListener("click", () => {
  const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  localStorage.setItem("internet-skills-theme", next);
  updateThemeLabel();
});

menuToggle.addEventListener("click", () => {
  const open = siteNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});

resetProgressButton.addEventListener("click", () => {
  const confirmed = window.confirm("Reset all locally saved scores and glossary progress?");
  if (!confirmed) return;
  progress = { ...DEFAULT_PROGRESS };
  saveProgress();
  render();
});

window.addEventListener("hashchange", render);
updateThemeLabel();
render();
