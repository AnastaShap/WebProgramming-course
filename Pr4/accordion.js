// ============================================================
// Завдання 4 — Аккордеон
// ============================================================
// Вимоги:
//   1. Клік на .panel-title відкриває/закриває .panel-content
//      (додається/прибирається клас .open на .panel).
//   2. Одночасно відкрита ЛИШЕ ОДНА панель.
//   3. EVENT DELEGATION на .accordion.
//   4. КЛАВІАТУРА: Enter і Space на .panel-title (з tabindex=0).
//   5. ARIA: aria-expanded="true"/"false" оновлюється.
// ============================================================

// TODO

const accordion = document.querySelector(".accordion");

accordion?.querySelectorAll(".panel-title").forEach(title => {
    title.setAttribute("tabindex", 0);
    title.setAttribute("aria-exanded", "false"); //  початковий стан для скрінридерів
})


// логіка відкриття/закриття

function togglePanel(panel)
{
    const isOpen = panel.classList.contains("open");
    accordion.querySelectorAll(".panel").forEach(p=>{
        p.classList.remove("open");
        p.querySelector(".panel-title").setAttribute("aria-expanded", "false");
    })
    if(!isOpen){ // якщо панель закрита була
        panel.classList.add("open");
        panel.querySelector(".panel-title").setAttribute("aria-expanded", "true");

    }
}
accordion.addEventListener("click", e => {
  const title = e.target.closest(".panel-title"); // найближчий .panel-title
  if (!title) return;
  togglePanel(title.closest(".panel"));
});

// КЛАВІАТУРА: Enter і Space на .panel-title (з tabindex=0).

accordion.addEventListener("keydown", e => {
  if (e.key !== "Enter" && e.key !== " ") return;
  const title = e.target.closest(".panel-title");
  if (!title) return;
  e.preventDefault(); // Space не прокручує сторінку
  togglePanel(title.closest(".panel"));
});