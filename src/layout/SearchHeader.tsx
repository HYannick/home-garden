/** @jsx jsx */
import React from 'react';
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { Overlay } from '../components/Overlay';
import ImageFade from '../components/image-fade/ImageFade';
import SearchIcon from '../core/svg/Search';
import ActionBar from './ActionBar';

interface HeaderProps {
  onSubmit: (value: string) => void,
  cover?: string
}

export const SearchInput = styled('div')`
  position: absolute;
  bottom: -2.5rem;
  width: 100%;
  left: 0;
  right: 0;
  padding: 0 2rem;
  label {
    color: ${({ theme }) => theme.palette.light};
    font-size: 2rem;
    text-align: center;
    width: 100%;
    display: block;
    margin-bottom: 1.5rem;
  }
  input {
    width: 100%;
    padding: 2rem 6rem 2rem 2rem;
    border-radius: 3rem;
    border: none;
    font-size: 1.8rem;
    box-shadow: 0 0 1.5rem 0 #a7a7a754;
    outline: ${({ theme }) => theme.palette.grey.light};
    &::-webkit-search-cancel-button {
      display: none;
    }
  }
`;

const ActionbarWrapper = styled('div')`
  position: absolute;
  top: 0;
  z-index: 10;
  svg path {
    fill: ${({ theme }) => theme.palette.light};
    stroke: ${({ theme }) => theme.palette.light};
  }
`;

const SearchControl = styled('div')`
  position: relative;
`;
const IconButton = styled('button')`
  position: absolute;
  right: 1rem;
  top: 50%;
  border: none;
  outline: ${({ theme }) => theme.palette.grey.dark};
  transform: translateY(-50%);
  width: 5rem;
  height: 5rem;
  border-radius: 3rem;
  background-color: transparent;
  svg {
    width: 2.5rem;
    height: 2.5rem;
    path {
      fill: none;
      stroke-width: 0.3rem;
      stroke: ${({ theme }) => theme.palette.grey.dark};
    }
  }
`;

const Form = styled('form')`
  position: relative;
`;

const SearchHeader: React.FC<HeaderProps> = ({ onSubmit, cover }) => {
  const { t } = useTranslation();
  return (
    <div css={css`
      position: relative;
      height: 12rem;
      display: flex;
      align-items: center;
      margin-bottom: 5rem;
    `}>
      <div css={css`
        position: absolute;
        overflow: hidden;
        border-radius: 0 0 4.5rem 4.5rem;
        top: 0;
        left:0;
        bottom:0;
        right:0;
        z-index: -1;
      `}>
        <Overlay color="#333" opacity={0.7}/>
        <ImageFade src={cover} alt="cover" placeholder="#EFFFE2"/>
      </div>
      <ActionbarWrapper>
        <ActionBar/>
      </ActionbarWrapper>
      <SearchInput>
        <Formik
          initialValues={{ query: '' }}
          onSubmit={({ query }, actions) => {
            onSubmit(query);
            actions.setSubmitting(false);
          }}
          render={props => (
            <Form onSubmit={props.handleSubmit}>
              <label htmlFor="search">{t('search.title')}</label>
              <SearchControl>
                <input
                  type="search"
                  autoComplete="off"
                  id="search"
                  placeholder={t('search.placeholder')}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.query}
                  name="query"
                />
                {props.errors.query && <div id="feedback">{props.errors.query}</div>}
                <IconButton type="submit"><SearchIcon/></IconButton>
              </SearchControl>
            </Form>
          )}
        />
      </SearchInput>
    </div>
  );
};
export default SearchHeader;
