import { Injectable } from '@angular/core';

export interface TableItem {
  id: number;
  name: string;
  area: string;
  status: 'available' | 'disabled';
  qrImage: string;
}

@Injectable({
  providedIn: 'root'
})
export class TableService {
  private tables: TableItem[] = [
    { id: 1, name: 'Table 01', area: 'Indoor Area', status: 'available', qrImage: 'qr-standard.png' },
    { id: 2, name: 'Table 14', area: 'Terrace', status: 'available', qrImage: 'qr-standard.png' },
    { id: 3, name: 'Stool 05', area: 'Bar Area', status: 'disabled', qrImage: '' },
    { id: 4, name: 'Table 15', area: 'Terrace', status: 'available', qrImage: 'qr-standard.png' },
  ];

  getTables(): TableItem[] {
    return this.tables;
  }

  addTable(table: Partial<TableItem>) {
    const newId = this.tables.length > 0 ? Math.max(...this.tables.map(t => t.id)) + 1 : 1;
    this.tables.push({
      id: newId,
      name: table.name || '',
      area: table.area || 'Indoor Area',
      status: (table.status as 'available' | 'disabled') || 'available',
      qrImage: 'qr-standard.png'
    });
  }
}
