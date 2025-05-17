import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { nanoid } from "nanoid";
import { useRef } from "react";

interface Task {
  name: string;
  completed: boolean;
  id: string;
}

interface Tasks {
  tasks: Task[];
}



function App(props : Tasks) {
  const [tasks, setTasks] = useState(props.tasks);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function addTask(name : string) {
    const newTask = { id: `todo-${nanoid()}`, name, completed: false };
    setTasks([...tasks, newTask]);
    setModalIsOpen(false);
  }

  function deleteTask(id : string) {
    const remainingTask = tasks.filter((task) => id !== task.id);
    setTasks(remainingTask);
  }

  function toggleTaskCompleted(id : string) {
    const updatedTasks = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  function onCloseRequested() {
    setModalIsOpen(false);
  }

  const taskList = tasks?.map((task) => (
    <Todo
      id={task.id}
      name={task.name}
      completed={task.completed}
      key={task.id}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
    />
  ));

  return (
    <main>
      <Modal
        headerLabel={"New Task"}
        isOpen={modalIsOpen}
        onCloseRequested={onCloseRequested}
      >
        <AddTaskForm onNewTask={addTask} />
      </Modal>
      <div className="m-4">
        <button
          onClick={() => {
            setModalIsOpen(true);
          }}
          className="active:bg-blue-900 hover:bg-blue-700 bg-blue-600 text-white p-1 rounded-md"
        >
          New task
        </button>
        <section>
          <h1 className="mb-2 text-xl font-bold">To do</h1>
          <ul>{taskList}</ul>
        </section>
      </div>
    </main>
  );
}

interface Todo {
      id: string;
      name: string;
      completed: boolean;
      key: string;
      toggleTaskCompleted: (id: string) => void;
      deleteTask: (id: string) => void;
}

function Todo(props : Todo) {
  return (
    <li className="mb-2">
      <label className="mr-4">
        <input
          type="checkbox"
          id={props.id}
          defaultChecked={props.completed}
          onChange={() => props.toggleTaskCompleted(props.id)}
        />{" "}
        {props.name}
      </label>
      <button
        className="text-gray-500"
        onClick={() => props.deleteTask(props.id)}
      >
        <FontAwesomeIcon icon={faTrashCan} title="trash" />
      </button>
    </li>
  );
}

interface AddTaskForm {
  onNewTask: (name: string) => void;
}

function AddTaskForm({onNewTask} : AddTaskForm) {
  const [textFieldContents, setTextFieldContents] = useState("New task name");

  function handleChange(event : React.ChangeEvent<HTMLInputElement>) {
    setTextFieldContents(event.target.value);
  }

  function handleSumbit(event : React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onNewTask(textFieldContents);
    setTextFieldContents("");
  }
  return (
    <form onSubmit={handleSumbit}>
      <input
        className="p-1 border-1 mb-3 mr-2 h-10 rounded-md"
        onChange={handleChange}
        value={textFieldContents}
      />
      <button
        type="submit"
        className="active:bg-blue-900 hover:bg-blue-700 bg-blue-600 text-white p-1 rounded-md"
      >
        Add task
      </button>
    </form>
  );
}

interface Modal {
  children: React.ReactNode;
  isOpen: boolean;
  onCloseRequested: () => void; 
  headerLabel: string;
}

function Modal(props : Modal) {
  if (!props.isOpen) return null;

  const dialogRef = useRef<HTMLDivElement>(null);
  function handleOverlayClick(event: React.MouseEvent<HTMLDivElement>) {
    if (dialogRef.current && !dialogRef.current.contains(event.target as Node)) {
      props.onCloseRequested();
    }
  }


  return (
    <div
      className="flex m-0 w-screen h-screen bg-sky-800/40 fixed top-0"
      onClick={handleOverlayClick}
    >
      <div
        ref={dialogRef}
        className="p-3 rounded-xl text-center m-auto bg-white"
      >
        <header className="flex items-center justify-between mb-3">
          <b className="text-xl">{props.headerLabel}</b>
          <button onClick={props.onCloseRequested} aria-label="Close">
            X
          </button>
        </header>

        {props.children}
      </div>
    </div>
  );
}

export default App;
