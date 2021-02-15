import useInput from 'hooks/useInput';
import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import { StyleWirteInput } from 'style/input';
import styled from 'styled-components';

const TodoList = ({ todo: { id, complete, content }, onRemove, onEdit, onComplete }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editText, onChangeEditText] = useInput(content);

  const onCheck = useCallback(
    (e) => {
      const { checked } = e.target;
      onComplete(id, checked);
    },
    [id, onComplete],
  );

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

  const onClickRemove = useCallback(
    (e) => {
      e.preventDefault();
      onRemove(id);
    },
    [id, onRemove],
  );

  return (
    <s.li>
      <form className={complete ? 'checked' : null}>
        <input type="checkbox" onChange={onCheck} checked={complete} />
        {isEdit ? (
          <StyleWirteInput value={editText} onChange={onChangeEditText} autoFocus />
        ) : (
          content
        )}
        <div className="btnGroup">
          {isEdit ? <button onClick={onSubmit}>✔</button> : <button onClick={onEditMode}>✏</button>}
          <button onClick={onClickRemove}>❌</button>
        </div>
      </form>
    </s.li>
  );
};

TodoList.propTypes = {
  todo: PropTypes.shape({
    content: PropTypes.string.isRequired,
    complete: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  onRemove: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onComplete: PropTypes.func.isRequired,
};
export default TodoList;

const s = {};
s.li = styled.li`
  & :hover {
    background-color: #eee;
    & .btnGroup {
      display: inline-block;
    }
  }
  list-style: none;
  padding: 5px;
  & .checked {
    color: #ccc;
    text-decoration: line-through;
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
