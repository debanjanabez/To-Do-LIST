// ── State ──────────────────────────────────────────
let todos = JSON.parse(localStorage.getItem('todos') || '[]');
let filter = 'all'; // 'all' | 'active' | 'done'

// ── DOM Refs ────────────────────────────────────────
const input      = document.getElementById('todo-input');
const addBtn     = document.getElementById('add-btn');
const list       = document.getElementById('todo-list');
const emptyState = document.getElementById('empty-state');
const footer     = document.getElementById('footer');
const clearBtn   = document.getElementById('clear-btn');
const filterBtns = document.querySelectorAll('.filter-btn');
const progressFill = document.getElementById('progress-fill');
const doneCount  = document.getElementById('done-count');
const totalCount = document.getElementById('total-count');
const dateEl     = document.getElementById('today-date');

// ── Date ────────────────────────────────────────────
dateEl.textContent = new Date().toLocaleDateString('en-US', {
  weekday: 'long', month: 'long', day: 'numeric'
});

// ── Save ────────────────────────────────────────────
function save() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

// ── Render ──────────────────────────────────────────
function render() {
  const visible = todos.filter(t => {
    if (filter === 'active') return !t.done;
    if (filter === 'done')   return  t.done;
    return true;
  });

  list.innerHTML = '';

  visible.forEach(todo => {
    const li = document.createElement('li');
    li.className = 'todo-item' + (todo.done ? ' done' : '');
    li.dataset.id = todo.id;

    li.innerHTML = `
      <button class="check-btn" aria-label="Toggle complete">
        <svg class="check-icon" width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2 6l3 3 5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <span class="todo-text">${escapeHTML(todo.text)}</span>
      <button class="delete-btn" aria-label="Delete task">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>
    `;

    li.querySelector('.check-btn').addEventListener('click', () => toggleTodo(todo.id));
    li.querySelector('.delete-btn').addEventListener('click', () => deleteTodo(todo.id));

    list.appendChild(li);
  });

  // Empty state
  emptyState.style.display = visible.length === 0 ? 'flex' : 'none';

  // Footer (clear completed)
  const hasDone = todos.some(t => t.done);
  footer.style.display = hasDone ? 'block' : 'none';

  // Stats & progress
  const done  = todos.filter(t => t.done).length;
  const total = todos.length;
  doneCount.textContent  = done;
  totalCount.textContent = total;
  progressFill.style.width = total === 0 ? '0%' : (done / total * 100) + '%';
}

// ── Actions ─────────────────────────────────────────
function addTodo() {
  const text = input.value.trim();
  if (!text) return;

  todos.unshift({ id: Date.now(), text, done: false });
  save();
  render();
  input.value = '';
  input.focus();
}

function toggleTodo(id) {
  const todo = todos.find(t => t.id === id);
  if (todo) todo.done = !todo.done;
  save();
  render();
}

function deleteTodo(id) {
  todos = todos.filter(t => t.id !== id);
  save();
  render();
}

function clearCompleted() {
  todos = todos.filter(t => !t.done);
  save();
  render();
}

// ── Filters ─────────────────────────────────────────
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filter = btn.dataset.filter;
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    render();
  });
});

// ── Events ──────────────────────────────────────────
addBtn.addEventListener('click', addTodo);
input.addEventListener('keydown', e => { if (e.key === 'Enter') addTodo(); });
clearBtn.addEventListener('click', clearCompleted);

// ── Helpers ─────────────────────────────────────────
function escapeHTML(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// ── Init ─────────────────────────────────────────────
render();