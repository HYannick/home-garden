/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/core';
import { useTranslation } from 'react-i18next';
import { useGetDBPlantList } from '../../components/plant-list/PlantList.hooks';
import SearchListView from './SearchList.view';
import { SearchListTypes } from './SearchList.types';

const SearchList: React.FC = () => {
  const { loading, plants, setSearch } = useGetDBPlantList();
  const { t } = useTranslation();

  const viewProps: SearchListTypes = {
    loading,
    plants,
    setSearch,
    cover: 'https://images.unsplash.com/photo-1455793067932-146d5b4a694f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&h=300&q=80',
    t,
  };

  return <SearchListView {...viewProps}/>;
};

export default SearchList;
