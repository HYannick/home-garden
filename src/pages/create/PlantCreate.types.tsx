export interface PlantProps {
  name: string,
  custom_name: string,
  picture: File | null,
  last_watering_date: string,
  has_moisture_sensor?: boolean,
  sensor_id?: string,
  watering_frequency?: number,
  need_watering_frequency?: boolean
}

export interface MappedPlantProps extends PlantProps{
  id?: string,
  DBPlantID: string
}
