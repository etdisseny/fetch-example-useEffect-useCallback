import { useState } from "react";
import { useFetch } from "./hooks/useFetch";

const App = () => {
  const [counter, setCounter] = useState(0);

  //este useState, ya no lo utilizamos porque ahora recibimos el data de useFetch
  // const [user, setUser] = useState([]);

  //useEffet con fetch

  /* useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []); */

  //useEfect con async await- useEffect, no puede ser asincrono, por eso tenemos
  //que pasarle una función para poder ponerlo asyncrono

  /*useEffect(() => {
    const fetchDatos = async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await res.json();
      setUser(data);
    };
    fetchDatos();
  }, []);*/

  //Lo ideal seria sacar la función fuera del useEffect, pero al sacarla, cada vez
  //que cambia algo del componente, como por ejemplo el contador, se nos volvería a
  //crear la función. Una solución para esto sería utilizar el useCallback, que
  //lo que hace useCallback, es memorizar una función para no volver a crearla
  //cada vez que ser renderiza el componente. Tiene dependencias como el useEfect

  //La alternativa más recomendable para poder reutilizar el código es sacar todos
  //a un hook personalizado useFetch.

  /*const fetchData = useCallback(async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await res.json();
    setUser(data);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);*/

  const { data, loading, error } = useFetch(
    "https://jsonplaceholder.typicode.com/users"
  );

  return (
    <>
      <h1>UseEffect</h1>
      <button onClick={() => setCounter(counter + 1)}>
        contador: {counter}
      </button>
      {loading && <p>Cargando...</p>}
      {error && <p>{error}</p>}
      <ul>
        {data.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </>
  );
};
export default App;
