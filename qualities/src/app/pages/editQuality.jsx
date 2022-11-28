import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import qualityService from "../services/quality.services";

import QualityForm from "../components/ui/qualityForm";
// import httpServices from "../services/http.services";

const EditQualityPage = () => {
  const [quality, setQuality] = useState(null);
  const { id } = useParams();


  const updateQuality = async (content) => {
    try {
      const data = await qualityService.update(id, content);
      // console.log(data);
      return data.content;
    } catch (e) {
      const { message} = e.response.data;
      toast.error(message);
    }
  };

  const getQuality = async (id) => {
    try {
      const data = await qualityService.get(id);
      // console.log(data);
      return data.content;
    } catch (e) {
      const { message} = e.response.data;
      toast.error(message);
    }
  };

  const handleSubmit = (data) => {
    updateQuality(data);
  };

  useEffect(() => {
    getQuality(id).then((data) => setQuality(data));
  }, [id]);
  return (
    <>
      <h1>Edit Quality Page</h1>
      {quality !== null ? (
        <QualityForm data={quality} onSubmit={handleSubmit} />
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default EditQualityPage;
