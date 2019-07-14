import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useTransition, animated } from 'react-spring';
import { useGetArticles } from '../pages/home/home.hooks';
import ArrowRight from '../core/svg/ArrowRight';
import { Directions } from '../pages/onboarding/onboarding.types';
import Heading from '../layout/Heading';
import ArrowLeft from '../core/svg/ArrowLeft';
import { VariantProps } from '../interfaces';
import { pulse } from '../core/utils/animations';
import { Overlay } from './Overlay';
import ImageFade from './image-fade/ImageFade';


const Article = styled('a')`
  display: block;
  position: relative;
  overflow: hidden;
  border-radius: 2rem;
  height: 20rem;
`;
const MediaWrapper = styled('div')`
  position: relative;
  border-radius: 2rem;
  overflow: hidden;
  img {
    border-radius: 2rem;
  }
`;
const Caption = styled('div')`
  position: absolute;
  bottom: 2rem;
  left: 2rem;
  right: 2rem;
  z-index: 1;
  > h4 {
    font-size: 2.5rem;
    font-weight: 400;
    color: ${({ theme }) => theme.palette.primary.light}; 
    margin-bottom: 0;
  }
  > span {
    font-weight: 600;
    font-size: 1.4rem;
    color: ${({ theme }) => theme.palette.light}; 
  }
`;
const FeedWrapper = styled('div')`
  position: relative;
  padding: 0 2rem;
`;
const Padding = styled('div')`
  padding: 0 0 0 2rem;
`;
const FeedContent = styled('div')`
  position: relative;
  height: 20rem;
  display: flex;
  align-items: center;
  justify-content: center;
  > div {
    position: absolute;
    top:0;
    left: 0;
    right: 0;
    bottom:0;
  }
`;

interface PlaceHolderProps extends VariantProps {
  stopAnimate?: boolean
}

const Placeholder = styled('div')<PlaceHolderProps>`
    border-radius: 2rem;
    background-color: ${({ variant, theme }) => theme.palette[variant || 'grey'].light};
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3rem;
    font-weight: 900;
    color: ${({ variant, theme }) => theme.palette[variant || 'grey'].dark};
    animation: ${({ stopAnimate }) => !stopAnimate ? pulse : 'none'} 1.2s ease-in-out infinite alternate;
`;

interface ArticleProps {
  id: number,
  link: string,
  picture: string,
  title: string,
  source: string
}

const Feed: React.FC = () => {
  const { loading, articles, hasErrors } = useGetArticles();
  const [idx, setIdx] = useState(0);
  const [article, setArticle] = useState<ArticleProps>({
    id: 0,
    link: '',
    picture: '',
    title: '',
    source: '',
  });

  const fadeTransition = useTransition(loading, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  const articleTransition = useTransition(article, article => article && article.id, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });


  useEffect(() => {
    if (!loading && !hasErrors) {
      setArticle(articles[idx]);
    }
  }, [articles, idx, loading, hasErrors]);


  const handleChange = (direction: Directions) => {
    if (direction === Directions.NEXT && (idx < articles.length - 1)) {
      setIdx(idx + 1);
    }

    if (direction === Directions.PREV && (idx > 0)) {
      setIdx(idx - 1);
    }
  };

  const feedControls = [
    {
      key: 1,
      icon: ArrowRight,
      onClick: () => handleChange(Directions.PREV),
    },
    {
      key: 2,
      icon: ArrowLeft,
      onClick: () => handleChange(Directions.NEXT),
    },
  ];

  return (
    <FeedWrapper>
      <Padding>
        <Heading variant="primary" title="Your Feed" subtitle="Amazing tips and advices!" controls={feedControls}/>
      </Padding>
      <FeedContent>
        {
          fadeTransition.map(({ item: loading, key, props }) => {
            if (loading) {
              return <animated.div style={props} key={key}><Placeholder/>
              </animated.div>;
            }

            if (hasErrors || !articles.length) {
              return <animated.div style={props} key={key}><Placeholder variant="warning" stopAnimate>No Feed
                :(</Placeholder>
              </animated.div>;
            }
            return articleTransition.map(({ item, key, props }) => (
              <animated.div key={key} style={{ ...props, overflow: 'hidden' }}>
                <Article
                  rel="noopener noreferrer" target="_blank"
                  href={item.link}>
                  <MediaWrapper>
                    <Overlay opacity={0.5} color="#222222"/>
                    <ImageFade src={item.picture} alt={item.title} placeholder="#EFFFE2"/>
                  </MediaWrapper>
                  <Caption>
                    <h4>{item.title}</h4>
                    <span>{item.source}</span>
                  </Caption>
                </Article>
              </animated.div>
            ));
          })
        }
      </FeedContent>
    </FeedWrapper>
  );
};

export default Feed;
