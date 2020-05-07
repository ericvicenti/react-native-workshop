import React from "react";

type Task = {
  id: string;
  title: string;
  isComplete: boolean | null;
  imageUri?: string;
};

let taskList: Array<Task> = [
  {
    id: "1",
    title: "Build app",
    isComplete: false,
    imageUri:
      "https://vignette.wikia.nocookie.net/simpsons/images/0/09/800px-Springfield_Nuclear_Power_Plant.png/revision/latest/top-crop/width/360/height/360?cb=20170101231010",
  },
  {
    id: "2",
    title: "Test app",
    isComplete: false,
    imageUri:
      "https://www.power-technology.com/wp-content/uploads/sites/7/2020/04/air-air-pollution-chimney-clouds-459728.jpg",
  },
];
let idCount = 2;
let listUpdateHandlers: Set<(newList: Array<Task>) => void> = new Set();

function updateTaskList(newList: Array<Task>) {
  taskList = newList;
  listUpdateHandlers.forEach((handler) => handler(newList));
}

export function deleteTask(taskId: string) {
  updateTaskList(taskList.filter((t) => t.id !== taskId));
}

export function useTaskList(): Array<Task> {
  const [internalList, setInternalList] = React.useState(taskList);
  React.useEffect(() => {
    function listUpdateHandler(newList: Array<Task>) {
      setInternalList(newList);
    }
    listUpdateHandlers.add(listUpdateHandler);
    return () => {
      listUpdateHandlers.delete(listUpdateHandler);
    };
  }, []);
  return internalList;
}

export function useTask(taskId: string): Task | undefined {
  return useTaskList().find((t) => t.id === taskId);
}
export function createTask(title: string) {
  idCount += 1;
  const newTask = {
    id: String(idCount),
    title,
    isComplete: false,
  };
  updateTaskList([...taskList, newTask]);
}

function getTitle(taskId: string, taskList: Array<Task>): string | undefined {
  const task = taskList.find((t) => t.id === taskId);
  return task?.title;
}

export function useTaskTitle(taskId: string): string | undefined {
  const initTitle = getTitle(taskId, taskList);
  const lastTitle = React.useRef(initTitle);
  const [title, setTitle] = React.useState(initTitle);
  React.useEffect(() => {
    function listUpdateHandler(newList: Array<Task>) {
      const newTitle = getTitle(taskId, newList);
      if (lastTitle.current !== newTitle) {
        setTitle(newTitle);
        lastTitle.current = newTitle;
      }
    }
    listUpdateHandlers.add(listUpdateHandler);
    return () => {
      listUpdateHandlers.delete(listUpdateHandler);
    };
  }, []);
  return title;
}
