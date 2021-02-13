import { useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import useInput from 'hooks/useInput';
import { StyleWirteInput } from 'style/input';
import { StyleButton } from 'style/button';

const TodoForm = ({ onCreate }) => {
  const [text, onChangeText, setText] = useInput('');

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      onCreate(text);
      setText('');
    },
    [text, onCreate, setText],
  );

  return (
    <s.form onSubmit={onSubmit}>
      <StyleWirteInput
        type="text"
        placeholder="write your to do list"
        value={text}
        required
        onChange={onChangeText}
        autoFocus
      />
      <StyleButton onSubmit={onSubmit}>Add ToDo</StyleButton>
    </s.form>
  );
};

TodoForm.propTypes = {
  onCreate: PropTypes.func.isRequired,
};
export default TodoForm;

const s = {};
s.form = styled.form`
  margin-left: 5px;
`;
