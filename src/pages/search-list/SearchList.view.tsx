/** @jsx jsx */
import React, { Fragment } from 'react';
import { jsx } from '@emotion/core';
import List from '../../components/List';
import PlantCard from '../../components/plant-list/plant-card/PlantCard';
import SearchHeader from '../../layout/SearchHeader';
import AddPlantButton from '../../components/AddPlantButton';
import { BottomSpacer } from './SearchList.styled';
import { SearchListTypes } from './SearchList.types';

const SearchListView: React.FC<SearchListTypes> = ({ loading, plants, setSearch, t, cover }) => {
  return (
    <Fragment>
      <SearchHeader onSubmit={setSearch} cover={cover}/>
      <List items={plants} loading={loading} card={(props: any) => <PlantCard
        {...props}
        asSearchCard
        path={{
          pathname: '/create',
          state: { plantInfos: props.plant, withoutCreation: true },
        }}/>}/>
      <AddPlantButton label={t('list.add_button_label')} subtitle={t('plant_list.tip')} path="/plant-infos-create"/>
      <BottomSpacer/>
    </Fragment>
  );
};

export default SearchListView;
