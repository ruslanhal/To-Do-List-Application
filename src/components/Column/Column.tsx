import React, { FC } from "react";
import { Itask } from "../../interface/task.interface";
import style from "../Column/column.module.scss";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Task from "../Task/Task";

interface Props {
  tasks: Itask[];
  deleteTodo: (id: string) => void;
  toggleTaskCompletion: (id: string) => void;
  updateTaskTitle: (id: string, newTitle: string) => void;
}

const Column: FC<Props> = ({
  tasks,
  deleteTodo,
  toggleTaskCompletion,
  updateTaskTitle,
}) => {
  return (
    <div className={style.column}>
      <SortableContext
        items={tasks.map((task) => task.id)}
        strategy={verticalListSortingStrategy}
      >
        {tasks?.map((task) => (
          <Task
            key={task.id}
            id={task.id}
            isCompleted={task.isCompleted}
            title={task.title}
            deleteTodo={deleteTodo}
            toggleTaskCompletion={toggleTaskCompletion}
            updateTaskTitle={updateTaskTitle}
            createdAt={task.createdAt}
          />
        ))}
      </SortableContext>
    </div>
  );
};

export default Column;
