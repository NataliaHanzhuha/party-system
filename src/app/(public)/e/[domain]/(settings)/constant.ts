import { metadata } from '@/src/app/(public)/e/[domain]/(settings)/juneGuest';

export interface IPermition {
  partySite: IPartyDetails | null;
  mediaManagement: boolean;
  wishes: boolean;
  rsvp: IRSVPDetails | null;
  metadata: any;
  [index: string]:any
}

export interface IPartyDetails {
  partyDate: Date;
  rsvpFinish: Date;
  location: string;
  siteElements: Elements[];
}

export interface IRSVPDetails {
  partyDate: Date;
  rsvpFinish: Date;
  title: string;
  location: string;
  details: any;
  mode: ThemeType;
  url: string;
}

export type Elements = SiteElement | BannerElement | AboutElement | ScheduleElement;

export class SiteElement {
  constructor(public type: SiteElementType, public mode: ThemeType) {
  }
}

export class BannerElement extends SiteElement {
  constructor(
    public imageUrl: string,
    public mode: ThemeType = ThemeType.dark,
    public type = SiteElementType.Banner,
  ) {
    super(type, mode);
  }
}

export class AboutElement extends SiteElement {

  constructor(
    public details: string,
    public mode: ThemeType = ThemeType.light,
    public type = SiteElementType.About,
  ) {
    super(type, mode);
  }
}

export class ScheduleItem {
  constructor(
    public title: string,
    public time: string,
    public details: string
  ) {
  }
}

export class ScheduleElement extends SiteElement {

  constructor(
    public schedule: ScheduleItem[],
    public mode: ThemeType = ThemeType.light,
    public type = SiteElementType.Schedule,
  ) {
    super(type, mode);
  }
}

// ---------------- ENUMS -------------------------

export enum ThemeType {
  light,
  dark,
  red
}

export const PagesViews = {
  PARTY_SITE: 'partySite',
  MEDIA_MANAGEMENT: 'mediaManagement',
  WISHES: 'wishes',
  RSVP: 'rsvp'
};


export enum SiteElementType {
  Banner,
  About,
  CallToAction,
  CountDown,
  Footer,
  Schedule
}

export const LS_ClientID = 'PS_id';
export const LS_ClientName = 'PS_iname';


