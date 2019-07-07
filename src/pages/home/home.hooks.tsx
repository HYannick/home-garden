import { useEffect, useState } from 'react';
import { UserInfosProps } from '../onboarding/onboarding.types';
import { plantStore, userStore } from '../../api/plants.api';

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

export const useGetPlantList = (nbItems?: number) => {
  const [loading, setLoading] = useState(true);
  const [plants, setPlants] = useState<any[]>([]);

  useEffect(() => {
    setLoading(true);
    const plantList: any = {};
    plantStore.iterate((value, key, iterationNumber) => {
      if(nbItems && (iterationNumber > nbItems)) {
        return;
      }
      plantList[key] = value;
    }).then(() => {
      setPlants(Object.values(plantList));
      setLoading(false);
    });
  }, []);

  return {
    loading,
    plants,
  };
};
