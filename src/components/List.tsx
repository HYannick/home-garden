import React from 'react';
import styled from '@emotion/styled';

interface ListProps {
  items: any[],
  card: any,
  emptyListMessage?: string,
  onDeleteItem?: Function
}

const Padding = styled('div')`
  padding: 2rem 2rem 0;
  margin-bottom: 4rem;
`;

const EmptyLabel = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    font-size: 2rem;
    color: ${({theme}) => theme.palette.grey.dark};
    font-weight: bold;
  }
`;

const List: React.FC<ListProps> = ({ items, card: Card, emptyListMessage = 'No plants', onDeleteItem }) => {
  return (
    <Padding>
      {
        items.length ?
          (items.map((item: any) => (
            <Card key={item.id} plant={item} onDelete={onDeleteItem}/>
          ))) :
          (
            <EmptyLabel><span>{emptyListMessage}</span></EmptyLabel>
          )
      }
    </Padding>
  );
};

export default List;
