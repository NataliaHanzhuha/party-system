import sgMail from '@sendgrid/mail';
import fs from 'fs';
import path from 'path';
import { deleteExcelFile } from '@/utills/excel-processing';
import { NextResponse } from 'next/server';
import { Client, Guest } from '@prisma/client';
import { MailDataRequired } from '@sendgrid/helpers/classes/mail';

export const sendManyEmails = async (emails: any, templateId: string) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

  const msg: MailDataRequired = {
    personalizations: emails.map((item: any) => {
      return {
        to: [{email: item.email}],
        dynamic_template_data: {name: item.name}
      };
    }),
    from: 'nataliiahanzhuha@gmail.com',
    subject: 'Jonathan Aremu Party',
    templateId: templateId
  };

  console.log(emails, msg);
  sendManyEmailsRequest(msg);
};

export const sendNewGuestEvent = async (client: Client, guest: Guest) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);
  console.log(client.name, guest.name);
  const msg: MailDataRequired = {
    subject: `Thanks for accepting ${client.name} party invitation`,
    templateId: client.invitationEmailId!,
    from: 'nataliiahanzhuha@gmail.com',
    personalizations: [{
      to: {email: guest.email},
      dynamicTemplateData: {
        guestName: guest.name,
        clientName: client.name,
        weblink_edited: `https://party-system-rsvp.vercel.app/${guest?.clientId}/invitation/${guest.id}`,
        weblink_reject: `https://party-system-rsvp.vercel.app/${guest?.clientId}/cancel/${guest.id}`
      }
    }]
  };

  return sendSingleEvent(msg, guest);
};

const sendSingleEvent = async (msg: MailDataRequired, guest?: any) => {
  return await sgMail.sendMultiple(msg)
    .then(() => {
      console.log('Email sent');
      return NextResponse.json(guest);
    })
    // .catch((error) => {
    //   console.error(JSON.stringify(error));
    //   // return NextResponse.json(null);
    // });
};

const sendManyEmailsRequest = (msg: MailDataRequired) => {
  sgMail
    .sendMultiple(msg)
    .then(() => {
      console.log('Email sent');
      return NextResponse.json({message: 'Email sent'});
    })
    .catch((error) => {
      console.error(JSON.stringify(error));
      return NextResponse.json(null);
    });
};

export const sendEmailWithGuestsList = (client: Client, link1: string) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);
  const pathToAttachment = path.resolve(link1);
  const attachment = fs.readFileSync(pathToAttachment).toString('base64');
  const msg = {
    to: client.email,
    from: 'nataliiahanzhuha@gmail.com',
    subject: 'Party guest list',
    text: `Hi, ${client.name}. I attached excel file with list of your party guests bellow.`,
    attachments: [
      {
        content: attachment,
        filename: path.basename(link1),
        type: 'text/html',
        disposition: 'attachment'
      }
    ]
  };

  console.log(JSON.stringify(msg));
  return sgMail.send(msg)
    .then(() => {
      console.log('Email sent');
      // deleteExcelFile(link1);
      return NextResponse.json({
        message: 'Email sent to ' + client.email + '; from: nataliiahanzhuha@gmail.com'});
    })
    .catch((error) => {
      console.error(JSON.stringify(error));
      return NextResponse.json(null);
    });
};
