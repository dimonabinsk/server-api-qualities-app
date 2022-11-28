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

  return (
    <QualitiesContext.Provider value={{ qualities }}>
      {!isLoading ? children : <h2>Qualities Loading...</h2>}
    </QualitiesContext.Provider>
  );
};
