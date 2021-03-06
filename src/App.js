import React, { useState, useEffect } from 'react';
import './App.css';
import Form from './Components/Form';
import TodoList from './Components/TodoList'

function App() {

  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);

  useEffect(() => {
    getLocal();
  }, []);

  useEffect(() => {
    filterHandler();
    saveToLocal();
  }, [todos, status])

  const filterHandler = () => {
    switch (status) {
      case 'completed':
        setFilteredTodos(todos.filter(todo => todo.completed === true));
        break;
      case 'uncompleted':
        setFilteredTodos(todos.filter(todo => todo.completed === false));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  }
  const saveToLocal = () => {
    localStorage.setItem('todos', JSON.stringify(todos))

  }
  const getLocal = () => {
    if (localStorage.getItem('todos') === null) {
      localStorage.setItem('todos', JSON.stringify([]));
    } else {
      let todoLocal = JSON.parse(localStorage.getItem('todos'));
      setTodos(todoLocal);
    }
  }

  return (
    <div className="App">
      <header>
        <h1>MBA's TO-DO LIST</h1>
      </header>
      <Form todos={todos} setTodos={setTodos} inputText={inputText} setStatus={setStatus} setInputText={setInputText} />
      <TodoList filteredTodos={filteredTodos} setTodos={setTodos} todos={todos} />
    </div>
  );
}

export default App;
