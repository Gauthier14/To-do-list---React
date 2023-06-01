import './styles.scss';

function Input({setNewTaskLabel, newTaskLabel, addTask }) {
  return (
    <form
      className="form"
      onSubmit={(event) => {
        // on ne veut pas recharger la page donc on annule le comportement par defaut du submit
        event.preventDefault();
        // on appelle la méthode addTask qui va ajouter la tache dans le state de App
        addTask();
      }}
    >
      <input
        type="text"
        className="form-item"
        placeholder="Ajouter une tâche"
        value={newTaskLabel} // controle en lecture depuis le state de App
        onChange={(e) => { // controle en ecriture du state de App
          setNewTaskLabel(e.target.value);
        }}
      />
    </form>
  );
}

export default Input;
