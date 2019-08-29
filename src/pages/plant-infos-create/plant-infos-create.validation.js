const plantInfosCreateValidation = ({ name }, t) => {
  const errors = {};

  if (!name) {
    errors.name = t('plant_form.errors.name');
  }

  return errors;
};

export default plantInfosCreateValidation;
