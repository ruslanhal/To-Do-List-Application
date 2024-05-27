import React, { useState } from "react";
import style from "./App.module.scss";
import { DndContext, closestCorners } from "@dnd-kit/core";
import { Itask } from "./interface/TaskInterface";
import Column from "./components/Column/Column";
import { arrayMove } from "@dnd-kit/sortable";
import { getTaskPos, useCustomSensors } from "./service/task.service";
import Input from "./components/Input/Input";
import { v4 as uuidv4 } from "uuid";
import TaskOption from "./components/TaskOption/TaskOption";
function App() {
  const [tasks, setTasks] = useState<Itask[]>([]);
  const [inputValue, SetInputValue] = React.useState<string>("");
  const handleAddTasks = () => {
    const todo = {
      id: uuidv4(),
      title: inputValue,
      isCompleted: false,
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
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );

    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
    );
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

  React.useEffect(() => {
    const jsonBaseData = localStorage.getItem("todos");
    if (jsonBaseData) {
      const localTodos = JSON.parse(jsonBaseData);
      setTasks([...tasks, ...localTodos]);
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
          <DndContext
            sensors={sensors}
            onDragEnd={handleDragEnd}
            collisionDetection={closestCorners}
          >
            <Column
              tasks={tasks}
              deleteTodo={handleDeleteTodo}
              toggleTaskCompletion={toggleTaskCompletion}
            />
          </DndContext>
        </section>
        <section>
          <TaskOption />
        </section>
      </div>
    </div>
  );
}

export default App;
