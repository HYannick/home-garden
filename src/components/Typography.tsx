/** @jsx jsx */
import styled from "@emotion/styled-base";
import React from "react";
import {jsx} from "@emotion/core";


interface ParagraphProps {
  color?: string,
  variant?: string
  alignment?: string
  weight?: string
  tag?: any,
  noMargin?: boolean
}

const Typography: React.FC<ParagraphProps> = ({variant, color, children, alignment, weight, tag = 'span', noMargin}) => {

  const props = {color, alignment, weight, noMargin};

  const BaseParagraph = styled(tag)<ParagraphProps>`
    font-size: 1.6rem;
    white-space: pre-line;
    margin: ${({noMargin}) => noMargin ? 0 : '2rem'};
    padding: 0;
    color: ${({color, theme}) => color || theme.palette.grey.darkest};
    font-weight: ${({weight}) => weight || 400};
    text-align: ${({alignment}) => alignment || 'left'};
  `;

  const Title = styled(BaseParagraph)`
    font-size: 2.5rem;
  `;

  const SubTitle = styled(BaseParagraph)`
    font-size: 2rem;
  `;

  const Paragraph = styled(BaseParagraph)`
    font-size: 1.4rem;
  `;


  switch (variant) {
    case "title":
      return <Title {...props}>{children}</Title>;
    case "subtitle" :
      return <SubTitle {...props}>{children}</SubTitle>;
    case "body" :
      return <Paragraph {...props}>{children}</Paragraph>;
    default:
      return <BaseParagraph {...props}>{children}</BaseParagraph>
  }
};

export default Typography
