import uuidv4 from 'uuid/v4';

export const mapPlantData = (values) => ({
  id: uuidv4(),
  name: values.name,
  picture: values.picture,
  last_watering_date: values.last_watering_date,
  has_moisture_sensor: values.has_moisture_sensor || false,
  ...values.has_moisture_sensor && ({ sensor_id: values.sensor_id }),
  ...values.need_watering_frequency && ({watering_frequency: values.watering_frequency}),
});

export const mapPlantServerData = (values) => ({
  name: values.name,
  picture: values.picture
});
