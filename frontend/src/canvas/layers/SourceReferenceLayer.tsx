import React from 'react';
import { Layer, Image as KonvaImage } from 'react-konva';
import { useLoadedImage } from '../hooks/useLoadedImage';

interface SourceReferenceLayerProps {
  imageUrl: string | null;
  visible: boolean;
  opacity: number;
}

export const SourceReferenceLayer: React.FC<SourceReferenceLayerProps> = ({ imageUrl, visible, opacity }) => {
  const [image] = useLoadedImage(imageUrl);

  if (!visible || !imageUrl || !image) {
    return null;
  }

  return (
    <Layer opacity={opacity} listening={false}>
      <KonvaImage image={image} x={0} y={0} />
    </Layer>
  );
};
