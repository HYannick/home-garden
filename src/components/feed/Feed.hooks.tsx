import { useEffect, useState } from 'react';
import { PlantsAPI } from '../../api/plants.api';

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
