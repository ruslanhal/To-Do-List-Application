import React, { FC } from "react";

import styles from "../Task/task.module.scss";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface props {
  id: string;
  title: string;
  isCompleted: boolean;
  deleteTodo: (id: string) => void;
  toggleTaskCompletion: (id: string) => void;
}

const Task: FC<props> = ({
  id,
  title,
  isCompleted,
  deleteTodo,
  toggleTaskCompletion,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div className={styles.taskFlex}>
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={style}
        className={
          isCompleted
            ? `${styles.task} ${styles.completedTask}  `
            : `${styles.task}`
        }
      >
        <div>{title}</div>
      </div>
      <div className={styles.btnFlex}>
        <button className={styles.btn} onClick={() => deleteTodo(id)}>
          Delite
        </button>
        <button onClick={() => toggleTaskCompletion(id)} className={styles.btn}>
          Complete
        </button>
      </div>
    </div>
  );
};

export default Task;
