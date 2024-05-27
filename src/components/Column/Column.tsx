import React, { FC } from "react";
import { Itask } from "../../interface/TaskInterface";
import style from "../Column/column.module.scss";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Task from "../Task/Task";
interface props {
  tasks: Itask[];
  deleteTodo: (id: string) => void;
  toggleTaskCompletion: (id: string) => void;
}
const Column: FC<props> = ({ tasks, deleteTodo, toggleTaskCompletion }) => {
  return (
    <div className={style.column}>
      <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
        {tasks?.map((task) => (
          <Task
            key={task.id}
            id={task.id}
            isCompleted={task.isCompleted}
            title={task.title}
            deleteTodo={deleteTodo}
            toggleTaskCompletion={toggleTaskCompletion}
          />
        ))}
      </SortableContext>
    </div>
  );
};

export default Column;
