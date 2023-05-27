import React from "react";
import { db } from "../firebase/firebase";
import { collection, addDoc, getDocs, getDoc } from "firebase/firestore";

const CrudPage = () => {
  const crearPelicula = async () => {
    const pelicula = {
      name: "Scream",
      category: "Terror",
      image: "https://images2.alphacoders.com/118/thumb-1920-1188043.jpg",
    };

    const collectionPeliculas = collection(db, "peliculas");
    await addDoc(collectionPeliculas, pelicula);
  };

  const obtenerPeliculas = async () => {
    const collectionPeliculas = collection(db, "peliculas");
    const resp = await getDocs(collectionPeliculas);
    const peliculas = resp.docs.map((pelicula) => ({
      id: pelicula.id,
      ...pelicula.data(),
    }));
    console.log(peliculas);
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
            onClick={crearPelicula}
          >
            Agregar
          </button>
          <button
            type="button"
            className="btn btn-info"
            onClick={obtenerPeliculas}
          >
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
