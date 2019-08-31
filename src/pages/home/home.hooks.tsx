import { useEffect, useState } from 'react';
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

export const useGetPlant = (id: string) => {
  const [loading, setLoading] = useState(true);
  const [hasErrors, setError] = useState<any>(null);
  const [hasDBErrors, setDBError] = useState<any>(null);
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
      }).catch((e) => setDBError({message: 'Unable to fetch data', error: e.message}));
    }
  }, [plant]);

  return {
    loading,
    plant,
    plantData,
    hasErrors,
    hasDBErrors,
    daysLeft,
    setDaysLeft,
  };
};
