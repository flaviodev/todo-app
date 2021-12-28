import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Todo } from './components/Todo';

function App() {
  return (
    <Todo  task='My task' done={true}/>
  );
}

export default App;
