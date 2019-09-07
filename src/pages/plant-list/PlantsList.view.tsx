/** @jsx jsx */
import React, { Fragment } from 'react';
import styled from '@emotion/styled';
import { jsx } from '@emotion/core';
import List from '../../components/List';
import PlantCard from '../../components/plant-list/plant-card/PlantCard';
import SearchHeader from '../../layout/SearchHeader';
import Modal from '../../components/modal/Modal';
import ConfirmModal from '../../components/modal/templates/ConfirmModal';
import AddPlantButton from '../../components/AddPlantButton';

const BottomSpacer = styled('div')`
  height: 8rem;
`;

export interface PlantsListProps {
  t: Function,
  openModal: Function,
  deletePlant: Function,
  resetModal: any,
  loading: boolean,
  plants: any[],
  setSearch: any,
  removePlant: Function,
  setModalOpen: any,
  modalOpen: boolean,
  plantId: string,
  cover: string
}


const PlantsListView: React.FC<PlantsListProps> = (props) => {

  const {
    t,
    openModal,
    deletePlant,
    resetModal,
    loading,
    plants,
    setSearch,
    setModalOpen,
    modalOpen,
    plantId,
    cover,
  } = props;

  return (
    <Fragment>
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        template={() => (<ConfirmModal
          onConfirm={() => deletePlant(plantId)}
          title={t('modals.plant_removal.title')}
          subtitle={t('modals.plant_removal.subtitle')}
          onCancel={resetModal}
        />)}
      />
      <SearchHeader onSubmit={setSearch} cover={cover}/>
      <List
        items={plants}
        onDeleteItem={openModal}
        loading={loading}
        card={(props: any) => (
          <PlantCard
            {...props} t={t} path={`/plants/${props.plant.id}`}/>
        )}/>
      <AddPlantButton label={t('list.add_button_label')} subtitle={t('plant_list.tip')} path="/search"/>
      <BottomSpacer/>
    </Fragment>
  );
};

export default PlantsListView;
