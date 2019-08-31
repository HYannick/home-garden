import React from 'react';
import Drop from '../../../core/svg/Drop';
import ImageFade from '../../image-fade/ImageFade';
import { setVariant } from '../../../core/utils/set_variant';
import { PlantCardTypes } from './PlantCard.types';
import { Card } from './PlantCard.styled';



const PlantCard: React.FC<PlantCardTypes> = ({ t, plant, asSearchCard = false, path }) => (
  <Card to={path}>
    <Card.Picture asSearchCard={asSearchCard}>
      <ImageFade src={plant.picture} alt={plant.name} placeholder="#EFFFE2"/>js
      <Card.Overlay/>
    </Card.Picture>
    {
      !asSearchCard ? (
        <Card.Infos data-testid="default-card">
          <p>{plant.custom_name || plant.name}</p>
          <Card.Chip variant={setVariant(plant.days_left)}>
            <span>{t('plant_card.days_left', {days_left: plant.days_left})}</span>
            <Drop/>
          </Card.Chip>
        </Card.Infos>
      ) : (
        <Card.Infos data-testid="search-card">
          <Card.Chip variant="primary">
            <span>{plant.name}</span>
          </Card.Chip>
        </Card.Infos>
      )
    }
  </Card>
);

export default PlantCard;
