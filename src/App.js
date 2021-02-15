import { useCallback, useState } from 'react';
import styled from 'styled-components';
import TodoForm from 'components/TodoForm';
import TodoList from 'components/TodoList';
import { StyleButton } from 'style/button';

const App = () => {
  const [id, setId] = useState(1);
  const [todos, setTodos] = useState([]);
  const [selectAll, setSelectAll] = useState(true);
  const [selectComplete, setSelectComplete] = useState(false);

  const onCreate = useCallback(
    (content) => {
      const todo = {
        id,
        content,
        complete: false,
      };
      const _todos = [...todos];
      _todos.push(todo);
      setTodos(_todos);
      setId((prev) => prev + 1);
    },
    [todos, id],
  );

  const onEdit = useCallback(
    (id, content) => {
      const editTodo = {
        id,
        content,
        complete: false,
      };
      const _todos = [...todos];
      const i = todos.findIndex((todo) => todo.id === id);
      _todos.splice(i, 1, editTodo);
      setTodos(_todos);
    },
    [todos],
  );

  const onComplete = useCallback(
    (id, isCompleted) => {
      const i = todos.findIndex((todo) => todo.id === id);
      const _todos = [...todos];
      _todos[i] = { ..._todos[i], complete: isCompleted };
      setTodos(_todos);
    },
    [todos],
  );

  const onRemove = useCallback(
    (i) => {
      const _todos = [...todos].filter((todo) => todo.id !== i);
      setTodos(_todos);
    },
    [todos],
  );

  const onSelectAll = useCallback(() => setSelectAll(true), []);
  const onSelectIsComplete = useCallback(() => {
    setSelectAll(false);
    setSelectComplete((prev) => !prev);
  }, []);
  const onAllRemove = useCallback(() => setTodos([]), []);

  return (
    <s.toDoList>
      <h1>To Do List</h1>
      <TodoForm onCreate={(content) => onCreate(content)} />
      <ul>
        {(selectAll
          ? todos
          : todos.filter((todo) => (selectComplete ? todo.complete : !todo.complete))
        ).map((todo, i) => (
          <TodoList
            todo={todo}
            key={i}
            onEdit={(i, content) => onEdit(i, content)}
            onRemove={(i) => onRemove(i)}
            onComplete={(i, isCompleted) => onComplete(i, isCompleted)}
          />
        ))}
      </ul>
      <div>
        <StyleButton onClick={onSelectAll}>Show All</StyleButton>
        <StyleButton onClick={onSelectIsComplete}>
          {selectComplete ? 'Show Uncompleted' : 'Show Completed'}
        </StyleButton>
        <StyleButton onClick={onAllRemove}>Delete All</StyleButton>
      </div>
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
