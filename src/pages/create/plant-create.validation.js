const plantCreateValidation = ({ name, last_watering_date, has_moisture_sensor, sensor_id, watering_frequency, need_watering_frequency }, { t }) => {
  const errors = {};

  if (!name) {
    errors.name = t('plant_create.errors.name');
  }
  if (!last_watering_date) {
    errors.last_watering_date = t('plant_create.last_watering_date');
  }
  if (has_moisture_sensor && !sensor_id) {
    errors.sensor_id = t('plant_create.sensor_id');
  }
  if (has_moisture_sensor && need_watering_frequency && !watering_frequency) {
    errors.watering_frequency = t('plant_create.watering_frequency');
  }

  if (!has_moisture_sensor && !watering_frequency) {
    errors.watering_frequency = t('plant_create.watering_frequency');
  }
  return errors;
};

export default plantCreateValidation;
