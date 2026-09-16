import { DEFAULT_SIGNATURE_STATE, APP_VERSION } from '../constants/presets';
import { SignatureState } from '../types/signature';

type JsonRecord = Record<string, unknown>;

const isRecord = (value: unknown): value is JsonRecord =>
  Boolean(value) && typeof value === 'object' && !Array.isArray(value);

function mergeWithDefaults<T>(defaults: T, value: unknown): T {
  if (Array.isArray(defaults)) {
    return (Array.isArray(value) ? value : defaults) as T;
  }

  if (isRecord(defaults)) {
    const source = isRecord(value) ? value : {};
    return Object.fromEntries(
      Object.entries(defaults).map(([key, defaultValue]) => [
        key,
        mergeWithDefaults(defaultValue, source[key])
      ])
    ) as T;
  }

  return (value === undefined || value === null ? defaults : value) as T;
}

/** Accepts the current JSON envelope and legacy raw configuration files. */
export function normalizeSignatureConfig(value: unknown): SignatureState | null {
  const candidate = isRecord(value) && isRecord(value.config) ? value.config : value;
  if (!isRecord(candidate) || !isRecord(candidate.layout) || !isRecord(candidate.personal)) {
    return null;
  }

  const normalized = mergeWithDefaults(DEFAULT_SIGNATURE_STATE, candidate);
  return { ...normalized, appVersion: APP_VERSION };
}

export function createSignatureExport(state: SignatureState) {
  return {
    app: 'Signature Studio RAGT',
    version: APP_VERSION,
    exportedAt: new Date().toISOString(),
    config: state
  };
}
