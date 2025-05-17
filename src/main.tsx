import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const DATA = [
  {name: "Eat", completed: false, id: "todo-0"},
  {name: "Sleep", completed: false, id: "todo-1"},
  {name: "Repeat", completed: false, id: "todo-2"},
]

const root = document.getElementById('root');

if (root) {
  createRoot(root).render(
    <StrictMode>
      <App tasks={DATA}/>
    </StrictMode>,
  )
}

