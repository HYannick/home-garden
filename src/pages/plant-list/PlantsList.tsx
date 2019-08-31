/** @jsx jsx */
import React, { useState } from 'react';
import { jsx } from '@emotion/core';
import { useTranslation } from 'react-i18next';
import { useGetPlantList } from '../../components/plant-list/PlantList.hooks';
import { useModal } from '../../components/modal/Modal.hooks';
import PlantsListView, { PlantsListProps } from './PlantsList.view';

const PlantsList: React.FC = () => {
  const { loading, plants, setSearch, removePlant } = useGetPlantList({});
  const [plantId, setPlantId] = useState('');
  const { setModalOpen, modalOpen } = useModal();
  const { t } = useTranslation();

  const openModal = (id: string) => {
    setPlantId(id);
    setModalOpen(true);
  };

  const deletePlant = async (plantId: string) => {
    await removePlant(plantId);
    setModalOpen(false);
  };

  const resetModal = () => {
    setModalOpen(false);
    setPlantId('');
  };

  const viewProps: PlantsListProps = {
    t,
    openModal,
    deletePlant,
    resetModal,
    loading,
    plants,
    setSearch,
    removePlant,
    modalOpen,
    plantId,
    setModalOpen,
    cover: 'https://images.unsplash.com/photo-1455793067932-146d5b4a694f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&h=300&q=80',
  };

  return <PlantsListView {...viewProps} />;
};

export default PlantsList;
