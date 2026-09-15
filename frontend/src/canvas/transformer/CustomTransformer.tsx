import React, { useEffect, useRef } from 'react';
import { Transformer, Layer } from 'react-konva';
import Konva from 'konva';

interface CustomTransformerProps {
  selectedElementIds: string[];
  stageRef: React.RefObject<Konva.Stage>;
}

export const CustomTransformer: React.FC<CustomTransformerProps> = ({
  selectedElementIds,
  stageRef,
}) => {
  const trRef = useRef<Konva.Transformer>(null);

  useEffect(() => {
    if (!trRef.current || !stageRef.current) return;

    const stage = stageRef.current;
    const nodes: Konva.Node[] = [];

    selectedElementIds.forEach((id) => {
      const node = stage.findOne(`#${id}`);
      if (node) {
        nodes.push(node);
      }
    });

    trRef.current.nodes(nodes);
    trRef.current.getLayer()?.batchDraw();
  }, [selectedElementIds, stageRef]);

  if (selectedElementIds.length === 0) {
    return null;
  }

  return (
    <Layer>
      <Transformer
        ref={trRef}
        rotateEnabled={true}
        enabledAnchors={[
          'top-left',
          'top-center',
          'top-right',
          'middle-right',
          'middle-left',
          'bottom-left',
          'bottom-center',
          'bottom-right',
        ]}
        boundBoxFunc={(oldBox, newBox) => {
          // Limit minimum resize dimensions
          if (Math.abs(newBox.width) < 15 || Math.abs(newBox.height) < 10) {
            return oldBox;
          }
          return newBox;
        }}
        anchorFill="#005596"
        anchorStroke="#ffffff"
        anchorSize={8}
        borderStroke="#005596"
        borderDash={[3, 3]}
      />
    </Layer>
  );
};
