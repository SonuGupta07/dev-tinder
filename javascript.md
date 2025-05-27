# ✅ Execution Context in JavaScript

## 📘 What is Execution Context?

An **Execution Context** is the environment where JavaScript code is **evaluated and executed**.

---

## 🧠 Types of Execution Context

| Type                      | Description                                |
|---------------------------|--------------------------------------------|
| Global Execution Context  | Created when the JS file runs.             |
| Function Execution Context| Created every time a function is invoked.  |
| Eval Execution Context    | Created by eval() (rarely used).           |

---

## ⚙️ Execution Context Phases

### 1. **Memory Creation Phase (Hoisting)**
- Variables declared using `var` are set to `undefined`
- Functions are fully hoisted

### 2. **Execution Phase**
- Variables are assigned actual values
- Code runs line-by-line

---

## 📦 Components of Execution Context

- **Variable Environment** (local memory)
- **Scope Chain**
- **`this` keyword**
