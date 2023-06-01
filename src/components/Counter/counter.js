import './styles.scss';
import PropTypes from 'prop-types';
import React from 'react';

function Counter({ nbNotDoneTasks }) {
  return (
    <p className="counter">{nbNotDoneTasks} tâches en cours</p>
  );
}

Counter.propTypes = {
  nbNotDoneTasks: PropTypes.number,
};

Counter.defaultProps = {
  nbNotDoneTasks: 0,
};

export default React.memo(Counter);
