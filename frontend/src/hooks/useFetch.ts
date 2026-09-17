import { useEffect, useState } from 'react';

export function useFetch(url: string) {
  const [data, setData] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setError(null);
        setLoading(true);
        const res = await fetch(url, { credentials: 'include' });
        if (!res.ok) {
          throw new Error(`Http error: ${res.statusText}`);
          const result = await res.json();
          if (isMounted) {
            setData(result);
          }
        }
      } catch (error) {
        if (isMounted) {
          const message =
            error instanceof Error ? error.message : 'An error aoccurd';
          setError(message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [url]);

  return { data, loading, error };
}
