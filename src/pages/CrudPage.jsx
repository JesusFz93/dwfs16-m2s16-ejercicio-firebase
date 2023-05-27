import React from "react";
import { db } from "../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";

const CrudPage = () => {
  const crearLibro = async () => {
    const libro = {
      name: "Aprender React",
      category: "Programación",
      image: "https://reactjsexample.com/content/images/2019/04/React.jpg",
    };

    const collectionLibros = collection(db, "cuadernos");
    await addDoc(collectionLibros, libro);
  };

  return (
    <>
      <main className="row">
        <article className="col">
          <h1>CRUD</h1>
        </article>
      </main>
      <section className="row">
        <article className="col">
          <button
            type="button"
            className="btn btn-success"
            onClick={crearLibro}
          >
            Agregar
          </button>
          <button type="button" className="btn btn-info">
            Obtener
          </button>
          <button type="button" className="btn btn-warning">
            Actualizar
          </button>
          <button type="button" className="btn btn-danger">
            Eliminar
          </button>
        </article>
      </section>
    </>
  );
};

export default CrudPage;
