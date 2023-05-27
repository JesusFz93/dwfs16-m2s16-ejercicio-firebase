import axios from "axios";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const CustomersPage = () => {
  const [clientes, setClientes] = useState([]);

  const handleCustomers = async () => {
    const resp = await axios.get(
      "https://ucamp-api.onrender.com/api/v1/customers"
    );
    console.log(resp.data.data);
    setClientes(resp.data.data);
  };

  return (
    <>
      <main className="row">
        <article className="col">
          <h2>CustomersPage</h2>
        </article>
      </main>
      <section className="row">
        <article className="col">
          <button className="btn btn-info" onClick={handleCustomers}>
            Obtener clientes
          </button>
        </article>
      </section>
      <section className="row">
        <article className="col">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">Handle</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((cliente) => (
                <tr key={cliente.id}>
                  <th scope="row">{cliente.id}</th>
                  <td>{cliente.firstName}</td>
                  <td>{cliente.lastName}</td>
                  <td>
                    <NavLink
                      className="btn btn-primary"
                      to={`/customers/${cliente.id}`}
                    >
                      Ver mas
                    </NavLink>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </article>
      </section>
    </>
  );
};

export default CustomersPage;
