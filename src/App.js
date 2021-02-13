import { useCallback, useState } from 'react';
import styled from 'styled-components';
import TodoForm from 'components/TodoForm';
import TodoList from 'components/TodoList';

const App = () => {
  const [todos, setTodos] = useState([]);

  const onCreate = useCallback(
    (content) => {
      const todo = {
        content,
        complete: false,
      };
      const _todos = [...todos];
      _todos.push(todo);
      setTodos(_todos);
    },
    [todos],
  );

  const onEdit = useCallback(
    (i, content) => {
      const editTodo = {
        content,
        complete: false,
      };
      const _todos = [...todos];
      _todos.splice(i, 1, editTodo);
      setTodos(_todos);
    },
    [todos],
  );

  const onComplete = useCallback(
    (i, isCompleted) => {
      const _todos = [...todos];
      _todos[i] = { ..._todos[i], complete: isCompleted };
      setTodos(_todos);
    },
    [todos],
  );

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
      <TodoForm onCreate={(content) => onCreate(content)} />
      <ul>
        {todos.map((todo, i) => (
          <TodoList
            todo={todo}
            key={i}
            id={i}
            onEdit={(i, content) => onEdit(i, content)}
            onRemove={(i) => onRemove(i)}
            onComplete={(i, isCompleted) => onComplete(i, isCompleted)}
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
  margin: 30px auto 0;
  padding: 30px 50px;
  & h1 {
    text-align: center;
    margin-bottom: 20px;
  }
  & ul {
    padding: 0;
  }
`;
