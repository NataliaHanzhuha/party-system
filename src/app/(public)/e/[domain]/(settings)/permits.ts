// ---------------- CONSTANTS ----------------------

import { IPermition } from '@/src/app/(public)/e/[domain]/(settings)/constant';
import { PartyDetails, RSVPDetails, metadata } from '@/src/app/(public)/e/[domain]/(settings)/juneGuest';
import { Client } from '@prisma/client';

export const permissions: { [id: string]: IPermition } = {
  //test
  'clxb7eyd4000030o06ijicxv8': { //-2
    partySite: PartyDetails,
    rsvp: RSVPDetails,
    mediaManagement: true,
    wishes: true,
    metadata
  },

  //prod
  'clvy6n0i90000s2841pehgpmh': { // -1
    partySite: PartyDetails,
    rsvp: RSVPDetails,
    mediaManagement: true,
    wishes: true,
    metadata
  },
  'clvoirrc20001s1i5mza4a9h8': { // 0
    partySite: null,
    rsvp: null,
    mediaManagement: false,
    wishes: true,
    metadata
  }
};

export const emptyPermission: IPermition = {
  partySite: null,
  rsvp: null,
  mediaManagement: false,
  wishes: false,
  metadata
};


