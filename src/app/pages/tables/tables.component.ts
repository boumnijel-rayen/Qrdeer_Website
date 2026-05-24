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

  tables: TableItem[] = [
    { id: 1, name: 'Table 01', area: 'Indoor Area', status: 'available', qrImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBLgadZSTv9_YBLke3dBZzUslXN66w76nnVQZI-7S372xecRtR_TDkc6PTBVDm7Br5Fbhx2KKJfwLSRt-_JkGqygufE5tyO6Kg5t8DZpyygmwIg3NanzUT2ieGQVDwhINLIyxBQFm5zZlZQ-StFcfjqannvGpLyKCNGeUC6ersRNhAKuYOjoFxFX6d8fy5a_xX9AAhIXemAcaJX-xRkDhgKOcY2jv6xaVy5W9nxQrGFF1_x83xNupwnB0ppxoi-Q49pUuQnnIwPa74' },
    { id: 2, name: 'Table 14', area: 'Terrace', status: 'available', qrImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZVlVkm7aC1JTTHfqCbQ3klEdZ5XJD-odDdAi3k1Y_hQV2fH92OA3mf0K4FLCYgD8N50e0gkzRTvufv-QV_zB7w2wc23RuGzoOiswGtCl6gdJ6QWuMyKglkgW_cZRYVn9ca2DmV0ni-fVkN_cpshR0qQV-D88pM5MhQPhZZ5evYbhyLhlejIPc-4WPUJL5-Tcx5AsdD-vm33v93zUIvzhWGxDS9hyhvfHTW_nKJVjou7e_ZPlcEkW0Ka6mMr4nS7QpprJ8kuYJwUo' },
    { id: 3, name: 'Stool 05', area: 'Bar Area', status: 'disabled', qrImage: '' },
    { id: 4, name: 'Table 15', area: 'Terrace', status: 'available', qrImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQ1KzRzq7YiH2gilBQWAZCJm3rQY2BPXRvi5_fGj0Mxf9ZNC847wt_K_v0oeNyHqaYURHKkxK4iuvkPI1GM3bYpnMnExl_7GU-56QZqr4yWsMKJKtQI2bbirbIhSluwjHaUD_jf2y8DrhaCzxLSFpV1byxcCXJOG0MrsTKWkR1nrjSXY9CED2oBtfZwR5mMYdZjs5kqHOsOfcYrJaEAL9TvZLxwf5BgdzgHoubdfnqgjR5B6RJ2kwNdtLdxvD1Ie7zA2RpiXchXTc' },
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
