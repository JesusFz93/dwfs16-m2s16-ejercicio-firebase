import { useState, useEffect } from "react";
import { db } from "../firebase/firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  //   updateDoc,
  deleteDoc,
} from "firebase/firestore";

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
    // console.log(form);
    await crearPelicula();

    setForm(formInitialState);
  };

  const crearPelicula = async () => {
    const collectionPeliculas = collection(db, "peliculas");
    await addDoc(collectionPeliculas, form);
    await obtenerPeliculas();
  };

  const eliminarPelicula = async (id) => {
    const registro = doc(db, "peliculas", id);
    await deleteDoc(registro);
    await obtenerPeliculas();
  };

  const obtenerPeliculas = async () => {
    const collectionPeliculas = collection(db, "peliculas");
    const resp = await getDocs(collectionPeliculas);
    const peliculas = resp.docs.map((pelicula) => ({
      id: pelicula.id,
      ...pelicula.data(),
    }));

    setMovies(peliculas);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    obtenerPeliculas();
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
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {movies.map((movie) => (
          <div key={movie.id} className="col">
            <div className="card h-100">
              <img
                src={movie.image}
                className="card-img-top"
                alt={movie.name}
              />
              <div className="card-body">
                <h5 className="card-title">{movie.name}</h5>
                <p className="card-text">{movie.category}</p>
                <button
                  type="buttton"
                  className="btn btn-danger"
                  onClick={() => eliminarPelicula(movie.id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default PeliculasPage;
