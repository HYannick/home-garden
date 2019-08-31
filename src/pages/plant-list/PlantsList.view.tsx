/** @jsx jsx */
import React, { Fragment } from 'react';
import styled from '@emotion/styled';
import { jsx } from '@emotion/core';
import List from '../../components/List';
import PlantCard from '../../components/plant-list/plant-card/PlantCard';
import SearchHeader from '../../layout/SearchHeader';
import Skeleton from '../../components/Skeleton';
import Modal from '../../components/modal/Modal';
import ConfirmModal from '../../components/modal/templates/ConfirmModal';
import { AddPlant } from '../search-list/SearchList.styled';
import Add from '../../core/svg/Add';

const Padding = styled('div')`
  padding: 0 2rem;
`;
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
        card={(props: any) => (
          <PlantCard
            {...props} t={t} path={`/plants/${props.plant.id}`}/>
        )}/>
      {loading && <Padding><Skeleton nbRows={3}/></Padding>}
      <AddPlant to="/search">
        <AddPlant.Tip>
          {t('plant_list.tip')}
        </AddPlant.Tip>
        <AddPlant.Button>
          <div><Add/></div>
          <span>Create a plant</span>
        </AddPlant.Button>
      </AddPlant>
      <BottomSpacer/>
    </Fragment>
  );
};

export default PlantsListView;
