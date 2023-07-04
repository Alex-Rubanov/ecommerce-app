import { useState } from 'react';

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  class Http {
    static async getItems() {
      setIsLoading(true);

      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}?populate=image`);

        if (!response.ok) throw Error(response.status);

        const { data } = await response.json();

        setIsLoading(false);
        return data;
      } catch (e) {
        setIsError(true);
        setIsLoading(false);
        throw e;
      }
    }

    static async getItem(id) {
      setIsLoading(true);

      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/${id}?populate=image`);

        if (!response.ok) throw Error(response.status);

        const { data } = await response.json();

        setIsLoading(false);
        return data;
      } catch (e) {
        setIsError(true);
        setIsLoading(false);
        throw e;
      }
    }
  }

  const clearError = () => setIsError(false);

  return {
    isLoading,
    isError,
    clearError,
    Http,
  };
};

export default useHttp;
