import React, { useRef } from 'react';
import { Image as KonvaImage, Rect, Group, Text } from 'react-konva';
import Konva from 'konva';
import { DocumentElement } from '../../types';
import { useLoadedImage } from '../hooks/useLoadedImage';

interface ImageShapeProps {
  element: DocumentElement;
  isSelected: boolean;
  onSelect: (multi: boolean) => void;
  onChange: (patch: Partial<DocumentElement>) => void;
}

export const ImageShape: React.FC<ImageShapeProps> = ({
  element,
  isSelected,
  onSelect,
  onChange,
}) => {
  const shapeRef = useRef<Konva.Image>(null);
  const [image, status] = useLoadedImage(element.static_content || element.asset_id || null);
  const { bounds } = element;

  if (status !== 'loaded' || !image) {
    return (
      <Group
        x={bounds.x}
        y={bounds.y}
        draggable={!element.locked}
        onClick={(e) => onSelect(e.evt.shiftKey || e.evt.ctrlKey)}
        onDragEnd={(e) => onChange({ bounds: { ...bounds, x: e.target.x(), y: e.target.y() } })}
      >
        <Rect
          width={bounds.width}
          height={bounds.height}
          fill="#f1f5f9"
          stroke="#cbd5e1"
          strokeWidth={1}
          dash={[4, 4]}
        />
        <Text
          text={element.type === 'qr' ? 'QR Code' : 'Image / Logo'}
          width={bounds.width}
          height={bounds.height}
          align="center"
          verticalAlign="middle"
          fontSize={11}
          fill="#64748b"
        />
      </Group>
    );
  }

  return (
    <KonvaImage
      ref={shapeRef}
      id={element.id}
      image={image}
      x={bounds.x}
      y={bounds.y}
      width={bounds.width}
      height={bounds.height}
      rotation={element.rotation || 0}
      opacity={element.opacity ?? 1}
      visible={element.visible ?? true}
      draggable={!element.locked}
      onClick={(e) => onSelect(e.evt.shiftKey || e.evt.ctrlKey)}
      onTap={() => onSelect(false)}
      onDragEnd={(e) => {
        onChange({
          bounds: {
            ...bounds,
            x: e.target.x(),
            y: e.target.y(),
          },
        });
      }}
      onTransformEnd={() => {
        const node = shapeRef.current;
        if (!node) return;
        const scaleX = node.scaleX();
        const scaleY = node.scaleY();

        node.scaleX(1);
        node.scaleY(1);

        onChange({
          rotation: node.rotation(),
          bounds: {
            x: node.x(),
            y: node.y(),
            width: Math.max(10, node.width() * scaleX),
            height: Math.max(10, node.height() * scaleY),
          },
        });
      }}
    />
  );
};
