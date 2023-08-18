import { useCallback, useEffect, useState } from "react";

export const useFetch = (url) => {
  //como queremos utilizar este estado, le ponemos data un nombre más genérico
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //creamos igualmente la función async
  //si no usaramos el useCallback, la función fetchData, solo se renderiza una vez
  //porque esta en el useEffect, pero se crea cada vez que se renderiza algo, por eso
  //lo mejor es utilizar el useCallback, que la guarda en memoria y solo la crea una vez

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(url);
      //si la respuesta es diferente de ok, lanza el error con el throw. y saltará al
      //catch directamente, donde se recoge el error de trow en el error.mesage
      if (!res.ok) {
        throw new Error("error al cargar los datos");
      }
      //sino, continua
      const data = await res.json();
      setData(data);
    } catch (error) {
      setError(error.message); //recogemos el error que ha mandado el throw
    } finally {
      setLoading(false); //volvemos a dejar el loading en false
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error };
};
