import { useState, useEffect } from "react";
import axios from "axios";

const PostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [calculo, setCalculo] = useState(0);

  const obtenerPosts = async () => {
    const resp = await axios.get("https://jsonplaceholder.typicode.com/posts");
    console.log(resp.data);
    setPosts(resp.data);
  };

  const handleCalcular = () => {
    setCalculo(calculo + 1);
  };

  useEffect(() => {
    obtenerPosts();
  }, []);

  return (
    <>
      <header className="row">
        <article className="col">
          <h1>Posts</h1>
        </article>
      </header>
      <main className="row">
        <article className="col">
          <button
            type="button"
            className="btn btn-success"
            onClick={obtenerPosts}
          >
            Obtener informacion
          </button>
          <button
            type="button"
            className="btn btn-info"
            onClick={handleCalcular}
          >
            Calcular {calculo}
          </button>
        </article>
      </main>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {posts.map((post) => (
          <div key={post.id} className="col">
            <div className="card h-100">
              <img src="..." className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">{post.body}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default PostsPage;
