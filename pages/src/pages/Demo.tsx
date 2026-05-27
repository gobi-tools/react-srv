import { useState } from "react";
import type { SubmitEvent } from 'react';

type TTodoContent = string;

type TTodo = {
  id: string;
  content: TTodoContent;
  done: boolean;
};

export default function Demo() {
  const [content, setContent] = useState<TTodoContent>('');
  const [todos, setTodos] = useState<Array<TTodo>>([]);

  const updateContent = (e: { target: { value: string } }) => setContent(e.target.value);

  const addTodo = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const id = toId(content);
    const exists = todos.find(t => t.id === id);
    if (exists) {
      setContent('');
      return;
    }

    const newTodo: TTodo = { id, content, done: false };
    const newTodos: Array<TTodo> = [...todos, newTodo];

    setTodos(newTodos);
    setContent('');
  }

  const onCheck = (e: { target: { id: string, checked: boolean } }) => {
    const newTodos: Array<TTodo> = todos.map(t => {
      if (t.id === e.target.id) {
        return { ...t, done: !t.done }
      }
      return t;
    });
    setTodos(newTodos);
  }

  return <>
    <main>
      <section>
        <h2>Todo Magic</h2>
        <form onSubmit={addTodo}>
          <div className="group">
            <input type="text" id="new-todo" placeholder="Add todo ..." value={content} onChange={updateContent} />
            <input disabled={content === ''} type="submit" value={"Add"} />
          </div>
        </form>
        {todos.length === 0 &&
          <blockquote className="secondary">
            <p>You haven't added any todos so far</p>
          </blockquote>}
        {todos.length > 0 &&
          <div className="card">
            <h4>Today's list</h4>
            {todos.sort((a, b) => {
              // first: unfinished before finished
              if (a.done !== b.done) {
                return Number(a.done) - Number(b.done);
              }

              // then: alphabetical by id
              return a.id.localeCompare(b.id);
            }).map(t => (
              <label htmlFor={t.id} key={t.id}>
                <input
                  className={t.done ? "success" : ""}
                  type="checkbox"
                  id={t.id}
                  name={t.id}
                  checked={t.done}
                  value={t.content}
                  onChange={onCheck} />
                <span className={t.done ? "success" : ""}>{t.content}</span>
              </label>
            ))}
          </div>
        }
      </section>
    </main>
  </>
}

export function toId(value: string): string {
  const slug = value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')        // spaces -> hyphens
    .replace(/[^a-z0-9-_]/g, '') // remove invalid chars
    .replace(/-+/g, '-');        // collapse repeated -
  return `id-${slug}`;
}