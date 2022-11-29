import React from "react";
import { useHistory } from "react-router-dom";

// import httpServices from "../services/http.services";

import QualitiesTable from "../components/ui/qualitiesTable";
import { useQualities } from "../hooks/useQualities";

const QualitiesListPage = () => {
  const history = useHistory();
  const { qualities, deleteQuality } = useQualities();
  const handleEdit = (param) => {
    console.log(param);
    history.push(`/edit/${param}`);
  };
  const handleDelete = (id) => {
    deleteQuality(id);
    console.log("del: ", id);
  };
  return (
    <>
      <h1>Qualities List Page</h1>
      <QualitiesTable
        onDelete={handleDelete}
        onEdit={handleEdit}
        data={qualities}
      />
    </>
  );
};

export default QualitiesListPage;
