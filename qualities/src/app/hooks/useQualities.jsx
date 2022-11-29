import React, { useContext, useEffect, useState } from "react";
import qualityService from "../services/quality.services";

const QualitiesContext = React.createContext();

export const useQualities = () => {
  return useContext(QualitiesContext);
};

export const QualitiesProvider = ({ children }) => {
  const [qualities, setQualities] = useState();
  const [, setError] = useState(null);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    const getQualities = async () => {
      try {
        const { content } = await qualityService.fetchAll();
        setQualities(content);
        setLoading(false);
      } catch (e) {
        const { message } = e.response.data;
        setError(message);
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
      const { message } = e.response.data;
      setError(message);
    }
  };

  const addQuality = async (data) => {
    try {
      const { content } = await qualityService.create(data);
      setQualities((prev) => [...prev, content]);
      return content;
    } catch (e) {
      const { message } = e.response.data;
      setError(message);
    }
  };

  return (
    <QualitiesContext.Provider value={{ qualities, getQuality, updateQuality, addQuality }}>
      {!isLoading ? children : <h2>Qualities Loading...</h2>}
    </QualitiesContext.Provider>
  );
};
