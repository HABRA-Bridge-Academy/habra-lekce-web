import { GlobalConfig } from 'payload';
import { en } from 'payload/i18n/en';

const PreApprovedEmails: GlobalConfig = {
  slug: 'pre-approved-emails',
  label: {
    en: 'Pre-Approved Emails',
    cs: 'Předem schválené e-maily',
  },
  admin: {
    description: {
      en: 'List of email addresses that are pre-approved to sign up.',
      cs: 'Seznam e-mailových adres, které jsou předem schváleny k registraci.',
    },
    group: {
      en: 'User management',
      cs: 'Správa uživatelů',
    },
  },
  fields: [
    {
      name: 'emailList',
      type: 'textarea',
      label: {
        en: 'Email List',
        cs: 'Seznam e-mailů',
      },
      admin: {
        rows: 30,
        description: {
          en: 'Enter a list of email addresses that are pre-approved to sign up, separated by commas or new lines.',
          cs: 'Zadejte seznam e-mailových adres, které jsou předem schváleny k registraci. Oddělte je čárkami nebo novými řádky.',
        },
        placeholder: {
          en: 'eg. john.doe1@gmail.com, jane.doa@email.com \n philip.dough@bridge.com',
          cs: 'např. dan.vachtarcik@seznam.cz, adam.pyszko@email.com \nmatyas.lysek@lysek.com (oddělte čárkami nebo novými řádky)',
        } 
      },
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, originalDoc }) => {
        if (data.emailList) {
          const normalizedEmails = data.emailList
            .split(/[\n,]+/) 
            .map((email: string) => email.trim())
            .filter((email: string) => email);

          data.emailList = normalizedEmails.join('\n');
        }
        return data;
      },
    ],
  },
};

export default PreApprovedEmails;
