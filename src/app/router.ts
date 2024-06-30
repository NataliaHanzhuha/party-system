export const eventPath = (domain: string): string => '/e/' + domain;

export const partySitePath = (domain: string): string => eventPath(domain);


//----------- RSVP -----------------
export const rsvpPath = (domain: string): string => eventPath(domain) + '/rsvp';
export const editRSVPPath = (domain: string, id: string): string => `${rsvpPath(domain)}/${id}/update`;
export const cancelRSVPPath = (domain: string, id: string): string => `${rsvpPath(domain)}/${id}/cancel`;


//----------- Wishes -----------------
export const wishesListPath = (domain: string): string => eventPath(domain) + '/wishes-list';
export const wishFormPath = (domain: string): string => eventPath(domain) + '/wish-form';


//----------- Media -----------------
export const mediaPath = (domain: string): string => eventPath(domain) + '/media-management';
