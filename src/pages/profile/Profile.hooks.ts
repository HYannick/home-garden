import { useEffect, useState } from 'react';
import { sortBy } from 'lodash';
import { plantStore } from '../../api/plants.api';
import { getDaysLeft } from '../../core/utils/calc_dates';

export const useGetPlantsCount = () => {
  const [loading, setLoading] = useState(false);
  const [counters, setCounters] = useState({
    danger: 0,
    warning: 0,
    healthy: 0,
    total: 0,
  });

  useEffect(() => {
    setLoading(true);
    plantStore.length().then((total) => setCounters((prevCounters) => ({ ...prevCounters, total })));
    const plantList: any = {};
    plantStore.iterate((value, key) => {
      plantList[key] = value;
    })
      .then(() => {
        const filteredPlantList =
          sortBy(Object.values(plantList)
            .map(((plant: any) => ({
              ...plant,
              days_left: getDaysLeft(plant.last_watering_date, plant.watering_frequency),
            }))), ['days_left']);

        const counting = filteredPlantList.reduce((prev, curr: any) => {
          if (curr.days_left <= 0) {
            return { ...prev, danger: prev.danger + 1 };
          }

          if (curr.days_left <= 2) {
            return { ...prev, warning: prev.warning + 1 };
          }

          if (curr.days_left > 2) {
            return { ...prev, healthy: prev.healthy + 1 };
          }
          return prev;
        }, {
          danger: 0,
          warning: 0,
          healthy: 0,
        });
        setCounters((prevCounters) => ({ ...prevCounters, ...counting }));
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  return {
    loading,
    counters,
  };
};
