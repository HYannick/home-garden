import React from 'react';
import { useSpring } from 'react-spring';
import dateFns from 'date-fns';
import { useTranslation } from 'react-i18next';
import { useGetPlant } from '../home/home.hooks';
import Edit from '../../core/svg/Edit';
import { plantStore } from '../../api/plants.api';
import { getDaysLeft } from '../../core/utils/calc_dates';
import { useModal } from '../../components/modal/Modal.hooks';
import Trash from '../../core/svg/Trash';
import { ActionProps } from '../../layout/ActionBar';
import PlantView from './Plant.view';

const Plant: React.FC = ({ history, match }: any) => {
  const { setModalOpen, modalOpen } = useModal();
  const { t } = useTranslation();
  const { loading, plant, hasErrors, plantData, daysLeft, setDaysLeft } = useGetPlant(match.params.id);
  const { number } = useSpring({ number: daysLeft });

  const waterPlant = async () => {
    const now: any = dateFns.format(new Date());
    const updatedPlant = {
      ...plant,
      last_watering_date: now,
    };
    await plantStore.setItem(plant.id, updatedPlant);
    setDaysLeft(getDaysLeft(now, plant.watering_frequency));
  };

  const deletePlant = async (plantId: string) => {
    await plantStore.removeItem(plantId);
    setModalOpen(false);
    history.push('/plants');
  };

  const actions: ActionProps[] = [
    {
      key: 1,
      icon: Trash,
      onClick: () => setModalOpen(true),
    },
    {
      key: 2,
      icon: Edit,
      onClick: () => history.push(`/plants/${plant.id}/edit`),
    },
  ];

  const viewProps = {
    t,
    loading,
    plant,
    hasErrors,
    plantData,
    daysLeft,
    setDaysLeft,
    waterPlant,
    actions,
    number,
  };


  const modalProps = {
    modalOpen,
    setModalOpen,
    deletePlant
  };

  return <PlantView {...viewProps} {...modalProps}/>;
};

export default Plant;
