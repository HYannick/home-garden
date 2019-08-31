import uuidv4 from 'uuid';
import { mapPlantData } from '../plant-edit.mapper';

const isUUID = (str) => (/^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i).test(str);
describe('Plant mapper', () => {
  const plant = {
    id: uuidv4(),
    name: 'Octavia',
    picture: 'ffmpeg.jpg',
    last_watering_date: '2019-12-23',
    has_moisture_sensor: true,
    sensor_id: 'DBFGE28374',
    watering_frequency: 12,
    need_watering_frequency: true,
  };

  it('should map the plant data without need_watering_frequency', () => {
    expect(mapPlantData(plant)).not.toHaveProperty('need_watering_frequency');
  });

  it('should map the plant data without sensor_id if has_moisture_sensor is false', () => {
    expect(mapPlantData({ ...plant, has_moisture_sensor: false })).not.toHaveProperty('sensor_id');
  });

  it('should map the plant data without watering_frequency if need_watering_frequency is false', () => {
    expect(mapPlantData({ ...plant, need_watering_frequency: false })).not.toHaveProperty('watering_frequency');
  });
  it('should map the plant data with a unique uuid', () => {
    expect(mapPlantData(plant)).toHaveProperty('id');
    expect(isUUID(mapPlantData(plant).id)).toBeTruthy();
  });
});
