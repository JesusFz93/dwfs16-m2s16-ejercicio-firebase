import { useState, useEffect } from "react";
import { db } from "../firebase/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";

const formInitialState = {
  name: "",
  category: "",
  image: "",
};

const PeliculaPage = () => {
  const [form, setForm] = useState(formInitialState);
  const [movie, setMovie] = useState([]);
  const { idPelicula } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await actualizarPelicula();
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const actualizarPelicula = async () => {
    const coleccion = doc(db, "peliculas", idPelicula);
    await updateDoc(coleccion, form);
    await obtenerPelicula();
  };

  const obtenerPelicula = async () => {
    const resp = await getDoc(doc(db, "peliculas", idPelicula));
    setMovie(resp.data());
    setForm(resp.data());
  };

  useEffect(() => {
    async function obtenerPelicula() {
      const resp = await getDoc(doc(db, "peliculas", idPelicula));
      setMovie(resp.data());
      setForm(resp.data());
    }
    obtenerPelicula();
  }, [idPelicula]);

  return (
    <>
      <main className="row">
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
            <button type="submit" className="btn btn-warning">
              Actualizar
            </button>
          </form>
        </article>
      </main>
      <section className="row pt-5">
        <article className="col">
          <div className="card mb-3">
            <div className="row g-0">
              <div className="col-md-4">
                <img
                  src={movie.image}
                  className="img-fluid rounded-start"
                  alt={movie.name}
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{movie.name}</h5>
                  <p className="card-text">{movie.category}</p>
                  <p className="card-text">
                    <small className="text-body-secondary">
                      Last updated 3 mins ago
                    </small>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </article>
      </section>
    </>
  );
};

export default PeliculaPage;
