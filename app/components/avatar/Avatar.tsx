'use client';

import { FC } from "react";
import Image from "next/image";
import Placeholder from '@/public/images/placeholder.jpg';

interface AvatarProps {
  src: string | undefined | null;
}

const Avatar: FC<AvatarProps> = ({ src }) => {
  return (
    <Image 
      alt="avatar"
      src={src || Placeholder}
      width="30"
      height="30"
    />
  );
}

export default Avatar;