import React, { useRef } from 'react';
import { Rect, Line } from 'react-konva';
import Konva from 'konva';
import { DocumentElement } from '../../types';

interface ShapeElementProps {
  element: DocumentElement;
  isSelected: boolean;
  onSelect: (multi: boolean) => void;
  onChange: (patch: Partial<DocumentElement>) => void;
}

export const ShapeElement: React.FC<ShapeElementProps> = ({
  element,
  isSelected,
  onSelect,
  onChange,
}) => {
  const shapeRef = useRef<any>(null);
  const { bounds, style } = element;

  if (element.type === 'divider') {
    return (
      <Line
        ref={shapeRef}
        id={element.id}
        points={[bounds.x, bounds.y, bounds.x + bounds.width, bounds.y]}
        stroke={style?.color || '#005596'}
        strokeWidth={style?.border_width || 2}
        draggable={!element.locked}
        onClick={(e) => onSelect(e.evt.shiftKey || e.evt.ctrlKey)}
        onDragEnd={(e) => {
          onChange({
            bounds: { ...bounds, x: e.target.x(), y: e.target.y() },
          });
        }}
      />
    );
  }

  return (
    <Rect
      ref={shapeRef}
      id={element.id}
      x={bounds.x}
      y={bounds.y}
      width={bounds.width}
      height={bounds.height}
      fill={style?.background_color || 'transparent'}
      stroke={style?.border_color || '#cccccc'}
      strokeWidth={style?.border_width || 1}
      cornerRadius={style?.border_radius || 0}
      rotation={element.rotation || 0}
      opacity={element.opacity ?? 1}
      visible={element.visible ?? true}
      draggable={!element.locked}
      onClick={(e) => onSelect(e.evt.shiftKey || e.evt.ctrlKey)}
      onDragEnd={(e) => {
        onChange({
          bounds: { ...bounds, x: e.target.x(), y: e.target.y() },
        });
      }}
    />
  );
};
