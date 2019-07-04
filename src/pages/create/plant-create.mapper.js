export const mapPlantData = (values) => ({
  name: values.name,
  picture: values.picture,
  last_watering_date: values.last_watering_date,
  has_moisture_sensor: values.has_moisture_sensor,
  sensor_id: values.sensor_id,
  watering_frequency: values.watering_frequency,
});
