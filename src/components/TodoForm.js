import { useCallback } from 'react';
import PropTypes from 'prop-types';
import useInput from 'hooks/useInput';
import styled from 'styled-components';

const TodoForm = ({ onGetToDo }) => {
  const [text, onChangeText, setText] = useInput('');

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      onGetToDo(text);
      setText('');
    },
    [text, onGetToDo, setText],
  );

  return (
    <s.form onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="write your to do list"
        value={text}
        required
        onChange={onChangeText}
        autoFocus
      />
      <button onSubmit={onSubmit}>Add ToDo</button>
    </s.form>
  );
};

TodoForm.propTypes = {
  onGetToDo: PropTypes.func.isRequired,
};
export default TodoForm;

const s = {};
s.form = styled.form`
  & input {
    width: 205px;
  }
  & button {
    padding: 5px 10px;
    border: none;
    border-radius: 20px;
  }
`;
