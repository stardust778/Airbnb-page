'use client';

import Image from "next/image";
import Placeholder from '@/public/images/placeholder.jpg';

const Avatar = () => {
  return (
    <Image 
      alt="avatar"
      src={Placeholder}
      width="30"
      height="30"
    />
  );
}

export default Avatar;