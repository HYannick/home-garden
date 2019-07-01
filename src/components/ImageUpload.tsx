import React, {useState} from 'react';
import styled from "@emotion/styled";

interface ImageUploadProps {
  onImageLoaded: Function,
  source?: string
}

const InputPlaceHolder = styled('label')`
  display: flex;
  width: 20rem;
  height: 20rem;
  border-radius: 2rem;
  background: ${(props: any) => `url('${props.bgImage}') center center no-repeat ${props.theme.palette.grey.light}`};
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

const ImageUpload: React.FC<ImageUploadProps> = ({onImageLoaded, source}) => {
  const [src, setSrc] = useState(source);
  const [loading, setLoading] = useState(false);

  const uploadImage = (e: any) => {
    const img = e.target.files[0];
    const fr: FileReader = new FileReader();
    fr.onloadstart = () => {
      setLoading(true)
    };

    fr.onload = () => {
      setSrc(fr.result as string);
    };
    fr.onloadend = (data: any) => {
      onImageLoaded(data.target.result);
      setLoading(false)
    };
    fr.readAsDataURL(img);
  };

  return (
    <div>
      <InputPlaceHolder htmlFor="avatar" {...{bgImage: src}}/>
      {loading && <div>Loading ...</div>}
      <HiddenInput id="avatar" type="file" onChange={uploadImage}/>
    </div>
  );
};

export default ImageUpload;
