/* eslint-disable max-len */
import './styles.scss';
import PropTypes from 'prop-types';
import Task from './Task';

function List({ tasksList, toggleDoneTask, deleteTask }) {
  return (
    <ul className="list">
      {
        tasksList.map((item) => <Task key={item.id} {...item} toggleDoneTask={toggleDoneTask} deleteTask={deleteTask} />)
      }
    </ul>
  );
}

List.propTypes = {
  tasksList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
  })).isRequired,
  toggleDoneTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
};

export default List;
