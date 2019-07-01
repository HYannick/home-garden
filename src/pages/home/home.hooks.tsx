import {useEffect, useState} from "react";
import localForage from "localforage";
import {UserInfosProps} from "../onboarding/onboarding.types";

export const useGetUserInfos = () => {
  const [loading, setLoading] = useState(true);
  const [userInfos, setUserInfos] = useState<UserInfosProps>({
    username: '',
    avatar: ''
  });

  useEffect(() => {
    setLoading(true);
    localForage.getItem('userInfos')
      .then((userInfos: any) => {
        setUserInfos((prevState) => ({...prevState, ...userInfos}));
        setLoading(false);
      })
  }, []);

  return {
    loading,
    userInfos
  }
};
