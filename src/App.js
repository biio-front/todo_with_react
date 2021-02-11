import { useCallback, useState } from 'react';
import styled from 'styled-components';
import TodoForm from 'components/TodoForm';
import TodoList from 'components/TodoList';

//todos = [{id, content,}]
const App = () => {
  const [todos, setTodos] = useState([]);

  const onGetToDo = useCallback(
    (content) => {
      const todo = {
        content,
        complete: false,
      };
      const _todos = [...todos].push(todo);
      setTodos(_todos);
      console.log(todos);
    },
    [todos],
  );

  const onEdit = useCallback((i, content) => {
    const editTodo = {
      content,
      complete: false,
    };
    console.log(editTodo);
    console.log(todos);
    const _todos = [...todos].splice(i, 1, editTodo);
    console.log(_todos);
  }, []);

  const onRemove = useCallback(
    (i) => {
      const _todos = [...todos].filter((todo, j) => j !== i);
      setTodos(_todos);
    },
    [todos],
  );

  return (
    <s.toDoList>
      <h1>To Do List</h1>
      <TodoForm onGetToDo={(content) => onGetToDo(content)} />
      <ul>
        {todos.map((todo, i) => (
          <TodoList
            todo={todo}
            key={i}
            id={i}
            onEdit={(i, content) => onEdit(i, content)}
            onRemove={(i) => onRemove(i)}
          />
        ))}
      </ul>
    </s.toDoList>
  );
};

export default App;

const s = {};
s.toDoList = styled.section`
  width: 300px;
  border: 1px solid #eee;
  border-radius: 2px;
  box-shadow: 2px 2px 2px #eee;
  margin: 15px auto 0;
  padding: 30px 50px;
  & h1 {
    text-align: center;
    margin-bottom: 20px;
  }
  & ul {
    padding: 0;
    & li:hover {
      background-color: #eee;
      & .btnGroup {
        display: inline-block;
      }
    }
  }
  & input {
    padding: 5px;
    border: none;
    border-bottom: 1px solid #eee;
  }
`;
