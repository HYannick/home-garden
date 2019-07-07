import React from 'react';
import styled from '@emotion/styled';
import Typography from '../components/Typography';


interface VariantType {
  variant?: string
}
const HeadingWrapper = styled('div')<VariantType>`
  margin-top: 2rem;
  & h1 {
    font-size: 3rem;
    color: ${({ theme }) => theme.palette.grey.dark};
    position: relative;
    &:before {
      content: '';
      position: absolute;
      left: -1.5rem;
      top: 50%;
      transform: translateY(-50%);
      background-color:  ${({ variant, theme }) => theme.palette[variant || 'primary'].light};
      border:  0.2rem solid ${({ variant, theme }) => theme.palette[variant || 'primary'].dark};
      width: 0.5rem;
      height: 0.5rem;
      border-radius: 1rem;
    }
  }
  & h6 {
    font-size: 1.7rem;
    color: ${({ theme }) => theme.palette.grey.light};
    margin-bottom: 2rem;
  }
`;

interface HeadingProps {
  title: string,
  subtitle?: string,
  variant?: string
}


const Heading: React.FC<HeadingProps> = ({title, subtitle, variant = 'primary'}) => {
  return (
    <HeadingWrapper variant={variant}>
      <Typography variant="title" weight="600" tag="h1" noMargin>{title}</Typography>
      <Typography variant="body" weight="400" tag="h6" noMargin>{subtitle}</Typography>
    </HeadingWrapper>
  );
};

export default Heading;
