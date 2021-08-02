import React, { useEffect, useState } from "react";
import TodoForm from "./TodoForm";
import { RiCloseCircleLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";
import TodoList from "./TodoList";

function Todo({ todos, completeTodo, onTodoClick, removeTodo, updateTodo}) {
  const [edit, setEdit] = useState({
    id: null,
    value: "",
  });

  const[trigger, setTrigger]=useState('');
  
  const submitUpdate = (value) => {
    updateTodo(edit.id, value);
    setEdit({
      id: null,
      value: "",
    });
  };

  const [todoList, setTodoList] = useState([]);
  useEffect(() => {
    const storedTodo = JSON.parse(localStorage.getItem("todoItems"));
    setTodoList(storedTodo);
    console.log(storedTodo);
  }, [trigger]);

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} setTrigger={setTrigger}/>;
  }
  return (
    <div>
      {todos.map((todo, index) => {
        return (
          <div
            key={index}
            className={todo.isComplete ? "todo-row complete" : "todo-row"}
          >
            <div key={todo.id} onClick={() => completeTodo(todo.id)}>
              {todo.text}
            </div>
            <div ClassName="todo-checkbox">
              <input
                type="checkbox"
                checked={todo.checked}
                onchange={() => onTodoClick(todo.id)}
              />
            </div>

            

            <div className="icons">
              <RiCloseCircleLine
                onClick={() => removeTodo(todo.id)}
                className="delete-icon"
              />
              <TiEdit
                onClick={() => setEdit({ id: todo.id, value: todo.text })}
                className="edit-icon"
              />
            </div>
          </div>
        );
      })}
    </div>
  );

  // <div>
  // 	return todos.map((todo, index) => (
  // 	<div className={todo.isComplete ? 'todo-row complete' :'todo-row'}
  // 	key={index}
  // 	>
  // 		<div key = {todo.id} onClick={() => CompleteTodo(todo.id)}>
  // 			{todo.text}
  // 		</div>
  // 		<div className="icons">
  // 		<RiCloseCirlcleline
  // 		onClick={() => removeTodo(todo.id)}
  // 		className='delete-icon'
  // 		/>
  // 		<TiEdit onClick={() => setEdit({id: todo.id, value: todo.text})}
  // 		className='edit-icon'/>
  // 		</div>
  // ))
  // </div>
}

export default Todo;
