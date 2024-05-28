import React, { FC } from "react";
import styles from "../TaskButtons/taskButtons.module.scss";

interface props {
  id: string;
  deleteTodo: (id: string) => void;
  toggleTaskCompletion: (id: string) => void;
  handleEditClick: () => void;
}

const TaskButtons: FC<props> = ({
  id,
  deleteTodo,
  toggleTaskCompletion,
  handleEditClick,
}) => {
  return (
    <div className={styles.btnFlex}>
      <button className={styles.btn} onClick={() => deleteTodo(id)}>
        Delete
      </button>
      <button onClick={() => toggleTaskCompletion(id)} className={styles.btn}>
        Complete
      </button>
      <button onClick={handleEditClick} className={styles.btn}>
        Edit
      </button>
    </div>
  );
};

export default TaskButtons;
