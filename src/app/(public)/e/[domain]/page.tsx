'use client';

import style from './(styles)/domain.module.css';
import { useClientContext } from '@/src/app/(public)/e/[domain]/(layout)/MediaManagerLayout';
import { Client } from '@prisma/client';
import { usePermition } from '@/src/app/(public)/e/[domain]/(hooks)/usePermition';
import {
  AboutElement,
  BannerElement,
  Elements,
  IPartyDetails,
  PagesViews,
  ScheduleElement,
  SiteElement,
  SiteElementType
} from '@/src/app/(public)/e/[domain]/(settings)/constant';
import Banner from '@/src/app/(public)/e/[domain]/(components)/Banner';
import About from '@/src/app/(public)/e/[domain]/(components)/About';
import CallToAction from '@/src/app/(public)/e/[domain]/(components)/CallToAction';
import CountDown from '@/src/app/(public)/e/[domain]/(components)/CountDown';
import Footer from '@/src/app/(public)/e/[domain]/(components)/Footer';
import Schedule from '@/src/app/(public)/e/[domain]/(components)/Schedule';
import { wishFormPath } from '@/src/app/router';

const checkIfRSVPAvialible = (rsvpFinish: Date): boolean => {
  const now = Date.now();
  return now < new Date(rsvpFinish)?.getTime();
};

export default function EventPage({params}: any) {
  const {domain} = params;
  const client: any = useClientContext();
  const site: IPartyDetails = usePermition(PagesViews.PARTY_SITE, client?.settings);

  const rsvpLink: string | null = checkIfRSVPAvialible(site.rsvpFinish)
    ? `${window.location.origin}${wishFormPath(domain)}`
    : null;

  return <div className={style.website}>
    {site.siteElements?.map((element: Elements, index: number) => {
      const key = `${index}-${SiteElementType[element.type]}`
      switch (element?.type) {
        case SiteElementType.Banner: {
          return <Banner name={client.name}
                         key={key}
                         mode={(element as SiteElement).mode}
                         url={(element as BannerElement).imageUrl}
                         date={new Date(site.partyDate)}/>;
        }

        case SiteElementType.About: {
          return <About name={client.name}
                        date={new Date(site.partyDate)}
                        mode={(element as SiteElement).mode}
                        details={(element as AboutElement).details}
                        key={key}
                        location={site.location}
                        rsvpLink={rsvpLink}/>;
        }

        case SiteElementType.CallToAction: {
          return <CallToAction date={new Date(site.partyDate)}
                               key={key}
                               mode={(element as SiteElement).mode}
                               rsvpLink={rsvpLink}/>;
        }

        case SiteElementType.CountDown: {
          return <CountDown date={new Date(site.partyDate)}
                            key={key}
                            mode={(element as SiteElement).mode}/>;
        }

        case SiteElementType.Footer: {
          return <Footer mode={(element as SiteElement).mode}
                         key={key}/>;
        }

        case SiteElementType.Schedule: {
          return <Schedule mode={(element as SiteElement).mode}
                           key={key}
                           items={(element as ScheduleElement).schedule}/>;
        }
      }
    })}
  </div>;
}
