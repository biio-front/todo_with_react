import useInput from 'hooks/useInput';
import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import styled from 'styled-components';

const TodoList = ({ todo, id, onRemove, onEdit }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editText, onChangeEditText] = useInput(todo.content);

  const onEditMode = useCallback((e) => {
    e.preventDefault();
    setIsEdit(true);
  }, []);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      onEdit(id, editText);
      setIsEdit(false);
    },
    [editText, id, onEdit],
  );

  return (
    <s.li>
      <form>
        <input type="checkbox"></input>
        {isEdit ? (
          <input value={editText} onChange={onChangeEditText} autoFocus className="editInput" />
        ) : (
          todo.content
        )}

        <div className="btnGroup">
          {isEdit ? <button onClick={onSubmit}>✔</button> : <button onClick={onEditMode}>✏</button>}
          <button onClick={() => onRemove(id)}>❌</button>
        </div>
      </form>
    </s.li>
  );
};

TodoList.propTypes = {
  todo: PropTypes.shape({
    content: PropTypes.string.isRequired,
    complete: PropTypes.bool.isRequired,
  }).isRequired,
  id: PropTypes.number.isRequired,
  onRemove: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};
export default TodoList;

const s = {};
s.li = styled.li`
  list-style: none;
  position: relative;
  padding: 5px;
  & .editInput {
    width: 200px;
  }
  & .btnGroup {
    display: none;
    padding: 5px;
    & button {
      border: none;
      cursor: pointer;
    }
  }
`;
