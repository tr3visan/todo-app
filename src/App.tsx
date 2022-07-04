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

import styles from "./App.module.css";

export interface TaskProps {
  id: string;
  isChecked: boolean;
  content: string;
}

export interface ListOfTasks {
  activeTask: TaskProps | null;
  tasks: TaskProps[];
}

export function App() {
  const [content, setContent] = useState<string>("");
  const [task, setTask] = useState<TaskProps[]>([]);
  const [listOfTasks, setListOfTasks] = useState<ListOfTasks>({
    activeTask: null,
    tasks: [],
  } as ListOfTasks);
  const [qtdTaskCreated, setQtdTaskCreated] = useState(0);
  const [qtdTasksChecked, setQtdTasksCheked] = useState(0);
  const [borderAlert, setBorderAlert] = useState(false);

  function generateId() {
    let idGenerated = [];
    for (let i = 1; i <= 6; i++) {
      const numberGenerated = Math.floor(Math.random() * 100);
      idGenerated.push(numberGenerated.toString(16));
    }
    return idGenerated.join("");
  }

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    setBorderAlert(false);
    event.target.setCustomValidity("");
    setContent(event.target.value);
  }

  function handleNewCommentInvalid(event: InvalidEvent<HTMLInputElement>) {
    setBorderAlert(true);
    event.target.setCustomValidity("Esse campo é obrigatório!");
  }

  function handleCreateTask(event: FormEvent) {
    event.preventDefault();
    const newTask = {
      id: generateId(),
      isChecked: false,
      content: content,
    };
    setTask((prevState) => [...prevState, newTask]);
    setContent("");
  }

  function handleManagerActiveTask() {
    setListOfTasks({ activeTask: null, tasks: task });
  }

  function handleOpenAskModal(index: number) {
    setListOfTasks({ ...listOfTasks, activeTask: listOfTasks.tasks[index] });
  }

  function handleActiveModal(index: number) {
    if (listOfTasks.activeTask === null) {
      return styles.inactive;
    }
    if (listOfTasks.tasks[index] === listOfTasks.activeTask) {
      return styles.active;
    } else {
      return styles.inactive;
    }
  }

  function handleOnDeleteTask(id: string) {
    const tasksWithoutDeleted = listOfTasks.tasks.filter(
      (item) => item.id !== id
    );
    setTask(tasksWithoutDeleted);
  }

  function handleMarkToChecked(item: TaskProps) {
    const tasksWitoutChecked = listOfTasks.tasks.filter(
      (task) => task !== item
    );
    const newTask = {
      ...item,
      isChecked: !item.isChecked,
    };
    setTask([...tasksWitoutChecked, newTask]);
  }

  useEffect(() => {
    handleManagerActiveTask();
  }, [task]);

  useEffect(() => {
    const qtdOfTasks = listOfTasks.tasks.length;
    const qtdOfTasksChecked = listOfTasks.tasks.filter(
      (item) => item.isChecked === true
    );
    setQtdTasksCheked(qtdOfTasksChecked.length);
    setQtdTaskCreated(qtdOfTasks);
  }, [listOfTasks.tasks]);

  const hasTasks = listOfTasks.tasks.length === 0;

  return (
    <main>
      <Header />

      <FormTask
        value={content}
        borderAlert={borderAlert}
        onCreateTask={handleCreateTask}
        onNewTaskChange={handleNewTaskChange}
        onValidateEmpty={handleNewCommentInvalid}
      />

      <Tasks
        tasks={listOfTasks.tasks}
        hasTasks={hasTasks}
        qtdTaskCreated={qtdTaskCreated}
        qtdTasksChecked={qtdTasksChecked}
        onMarkToChecked={handleMarkToChecked}
        onDeleteTask={handleOnDeleteTask}
        onAskOpenModal={handleOpenAskModal}
        onActiveModal={handleActiveModal}
        onManagerAtiveTask={handleManagerActiveTask}
      />
    </main>
  );
}
