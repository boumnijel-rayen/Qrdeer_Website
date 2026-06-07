import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface TableItem {
  id: number;
  name: string;
  area: string;
  status: 'available' | 'disabled';
  qrImage: string;
}

@Component({
  selector: 'app-tables',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './tables.component.html',
  styleUrl: './tables.component.css'
})
export class TablesComponent {
  activeFilter = 'all';
  filters = ['All Tables', 'Active', 'Disabled'];

  readonly standardQrImage = 'qr-standard.png';

  tables: TableItem[] = [
    { id: 1, name: 'Table 01', area: 'Indoor Area', status: 'available', qrImage: this.standardQrImage },
    { id: 2, name: 'Table 14', area: 'Terrace', status: 'available', qrImage: this.standardQrImage },
    { id: 3, name: 'Stool 05', area: 'Bar Area', status: 'disabled', qrImage: '' },
    { id: 4, name: 'Table 15', area: 'Terrace', status: 'available', qrImage: this.standardQrImage },
  ];

  get filteredTables(): TableItem[] {
    if (this.activeFilter === 'all') return this.tables;
    if (this.activeFilter === 'Active') return this.tables.filter(t => t.status === 'available');
    return this.tables.filter(t => t.status === 'disabled');
  }

  setFilter(f: string): void {
    if (f === 'All Tables') this.activeFilter = 'all';
    else this.activeFilter = f;
  }
}
