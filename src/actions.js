import { firebaseApp } from './firebase'
import * as firebase from 'firebase'
import 'firebase/firestore'

const db = firebase.firestore(firebaseApp)

//funcion generica que me permite traer las tareas
//DEVOLVER TODA LA COLECCION
export const getCollection = async(collection) => {
    const result = { statusResponse : false, data: null, error: null } 
    try {
        //cada es una colección de tareas
        const data = await db.collection(collection).get()
        //Mejoro la vista de las tareas en el console.log
        //docs es un array, un elemento dentro de data
        //uno el ID con el nombre de cada tarea
        const arrayData = data.docs.map(doc => ({id: doc.id, ...(doc.data())}))
        //console.log(arrayData)
        //La consulta funciono
        result.statusResponse = true
        result.data = arrayData
    } catch (error) {
        result.error = error
    }   
    return result
}
//AGREGAR ELEMENTOS A LA COLECCION
export const addDocument = async (collection, data) =>{
    const result = { statusResponse : false, data: null, error: null }
    try {
        const response = await db.collection(collection).add(data)
        result.data = {id: response.id}
        result.statusResponse = true
    } catch (error) {
        result.error = error  
    }
    return result
}

//Traer un solo documento (no ha sido usado aún)
export const getDocument = async (collection, id) => {
    const result = { statusResponse : false, data: null, error: null }
    try {
        const response = await db.collection(collection).doc(id).get()
        result.data = {id: response.id, ...response.data()}
        result.statusResponse = true

    } catch (error) {
        result.error = error
    }
}
//actualizar tarea
export const updateDocument = async (collection, id, data) => {
    const result = { statusResponse : false, error: null }
    try {
        await db.collection(collection).doc(id).update(data)
        result.statusResponse = true
    } catch (error) {
        result.error = error
    }
    return result
}
//eliminar tarea
export const deleteDocument = async (collection, id) => {
    const result = { statusResponse : false, error: null }
    try {
        await db.collection(collection).doc(id).delete()
        result.statusResponse = true
    } catch (error) {
        result.error = error
    }
    return result
}