// ---------------- CONSTANTS ----------------------

import { IPermition } from '@/src/app/(settings)/constant';
import { PartyDetails, RSVPDetails, metadata } from '@/src/app/(settings)/juneGuest';
import { Client } from '@prisma/client';

export const permissions: { [id: string]: IPermition } = {
  //test
  'clxb7eyd4000030o06ijicxv8': {
    partySite: PartyDetails,
    rsvp: RSVPDetails,
    mediaManagement: true,
    wishes: true,
    metadata
  }

  //prod
};

export const emptyPermission: IPermition = {
  partySite: null,
  rsvp: null,
  mediaManagement: false,
  wishes: false,
  metadata
};


