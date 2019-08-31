import { useEffect, useState } from 'react';
import { sortBy } from 'lodash';
import { PlantsAPI, plantStore, userStore } from '../../api/plants.api';
import { UserInfosProps } from '../onboarding/onboarding.types';
import { getDaysLeft } from '../../core/utils/calc_dates';

export const useGetUserInfos = () => {
  const [loading, setLoading] = useState(true);
  const [userInfos, setUserInfos] = useState<UserInfosProps>({
    username: '',
    avatar: '',
  });

  useEffect(() => {
    setLoading(true);
    userStore.getItem<Promise<UserInfosProps>>('user_infos')
      .then((userInfos) => {
        setUserInfos((prevState) => ({ ...prevState, ...userInfos }));
        setLoading(false);
      });
  }, []);

  return {
    loading,
    userInfos,
  };
};

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

export const useGetPlant = (id: string) => {
  const [loading, setLoading] = useState(true);
  const [hasErrors, setError] = useState<any>(null);
  const [plant, setPlant] = useState<any>(null);
  const [plantData, setPlantData] = useState<any>(null);
  const [daysLeft, setDaysLeft] = useState(0);

  useEffect(() => {
    let didCancel = false;
    setLoading(true);
    plantStore.getItem(id).then((plant: any) => {
      if (!didCancel) {
        setPlant(plant);
        setDaysLeft(getDaysLeft(plant.last_watering_date, plant.watering_frequency));
      }
      setLoading(false);
    }).catch(() => {
      setError({message: 'Plant not found'});
      setLoading(false);
    });
    return function cleanup() {
      didCancel = true;
    };
  }, [id]);

  useEffect(() => {
    let didCancel = false;
    if(plant) {
      PlantsAPI.get(`/plants/${plant.DBPlantID}`).then(({data: plantData}: any) => {
        if (!didCancel) {
          setPlantData(plantData);
        }
        return function cleanup() {
          didCancel = true;
        };
      }).catch(() => setError({message: 'Unable to fetch data'}));
    }
  }, [plant]);

  return {
    loading,
    plant,
    plantData,
    hasErrors,
    daysLeft,
    setDaysLeft,
  };
};
