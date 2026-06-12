import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TableService, TableItem } from './table.service';

@Component({
  selector: 'app-tables',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './tables.component.html',
  styleUrl: './tables.component.css'
})
export class TablesComponent implements OnInit {
  activeFilter = 'all';
  filters = ['All Tables', 'Active', 'Disabled'];

  readonly standardQrImage = 'qr-standard.png';

  tables: TableItem[] = [];

  constructor(private tableService: TableService) {}

  ngOnInit() {
    this.tables = this.tableService.getTables();
  }

  get filteredTables(): TableItem[] {
    if (this.activeFilter === 'all') return this.tables;
    if (this.activeFilter === 'Active') return this.tables.filter(t => t.status === 'available');
    return this.tables.filter(t => t.status === 'disabled');
  }

  setFilter(f: string): void {
    if (f === 'All Tables') this.activeFilter = 'all';
    else this.activeFilter = f;
  }

  toggleTableStatus(table: TableItem): void {
    table.status = table.status === 'available' ? 'disabled' : 'available';
  }
}
