import React from "react";

type TaskId = string;
type TaskStatus = "complete" | "aborted" | null;
type Task = {
  id: TaskId;
  title: string;
  status: TaskStatus;
  imageUri?: string;
};

let taskList: Array<Task> = [
  {
    id: "1",
    title: "Build app",
    status: null,
    imageUri: "https://aven.sfo2.digitaloceanspaces.com/TaskReactor1.png",
  },
  {
    id: "2",
    title: "Test app",
    status: null,
    imageUri: "https://aven.sfo2.digitaloceanspaces.com/TaskReactor2.jpg",
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

export function useTask(taskId: TaskId): Task | undefined {
  return useTaskList().find((t) => t.id === taskId);
}
export function setTaskStatus(taskId: TaskId, status: TaskStatus): void {
  updateTaskList(
    taskList.map((task) => {
      if (task.id !== taskId) {
        return task;
      }
      return { ...task, status };
    })
  );
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
