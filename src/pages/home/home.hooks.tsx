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

export const useGetArticles = () => {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState<any>([]);
  const [hasErrors, setError] = useState(false);
  const source = 'vertbobo';

  useEffect(() => {
    let isSubscribed = true;
    setLoading(true);
    PlantsAPI.get(`/news?source=${source}`).then(({ data: articles }) => {
      if (isSubscribed) {
        setArticles(articles);
        setLoading(false);
      }
    }).catch(() => {
      setError(true);
      setLoading(false);
    });
    return function cleanup() {
      isSubscribed = false;
    };
  }, [source]);

  return {
    loading,
    articles,
    hasErrors,
  };
};

export const useGetPlant = (id: string, withData: boolean = false) => {
  const [loading, setLoading] = useState(true);
  const [hasErrors, setError] = useState('');
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
      setError('Plant not found');
      setLoading(false);
    });
    if (withData) {
      PlantsAPI.get(`/plant/${id}`).then((plantData: any) => {
        if (!didCancel) {
          setPlantData(plantData);
        }
      }).catch(e => console.log(e));
    }
    return function cleanup() {
      didCancel = true;
    };
  }, [id, withData]);

  return {
    loading,
    plant,
    plantData,
    hasErrors,
    daysLeft,
    setDaysLeft,
  };
};

export const useGetNeedyPlantsList = (nbItems?: number) => {
  const [loading, setLoading] = useState(true);
  const [plants, setPlants] = useState<any[]>([]);
  const [warning, setWarning] = useState<number>(0);

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

      const needyPlants = filteredPlantList.filter(plant => plant.days_left <= 2);
      setPlants(needyPlants);
      setWarning(needyPlants.length);
      setLoading(false);
    });
  }, [nbItems]);

  return {
    loading,
    plants,
    warning,
  };
};

export const useGetPlantList = (nbItems?: number) => {
  const [loading, setLoading] = useState(true);
  const [plants, setPlants] = useState<any[]>([]);
  const [warning, setWarning] = useState<number>(0);

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
      const needyPlants = filteredPlantList.filter(plant => plant.days_left <= 2);
      setWarning(needyPlants.length);
      setLoading(false);
    });
  }, [nbItems]);

  return {
    loading,
    plants,
    warning,
  };
};
