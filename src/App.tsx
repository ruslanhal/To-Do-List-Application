import React, { useState, useEffect } from "react";
import style from "./App.module.scss";
import { DndContext, closestCorners } from "@dnd-kit/core";
import { Itask } from "./interface/task.interface";
import Column from "./components/Column/Column";
import { arrayMove } from "@dnd-kit/sortable";
import { getTaskPos, useCustomSensors } from "./service/task.service";
import Input from "./components/Input/Input";
import { v4 as uuidv4 } from "uuid";
import TaskAvailability from "./components/ui/TaskAvailability/TaskAvailability";

function App() {
  const [tasks, setTasks] = useState<Itask[]>([]);
  const [inputValue, SetInputValue] = useState<string>("");

  const handleAddTasks = () => {
    const todo = {
      id: uuidv4(),
      title: inputValue,
      isCompleted: false,
      createdAt: new Date(),
    };
    if (inputValue) {
      const newTodo = [...tasks, todo];
      setTasks([...tasks, todo]);

      localStorage.setItem("todos", JSON.stringify(newTodo));
      SetInputValue("");
    }
  };

  const handleDeleteTodo = (id: string) => {
    const deliteTodos = tasks.filter((task) => task.id !== id);
    setTasks(deliteTodos);
    localStorage.setItem("todos", JSON.stringify(deliteTodos));
  };

  const toggleTaskCompletion = (id: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("todos", JSON.stringify(updatedTasks));
  };

  const updateTaskTitle = (id: string, newTitle: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, title: newTitle } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("todos", JSON.stringify(updatedTasks));
  };

  const sensors = useCustomSensors();

  const handleDragEnd = (event: { active: any; over: any }) => {
    const { active, over } = event;

    if (active.id === over.id) return;

    setTasks((tasks) => {
      const originalPos = getTaskPos(active.id, tasks);
      const newPos = getTaskPos(over.id, tasks);

      return arrayMove(tasks, originalPos, newPos);
    });
  };

  useEffect(() => {
    const jsonBaseData = localStorage.getItem("todos");
    if (jsonBaseData) {
      const localTodos = JSON.parse(jsonBaseData);
      setTasks(localTodos);
    }
  }, []);

  return (
    <div className={style.App}>
      <div className={style.container}>
        <section className={style.todoBlock}>
          <Input
            inputValue={inputValue}
            SetInputValue={SetInputValue}
            handleAddTasks={handleAddTasks}
          />
          {tasks.length > 0 ? (
            <DndContext
              sensors={sensors}
              onDragEnd={handleDragEnd}
              collisionDetection={closestCorners}
            >
              <Column
                tasks={tasks}
                deleteTodo={handleDeleteTodo}
                toggleTaskCompletion={toggleTaskCompletion}
                updateTaskTitle={updateTaskTitle}
              />
            </DndContext>
          ) : (
            <TaskAvailability />
          )}
        </section>
      </div>
    </div>
  );
}

export default App;
