export enum LevelData {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}
export interface PlantInfosProps {
  name: string,
  latin_name: string,
  family: string,
  description: string,
  exposure_level: LevelData,
  exposure_description: string,
  temperature_level: LevelData,
  temperature_description: string,
  watering_level: LevelData,
  watering_description: string,
  soil_type: string,
  tips: string
}
