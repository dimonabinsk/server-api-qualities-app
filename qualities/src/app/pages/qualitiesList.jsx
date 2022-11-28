import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

// import httpServices from "../services/http.services";

import QualitiesTable from "../components/ui/qualitiesTable";
import qualityService from "../services/quality.services";

const QualitiesListPage = () => {
  const history = useHistory();
  const [qualities, setQualities] = useState();

  useEffect(() => {
    qualityService.fetchAll().then((data) => setQualities(data.content));
  }, []);

  const handleEdit = (param) => {
    console.log(param);
    history.push(`/edit/${param}`);
  };
  const handleDelete = (param) => {
    console.log(param);
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
