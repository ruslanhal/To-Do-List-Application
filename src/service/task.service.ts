import { KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { Itask } from "../interface/TaskInterface";



export const useCustomSensors = () => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return sensors;
};

export const getTaskPos = (id: string,tasks:Itask[]) => tasks.findIndex((task) => task.id === id);

// export const deliteTodo = (todos:Itask[],id:string)=>{
//   const deliteTodos = todos.filter(todo=>todo.id !== id)
//  return deliteTodos
// }