/* eslint-disable max-len */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import Counter from '../Counter/counter';
import Input from '../Input/input';
import List from '../List/list';
import './styles.scss';
import tasks from '../../data/tasks';

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      tasksList: tasks,
      newTaskLabel: '',
    };
    this.setNewTaskLabel = this.setNewTaskLabel.bind(this);
    this.addTask = this.addTask.bind(this);
    this.toggleDoneTask = this.toggleDoneTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
  }

  setNewTaskLabel(newValue) {
    this.setState({
      newTaskLabel: newValue,
    });
  }

  generateNewId() {
    // on recupere la liste des tasks dans le state
    const { tasksList } = this.state;

    // si le tableau est vide notre math.max ne trouvera pas de max donc on renvoie 1
    if (tasksList.length === 0) {
      return 1;
    }

    // // on transforme notre tableau d'objets en tableau d'id
    const idList = tasksList.map((task) => task.id);

    // pour trouver parmis ces id le plus grand avec Math.max
    // eslint-disable-next-line max-len
    // avec le spread operator on deverse le contenu de notre tableau d'id dans les paramètres de max()
    const maxId = Math.max(...idList);

    return maxId + 1;
  }

  toggleDoneTask(idTaskToChange) {
    const { tasksList } = this.state;

    const taskListCopy = tasksList.map((task) => {
      if (idTaskToChange === task.id) {
        return {
          ...task,
          done: !task.done,
        };
      }
      return task;
    });

    this.setState({
      tasksList: taskListCopy,
    });
  }

  deleteTask(idTaskToDelete) {
    const { tasksList } = this.state;

    const taskListCopy = tasksList.map((task) => {
      if (idTaskToDelete === task.id) {
        return false;
      }
      return task;
    });

    this.setState({
      tasksList: taskListCopy,
    });
  }

  addTask() {
  /* On va recuperer les infos dans le state
    mais attention tasksList pointe vers le même tableau que this.state.tasksList
    donc on ne modifiera pas ce tableau sinon on modifie le state
    et il ne faut jamais modifier directement le state !
    */
    const { tasksList, newTaskLabel } = this.state;

    // on prepare la nouvelle tache
    const newTask = {
      done: false,
      id: this.generateNewId(),
      label: newTaskLabel,
    };

    /* Pour respecter le principe d'immutabilité, on créé une copie du state et
    avec le spread operator on vient deverser le contenu de taskList dans le nouveau tableau
    */
    const taskListCopy = [...tasksList];

    // on rajoute la nouvelle tache dans cette copie
    taskListCopy.push(newTask);

    /* on appelle setState pour declancher un nouveau rendu
    en donnant comme future valeur pour tasksList la copie : ce sera bien un tableau différent
    du coup shouldComponentUpdate verra bien que le state à changé
    */
    this.setState({
      tasksList: taskListCopy,
      newTaskLabel: '', // on en profite pour vider la value du input
    });
  }

  render() {
    const { tasksList, newTaskLabel } = this.state;

    const doneTasksList = tasksList.filter((task) => task.done === true);
    const notDoneTasksList = tasksList.filter((task) => task.done === false);
    // on créé un tableau qui contient les taches done puis les not done
    const sortedTasks = [...notDoneTasksList, ...doneTasksList];

    return (
      <div className="app">
        <Input
          newTaskLabel={newTaskLabel}
          setNewTaskLabel={this.setNewTaskLabel}
          addTask={this.addTask}
        />
        <Counter nbNotDoneTasks={notDoneTasksList.length} />
        <List tasksList={sortedTasks} toggleDoneTask={this.toggleDoneTask} deleteTask={this.deleteTask} />
      </div>
    );
  }
}

export default App;
