const plantCreateValidation = ({ last_watering_date, has_moisture_sensor, sensor_id, watering_frequency, need_watering_frequency }, t) => {
  const errors = {};

  if (!last_watering_date) {
    errors.last_watering_date = t('plant_form.errors.last_watering_date');
  }
  if (has_moisture_sensor && !sensor_id) {
    errors.sensor_id = t('plant_form.errors.sensor_id');
  }
  if (has_moisture_sensor && need_watering_frequency && !watering_frequency) {
    errors.watering_frequency = t('plant_form.errors.watering_frequency');
  }

  if (!has_moisture_sensor && !watering_frequency) {
    errors.watering_frequency = t('plant_form.errors.watering_frequency');
  }

  return errors;
};

export default plantCreateValidation;
