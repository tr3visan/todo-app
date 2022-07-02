import {
  ChangeEvent,
  FormEvent,
  useState,
  useEffect,
  InvalidEvent,
} from "react";
import { Header } from "./components/Header";
import { FormTask } from "./components/FormTask";
import { Tasks } from "./components/Tasks";

export interface TaskProps {
  id: string;
  isChecked: boolean;
  content: string;
}

export function App() {
  const [content, setContent] = useState<string>("");
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [qtdTaskCreated, setQtdTaskCreated] = useState(0);
  const [qtdTasksChecked, setQtdTasksCheked] = useState(0);

  function generateId() {
    let idGenerated = [];
    for (let i = 1; i <= 6; i++) {
      const numberGenerated = Math.floor(Math.random() * 100);
      idGenerated.push(numberGenerated.toString(16));
    }
    return idGenerated.join("");
  }

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity("");
    setContent(event.target.value);
  }

  function handleNewCommentInvalid(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity("Esse campo é obrigatório!");
  }

  function handleCreateTask(event: FormEvent) {
    event.preventDefault();
    const newTask = {
      id: generateId(),
      isChecked: false,
      content: content,
    };
    setTasks((prevState) => [...prevState, newTask]);
    setContent("");
  }

  function handleDeleteTask(id: string) {
    const tasksWithoutDeleted = tasks.filter((item) => item.id !== id);
    setTasks(tasksWithoutDeleted);
  }

  function handleMarkToChecked(item: TaskProps) {
    const tasksWitoutChecked = tasks.filter((task) => task !== item);
    const newTask = {
      ...item,
      isChecked: !item.isChecked,
    };
    setTasks([...tasksWitoutChecked, newTask]);
  }

  useEffect(() => {
    const qtdOfTasks = tasks.length;
    const qtdOfTasksChecked = tasks.filter((item) => item.isChecked === true);
    setQtdTasksCheked(qtdOfTasksChecked.length);
    setQtdTaskCreated(qtdOfTasks);
  }, [tasks]);

  const hasTasks = tasks.length === 0;

  return (
    <main>
      <Header />

      <FormTask
        value={content}
        onCreateTask={handleCreateTask}
        onNewTaskChange={handleNewTaskChange}
        onValidateEmpty={handleNewCommentInvalid}
      />

      <Tasks
        hasTasks={hasTasks}
        qtdTaskCreated={qtdTaskCreated}
        qtdTasksChecked={qtdTasksChecked}
        tasks={tasks}
        onMarkToChecked={handleMarkToChecked}
        onDeleteTask={handleDeleteTask}
      />
    </main>
  );
}
