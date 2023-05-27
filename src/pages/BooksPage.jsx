import { useEffect, useState } from "react";
import axios from "axios";

const BooksPage = () => {
  const [books, setBooks] = useState([]);

  const getBooks = async () => {
    console.log("obteniendo libros");

    const resp = await axios.get("https://fakerapi.it/api/v1/books");
    console.log(resp.data.data);
    setBooks(resp.data.data);
  };

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <>
      <main className="row">
        <article className="col">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Titulo</th>
                <th scope="col">Autor</th>
                <th scope="col">Descripcion</th>
                <th scope="col">Imagen</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.isbn}>
                  <th scope="row">{book.isbn}</th>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.description}</td>
                  <td>
                    <img
                      src={book.image}
                      className="img-fluid"
                      alt={book.title}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </article>
      </main>
    </>
  );
};

export default BooksPage;
