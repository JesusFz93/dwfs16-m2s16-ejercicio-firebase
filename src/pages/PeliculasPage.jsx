import { useState, useEffect } from "react";
import { db } from "../firebase/firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { NavLink } from "react-router-dom";

const formInitialState = {
  name: "",
  category: "",
  image: "",
};

const PeliculasPage = () => {
  const [form, setForm] = useState(formInitialState);
  const [movies, setMovies] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await crearPelicula();

    setForm(formInitialState);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const obtenerPeliculas = async () => {
    const resp = await getDocs(collection(db, "peliculas"));
    const peliculas = resp.docs.map((pelicula) => ({
      id: pelicula.id,
      ...pelicula.data(),
    }));
    setMovies(peliculas);
  };

  const crearPelicula = async () => {
    const coleccion = collection(db, "peliculas");
    await addDoc(coleccion, form);
    await obtenerPeliculas();
  };

  const handleDelete = (id) => {
    eliminarPelicula(id);
  };

  const eliminarPelicula = async (id) => {
    const coleccion = doc(db, "peliculas", id);
    await deleteDoc(coleccion);
    await obtenerPeliculas();
  };

  useEffect(() => {
    obtenerPeliculas();
    console.log(import.meta.env.VITE_VAR);
  }, []);

  return (
    <>
      <main className="row pt-5">
        <article className="col">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Nombre
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                autoComplete="off"
                name="name"
                value={form.name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="category" className="form-label">
                Categoria
              </label>
              <input
                type="text"
                className="form-control"
                id="category"
                autoComplete="off"
                name="category"
                value={form.category}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="image" className="form-label">
                Imagen
              </label>
              <input
                type="text"
                className="form-control"
                id="image"
                autoComplete="off"
                name="image"
                value={form.image}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn btn-success">
              Guardar
            </button>
          </form>
        </article>
      </main>
      <section className="row row-cols-1 row-cols-md-3 g-4 pt-5">
        {movies.map((movie) => (
          <article key={movie.id} className="col">
            <div className="card h-100">
              <img
                src={movie.image}
                className="card-img-top"
                alt={movie.name}
              />
              <div className="card-body">
                <h5 className="card-title">{movie.name}</h5>
                <p className="card-text">{movie.category}</p>
                <div
                  className="btn-group d-flex justify-content-between"
                  role="group"
                  aria-label="Basic example"
                >
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleDelete(movie.id)}
                  >
                    Eliminar
                  </button>
                  <NavLink
                    type="button"
                    className="btn btn-info"
                    to={`/peliculas/${movie.id}`}
                  >
                    Ver
                  </NavLink>
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>
    </>
  );
};

export default PeliculasPage;
