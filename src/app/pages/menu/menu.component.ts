import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuService, MenuCategory, MenuItem, SizePrice } from './menu.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {
  categories: MenuCategory[] = [];
  mode: 'preview' | 'edit' = 'preview';
  searchQuery = '';

  // Category expand/collapse state
  expandedCategories: Set<number> = new Set();

  // Modal state
  showCategoryModal = false;
  showItemModal = false;
  showDeleteModal = false;

  // Category form
  editingCategory: MenuCategory | null = null;
  categoryForm = { name: '', description: '' };

  // Item form
  editingItem: MenuItem | null = null;
  editingItemCategoryId: number | null = null;
  itemForm = {
    name: '',
    description: '',
    image: '',
    available: true,
    pricingType: 'single' as 'single' | 'multiple',
    price: 0,
    sizes: [] as SizePrice[]
  };

  // Delete confirm
  deleteTarget: { type: 'category' | 'item'; categoryId: number; itemId?: number; name: string } | null = null;

  // Drag and drop
  dragType: 'category' | 'item' | null = null;
  dragCategoryId: number | null = null;
  dragItemId: number | null = null;
  dragOverCategoryId: number | null = null;
  dragOverItemId: number | null = null;

  // Dropdown menu
  openMenuId: string | null = null;

  constructor(private menuService: MenuService) { }

  ngOnInit(): void {
    this.loadCategories();
    // Expand all categories by default
    this.categories.forEach(c => this.expandedCategories.add(c.id));
  }

  loadCategories(): void {
    this.categories = this.menuService.getCategories();
  }

  // ── Mode ──
  setMode(mode: 'preview' | 'edit'): void {
    this.mode = mode;
    this.openMenuId = null;
  }

  // ── Search ──
  get filteredCategories(): MenuCategory[] {
    if (!this.searchQuery.trim()) return this.categories;
    const q = this.searchQuery.toLowerCase();
    return this.categories
      .map(cat => ({
        ...cat,
        items: cat.items.filter(item =>
          item.name.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q)
        )
      }))
      .filter(cat => cat.items.length > 0 || cat.name.toLowerCase().includes(q));
  }

  // ── Category expand/collapse ──
  toggleCategory(id: number): void {
    if (this.expandedCategories.has(id)) {
      this.expandedCategories.delete(id);
    } else {
      this.expandedCategories.add(id);
    }
  }

  isCategoryExpanded(id: number): boolean {
    return this.expandedCategories.has(id);
  }

  // ── Category CRUD ──
  openAddCategory(): void {
    this.editingCategory = null;
    this.categoryForm = { name: '', description: '' };
    this.showCategoryModal = true;
  }

  openEditCategory(cat: MenuCategory, event: Event): void {
    event.stopPropagation();
    this.editingCategory = cat;
    this.categoryForm = { name: cat.name, description: cat.description };
    this.showCategoryModal = true;
    this.openMenuId = null;
  }

  saveCategory(): void {
    if (!this.categoryForm.name.trim()) return;
    if (this.editingCategory) {
      this.menuService.updateCategory(this.editingCategory.id, this.categoryForm);
    } else {
      const newCat = this.menuService.addCategory(this.categoryForm);
      this.expandedCategories.add(newCat.id);
    }
    this.loadCategories();
    this.showCategoryModal = false;
  }

  confirmDeleteCategory(cat: MenuCategory, event: Event): void {
    event.stopPropagation();
    this.deleteTarget = { type: 'category', categoryId: cat.id, name: cat.name };
    this.showDeleteModal = true;
    this.openMenuId = null;
  }

  // ── Item CRUD ──
  openAddItem(categoryId: number): void {
    this.editingItem = null;
    this.editingItemCategoryId = categoryId;
    this.itemForm = {
      name: '', description: '', image: '', available: true,
      pricingType: 'single', price: 0, sizes: []
    };
    this.showItemModal = true;
  }

  openEditItem(categoryId: number, item: MenuItem, event: Event): void {
    event.stopPropagation();
    this.editingItem = item;
    this.editingItemCategoryId = categoryId;
    this.itemForm = {
      name: item.name,
      description: item.description,
      image: item.image,
      available: item.available,
      pricingType: item.pricingType,
      price: item.price,
      sizes: item.sizes.map(s => ({ ...s }))
    };
    this.showItemModal = true;
    this.openMenuId = null;
  }

  saveItem(): void {
    if (!this.itemForm.name.trim() || this.editingItemCategoryId === null) return;
    if (this.editingItem) {
      this.menuService.updateItem(this.editingItemCategoryId, this.editingItem.id, this.itemForm);
    } else {
      this.menuService.addItem(this.editingItemCategoryId, this.itemForm);
    }
    this.loadCategories();
    this.showItemModal = false;
  }

  confirmDeleteItem(categoryId: number, item: MenuItem, event: Event): void {
    event.stopPropagation();
    this.deleteTarget = { type: 'item', categoryId, itemId: item.id, name: item.name };
    this.showDeleteModal = true;
    this.openMenuId = null;
  }

  // ── Delete confirm ──
  executeDelete(): void {
    if (!this.deleteTarget) return;
    if (this.deleteTarget.type === 'category') {
      this.menuService.deleteCategory(this.deleteTarget.categoryId);
    } else if (this.deleteTarget.itemId !== undefined) {
      this.menuService.deleteItem(this.deleteTarget.categoryId, this.deleteTarget.itemId);
    }
    this.loadCategories();
    this.showDeleteModal = false;
    this.deleteTarget = null;
  }

  // ── Size management ──
  addSize(): void {
    this.itemForm.sizes.push({ name: '', price: 0 });
  }

  removeSize(index: number): void {
    this.itemForm.sizes.splice(index, 1);
  }

  // ── Image management ──
  onImageSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.itemForm.image = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage(): void {
    this.itemForm.image = '';
  }

  // ── Toggle availability ──
  toggleAvailability(categoryId: number, item: MenuItem, event: Event): void {
    event.stopPropagation();
    this.menuService.updateItem(categoryId, item.id, { available: !item.available });
    this.loadCategories();
    this.openMenuId = null;
  }

  // ── Drag & Drop: Categories ──
  onCategoryDragStart(event: DragEvent, cat: MenuCategory): void {
    this.dragType = 'category';
    this.dragCategoryId = cat.id;
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('text/plain', `category-${cat.id}`);
    }
  }

  onCategoryDragOver(event: DragEvent, cat: MenuCategory): void {
    if (this.dragType !== 'category') return;
    event.preventDefault();
    if (event.dataTransfer) event.dataTransfer.dropEffect = 'move';
    this.dragOverCategoryId = cat.id;
  }

  onCategoryDrop(event: DragEvent, targetCat: MenuCategory): void {
    event.preventDefault();
    if (this.dragType !== 'category' || this.dragCategoryId === null) return;
    if (this.dragCategoryId === targetCat.id) return;

    const ids = this.categories.map(c => c.id);
    const fromIdx = ids.indexOf(this.dragCategoryId);
    const toIdx = ids.indexOf(targetCat.id);
    ids.splice(fromIdx, 1);
    ids.splice(toIdx, 0, this.dragCategoryId);

    this.menuService.reorderCategories(ids);
    this.loadCategories();
    this.resetDrag();
  }

  // ── Drag & Drop: Items ──
  onItemDragStart(event: DragEvent, categoryId: number, item: MenuItem): void {
    event.stopPropagation();
    this.dragType = 'item';
    this.dragCategoryId = categoryId;
    this.dragItemId = item.id;
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('text/plain', `item-${item.id}`);
    }
  }

  onItemDragOver(event: DragEvent, categoryId: number, item: MenuItem): void {
    event.stopPropagation();
    if (this.dragType !== 'item' || this.dragCategoryId !== categoryId) return;
    event.preventDefault();
    if (event.dataTransfer) event.dataTransfer.dropEffect = 'move';
    this.dragOverItemId = item.id;
  }

  onItemDrop(event: DragEvent, categoryId: number, targetItem: MenuItem): void {
    event.stopPropagation();
    event.preventDefault();
    if (this.dragType !== 'item' || this.dragCategoryId !== categoryId || this.dragItemId === null) return;
    if (this.dragItemId === targetItem.id) return;

    const cat = this.categories.find(c => c.id === categoryId);
    if (!cat) return;

    const ids = cat.items.sort((a, b) => a.order - b.order).map(i => i.id);
    const fromIdx = ids.indexOf(this.dragItemId);
    const toIdx = ids.indexOf(targetItem.id);
    ids.splice(fromIdx, 1);
    ids.splice(toIdx, 0, this.dragItemId);

    this.menuService.reorderItems(categoryId, ids);
    this.loadCategories();
    this.resetDrag();
  }

  onDragEnd(): void {
    this.resetDrag();
  }

  private resetDrag(): void {
    this.dragType = null;
    this.dragCategoryId = null;
    this.dragItemId = null;
    this.dragOverCategoryId = null;
    this.dragOverItemId = null;
  }

  // ── Dropdown menu ──
  toggleMenu(id: string, event: Event): void {
    event.stopPropagation();
    this.openMenuId = this.openMenuId === id ? null : id;
  }

  @HostListener('document:click')
  closeMenus(): void {
    this.openMenuId = null;
  }

  // ── Helpers ──
  getSortedItems(cat: MenuCategory): MenuItem[] {
    return [...cat.items].sort((a, b) => a.order - b.order);
  }

  getItemCount(cat: MenuCategory): number {
    return cat.items.length;
  }

  getAvailableCount(cat: MenuCategory): number {
    return cat.items.filter(i => i.available).length;
  }

  getTotalItems(): number {
    return this.categories.reduce((sum, c) => sum + c.items.length, 0);
  }

  getTotalAvailable(): number {
    return this.categories.reduce((sum, c) => sum + c.items.filter(i => i.available).length, 0);
  }

  formatPrice(price: number): string {
    return price.toFixed(2);
  }

  closeModals(): void {
    this.showCategoryModal = false;
    this.showItemModal = false;
    this.showDeleteModal = false;
  }

  onBackdropClick(event: Event): void {
    if ((event.target as HTMLElement).classList.contains('modal-backdrop')) {
      this.closeModals();
    }
  }

  trackByCategoryId(_index: number, cat: MenuCategory): number {
    return cat.id;
  }

  trackByItemId(_index: number, item: MenuItem): number {
    return item.id;
  }

  trackBySizeIndex(index: number): number {
    return index;
  }
}
