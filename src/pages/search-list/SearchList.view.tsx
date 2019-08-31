/** @jsx jsx */
import React, { Fragment } from 'react';
import { jsx } from '@emotion/core';
import List from '../../components/List';
import PlantCard from '../../components/plant-list/plant-card/PlantCard';
import SearchHeader from '../../layout/SearchHeader';
import Add from '../../core/svg/Add';
import Skeleton from '../../components/Skeleton';
import { AddPlant, BottomSpacer, Padding } from './SearchList.styled';
import { SearchListTypes } from './SearchList.types';

const SearchListView: React.FC<SearchListTypes> = ({ loading, plants, setSearch, t, cover}) => {
  return (
    <Fragment>
      <SearchHeader onSubmit={setSearch} cover={cover}/>
      <List items={plants} card={(props: any) => <PlantCard
        {...props}
        asSearchCard
        path={{
          pathname: '/create',
          state: { plantInfos: props.plant },
        }}/>}/>
      {loading && <Padding><Skeleton nbRows={3}/></Padding>}
      <AddPlant to="/plant-infos-create">
        <AddPlant.Tip>
          {t('search_list.tip')}
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

export default SearchListView;
