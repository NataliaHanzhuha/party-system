import InvitationPage from '@/src/app/(public)/e/[domain]/(components)/(rsvp)/InvitationPage';

export default function RSVPPage({params}: any) {
  return <InvitationPage domain={params.domain}/>;
}
