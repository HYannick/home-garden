export interface PlantProps {
  name: string,
  custom_name: string,
  picture: File | null,
  days_left: number
}

export interface PlantCardTypes {
  t: Function,
  plant: PlantProps,
  asSearchCard: boolean,
  path: string
}
