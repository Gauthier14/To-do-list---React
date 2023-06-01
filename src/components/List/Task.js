import './styles.scss';
import PropTypes from 'prop-types';

function Task({
  label, done, id, toggleDoneTask, deleteTask,
}) {
  return (
    <li>
      <label htmlFor="checkbox" className={done ? 'list-item list-item--done' : 'list-item'}>
        <input
          type="checkbox"
          checked={done}
          id={id}
          onChange={() => {
            toggleDoneTask(id);
          }}
        />
        {label}
        <span
          className="delete"
          onClick={() => {
            deleteTask(id);
          }}
        >
          x
        </span>
      </label>
    </li>
  );
}

Task.propTypes = {
  id: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  done: PropTypes.bool.isRequired,
  toggleDoneTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
};

export default Task;
