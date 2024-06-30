// ---------------- CONSTANTS ----------------------

import { IPermition } from '@/src/app/(public)/e/[domain]/(settings)/constant';
import { PartyDetails, RSVPDetails, metadata } from '@/src/app/(public)/e/[domain]/(settings)/juneGuest';
import { Client } from '@prisma/client';

export const permissions: { [id: string]: IPermition } = {
  //test
  'clxb7eyd4000030o06ijicxv8': {
    partySite: PartyDetails,
    rsvp: RSVPDetails,
    mediaManagement: 'd-b914ec82275540e28d3bdffa31a0ae5d',
    wishes: true,
    metadata
  },

  //prod
  'clvy6n0i90000s2841pehgpmh': { // -1 test
    partySite: PartyDetails,
    rsvp: RSVPDetails,
    mediaManagement: null,
    wishes: true,
    metadata
  },
  'clvoirrc20001s1i5mza4a9h8': { // 0
    partySite: null,
    rsvp: null,
    mediaManagement: null,
    wishes: true,
    metadata
  }
};

export const emptyPermission: IPermition = {
  partySite: null,
  rsvp: null,
  mediaManagement: null,
  wishes: false,
  metadata
};


