import {
  AboutElement,
  BannerElement,
  IPartyDetails,
  IRSVPDetails, LS_ClientName,
  ScheduleElement,
  ScheduleItem,
  SiteElement,
  SiteElementType,
  ThemeType
} from '@/src/app/(public)/e/[domain]/(settings)/constant';
import { ReactNode } from 'react';
import { dateAndTime } from '@/src/app/(public)/e/[domain]/(helpers)/date-functions';
import { Client } from '@prisma/client';
import dynamic from 'next/dynamic';

export const aboutDetails = '      <p>Enter your event description here...Pellentesque ullamcorper tortor ut auctor consequat. Nullam sed nisi massa. Aliquam eget\n' +
  '           enim nunc. Praesent blandit blandit ornare. Sed lacinia felis quis elit luctus, et tincidunt elit aliquam. Sed porttitor eros\n' +
  '           id purus sollicitudin, quis pellentesque nunc pulvinar. Ut accumsan a sem quis dignissim. Sed lacus mauris, efficitur ac\n' +
  '           lobortis id, faucibus at quam. Praesent quis metus hendrerit, vulputate nibh vel, eleifend nibh. Donec cursus, elit id auctor\n' +
  '           porta, orci felis condimentum est, ut bibendum lacus elit non mi.\n' +
  '        </p>';

const schedule = [
  new ScheduleItem(
    'Coffee and Conversation',
    '8:00 AM',
    'Nullam lectus nisi, pulvinar vitae blandit dignissim, egestas non eros. Sed vel purus et sapien ornare pulvinar. Aliquam erat volutpat.'),
  new ScheduleItem(
    'Coffee and Conversation',
    '8:00 AM',
    'Nullam lectus nisi, pulvinar vitae blandit dignissim, egestas non eros. Sed vel purus et sapien ornare pulvinar. Aliquam erat volutpat.'),
  new ScheduleItem(
    'Coffee and Conversation',
    '8:00 AM',
    'Nullam lectus nisi, pulvinar vitae blandit dignissim, egestas non eros. Sed vel purus et sapien ornare pulvinar. Aliquam erat volutpat.'),
  new ScheduleItem(
    'Coffee and Conversation',
    '8:00 AM',
    'Nullam lectus nisi, pulvinar vitae blandit dignissim, egestas non eros. Sed vel purus et sapien ornare pulvinar. Aliquam erat volutpat.'),
];

const partyDate = new Date('September 29, 2024 17:00:00');
const rsvpFinish = new Date('June 31, 2024');
const location = 'Location TBD11';
const url = 'https://res.cloudinary.com/eventcreate/image/upload/v1562462558/themes/theme%20assets/samuel-zeller-34751-unsplash_dr06ho.jpg';

export const PartyDetails: IPartyDetails = {
  partyDate,
  rsvpFinish,
  location,
  siteElements: [
    new BannerElement(url),
    new AboutElement(aboutDetails, ThemeType.dark),
    new ScheduleElement(schedule, ThemeType.dark),
    new SiteElement(SiteElementType.CountDown, ThemeType.dark),
    new SiteElement(SiteElementType.CallToAction, ThemeType.dark),
    new SiteElement(SiteElementType.Footer, ThemeType.dark),
  ]
};

function partyDetails(): ReactNode {
  return <div className={'container gap-10'}>
    <p><strong>Address: </strong>{location}</p>
    <p><strong>Date: </strong>{dateAndTime(partyDate)}</p>
    <p><strong>Dress code: </strong>Red carpet worthy.</p>
    <p><strong>Ladies: </strong>Sequined dinner dress.</p>
    <p><strong>Men: </strong>Black suit.</p>
  </div>;
}

export const RSVPDetails: IRSVPDetails = {
  partyDate,
  rsvpFinish,
  location,
  title: `50's birthday party`,
  details: partyDetails(),
  mode: ThemeType.dark,
  url,
};

export const metadata = (pageName: any, client: any) => {
  const name = client?.name ?? 'Celebrant';

  return {
    title: pageName,
    description: `${pageName} site for ${name} Party Guests`,
    icons: {
      icon: './favicon.ico',
    },
    openGraph: {
      description: `Here all friends of ${name} could leave their data for party invitation`,
      images: {
        url: `https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.jinyc-photo.com%2Fnyc-party-photography&psig=AOvVaw35q0rujZdkT1us0XrMf7Fv&ust=1718288022390000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCLi5lfif1oYDFQAAAAAdAAAAABAE`,
        width: '800',
        height: '500'
      },
      locale: 'en_US',
      type: 'website',
      siteName: pageName
    }
  };
};
