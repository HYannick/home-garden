import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from '@emotion/styled';
// @ts-ignore
import UKFlag from '../core/svg/united-kingdom.svg';
// @ts-ignore
import FRFlag from '../core/svg/france.svg';

const LanguageSelector: any = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.palette.primary.light};
  padding: 2rem;
  border-radius: 2rem;
`;
LanguageSelector.Selectors = styled('div')`
  display: flex;
  margin: 0 auto;
  & > div {
    margin: 1.5rem;
  }
`;

// eslint-disable-next-line no-undef
LanguageSelector.Selector = styled('div')<{ isActive: boolean }>`
  display: flex;
  background-color :${({ theme, isActive }) => isActive ? theme.palette.primary.medium : theme.palette.light};
  box-shadow: 0 0 0 0.5rem ${({ theme, isActive }) => isActive ? theme.palette.primary.medium : theme.palette.light};
  border-radius: 0.2rem;
  width: 4rem;
  img {
    width: 100%;
  }
`;

LanguageSelector.Heading = styled('div')`
  text-align: center;
  h6 {
    color: ${({ theme }) => theme.palette.grey.darker};
    font-size: 2rem;
    margin: 0;
  }
  p {
    color: ${({ theme }) => theme.palette.grey.dark};
    font-size: 1.6rem;
    margin: 1rem 0;
  }
  span {
    color: ${({ theme }) => theme.palette.grey.dark};
    font-size: 1.4rem;
    text-align: justify;
  }
`;
const LanguageSelectorView = () => {
  const { t, i18n } = useTranslation();
  const [selectedLang, setSelectedLang] = useState(window.localStorage.getItem('lang'));
  const languages = [
    {
      id: 'en',
      value: 'en',
      icon: UKFlag,
    },
    {
      id: 'fr',
      value: 'fr',
      icon: FRFlag,
    },
  ];

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    window.localStorage.setItem('lang', lang);
    setSelectedLang(lang);
  };

  return (
    <LanguageSelector>
      <LanguageSelector.Heading>
        <h6>{t('languages.title')}</h6>
        <p>{t('languages.helper')}</p>
        <span>{t('languages.note')}</span>
      </LanguageSelector.Heading>
      <LanguageSelector.Selectors>
        {
          languages.map(({ id, value, icon }) => (
            <LanguageSelector.Selector key={id} onClick={() => changeLanguage(value)} isActive={selectedLang === value}>
              <img src={icon} alt={value}/>
            </LanguageSelector.Selector>
          ))
        }
      </LanguageSelector.Selectors>
    </LanguageSelector>
  );
};

export default LanguageSelectorView;
