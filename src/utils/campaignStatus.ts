import { BannerConfig, CampaignConfig } from '../types/signature';

export type CampaignStatus = 'inactive' | 'scheduled' | 'active' | 'expired';

type SchedulableCampaign = Pick<BannerConfig | CampaignConfig, 'enabled' | 'imageUrl' | 'startDate' | 'endDate'>;

/** Campaign dates apply when a signature is generated, not after it is pasted into a mail client. */
export function getCampaignStatus(banner: SchedulableCampaign, now = new Date()): CampaignStatus {
  if (!banner.enabled || !banner.imageUrl) return 'inactive';

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const start = banner.startDate ? new Date(`${banner.startDate}T00:00:00`).getTime() : undefined;
  const end = banner.endDate ? new Date(`${banner.endDate}T23:59:59.999`).getTime() : undefined;

  if (Number.isNaN(start) || Number.isNaN(end)) return 'inactive';
  if (start !== undefined && today < start) return 'scheduled';
  if (end !== undefined && today > end) return 'expired';
  return 'active';
}

export function isCampaignActive(banner: SchedulableCampaign, now = new Date()): boolean {
  return getCampaignStatus(banner, now) === 'active';
}
