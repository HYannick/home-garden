import React from 'react';
import { useTranslation } from 'react-i18next';
import { useGetNeedyPlantsList } from './Schedule.hooks';
import ScheduleView from './Schedule.view';


const Schedule: React.FC = () => {
  const { loading, plants, warning, hasErrors } = useGetNeedyPlantsList();
  const { t } = useTranslation();
  const viewProps = {
    t,
    loading,
    plants,
    warning,
    hasErrors,
  };

  return <ScheduleView {...viewProps} />;
};

export default Schedule;
