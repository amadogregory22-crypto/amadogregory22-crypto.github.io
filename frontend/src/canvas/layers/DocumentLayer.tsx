import React from 'react';
import { Layer } from 'react-konva';
import { DocumentElement, DocumentFields } from '../../types';
import { TextShape } from '../elements/TextShape';
import { ImageShape } from '../elements/ImageShape';
import { ShapeElement } from '../elements/ShapeElement';

interface DocumentLayerProps {
  elements: DocumentElement[];
  fields: DocumentFields;
  selectedElementIds: string[];
  onSelectElement: (id: string, multi: boolean) => void;
  onUpdateElement: (id: string, patch: Partial<DocumentElement>) => void;
}

export const DocumentLayer: React.FC<DocumentLayerProps> = ({
  elements,
  fields,
  selectedElementIds,
  onSelectElement,
  onUpdateElement,
}) => {
  // Sort elements by z_index
  const sortedElements = [...elements].sort((a, b) => (a.z_index || 0) - (b.z_index || 0));

  return (
    <Layer>
      {sortedElements.map((element) => {
        const isSelected = selectedElementIds.includes(element.id);

        if (element.type === 'text') {
          return (
            <TextShape
              key={element.id}
              element={element}
              fields={fields}
              isSelected={isSelected}
              onSelect={(multi) => onSelectElement(element.id, multi)}
              onChange={(patch) => onUpdateElement(element.id, patch)}
            />
          );
        }

        if (element.type === 'image' || element.type === 'qr' || element.type === 'icon') {
          return (
            <ImageShape
              key={element.id}
              element={element}
              isSelected={isSelected}
              onSelect={(multi) => onSelectElement(element.id, multi)}
              onChange={(patch) => onUpdateElement(element.id, patch)}
            />
          );
        }

        return (
          <ShapeElement
            key={element.id}
            element={element}
            isSelected={isSelected}
            onSelect={(multi) => onSelectElement(element.id, multi)}
            onChange={(patch) => onUpdateElement(element.id, patch)}
          />
        );
      })}
    </Layer>
  );
};
