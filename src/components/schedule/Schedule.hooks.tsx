import { useEffect, useState } from 'react';
import { sortBy } from 'lodash';
import { plantStore } from '../../api/plants.api';
import { getDaysLeft } from '../../core/utils/calc_dates';

export const useGetNeedyPlantsList = (nbItems?: number) => {
  const [loading, setLoading] = useState(true);
  const [plants, setPlants] = useState<any[]>([]);
  const [warning, setWarning] = useState<number>(0);
  const [hasErrors, setErrors] = useState(false);

  useEffect(() => {
    setLoading(true);
    const plantList: any = {};
    plantStore.iterate((value, key, iterationNumber) => {
      if (nbItems && (iterationNumber > nbItems)) {
        return;
      }
      plantList[key] = value;
    })
      .then(() => {
        const filteredPlantList =
          sortBy(Object.values(plantList)
            .map(((plant: any) => ({
              ...plant,
              days_left: getDaysLeft(plant.last_watering_date, plant.watering_frequency),
            }))), ['days_left']);

        const needyPlants = filteredPlantList.filter(plant => plant.days_left <= 2);
        setPlants(needyPlants);
        setWarning(needyPlants.length);
        setLoading(false);
      })
      .catch(e => {
        setErrors(e);
        setLoading(false);
      });
  }, [nbItems]);

  return {
    loading,
    plants,
    warning,
    hasErrors,
  };
};
