import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';
import { VariantProps } from '../../../interfaces';

export const Card: any = styled(NavLink)`
  display: block;
  position: relative;

`;

export const CardWrapper = styled('div')`
  position: relative;
  margin-bottom: 4rem;
`;

// eslint-disable-next-line no-undef
Card.Picture = styled('div')<{ asSearchCard: boolean }>`
  position: relative;
  border-radius: 2rem;
  overflow: hidden;
  height: ${({ asSearchCard }) => asSearchCard ? '8rem' : '12rem'};
  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

Card.Overlay = styled('div')`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: ${({ theme }) => theme.palette.grey.darkest};
  opacity: 0.65;
`;

Card.Infos = styled('div')`
  position: absolute;
  bottom: -2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  > p {
    color: ${({ theme }) => theme.palette.light};
    margin: 0 0 1rem;
    font-size: 2rem;
    font-weight: 600;
  }
`;

Card.Chip = styled('div')<VariantProps>`
  display: flex;
  border: 0.4rem solid ${({ theme }) => theme.palette.light};
  background-color: ${({ theme, variant }) => theme.palette[variant || 'primary'].light};
  padding: 1rem 2rem;
  border-radius: 5rem;
  > span {
    color: ${({ theme, variant }) => theme.palette[variant || 'primary'].dark};
    margin-right: 1rem;
  }
  > svg {
    width: 2rem;
    height: 2rem;
    path {
      fill: none;
      stroke: ${({ theme, variant }) => theme.palette[variant || 'primary'].dark}
    }
  }
`;

Card.DeleteButton = styled('button')`
  position: absolute;
  z-index: 10;
  right: 0;
  top: 0.5rem;
  border: none;
  background: transparent;
  cursor: pointer;
  outline: ${({ theme }) => theme.palette.light};
  > svg {
    width: 2.5rem;
    height: 2.5rem;
    path {
      fill: ${({ theme }) => theme.palette.light};
    }
  }
`;

