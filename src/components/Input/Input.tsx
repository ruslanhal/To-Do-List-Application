import React, { Dispatch, FC, SetStateAction } from "react";
import style from "../Input/input.module.scss";
interface props {
  inputValue: string;
  SetInputValue: Dispatch<SetStateAction<string>>;
  handleAddTasks: () => void;
}
const Input: FC<props> = ({ inputValue, SetInputValue, handleAddTasks }) => {
  return (
    <div className={style.messageBox}>
      <input
        required
        placeholder="Message..."
        type="text"
        value={inputValue}
        onChange={(e) => SetInputValue(e.target.value)}
        id={style.messageInput}
      />
      <button onClick={() => handleAddTasks()} id={style.sendButton}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 664 663"
        >
          <path
            fill="none"
            d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"
          ></path>
          <path
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="33.67"
            stroke="#6c6c6c"
            d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"
          ></path>
        </svg>
      </button>
    </div>
  );
};

export default Input;
