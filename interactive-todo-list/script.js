// Interactive To-Do List app
// Features: add, delete, toggle complete, clear all, task counter, localStorage persistence
(function(){
  const STORAGE_KEY = 'todo_tasks_v1';
  const form = document.getElementById('task-form');
  const input = document.getElementById('task-input');
  const list = document.getElementById('task-list');
  const clearBtn = document.getElementById('clear-btn');
  const countEl = document.getElementById('task-count');

  let tasks = loadTasks();

  function loadTasks(){
    try{
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    }catch(e){
      console.error('Failed to parse tasks from localStorage', e);
      return [];
    }
  }

  function saveTasks(){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }

  function createTaskObject(text){
    return {
      id: Date.now(),
      text: text.trim(),
      completed: false,
      created: new Date().toISOString()
    };
  }

  function renderTasks(){
    list.innerHTML = '';
    if(tasks.length === 0){
      const empty = document.createElement('li');
      empty.className = 'task-item';
      empty.innerHTML = '<div class="task-left"><div class="task-text" style="opacity:.6">No tasks — add one above.</div></div>';
      list.appendChild(empty);
      updateCounter();
      return;
    }

    tasks.forEach(task => {
      const li = document.createElement('li');
      li.className = 'task-item';
      li.dataset.id = task.id;

      const left = document.createElement('div');
      left.className = 'task-left';

      const checkbox = document.createElement('div');
      checkbox.className = 'checkbox' + (task.completed ? ' checked' : '');
      checkbox.setAttribute('role','button');
      checkbox.setAttribute('aria-pressed', String(task.completed));
      checkbox.title = task.completed ? 'Mark as incomplete' : 'Mark as complete';
      checkbox.dataset.action = 'toggle';

      const text = document.createElement('span');
      text.className = 'task-text' + (task.completed ? ' completed' : '');
      text.textContent = task.text;
      text.title = task.text;
      text.dataset.action = 'toggle';

      left.appendChild(checkbox);
      left.appendChild(text);

      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'delete-btn';
      deleteBtn.textContent = '✕';
      deleteBtn.title = 'Delete task';
      deleteBtn.dataset.action = 'delete';

      li.appendChild(left);
      li.appendChild(deleteBtn);

      // double click to edit (stretch goal)
      text.addEventListener('dblclick', (e) => {
        const newText = prompt('Edit task text:', task.text);
        if(newText !== null){
          const trimmed = newText.trim();
          if(trimmed.length){
            task.text = trimmed;
            saveTasks();
            renderTasks();
          }
        }
      });

      list.appendChild(li);
    });

    updateCounter();
  }

  function addTask(text){
    if(!text || !text.trim()) return;
    const task = createTaskObject(text);
    tasks.unshift(task); // newest first
    saveTasks();
    renderTasks();
  }

  function deleteTask(id){
    tasks = tasks.filter(t => String(t.id) !== String(id));
    saveTasks();
    renderTasks();
  }

  function toggleComplete(id){
    const t = tasks.find(x => String(x.id) === String(id));
    if(t){
      t.completed = !t.completed;
      saveTasks();
      renderTasks();
    }
  }

  function clearAll(){
    if(!tasks.length) return;
    if(!confirm('Clear all tasks?')) return;
    tasks = [];
    saveTasks();
    renderTasks();
  }

  function updateCounter(){
    const remaining = tasks.filter(t => !t.completed).length;
    const label = remaining === 1 ? 'task' : 'tasks';
    countEl.textContent = `${remaining} ${label} remaining`;
  }

  // Event listeners
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    addTask(input.value);
    form.reset();
    input.focus();
  });

  list.addEventListener('click', (e) => {
    const action = e.target.dataset.action;
    const li = e.target.closest('li');
    if(!li) return;
    const id = li.dataset.id;
    if(action === 'delete'){
      deleteTask(id);
    }else if(action === 'toggle'){
      toggleComplete(id);
    }
  });

  clearBtn.addEventListener('click', clearAll);

  // allow Enter key on input to submit (already supported) and focus helpers
  input.addEventListener('keyup', (e) => {
    if(e.key === 'Escape') input.value = '';
  });

  // initial render
  renderTasks();

  // expose for debugging (optional)
  window.todoApp = {
    get tasks(){ return tasks; },
    add: addTask,
    clear: clearAll
  };
})();
