import React, { FC, useState } from "react";
import styles from "../Task/task.module.scss";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import TaskButtons from "../ui/button/TaskButton";

interface Props {
  id: string;
  title: string;
  isCompleted: boolean;
  deleteTodo: (id: string) => void;
  toggleTaskCompletion: (id: string) => void;
  updateTaskTitle: (id: string, newTitle: string) => void;
  createdAt: Date | string;
}

const Task: FC<Props> = ({
  id,
  title,
  isCompleted,
  deleteTodo,
  toggleTaskCompletion,
  updateTaskTitle,
  createdAt,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const dateToFormat = new Date(createdAt);
  const formattedDate = !isNaN(dateToFormat.getTime())
    ? new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      }).format(dateToFormat)
    : "Invalid date";

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
  };

  const handleBlur = () => {
    if (newTitle.trim()) {
      updateTaskTitle(id, newTitle);
    } else {
      setNewTitle(title);
    }
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleBlur();
    }
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
            ? `${styles.task} ${styles.completedTask}`
            : `${styles.task}`
        }
      >
        {isEditing ? (
          <input
            type="text"
            value={newTitle}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyPress}
            autoFocus
            className={styles.titleInput}
          />
        ) : (
          <h3>{title}</h3>
        )}
      </div>
      <div className={styles.btnFlex}>
      <TaskButtons
        id={id}
        deleteTodo={deleteTodo}
        toggleTaskCompletion={toggleTaskCompletion}
        handleEditClick={handleEditClick}
      />
      </div>
      <p>Added: {formattedDate}</p>
    </div>
  );
};

export default Task;
