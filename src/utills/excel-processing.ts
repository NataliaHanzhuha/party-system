import Excel from 'exceljs';
import fs from 'fs';
import { Client, Guest } from '@prisma/client';

export const excelDoc = (arr: Guest[], client: Client) => {
  let workbook = new Excel.Workbook();
  let worksheet = workbook.addWorksheet('Guests List');

  worksheet.columns = [
    {header: '#', key: 'index', width: 5},
    {header: 'Guest name', key: 'name', width: 25},
    {header: 'Extra person', key: 'extraPerson1', width: 25},
    {header: 'Status', key: 'status', width: 10},
  ];

  let extra = 0;
  arr.forEach((guest, i) => {
    // delete guest.email;
    worksheet.addRow({
      index: i + 1,
      name: guest.name,
      extraPerson1: guest?.extraPerson1 ?? '-',
      status: guest?.status
    });

    if (guest?.extraPerson1?.trim()?.length) {
      extra++;
    }
  });
  worksheet.getCell('A' + (arr.length + 2)).value = 'Sum:';
  worksheet.getCell('B' + (arr.length + 2)).value = arr.length;
  worksheet.getCell('C' + (arr.length + 2)).value = extra;
  worksheet.getCell('A' + (arr.length + 3)).value = 'Total:';
  worksheet.getCell('B' + (arr.length + 3)).value = arr.length + extra;
  worksheet.getRow(1).font = {bold: true};
  worksheet.getRow(arr.length + 2).font = {bold: true};
  worksheet.getRow(arr.length + 3).font = {bold: true};
  const path = './excels-files/' + client.name + Date.now() + '.xlsx';
  return workbook.xlsx.writeFile(path).then(() => path);
};

export const deleteExcelFile = (path: string): void => {
  console.log(path);
  fs.unlink(path,  (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log('File is deleted:', path);
    }
  });
};
