import { IPermition } from '@/src/app/(public)/e/[domain]/(settings)/constant';

export enum PageView {
  DEFAULT,
  JULIETPAGE
}

export enum Roles {
  Admin,
  Client
}

export interface IClient {
  id: string;
  name: string;
  email: string;
  invitationPage: PageView;
  guests: any[];
  wishes: any[];
  invitationEmailId: string;
  settings: IPermition;
}

export interface IGuest {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  clientId: string;
  status: GuestStatus;
  extraPerson1?: string;
}

export enum GuestStatus {
  NEW,
  EDITED,
  REJECTED,
}
