import Image from "next/image";

interface ICustomImageProps {
  src: string;
  height?: number;
  width?: number;
  alt: string;
}

export const CustomImage = ({
  src,
  height = 500,
  width = 500,
  alt,
}: ICustomImageProps) => (
  <Image
    className="mx-auto h-10 w-auto"
    src={src}
    priority
    width={width}
    height={height}
    alt={alt}
  />
);
