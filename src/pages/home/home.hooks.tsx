import { useEffect, useState } from 'react';
import { sortBy } from 'lodash';
import { plantStore, userStore } from '../../api/plants.api';
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
  const [hasErrors, setError] = useState('');
  const [plant, setPlant] = useState<any>(null);

  useEffect(() => {
    setLoading(true);
    plantStore.getItem(id).then((plant: any) => {
      setPlant({...plant, days_left: getDaysLeft(plant.last_watering_date, plant.watering_frequency)});
      setLoading(false);
    }).catch(() => {
      setError('Plant not found');
      setLoading(false);
    });
  }, [id]);

  return {
    loading,
    plant,
    hasErrors
  };
};

export const useGetPlantList = (nbItems?: number) => {
  const [loading, setLoading] = useState(true);
  const [plants, setPlants] = useState<any[]>([]);

  useEffect(() => {
    setLoading(true);
    const plantList: any = {};
    plantStore.iterate((value, key, iterationNumber) => {
      if (nbItems && (iterationNumber > nbItems)) {
        return;
      }
      plantList[key] = value;
    }).then(() => {
      const filteredPlantList =
        sortBy(Object.values(plantList)
          .map(((plant: any) => ({
            ...plant,
            days_left: getDaysLeft(plant.last_watering_date, plant.watering_frequency),
          }))), ['days_left']);
      setPlants(filteredPlantList);
      setLoading(false);
    });
  }, [nbItems]);

  return {
    loading,
    plants,
  };
};
