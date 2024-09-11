import sgMail from '@sendgrid/mail';
import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import { Client, Guest } from '@prisma/client';
import { MailDataRequired } from '@sendgrid/helpers/classes/mail';
import { deleteExcelFile } from '@/src/utills/excel-processing';
import { IClient } from '@/types/types';

export const sendManyEmails = async (emails: any, templateId: string) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

  const msg: MailDataRequired = {
    personalizations: emails.map((item: any) => {
      return {
        to: [{email: item.email}],
        dynamic_template_data: {name: item.name}
      };
    }),
    from: 'donotreply.partysystem@gmail.com',
    subject: 'Jonathan Aremu Party',
    templateId: templateId
  };

  sendManyEmailsRequest(msg);
};

export const sendEmailToManyGuests = async (client: IClient) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);
  const url = process.env.NEXTAUTH_URL;
  const msg: MailDataRequired = {
    templateId: 'd-b914ec82275540e28d3bdffa31a0ae5d',
    from: 'donotreply.partysystem@gmail.com',
    personalizations: (client?.guests ?? [])
      ?.filter((guest: Guest) => guest?.status === 'NEW' || guest?.status === 'EDITED')
      ?.map((guest: Guest) => {
      return {
        to: {email: guest.email},
        cc: {email: 'nataliiahanzhuhawork@gmail.com'},
        dynamicTemplateData: {
          guestName: guest.name,
          clientName: client.name,
          weblink_edited: `${url}${guest?.clientId}/invitation/${guest.id}`,
          weblink_reject: `${url}${guest?.clientId}/cancel/${guest.id}`
        }
      }
    })
  };

  console.log(msg, JSON.stringify(msg.personalizations?.length));

  // return NextResponse.json(msg);
  return await sendManyEmailsRequest(msg);
};

export const sendNewGuestEvent = async (client: IClient, guest: Guest) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);
  const url = process.env.NEXTAUTH_URL;
  const msg: MailDataRequired = {
    // subject: `Thanks for accepting ${client.name} party invitation`,
    templateId: 'd-b914ec82275540e28d3bdffa31a0ae5d',
    from: 'donotreply.partysystem@gmail.com',
    personalizations: [{
      to: {email: guest.email},
      cc: {email: 'nataliiahanzhuhawork@gmail.com'},
      dynamicTemplateData: {
        guestName: guest.name,
        clientName: client.name,
        weblink_edited: `${url}${guest?.clientId}/invitation/${guest.id}`,
        weblink_reject: `${url}${guest?.clientId}/cancel/${guest.id}`
      }
    }]
  };

  // console.log(msg, JSON.stringify(msg.personalizations));
  return await sendSingleEvent(msg);
};

const sendSingleEvent = async (msg: MailDataRequired) => {
  return await sgMail.sendMultiple(msg)
    .then(() => {
      console.log('Email sent');
      return NextResponse.json(msg);
    })
    .catch((error) => {
      console.error(JSON.stringify(error));
      return NextResponse.json(null);
    });
};

const sendManyEmailsRequest = async (msg: MailDataRequired) => {
  return await sgMail
    .sendMultiple(msg)
    .then(() => {
      console.log('Email sent');
      return NextResponse.json({message: 'Email sent'});
    })
    .catch((error) => {
      console.error(JSON.stringify(error));
      return NextResponse.error();
    });
};

export const sendEmailWithGuestsList = (client: Client, link1: string) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);
  const pathToAttachment = path.resolve(link1);
  const attachment = fs.readFileSync(pathToAttachment).toString('base64');
  const msg = {
    from: 'donotreply.partysystem@gmail.com',
    subject: 'Party Guest List',
    personalizations: [{
      to: {email: 'nataliiahanzhuha@gmail.com'},
      bcc: {email: 'daaremu@gmail.com'},
      cc: {email: 'nataliiahanzhuhawork@gmail.com'},
      dynamicTemplateData: {
        name: client?.name,
        wishesLink: 'https://party-system-rsvp.vercel.app/e/juliet-ogbu/wishes-list',
        personalText: 'Thank you for engaging us to manage the RSVP list of your upcoming 50th birthday. As you\'d requested, attached to this email is the list of those that have made a reservation for your event as at the end of June. Reservations will now be closed.'
      }
    }],
    templateId: 'd-d888c3bc052a4b249022d26a6174bc16',
    // text: `Hi, ${client.name}. I attached Excel file with list of your party guests bellow. Also, you can find list of your wishes here: https://party-system-rsvp.vercel.app/e/juliet-ogbu/wishes-list`,
    attachments: [
      {
        content: attachment,
        filename: path.basename(link1),
        type: 'text/html',
        disposition: 'attachment'
      }
    ]
  };

  // console.log(JSON.stringify(msg));
  return sgMail.send(msg)
    .then(() => {
      console.log('Email sent');
      deleteExcelFile(link1);
      return NextResponse.json({
        message: 'Email sent to ' + client.email + '; from: nataliiahanzhuha@gmail.com'});
    })
    .catch((error) => {
      deleteExcelFile(link1);
      console.log(JSON.stringify(error));
      return NextResponse.json(null);
    });
};
