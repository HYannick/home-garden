import uuidv4 from 'uuid/v4';
import { MappedPlantProps, PlantProps } from './PlantCreate.types';

export const genericPlantData = (values: PlantProps): PlantProps => ({
  name: values.name,
  custom_name: values.custom_name,
  picture: values.picture,
  last_watering_date: values.last_watering_date,
  has_moisture_sensor: values.has_moisture_sensor || false,
  ...values.has_moisture_sensor && ({ sensor_id: values.sensor_id }),
  ...values.need_watering_frequency && ({ watering_frequency: values.watering_frequency }),
});

export const mapPlantData = (values: any, DBPlantID: any): MappedPlantProps => ({
  id: uuidv4(),
  DBPlantID,
  ...genericPlantData(values),
});
