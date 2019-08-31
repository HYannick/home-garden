import { useEffect, useReducer, useState } from 'react';
import { sortBy, isEmpty } from 'lodash';
import plantListReducer, { initialState, PlantListActionType } from '../../pages/home/home.reducer';
import { PlantsAPI, plantStore } from '../../api/plants.api';
import { getDaysLeft } from '../../core/utils/calc_dates';

interface PlantListProps {
  range?: number[],
  onlyHealthy?: boolean
}

export const useGetDBPlantList = () => {
  const [{ loading, warning, plants, searchQuery }, dispatch] = useReducer(plantListReducer, initialState);
  const [isFetching, setIsFetching] = useState(true);

  const setSearch = (query: string) => {
    dispatch({ type: PlantListActionType.SET_SEARCH, query });
  };

  useEffect(() => {
    dispatch({ type: PlantListActionType.SET_LOADING, loading: true });
    PlantsAPI.get(`/plants?search=${searchQuery}`).then(({ data: plants }) => {
      dispatch({ type: PlantListActionType.SET_PLANTS, plants });
      setIsFetching(false);
      dispatch({ type: PlantListActionType.SET_LOADING, loading: false });
    }).catch(() => {
      setIsFetching(false);
      dispatch({ type: PlantListActionType.SET_LOADING, loading: false });
    });
  }, [searchQuery]);

  return {
    loading,
    plants,
    warning,
    isFetching,
    setSearch,
  };
};

export const useGetPlantList = ({ range, onlyHealthy = false }: PlantListProps) => {
  const [{ loading, warning, plants, searchQuery }, dispatch] = useReducer(plantListReducer, initialState);
  const [isFetching, setIsFetching] = useState(true);

  const setSearch = (query: string) => {
    dispatch({ type: PlantListActionType.SET_SEARCH, query });
  };

  useEffect(() => {
    const storeList: any = {};
    if (searchQuery) {
      dispatch({ type: PlantListActionType.SET_LOADING, loading: true });
      plantStore.iterate((value: any, key) => {
        if (value.name.toLowerCase().includes(searchQuery.toLowerCase())) {
          storeList[key] = value;
        }
      }).then(() => {
        const filteredPlantList = sortBy(Object.values(storeList).map(((plant: any) => ({
          ...plant,
          days_left: getDaysLeft(plant.last_watering_date, plant.watering_frequency),
        }))), ['days_left']);
        dispatch({ type: PlantListActionType.SET_PLANTS, plants: filteredPlantList });
        dispatch({ type: PlantListActionType.SET_LOADING, loading: false });
      });
    } else {
      plantStore.iterate((value: any, key) => {
        storeList[key] = value;
      }).then(() => {
        const filteredPlantList = sortBy(Object.values(storeList).map(((plant: any) => ({
          ...plant,
          days_left: getDaysLeft(plant.last_watering_date, plant.watering_frequency),
        }))), ['days_left']);
        dispatch({ type: PlantListActionType.SET_PLANTS, plants: filteredPlantList });
        dispatch({ type: PlantListActionType.SET_LOADING, loading: false });
      });
    }
  }, [searchQuery]);

  useEffect(() => {
    const storeList: any = {};
    dispatch({ type: PlantListActionType.SET_LOADING, loading: true });
    plantStore.iterate((value, key, iterationNumber) => {
      if (range && range.length) {
        const [start, end] = range;
        if (end > 8) return;
        if (iterationNumber > end) return;
        if ((iterationNumber >= start) && (iterationNumber < end)) {
          storeList[key] = value;
        }
      } else {
        storeList[key] = value;
      }
    }).then(() => {
      if (isEmpty(storeList)) {
        setIsFetching(false);
        dispatch({ type: PlantListActionType.SET_LOADING, loading: false });
        return;
      }
      const filteredPlantList = sortBy(Object.values(storeList).map(((plant: any) => ({
        ...plant,
        days_left: getDaysLeft(plant.last_watering_date, plant.watering_frequency),
      }))), ['days_left']);

      if (onlyHealthy) {
        const healthyPlants = filteredPlantList.filter((plant) => plant.days_left > 2).slice(0, 3);
        dispatch({ type: PlantListActionType.SET_PLANTS, plants: healthyPlants });
      } else {
        dispatch({ type: PlantListActionType.SET_PLANTS, plants: filteredPlantList });
        const needyPlants = filteredPlantList.filter(plant => plant.days_left <= 2);
        dispatch({ type: PlantListActionType.SET_WARNING, warning: needyPlants.length });
      }
      dispatch({ type: PlantListActionType.SET_LOADING, loading: false });
    });
    // eslint-disable-next-line
  }, [isFetching, onlyHealthy]);

  return {
    loading,
    plants,
    warning,
    isFetching,
    setSearch,
  };
};
