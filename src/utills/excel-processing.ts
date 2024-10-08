import Excel from 'exceljs';
import fs from 'fs';
import { Client, Guest } from '@prisma/client';
import { invalidExtraPersonName } from '@/src/utills/invalid-extra-person-name';


export const excelDoc = (arr: Guest[], client: Client, wishes: any[]) => {
  let workbook = new Excel.Workbook();
  let worksheet = workbook.addWorksheet('Guests List');

  worksheet.columns = [
    {header: '#', key: 'index', width: 20},
    {header: 'Guest name', key: 'name', width: 25},
    {header: 'Second person', key: 'extraPerson1', width: 25},
    {header: 'Email', key: 'email', width: 25},
    // {header: 'Status', key: 'status', width: 10},
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
      // status: guest?.status
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

  worksheet.getCell('A' + (arr.length + 2)).value = 'Total number of guests:';
  worksheet.getCell('A' + (arr.length + 2)).alignment = {wrapText: true};
  worksheet.getCell('B' + (arr.length + 2)).value = `${arr.length} (guests)`;
  worksheet.getCell('C' + (arr.length + 2)).value = `${extra} (additional guests)`;
  worksheet.getRow(arr.length + 2).font = {bold: true};

  worksheet.getCell('A' + (arr.length + 3)).value = 'Total:';
  worksheet.getCell('B' + (arr.length + 3)).value = `${arr.length + extra}`;
  worksheet.getRow(arr.length + 3).font = {bold: true};
  worksheet.mergeCells(arr.length + 3, 2, arr.length + 3, 3 );
  worksheet.getCell('B' + (arr.length + 3)).alignment = {
    vertical: 'middle', horizontal: 'center', wrapText: true
  };

  worksheet.getCell('A' + (arr.length + 4)).value = 'Notes:';
  worksheet.getCell('A' + (arr.length + 4)).font = {bold: true};
  worksheet.getCell('B' + (arr.length + 4)).value = 'Red colored cells mean entry is invalid';
  worksheet.getCell('B' + (arr.length + 4)).alignment = {wrapText: true};
  // worksheet.getCell('C' + (arr.length + 4)).value = '(number) - count of invalid second person name';
  // worksheet.getCell('C' + (arr.length + 4)).alignment = {wrapText: true};

  let wishesPage = workbook.addWorksheet('Guests Wishes');
  wishesPage.columns = [
    {header: '#', key: 'index', width: 10},
    {header: 'Guest name', key: 'name', width: 25},
    {header: 'Wish', key: 'text', width: 50},
  ];
  wishesPage.getRow(1).font = {bold: true};

  wishes.forEach((wish, i) => {
    wishesPage.addRow({
      index: i + 1,
      name: wish?.name,
      text: wish?.text,
    });
    wishesPage.getCell('B' + (i + 1)).font = {bold: true};
    wishesPage.getCell('B' + (i + 1)).alignment = {wrapText: true};
    wishesPage.getCell('C' + (i + 1)).alignment = {wrapText: true};
  })

  wishesPage.addRow({index: '', name: ''});

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
