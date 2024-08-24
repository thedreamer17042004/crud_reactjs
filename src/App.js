import logo from './logo.svg';
import './App.css';
import { Typography } from 'antd'
import {Divider} from 'antd'
import ToDoList from './components/TodoList/TodoList';
import Filter from './components/Filters/Filter';
import Title from 'antd/lib/typography/Title';

function App() {
  return (
    <div className="App">
      
      <Title style={{ textAlign: 'center' }}>TODO APP</Title>
      <Filter />
      <Divider />

      <ToDoList/>
    </div>
  );
}

export default App;
