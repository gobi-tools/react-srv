// src/pages/demo/react-srv-hydrate-Todo.jsx
import React from "https://esm.sh/react@19.2.0";
import { hydrateRoot } from "https://esm.sh/react-dom@19.2.0/client";

// src/pages/demo/Todo.tsx
import { useState } from "https://esm.sh/react@19.2.0";
import { Fragment, jsx, jsxs } from "https://esm.sh/react@19.2.0/jsx-runtime";
function Todo() {
  const [content, setContent] = useState("");
  const [todos, setTodos] = useState([]);
  const updateContent = (e) => setContent(e.target.value);
  const addTodo = (e) => {
    e.preventDefault();
    const id = toId(content);
    const exists = todos.find((t) => t.id === id);
    if (exists) {
      setContent("");
      return;
    }
    const newTodo = { id, content, done: false };
    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
    setContent("");
  };
  const onCheck = (e) => {
    const newTodos = todos.map((t) => {
      if (t.id === e.target.id) {
        return { ...t, done: !t.done };
      }
      return t;
    });
    setTodos(newTodos);
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("form", { onSubmit: addTodo, children: /* @__PURE__ */ jsxs("div", { className: "group", children: [
      /* @__PURE__ */ jsx("input", { type: "text", id: "new-todo", placeholder: "Add todo ...", value: content, onChange: updateContent }),
      /* @__PURE__ */ jsx("input", { disabled: content === "", type: "submit", value: "Add" })
    ] }) }),
    todos.length === 0 && /* @__PURE__ */ jsxs("blockquote", { className: "secondary", children: [
      /* @__PURE__ */ jsx("h4", { children: "Add todos" }),
      /* @__PURE__ */ jsx("p", { children: "Make sure to add todos to keep on track of your life" })
    ] }),
    todos.length > 0 && /* @__PURE__ */ jsxs("div", { className: "card", children: [
      /* @__PURE__ */ jsx("h4", { children: "Today's list" }),
      todos.sort((a, b) => {
        if (a.done !== b.done) {
          return Number(a.done) - Number(b.done);
        }
        return a.id.localeCompare(b.id);
      }).map((t) => /* @__PURE__ */ jsxs("label", { htmlFor: t.id, children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            className: t.done ? "success" : "",
            type: "checkbox",
            id: t.id,
            name: t.id,
            checked: t.done,
            value: t.content,
            onChange: onCheck
          }
        ),
        /* @__PURE__ */ jsx("span", { className: t.done ? "success" : "", children: t.content })
      ] }, t.id))
    ] })
  ] });
}
function toId(value) {
  const slug = value.trim().toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-_]/g, "").replace(/-+/g, "-");
  return `id-${slug}`;
}

// src/pages/demo/react-srv-hydrate-Todo.jsx
var root = document.getElementById("root");
if (!root) {
  throw new Error("react-srv: Could not find hydration root.");
}
if (!globalThis.__REACT_SRV_HYDRATED__) {
  globalThis.__REACT_SRV_HYDRATED__ = true;
  hydrateRoot(
    root,
    React.createElement(Todo, globalThis.__INITIAL_PROPS__ || {})
  );
}
