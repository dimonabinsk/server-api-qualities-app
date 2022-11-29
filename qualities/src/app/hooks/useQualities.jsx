import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import qualityService from "../services/quality.services";

const QualitiesContext = React.createContext();

export const useQualities = () => {
  return useContext(QualitiesContext);
};

export const QualitiesProvider = ({ children }) => {
  const [qualities, setQualities] = useState();
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(true);
  // const prevStateQuality = useRef();
  useEffect(() => {
    const getQualities = async () => {
      try {
        const { content } = await qualityService.fetchAll();
        setQualities(content);
        setLoading(false);
      } catch (e) {
        errorCather(e);
      }
    };

    getQualities();
  }, []);

  const getQuality = (id) => {
    return qualities.find((q) => q._id === id);
  };

  const updateQuality = async ({ _id: id, ...data }) => {
    try {
      const { content } = await qualityService.update(id, data);
      setQualities((prev) =>
        prev.map((item) => {
          if (item._id === content._id) {
            return content;
          }
          return item;
        })
      );
      return content;
    } catch (e) {
      errorCather(e);
    }
  };

  const addQuality = async (data) => {
    try {
      const { content } = await qualityService.create(data);
      setQualities((prev) => [...prev, content]);
      return content;
    } catch (e) {
      errorCather(e);
    }
  };

  // const deleteQuality = async (id) => {
  //   // оптимистичный метод удаления
  //   prevStateQuality.current = qualities;
  //   setQualities((prev) => {
  //     return prev.filter((item) => item._id !== id);
  //   });
  //   try {
  //     await qualityService.delete(id);
  //   } catch (e) {
  //     const { message } = e.response.data;
  //     setError(message);
  //     setQualities(prevStateQuality.current);
  //   }
  // };

  const deleteQuality = async (id) => {
    // пессимистичный метод добавления
    try {
      const { content } = await qualityService.delete(id);
      setQualities((prev) => {
        return prev.filter((item) => item._id !== content._id);
      });
    } catch (e) {
      errorCather(e);
    }
  };

  function errorCather(error) {
    const { message } = error.response.data;
    setError(message);
  }

  useEffect(() => {
    if (error !== null) {
      toast.error(error);
      setError(null);
    }
  }, [error]);

  return (
    <QualitiesContext.Provider
      value={{
        qualities,
        getQuality,
        updateQuality,
        addQuality,
        deleteQuality,
      }}
    >
      {!isLoading ? children : <h2>Qualities Loading...</h2>}
    </QualitiesContext.Provider>
  );
};
