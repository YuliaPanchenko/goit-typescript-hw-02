import React from "react";
import css from "../ImageCard/ImageCard.module.css";

interface ImageCardProps {
  url: string;
  desc: string;
}

export const ImageCard: React.FC<ImageCardProps> = ({ url, desc }) => {
  return (
    <div className={css.imgdWrap}>
      <img className={css.image} src={url} alt={desc} />
    </div>
  );
};
