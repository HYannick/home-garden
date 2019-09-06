import React from 'react';
import { animated } from 'react-spring';
import Heading from '../../layout/Heading';
import { Overlay } from '../Overlay';
import ImageFade from '../image-fade/ImageFade';
import { Article, Caption, FeedContent, FeedWrapper, MediaWrapper, Padding, Placeholder } from './Feed.styled';
import { ArticleProps } from './Feed.types';

export interface FeedViewProps {
  t: Function,
  fadeTransition: { item: boolean, key: any, props: any }[],
  articleTransition: { item: ArticleProps, key: any, props: any }[],
  feedControls: any[],
  articles: ArticleProps[],
  hasErrors: boolean
}

const FeedView: React.FC<FeedViewProps> = (props) => {
  const { t, fadeTransition, articleTransition, feedControls, articles, hasErrors } = props;
  return (
    <FeedWrapper>
      <Padding>
        <Heading
          variant="primary" title="What's up today?" subtitle="Get Amazing tips and advices!"
          controls={feedControls}/>
      </Padding>
      <FeedContent>
        {
          fadeTransition.map(({ item: loading, key, props }) => {
            if (loading) {
              return <animated.div style={props} key={key}><Placeholder/>
              </animated.div>;
            }

            if (hasErrors || !articles.length) {
              return <animated.div style={props} key={key}>
                <Placeholder variant="warning" stopAnimate>{t('feed.no_feed')}</Placeholder>
              </animated.div>;
            }
            return (
              <animated.div style={{...props, overflow: 'hidden'}} key={key}>
                {
                  articleTransition.map(({ item, key, props }) => (
                    <animated.div key={key} style={{ ...props, overflow: 'hidden' }}>
                      <Article
                        rel="noop" target="_blank"
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
                  ))
                }
              </animated.div>
            );
          })
        }
      </FeedContent>
    </FeedWrapper>
  );
};

export default FeedView;
