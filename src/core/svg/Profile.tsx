import React from 'react';
import { SvgTypes } from './svg-types';

const Profile: React.FC<SvgTypes> = ({ fill, stroke }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.286 21">
    <path
      d="M7.643 9.071a4.286 4.286 0 1 0-4.286-4.285 4.286 4.286 0 0 0 4.286 4.286zm0-7.143a2.857 2.857 0 1 1-2.857 2.857 2.857 2.857 0 0 1 2.857-2.856zm0 8.571A7.143 7.143 0 0 0 .5 17.643v2.143a.715.715 0 0 0 1.429 0v-2.143a5.715 5.715 0 0 1 11.429 0v2.143a.715.715 0 0 0 1.429 0v-2.143A7.143 7.143 0 0 0 7.643 10.5z"
      fill={fill} stroke={stroke}/>
  </svg>
);

export default Profile;
