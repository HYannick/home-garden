/** @jsx jsx */
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/core';
import Camera from '../../core/svg/Camera';
import { useTranslation } from 'react-i18next';


const resizeOpts = {
  width: 500,
  height: 500,
  type: 'image/jpeg',
  quality: 0.90,
};

interface ImageUploadProps {
  onImageLoaded: Function,
  source?: string,
  className?: string,
  field?: any,
  form?: any
}

const InputPlaceHolder = styled('label')<{ bgImage: string }>`
  display: flex;
  width: 100%;
  height: 100%;
  border-radius: 4rem;
  background: ${({ bgImage, theme }) => `url('${bgImage}') center center no-repeat ${theme.palette.primary.light}`};
  background-size: cover;
  border: 0.1rem dashed ${({ theme }) => theme.palette.primary.dark};
  align-items: center;
  justify-content: center;
`;

const HiddenInput = styled('input')`
  width: 0.01rem;
  height: 0.01rem;
  opacity: 0;
  overflow: hidden; 
  position: absolute;
  z-index: -1;
`;

const Tip = styled('div')`
  color: ${({ theme }) => theme.palette.primary.dark};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 2rem;
  > svg {
    width: 5rem;
    height: 5rem;
    path, circle {
      fill: ${({ theme }) => theme.palette.primary.dark};
      stroke: ${({ theme }) => theme.palette.primary.dark};
    }
  }
`;

const Loader = styled('div')`
  span {
    color: ${({ theme }) => theme.palette.primary.dark};
    font-size: 2rem;
    font-weight: 600;
  }
`;

interface resizeOptionsProps {
  width: number,
  height: number,
  type: string,
  quality: number
}


const resizeImage = (fr: FileReader, options: resizeOptionsProps): Promise<string> => new Promise((resolve, reject) => {
  const img = new Image();
  img.src = fr.result as string;
  img.onload = () => {
    const el = document.createElement('canvas');
    const scaleFactor = options.width / img.width;
    el.width = options.width;
    el.height = img.height * scaleFactor;
    const ctx: any = el.getContext('2d');
    ctx.drawImage(img, 0, 0, options.width, (img.height * scaleFactor));
    const imgData = ctx.canvas.toDataURL(options.type, options.quality);
    resolve(imgData);
  };
  img.onerror = (e) => {
    reject(e);
  };
});

const ImageUpload: React.FC<ImageUploadProps> = ({ field, className, onImageLoaded, source }) => {
  const {t} = useTranslation();
  const [src, setSrc] = useState<string>(source || '');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (field.value) setSrc(field.value);
    return function cleanup() {
      setSrc('');
    };
  }, [field.value]);

  const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {

    const img = e.target.files;
    if (!img) return;
    const fr: FileReader = new FileReader();
    fr.onloadstart = () => {
      setLoading(true);
    };
    fr.onloadend = () => {
      resizeImage(fr, resizeOpts).then((imgData) => {
        setSrc(imgData);
        onImageLoaded({ src: imgData, url: img });
        setLoading(false);
      }).catch((e) => {
        console.log(e);
      });
    };
    fr.readAsDataURL(img[0]);
  };

  return (
    <div className={className} css={css`
      width: 100%; 
      height: 100%;
    `}>
      <InputPlaceHolder htmlFor={field.name} bgImage={src}>
        {
          loading ? (
            <Loader>
              <span>{t('components.image_upload.loading')}</span>
            </Loader>
          ) : (
            !src && (
              <Tip>
                <Camera/>
                <span>{t('components.image_upload.label')}</span>
              </Tip>
            )
          )
        }
      </InputPlaceHolder>
      <HiddenInput id={field.name} type="file" onChange={uploadImage}/>
    </div>
  );
};

export default ImageUpload;
