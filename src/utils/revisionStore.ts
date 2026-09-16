import { SignatureState } from '../types/signature';
import { normalizeSignatureConfig } from './signatureConfig';

export const MAX_SAVED_REVISIONS = 30;

export interface SavedRevision {
  id: string;
  timestamp: number;
  name: string;
  state: SignatureState;
}

export function createSavedRevision(
  state: SignatureState,
  name: string,
  timestamp = Date.now(),
  id = String(timestamp)
): SavedRevision {
  return { id, timestamp, name, state: structuredClone(state) };
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  Boolean(value) && typeof value === 'object' && !Array.isArray(value);

/** Removes malformed legacy entries before they reach the application state. */
export function normalizeSavedRevisions(value: unknown): SavedRevision[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((revision): SavedRevision[] => {
    if (!isRecord(revision)) return [];
    const state = normalizeSignatureConfig(revision.state);
    if (
      !state ||
      typeof revision.id !== 'string' ||
      typeof revision.name !== 'string' ||
      typeof revision.timestamp !== 'number'
    ) return [];
    return [{ id: revision.id, name: revision.name, timestamp: revision.timestamp, state }];
  }).slice(0, MAX_SAVED_REVISIONS);
}

/** Adds a revision at the top and guarantees the documented 30-version limit. */
export function prependSavedRevision(revisions: SavedRevision[], revision: SavedRevision): SavedRevision[] {
  return [revision, ...revisions].slice(0, MAX_SAVED_REVISIONS);
}

export function findSavedRevision(revisions: SavedRevision[], id: string): SavedRevision | undefined {
  return revisions.find((revision) => revision.id === id);
}
