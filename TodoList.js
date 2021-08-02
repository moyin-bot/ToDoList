import React, {useEffect, useState} from 'react'
import TodoForm from './TodoForm'
import Todo from './Todo'

const TODO_STORAGE_KEY = 'todo';



function TodoList(){
	const [todos, setTodos] = useState(() => {
		const savedContent = localStorage.getItem(TODO_STORAGE_KEY);
		const parsedContent = savedContent!=null ?  JSON.parse(savedContent) : [];
		return parsedContent;
	});

	const addTodo = todo => {
		if(!todo.text || /^\s*$/.test(todo.text)) {
			return
		}

		const newTodos = [todo, ...todos]

		setTodos(newTodos);
		
	};



	const updateTodo = (todoId, newValue) => {
		if(!newValue.text || /^\s*$/.test(newValue.text)) {
			return;
		}
		// setTodos(prev => prev.map(item => item.id == todoId ? newValue : item);
		setTodos((prev) => prev.map((item) => item.id === todoId ? newValue : item));

	}

	const removeTodo = id => {
		const removeArr = [...todos].filter(todo => todo.id !==id)

		setTodos(removeArr)
	}

	const completeTodo = id => {
		let updateTodos = todos.map(todo => {
			if (todo.id == id) {
				todo.isComplete = !todo.isComplete
			}
			return todo;
		})
		setTodos(updateTodos);
	}
	

	useEffect(() =>{
		window.localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todos));
	}, [todos])
	


	return( 
		<div>
			<h1> what's the plan for Today?.</h1>
			<TodoForm onSubmit={addTodo} />
			<Todo todos={todos} completeTodo={completeTodo} removeTodo={removeTodo}
			updateTodo={updateTodo}/>

		</div>
	);
}

export default TodoList