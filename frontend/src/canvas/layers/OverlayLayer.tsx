import React, { useState } from 'react';
import { Layer, Rect, Text, Group } from 'react-konva';
import { CandidateComponent, BoundingBox } from '../../types';

interface OverlayLayerProps {
  candidates: CandidateComponent[];
  selectedCandidateId: string | null;
  filter: 'all' | 'uncertain_only' | 'confirmed_only';
  showLabels?: boolean;
  onSelectCandidate: (id: string) => void;
  onUpdateBounds: (id: string, bounds: BoundingBox) => void;
}

export const OverlayLayer: React.FC<OverlayLayerProps> = ({
  candidates,
  selectedCandidateId,
  filter,
  showLabels = true,
  onSelectCandidate,
  onUpdateBounds,
}) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const filteredCandidates = candidates.filter((c) => {
    if (filter === 'uncertain_only') return c.status === 'review';
    if (filter === 'confirmed_only') return c.status === 'confirmed';
    return true;
  });

  return (
    <Layer>
      {filteredCandidates.map((c) => {
        const isSelected = selectedCandidateId === c.id;
        const isHovered = hoveredId === c.id;
        const shouldShowLabel = isSelected || isHovered || (showLabels && c.status === 'confirmed');

        let strokeColor = '#f59e0b'; // amber for review
        let fillColor = 'rgba(245, 158, 11, 0.12)';
        if (c.status === 'confirmed') {
          strokeColor = '#10b981'; // emerald
          fillColor = 'rgba(16, 185, 129, 0.12)';
        } else if (c.status === 'rejected') {
          strokeColor = '#ef4444'; // red
          fillColor = 'rgba(239, 68, 68, 0.08)';
        }

        if (isSelected) {
          strokeColor = '#005596';
          fillColor = 'rgba(0, 85, 150, 0.22)';
        }

        const { bounds } = c;
        const labelText = `${c.semantic_type} (${Math.round(c.confidence * 100)}%)`;
        const labelWidth = Math.max(50, labelText.length * 6.5 + 12);

        return (
          <Group
            key={c.id}
            x={bounds.x}
            y={bounds.y}
            draggable
            onMouseEnter={() => setHoveredId(c.id)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => onSelectCandidate(c.id)}
            onTap={() => onSelectCandidate(c.id)}
            onDragEnd={(e) => {
              onUpdateBounds(c.id, {
                ...bounds,
                x: Math.round(e.target.x()),
                y: Math.round(e.target.y()),
              });
            }}
          >
            {/* Main Bounding Box */}
            <Rect
              width={bounds.width}
              height={bounds.height}
              stroke={strokeColor}
              strokeWidth={isSelected ? 2 : (isHovered ? 1.5 : 1)}
              fill={fillColor}
              cornerRadius={3}
            />

            {/* Smart Compact Label Tag (Shown on hover, selection or confirmed) */}
            {shouldShowLabel && (
              <Group y={bounds.y < 20 ? bounds.height : -16}>
                <Rect
                  x={0}
                  y={0}
                  width={labelWidth}
                  height={15}
                  fill={strokeColor}
                  cornerRadius={2}
                  shadowColor="rgba(0,0,0,0.15)"
                  shadowBlur={3}
                  shadowOffset={{ x: 0, y: 1 }}
                />
                <Text
                  x={4}
                  y={2.5}
                  text={labelText}
                  fontSize={9}
                  fontStyle="bold"
                  fill="#ffffff"
                />
              </Group>
            )}
          </Group>
        );
      })}
    </Layer>
  );
};
