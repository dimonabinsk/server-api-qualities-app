import React from "react";

import useForm from "../../hooks/useForm";
import SelectField from "../common/form/selectField";
import TextField from "../common/form/textField";
import colors from "../../constants/colors.json";

// import PropTypes from "prop-types";

const QualityForm = ({ data, onSubmit }) => {

  const { form, handleSubmit, handleChange } = useForm(data, onSubmit);
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Наименование"
        name="name"
        onChange={handleChange}
        value={form.name || ""}
      />
      <SelectField
        label="Цвет"
        name="color"
        options={colors}
        onChange={handleChange}
        value={form.color || ""}
      />
      <button className="btn btn-primary">Submit</button>
    </form>
  );
};

// QualityForm.propTypes = {};

export default QualityForm;
