import { genericPlantData } from '../create/plant-create.mapper';

export const mapPlantData = (values) => ({
  id: values.id,
  DBPlantID: values.DBPlantID,
  ...genericPlantData(values),
});
