//hock
import { isEmpty } from "lodash";
import React, { useState } from "react";
import shortid from "shortid";

function App() {
  //creamos un estado que guarda el nombre de la new task
  const [task, setTask] = useState("");
  //creamos un estado para guardas todas las tareas 
  const [tasks, setTasks] = useState([]);
  //validar que el usuario agrego algo en la tarea
  const addTask = (e) => {
    //Evitar que se recargue la pagina por el submit
    e.preventDefault();
    //libreria lodash -> Si la tarea es vacia
    if (isEmpty(task)) {
      console.log("Task empty");
      return;
    }

    const newTask = {
      //usamos shortid
      id: shortid.generate(),
      name: task,
    };
    // A la coleccion de tareas agregame la nueva tarea
    // Spread Operator
    setTasks([...tasks, newTask]);

    //Dejamos el input listo para que pueda agregar otra tarea
    setTask("");
  };
  return (
    <div className="container mt-5">
      <h1>Tareas</h1>
      <hr />
      <div className="row">
        <div className="col -8">
          <h4 className="text-center">Lista de Tareas</h4>
          <ul className="list-group">
            {
              tasks.map((task) => (
                <li className="list-group-item" key={task.id} >
                <span className="lead">{task.name}</span>
                <button className="btn btn-danger btn-sm float-right mx-2">
                  Eliminar
                </button>
                <button className="btn btn-warning btn-sm float-right">
                  Editar
                </button>
              </li>
              ))
            }
          </ul>
        </div>
        <div className="col -4">
          <h4 className="text-center">Formulario</h4>
          <form onSubmit={addTask}>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Ingrese la tarea..."
              onChange={(text) => setTask(text.target.value)}
              value={task}
            />

            <button className="btn btn-dark btn-block" type="submit">
              Agregar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
