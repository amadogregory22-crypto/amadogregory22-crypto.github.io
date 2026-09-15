import React, { useRef, useEffect } from 'react';
import { Text, Group } from 'react-konva';
import Konva from 'konva';
import { DocumentElement, DocumentFields } from '../../types';

interface TextShapeProps {
  element: DocumentElement;
  fields: DocumentFields;
  isSelected: boolean;
  onSelect: (multi: boolean) => void;
  onChange: (patch: Partial<DocumentElement>) => void;
}

export const TextShape: React.FC<TextShapeProps> = ({
  element,
  fields,
  isSelected,
  onSelect,
  onChange,
}) => {
  const shapeRef = useRef<Konva.Text>(null);

  // Single Source of Truth : resolve fieldBinding dynamically
  let displayValue = element.static_content || '';
  if (element.field_binding) {
    const key = element.field_binding as keyof DocumentFields;
    if (fields[key] !== undefined) {
      displayValue = String(fields[key]);
    }
  }

  const { style, bounds } = element;

  return (
    <Text
      ref={shapeRef}
      id={element.id}
      text={displayValue || '(Texte vide)'}
      x={bounds.x}
      y={bounds.y}
      width={bounds.width}
      rotation={element.rotation || 0}
      opacity={element.opacity ?? 1}
      visible={element.visible ?? true}
      draggable={!element.locked}
      fontFamily={style?.font_family || 'Segoe UI, Arial, sans-serif'}
      fontSize={style?.font_size || 14}
      fontStyle={style?.font_style || (style?.font_weight === 'bold' ? 'bold' : 'normal')}
      fill={style?.color || '#222222'}
      align={style?.text_align || 'left'}
      lineHeight={style?.line_height || 1.2}
      onClick={(e) => {
        onSelect(e.evt.shiftKey || e.evt.ctrlKey);
      }}
      onTap={(e) => onSelect(false)}
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
            width: Math.max(20, node.width() * scaleX),
            height: Math.max(10, node.height() * scaleY),
          },
        });
      }}
    />
  );
};
