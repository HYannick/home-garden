import React, { useEffect, useRef, useState } from 'react';
import { useChain, useTransition } from 'react-spring';
import { useTranslation } from 'react-i18next';
import ArrowRight from '../../core/svg/ArrowRight';
import { Directions } from '../../pages/onboarding/onboarding.types';
import ArrowLeft from '../../core/svg/ArrowLeft';
import { useGetArticles } from './Feed.hooks';
import { ArticleProps } from './Feed.types';
import FeedView, { FeedViewProps } from './Feed.view';

const Feed: React.FC = (props) => {
  const { t } = useTranslation();
  const { loading, articles, hasErrors } = useGetArticles();
  const [idx, setIdx] = useState(0);
  const [article, setArticle] = useState<ArticleProps>({
    id: 0,
    link: '',
    picture: '',
    title: '',
    source: '',
  });
  const fadeTransitionRef: any = useRef();
  const fadeTransition = useTransition(loading, null,{
    ref: fadeTransitionRef,
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });
  const articleTransitionRef: any = useRef();
  const articleTransition = useTransition(article, article => article && article.id, {
    ref: articleTransitionRef,
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  useChain([fadeTransitionRef, articleTransitionRef]);

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
      disabled: !(idx > 0),
      onClick: () => handleChange(Directions.PREV),
    },
    {
      key: 2,
      icon: ArrowLeft,
      disabled: !(idx < articles.length - 1),
      onClick: () => handleChange(Directions.NEXT),
    },
  ];

  const viewProps: FeedViewProps = {
    ...props,
    t,
    fadeTransition,
    articleTransition,
    feedControls,
    articles,
    hasErrors,
  };

  return <FeedView {...viewProps} />;
};

export default Feed;
