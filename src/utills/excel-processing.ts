import Excel from 'exceljs';
import fs from 'fs';
import { Client, Guest } from '@prisma/client';
import { invalidExtraPersonName } from '@/src/utills/invalid-extra-person-name';

export const excelDoc = (arr: Guest[], client: Client) => {
  let workbook = new Excel.Workbook();
  let worksheet = workbook.addWorksheet('Guests List');

  worksheet.columns = [
    {header: '#', key: 'index', width: 20},
    {header: 'Guest name', key: 'name', width: 25},
    {header: 'Second person', key: 'extraPerson1', width: 25},
    {header: 'Email', key: 'email', width: 25},
    {header: 'Status', key: 'status', width: 10},
  ];
  worksheet.getRow(1).font = {bold: true};

  let extra = 0;
  let wrongFiledExtra = 0;
  arr.forEach((guest, i) => {
    worksheet.addRow({
      index: i + 1,
      name: guest?.name,
      extraPerson1: guest?.extraPerson1 ?? '',
      email: guest?.email,
      status: guest?.status
    });

    if (invalidExtraPersonName(guest?.extraPerson1)) {
      worksheet.getCell(i + 2, 3).fill =
        {
          type: 'pattern',
          pattern: 'solid',
          fgColor: {argb: 'FF2400'},
          bgColor: {argb: 'cccccc'}
        };

      wrongFiledExtra++;
    }

    if (guest?.extraPerson1?.trim()?.length) {
      extra++;
    }
  });

  worksheet.getCell('A' + (arr.length + 2)).value = 'Sum (wrong filled second person name of total):';
  worksheet.getCell('A' + (arr.length + 2)).alignment = {wrapText: true};
  worksheet.getCell('B' + (arr.length + 2)).value = arr.length;
  worksheet.getCell('C' + (arr.length + 2)).value = `${extra - wrongFiledExtra} (${wrongFiledExtra})`;
  worksheet.getRow(arr.length + 2).font = {bold: true};

  worksheet.getCell('A' + (arr.length + 3)).value = 'Total:';
  worksheet.getCell('B' + (arr.length + 3)).value = `${arr.length + extra - wrongFiledExtra} (${wrongFiledExtra})`;
  worksheet.getRow(arr.length + 3).font = {bold: true};

  worksheet.getCell('A' + (arr.length + 4)).value = 'Notes:';
  worksheet.getCell('A' + (arr.length + 4)).font = {bold: true};
  worksheet.getCell('B' + (arr.length + 4)).value = 'Red colored cells mean it was entered invalid second person name';
  worksheet.getCell('B' + (arr.length + 4)).alignment = {wrapText: true};
  worksheet.getCell('C' + (arr.length + 4)).value = '(number) - count of invalid second person name';
  worksheet.getCell('C' + (arr.length + 4)).alignment = {wrapText: true};

  const path = './excels-files/' + client.name + Date.now() + '.xlsx';
  return workbook.xlsx.writeFile(path).then(() => path);
};

export const deleteExcelFile = (path: string): void => {
  console.log(path);
  fs.unlink(path, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log('File is deleted:', path);
    }
  });
};
