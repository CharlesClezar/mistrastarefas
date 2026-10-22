import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

type Task = { id: string; text: string; done: boolean; createdAt: number };
const STORAGE_KEY = 'minhas-tarefas-v1';

function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); }
    catch { return []; }
  });
  const [draft, setDraft] = useState('');
  const [filter, setFilter] = useState<'all' | 'open' | 'done'>('all');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const visibleTasks = useMemo(() => tasks.filter(task => {
    if (filter === 'open') return !task.done;
    if (filter === 'done') return task.done;
    return true;
  }), [tasks, filter]);

  function addTask(event: React.FormEvent) {
    event.preventDefault();
    const text = draft.trim();
    if (!text) return;
    setTasks(current => [{ id: crypto.randomUUID(), text, done: false, createdAt: Date.now() }, ...current]);
    setDraft('');
  }

  function toggleTask(id: string) {
    setTasks(current => current.map(task => task.id === id ? { ...task, done: !task.done } : task));
  }

  function deleteTask(id: string) {
    setTasks(current => current.filter(task => task.id !== id));
  }

  function clearDone() {
    setTasks(current => current.filter(task => !task.done));
  }

  const doneCount = tasks.filter(task => task.done).length;

  return (
    <main className="shell">
      <header>
        <div className="eyebrow">ORGANIZAÇÃO PESSOAL</div>
        <h1>Minhas tarefas</h1>
        <p className="subtitle">Tire as ideias da cabeça e coloque no papel.</p>
      </header>

      <form className="add-form" onSubmit={addTask}>
        <input
          value={draft}
          onChange={event => setDraft(event.target.value)}
          placeholder="O que você precisa fazer?"
          aria-label="Nova tarefa"
          maxLength={180}
        />
        <button type="submit" disabled={!draft.trim()}>Adicionar</button>
      </form>

      <section className="toolbar">
        <div className="filters" aria-label="Filtrar tarefas">
          <button className={filter === 'all' ? 'filter active' : 'filter'} onClick={() => setFilter('all')}>Todas</button>
          <button className={filter === 'open' ? 'filter active' : 'filter'} onClick={() => setFilter('open')}>Pendentes</button>
          <button className={filter === 'done' ? 'filter active' : 'filter'} onClick={() => setFilter('done')}>Concluídas</button>
        </div>
        <span className="counter">{doneCount} de {tasks.length} concluída(s)</span>
      </section>

      <section className="task-list">
        {visibleTasks.length === 0 ? (
          <div className="empty">
            <div className="empty-icon">✓</div>
            <strong>{tasks.length === 0 ? 'Tudo começa com uma tarefa' : 'Nada por aqui'}</strong>
            <p>{tasks.length === 0 ? 'Adicione sua primeira tarefa acima.' : 'Experimente trocar o filtro.'}</p>
          </div>
        ) : visibleTasks.map(task => (
          <article className={task.done ? 'task done' : 'task'} key={task.id}>
            <button className="check" onClick={() => toggleTask(task.id)} aria-label={task.done ? 'Marcar como pendente' : 'Marcar como concluída'}>
              {task.done ? '✓' : ''}
            </button>
            <span className="task-text">{task.text}</span>
            <button className="delete" onClick={() => deleteTask(task.id)} aria-label="Excluir tarefa" title="Excluir">×</button>
          </article>
        ))}
      </section>

      {doneCount > 0 && (
        <footer>
          <span>Bom trabalho — cada passo conta.</span>
          <button className="clear" onClick={clearDone}>Limpar concluídas</button>
        </footer>
      )}
      <div className="storage-note">Suas tarefas ficam salvas neste computador.</div>
    </main>
  );
}

createRoot(document.getElementById('root')!).render(<React.StrictMode><App /></React.StrictMode>);