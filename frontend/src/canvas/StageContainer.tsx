import React, { useRef } from 'react';
import { Stage, Layer, Line, Rect } from 'react-konva';
import Konva from 'konva';
import { useStudioStore } from '../store/useStudioStore';
import { useReviewStore } from '../store/useReviewStore';
import { SourceReferenceLayer } from './layers/SourceReferenceLayer';
import { DocumentLayer } from './layers/DocumentLayer';
import { OverlayLayer } from './layers/OverlayLayer';
import { CustomTransformer } from './transformer/CustomTransformer';

interface StageContainerProps {
  mode: 'review' | 'editor';
}

export const StageContainer: React.FC<StageContainerProps> = ({ mode }) => {
  const stageRef = useRef<Konva.Stage>(null);
  
  // Studio store
  const {
    document,
    sourceReference,
    selectedElementIds,
    zoom,
    pan,
    showGrid,
    selectElement,
    clearSelection,
    updateElement,
    setPan,
    setZoom,
  } = useStudioStore();

  // Review store
  const {
    candidates,
    selectedCandidateId,
    filter,
    selectCandidate,
    updateCandidateBounds,
  } = useReviewStore();

  const docWidth = document?.width || 500;
  const docHeight = document?.height || 180;

  // Grid generator helper
  const renderGrid = () => {
    if (!showGrid) return null;
    const lines = [];
    const gridSize = 20;
    const width = 1200;
    const height = 800;

    for (let i = 0; i < width / gridSize; i++) {
      lines.push(
        <Line
          key={`v-${i}`}
          points={[i * gridSize, 0, i * gridSize, height]}
          stroke="#f1f5f9"
          strokeWidth={1}
        />
      );
    }
    for (let j = 0; j < height / gridSize; j++) {
      lines.push(
        <Line
          key={`h-${j}`}
          points={[0, j * gridSize, width, j * gridSize]}
          stroke="#f1f5f9"
          strokeWidth={1}
        />
      );
    }
    return <Layer listening={false}>{lines}</Layer>;
  };

  const handleStageMouseDown = (e: Konva.KonvaEventObject<MouseEvent | TouchEvent>) => {
    // If clicked on stage background, clear selection
    if (e.target === stageRef.current) {
      if (mode === 'editor') {
        clearSelection();
      } else {
        selectCandidate(null);
      }
    }
  };

  const handleWheel = (e: Konva.KonvaEventObject<WheelEvent>) => {
    e.evt.preventDefault();
    const scaleBy = 1.05;
    const stage = stageRef.current;
    if (!stage) return;

    const oldScale = stage.scaleX();
    const pointer = stage.getPointerPosition();
    if (!pointer) return;

    const mousePointTo = {
      x: (pointer.x - stage.x()) / oldScale,
      y: (pointer.y - stage.y()) / oldScale,
    };

    const newScale = e.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy;
    const clampedScale = Math.min(Math.max(newScale, 0.3), 3.0);

    setZoom(clampedScale);
    setPan({
      x: pointer.x - mousePointTo.x * clampedScale,
      y: pointer.y - mousePointTo.y * clampedScale,
    });
  };

  return (
    <div className="relative w-full h-full bg-slate-100 overflow-hidden flex items-center justify-center select-none">
      <Stage
        ref={stageRef}
        width={window.innerWidth - 380}
        height={window.innerHeight - 130}
        scaleX={zoom}
        scaleY={zoom}
        x={pan.x}
        y={pan.y}
        draggable
        onMouseDown={handleStageMouseDown}
        onWheel={handleWheel}
        onDragEnd={(e) => {
          if (e.target === stageRef.current) {
            setPan({ x: e.target.x(), y: e.target.y() });
          }
        }}
      >
        {/* Background Grid */}
        {renderGrid()}

        {/* Document Boundary & Background Shadow */}
        <Layer listening={false}>
          <Rect
            x={0}
            y={0}
            width={docWidth}
            height={docHeight}
            fill="#ffffff"
            shadowColor="rgba(0,0,0,0.08)"
            shadowBlur={10}
            shadowOffset={{ x: 0, y: 4 }}
            shadowOpacity={0.6}
            stroke="#e2e8f0"
            strokeWidth={1}
          />
        </Layer>

        {mode === 'review' ? (
          <>
            {/* Source Image at 100% opacity during Review */}
            <SourceReferenceLayer
              imageUrl={sourceReference.imageUrl}
              visible={true}
              opacity={1}
            />
            {/* Interactive Candidate Overlays */}
            <OverlayLayer
              candidates={candidates}
              selectedCandidateId={selectedCandidateId}
              filter={filter}
              onSelectCandidate={selectCandidate}
              onUpdateBounds={updateCandidateBounds}
            />
          </>
        ) : (
          <>
            {/* In Editor mode : SourceReference is optional at 20-30% opacity, never exported */}
            <SourceReferenceLayer
              imageUrl={sourceReference.imageUrl}
              visible={sourceReference.visible}
              opacity={sourceReference.opacity}
            />

            {/* Main Editable Document Layer */}
            {document && (
              <DocumentLayer
                elements={document.elements}
                fields={document.fields}
                selectedElementIds={selectedElementIds}
                onSelectElement={selectElement}
                onUpdateElement={updateElement}
              />
            )}

            {/* Transformer for Selection, Resize and Rotate */}
            <CustomTransformer
              selectedElementIds={selectedElementIds}
              stageRef={stageRef}
            />
          </>
        )}
      </Stage>
    </div>
  );
};
