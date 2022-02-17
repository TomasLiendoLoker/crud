//hock
import { isEmpty, size } from "lodash";
import React, { useState } from "react";
import shortid from "shortid";

function App() {
  //creamos un estado que guarda el nombre de la new task
  const [task, setTask] = useState("");
  //creamos un estado para guardas todas las tareas
  const [tasks, setTasks] = useState([]);
  //creamos un estado para editar la tarea
  //Se arranca en falso porque al inicio no arrancamos en estado modo -> X defecto en creacion
   const [editMode, setEditMode] = useState(false)
   //Guardar en un estado la identificacion de la tarea 
   const [id, setId] = useState("")
  //Manejo de errores
  const [error, setError] = useState(null)

  const validForm = () =>{
    let isValid = true;
    setError(null)
    if (isEmpty(task)) {
      setError("Tenes que ingresar una tarea")
      isValid = false
    }
    return isValid
  }

  //validar que el usuario agrego algo en la tarea
  const addTask = (e) => {
    //Evitar que se recargue la pagina por el submit
    e.preventDefault();
    //libreria lodash -> Si la tarea es vacia
    if (!validForm()){
        return 
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
  const deleteTask = (id) => {
    //Dame todas las tareas menos la que quiero filtrar -> La que borro el usuario
    const filteredTask = tasks.filter((task) => task.id !== id);
    setTasks(filteredTask);
  };

  const editTask = (theTask) => {
    //Seteo el nombre de la tarea a modificar
    setTask(theTask.name)
    //cambio el modo a edicion de tarea
    setEditMode(true)
    setId(theTask.id)

  }

  //guardar la tarea modificada
  const saveTask = (e) => {
    //Evitar que se recargue la pagina por el submit
    e.preventDefault();
    //libreria lodash -> Si la tarea es vacia
    if (!validForm()){
      return 
  }
    // A la coleccion de tareas agregame la nueva tarea
    // Spread Operator
    //setTasks([...tasks, newTask]);

    //Limpiando
    const editedTasks = tasks.map(item => item.id === id ? {id, name: task} : item)
    setTasks(editedTasks)
    setEditMode(false);
    setTask("");
    setId("");
  };

  return (
    <div className="container mt-5">
      <h1>Tareas</h1>
      <hr />
      <div className="row">
        <div className="col -8">
          <h4 className="text-center">Lista de Tareas</h4>

          {
            //size de lodash
            //operador unitario -> Condicional de una sola linea 
            size(tasks) == 0 ? (
              <li className="list-group-item">Aún No Hay Tareas Programadas</li>
            ) : (
              <ul className="list-group">
              {tasks.map((task) => (
                <li className="list-group-item" key={task.id}>
                  <span className="lead">{task.name}</span>
                  <button
                    className="btn btn-danger btn-sm float-right mx-2"
                    onClick={() => deleteTask(task.id)}
                  >
                    Eliminar
                  </button>
                  <button className="btn btn-warning btn-sm float-right"
                  onClick={() => editTask(task)}>
                    Editar
                  </button>
                </li>
              ))}
            </ul>
            )

           
          }

        </div>
        <div className="col -4">
          <h4 className="text-center">{editMode ? "Modificar Tarea":"Agregar Tarea"}</h4>
          <form onSubmit={editMode ? saveTask: addTask}>
          {
              error && <span className="text-danger">{error}</span>
            }
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Ingrese la tarea..."
              onChange={(text) => setTask(text.target.value)}
              value={task}
            />

            <button className={editMode ?"btn btn-warning btn-block" :"btn btn-dark btn-block"} type="submit">
              {editMode ? "Guardar": "Agregar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
