/** @jsx jsx */
import React from 'react';
import {useTransition, animated} from "react-spring";
import {css, jsx} from "@emotion/core";
import {Directions} from "../pages/onboarding/onboarding.types";

interface ItemProp {
  key: string,
  component: React.FC
}

interface TabsProps {
  currentTab: number,
  direction?: string
  items: ItemProp[],
  asSlider?: boolean
}

const Tabs: React.FC<TabsProps> = ({currentTab, items, direction, asSlider}) => {
  const transitionOpts = asSlider ? (
      {
        from: {transform: `translate3d(${direction === Directions.NEXT ? '100%' : '-100%'}, 0, 0)`},
        enter: {transform: `translate3d(0, 0, 0)`},
        leave: {transform: `translate3d(${direction === Directions.NEXT ? '-100%' : '100%'}, 0, 0`}
      }
    ) :
    (
      {
        from: {opacity: 0},
        enter: {opacity: 1},
        leave: {opacity: 0}
      }
    );
  const sliderTransitions = useTransition(currentTab, null, transitionOpts);
  return (
    <div css={css`
      width: 100%;
      position: relative;
      overflow: hidden;
      min-height: 70rem;
    `}>
      {sliderTransitions.map(({item, props,}) => {
        const Item = items[item].component;
        return <animated.div
          key={items[item].key}
          style={{...props, width: "100%"}}
          css={css`
              position: absolute;
              width: 100%;
              height: 100%;
              display: flex;
              align-items: center;
              justify-content: center;
          `}
        ><Item/></animated.div>
      })}
    </div>
  );
};

export default Tabs;
