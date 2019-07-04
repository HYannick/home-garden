/** @jsx jsx */
import React, {useState} from 'react';
import styled from "@emotion/styled";
import {css, jsx} from '@emotion/core';

interface ImageUploadProps {
  onImageLoaded: Function,
  source?: string,
  className?: any,
  field?: any,
  form?: any
}

const InputPlaceHolder = styled('label')<{ bgImage: string }>`
  display: flex;
  width: 100%;
  height: 100%;
  border-radius: 2rem;
  background: ${({bgImage, theme}) => `url('${bgImage}') center center no-repeat ${theme.palette.grey.light}`};
  background-size: cover;
`;

const HiddenInput = styled('input')`
  width: 0.01rem;
  height: 0.01rem;
  opacity: 0;
  overflow: hidden; 
  position: absolute;
  z-index: -1;
`;

const ImageUpload: React.FC<ImageUploadProps> = ({field, className, onImageLoaded, source}) => {
  const [src, setSrc] = useState<string>(source || '');
  const [loading, setLoading] = useState(false);

  const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const img = e.target.files;
    if (!img) return;
    const fr: FileReader = new FileReader();
    fr.onloadstart = () => {
      setLoading(true)
    };

    fr.onload = () => {
      setSrc(fr.result as string);
    };
    fr.onloadend = (data: any) => {
      onImageLoaded({src: data.target.result, url: img});
      setLoading(false)
    };
    fr.readAsDataURL(img[0]);
  };

  return (
    <div className={className} css={css`
      width: 100%; 
      height: 100%;
    `}>
      <InputPlaceHolder htmlFor={field.name} bgImage={src}/>
      {loading && <div>Loading ...</div>}
      <HiddenInput id={field.name} type="file" onChange={uploadImage}/>
    </div>
  );
};

export default ImageUpload;
