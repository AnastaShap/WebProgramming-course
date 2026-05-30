// ============================================================
// Завдання 3 — Каталог користувачів
// ============================================================
//
// Вимоги:
//   1. При завантаженні сторінки — fetch усіх юзерів
//   2. Рендер картки: name, email, address.city, company.name
//   3. Кнопка "Завантажити пости" на кожній картці
//   4. Стан "Завантаження..." на кнопці
//   5. textContent для тексту, не innerHTML
//   6. Обробка помилок (inline на картці або global)
// ============================================================

const API = "https://jsonplaceholder.typicode.com";

//const container = document.querySelector("#user"); 
const container = document.getElementById("user-list");

function el(tag, className, text) { // Приймає три параметри і повертає готовий елемент
  const node = document.createElement(tag);
  if (className) node.className = className;    
  if (text !== undefined) node.textContent = text; // textContent замість innerHTML захист від XSS
  return node;                              
}

// рендер одного поста
function renderPost(post) {
  const li = el("li", "post-item");
  const title = el("strong", null, post.title);
  const body = el("p", "post-body", post.body);
  li.appendChild(title);
  li.appendChild(body);
  return li;
}

async function loadPosts(userId, card, btn) { 
  btn.disabled = true;
  btn.textContent = "Завантаження...";

  const old = card.querySelector(".posts-section");
  if (old) old.remove();

  const section = el("div", "posts-section");

  try {
    const res = await fetch(`${API}/posts?userId=${userId}`); // fetch не кидає помилку при 404, лише ok: false
    if (!res.ok) throw new Error(`Помилка: ${res.status}`);
    const posts = await res.json();

    const heading = el("p", "posts-heading", `Пости (${posts.length}):`); 
    const list = el("ul", "posts-list");
    posts.forEach(post => list.appendChild(renderPost(post)));

    section.appendChild(heading);
    section.appendChild(list);

    btn.textContent = "Оновити пости";
  } catch (err) {
    const errMsg = el("p", "post-error", err.message);
    section.appendChild(errMsg);
    btn.textContent = "Спробувати знову";
  } finally {
    btn.disabled = false;      // виконується завжди — кнопка не залишиться заблокованою
    card.appendChild(section);
  }
}

// рендер окремої картки користувача
function renderUser(user) {
  const card = el("article", "user-card");

  const name    = el("h3", "user-name", user.name);
  const email   = el("p", "user-email", ` ${user.email}`);
  const city    = el("p",  "user-city",  ` ${user.address.city}`);
  const company = el("p",  "user-company",` ${user.company.name}`);

  const btn = el("button", "load-posts-btn", "Завантажити пости");
  btn.addEventListener("click", () => loadPosts(user.id, card, btn));

  card.appendChild(name);
  card.appendChild(email);
  card.appendChild(city);
  card.appendChild(company);
  card.appendChild(btn);

  return card;
}

async function loadUsers() {
  container.textContent = "Завантаження користувачів…";

  try {
    const res = await fetch(`${API}/users`);
    if (!res.ok) throw new Error(`Не вдалося завантажити користувачів: ${res.status}`);
    const users = await res.json();

    container.textContent = ""; // прибираємо "Завантаження"
    users.forEach(user => container.appendChild(renderUser(user)));
  } catch (err) {
    container.textContent = "";
    const errMsg = el("p", "global-error", err.message);
    container.appendChild(errMsg);
  }
}

loadUsers();