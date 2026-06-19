import { Injectable } from '@angular/core';

export interface SizePrice {
  name: string;
  price: number;
}

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  image: string;
  available: boolean;
  pricingType: 'single' | 'multiple';
  price: number;
  sizes: SizePrice[];
  order: number;
}

export interface MenuCategory {
  id: number;
  name: string;
  description: string;
  order: number;
  items: MenuItem[];
}

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private nextCategoryId = 100;
  private nextItemId = 1000;

  private categories: MenuCategory[] = [
    {
      id: 1, name: 'Starters', description: 'Light bites to begin your meal', order: 0,
      items: [
        { id: 1, name: 'Bruschetta Trio', description: 'Toasted ciabatta with tomato basil, mushroom truffle, and smoked salmon toppings', image: 'menu/bruschetta_trio.png', available: true, pricingType: 'single', price: 12.50, sizes: [], order: 0 },
        { id: 2, name: 'Crispy Calamari', description: 'Golden fried squid rings served with lemon aioli and marinara sauce', image: 'menu/crispy_calamari.png', available: true, pricingType: 'single', price: 14.00, sizes: [], order: 1 },
        { id: 3, name: 'Soup of the Day', description: 'Chef\'s freshly prepared soup served with artisan bread', image: 'menu/soup_of_the_day.png', available: true, pricingType: 'multiple', price: 0, sizes: [{ name: 'Cup', price: 7.00 }, { name: 'Bowl', price: 10.50 }], order: 2 },
        { id: 4, name: 'Caesar Salad', description: 'Romaine lettuce, parmesan shavings, croutons, and classic Caesar dressing', image: 'menu/caesar_salad.png', available: false, pricingType: 'multiple', price: 0, sizes: [{ name: 'Side', price: 8.00 }, { name: 'Full', price: 14.00 }], order: 3 },
      ]
    },
    {
      id: 2, name: 'Main Courses', description: 'Signature dishes crafted with passion', order: 1,
      items: [
        { id: 5, name: 'Grilled Ribeye Steak', description: '300g prime ribeye with roasted vegetables and peppercorn sauce', image: 'menu/grilled_ribeye.png', available: true, pricingType: 'single', price: 38.00, sizes: [], order: 0 },
        { id: 6, name: 'Pan-Seared Salmon', description: 'Atlantic salmon fillet with dill cream sauce, asparagus, and crushed potatoes', image: 'menu/pan_seared_salmon.png', available: true, pricingType: 'single', price: 28.50, sizes: [], order: 1 },
        { id: 7, name: 'Truffle Mushroom Risotto', description: 'Arborio rice slow-cooked with wild mushrooms, truffle oil, and aged parmesan', image: 'menu/truffle_risotto.png', available: true, pricingType: 'single', price: 24.00, sizes: [], order: 2 },
        { id: 8, name: 'Chicken Parmesan', description: 'Herb-crusted chicken breast with mozzarella, tomato sauce, and spaghetti', image: 'menu/chicken_parmesan.png', available: true, pricingType: 'single', price: 22.00, sizes: [], order: 3 },
      ]
    },
    {
      id: 3, name: 'Pizza', description: 'Wood-fired Neapolitan style pizzas', order: 2,
      items: [
        { id: 9, name: 'Margherita', description: 'San Marzano tomato, fresh mozzarella, basil, and extra-virgin olive oil', image: 'menu/margherita_pizza.png', available: true, pricingType: 'multiple', price: 0, sizes: [{ name: 'Small 10"', price: 14.00 }, { name: 'Medium 12"', price: 18.00 }, { name: 'Large 14"', price: 22.00 }], order: 0 },
        { id: 10, name: 'Prosciutto e Funghi', description: 'Parma ham, wild mushrooms, mozzarella, and truffle oil drizzle', image: 'menu/prosciutto_pizza.png', available: true, pricingType: 'multiple', price: 0, sizes: [{ name: 'Small 10"', price: 17.00 }, { name: 'Medium 12"', price: 21.00 }, { name: 'Large 14"', price: 26.00 }], order: 1 },
        { id: 11, name: 'Quattro Formaggi', description: 'Mozzarella, gorgonzola, fontina, and parmesan on a garlic base', image: 'menu/quattro_formaggi.png', available: false, pricingType: 'multiple', price: 0, sizes: [{ name: 'Small 10"', price: 16.00 }, { name: 'Medium 12"', price: 20.00 }, { name: 'Large 14"', price: 24.00 }], order: 2 },
      ]
    },
    {
      id: 4, name: 'Desserts', description: 'Sweet endings to a perfect meal', order: 3,
      items: [
        { id: 12, name: 'Tiramisu', description: 'Classic Italian dessert with mascarpone cream, espresso-soaked ladyfingers, and cocoa', image: 'menu/tiramisu_dessert.png', available: true, pricingType: 'single', price: 12.00, sizes: [], order: 0 },
        { id: 13, name: 'Crème Brûlée', description: 'Vanilla bean custard with a caramelized sugar crust', image: 'menu/creme_brulee.png', available: true, pricingType: 'single', price: 11.00, sizes: [], order: 1 },
        { id: 14, name: 'Chocolate Fondant', description: 'Warm dark chocolate cake with a molten center, served with vanilla gelato', image: 'menu/chocolate_fondant.png', available: true, pricingType: 'single', price: 13.50, sizes: [], order: 2 },
      ]
    },
    {
      id: 5, name: 'Drinks', description: 'Refreshments and beverages', order: 4,
      items: [
        { id: 15, name: 'Fresh Orange Juice', description: 'Freshly squeezed orange juice', image: 'menu/orange_juice.png', available: true, pricingType: 'multiple', price: 0, sizes: [{ name: 'Small', price: 5.00 }, { name: 'Large', price: 7.50 }], order: 0 },
        { id: 16, name: 'Espresso', description: 'Double-shot Italian espresso', image: 'menu/espresso_coffee.png', available: true, pricingType: 'single', price: 4.00, sizes: [], order: 1 },
        { id: 17, name: 'Sparkling Water', description: 'Premium sparkling mineral water', image: 'menu/sparkling_water.png', available: true, pricingType: 'multiple', price: 0, sizes: [{ name: '330ml', price: 3.50 }, { name: '750ml', price: 6.00 }], order: 2 },
        { id: 18, name: 'House Red Wine', description: 'Smooth Italian Montepulciano d\'Abruzzo', image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&h=400&fit=crop', available: true, pricingType: 'multiple', price: 0, sizes: [{ name: 'Glass', price: 9.00 }, { name: 'Carafe', price: 22.00 }, { name: 'Bottle', price: 35.00 }], order: 3 },
      ]
    },
  ];

  getCategories(): MenuCategory[] {
    return this.categories.sort((a, b) => a.order - b.order);
  }

  addCategory(data: { name: string; description: string }): MenuCategory {
    const cat: MenuCategory = {
      id: this.nextCategoryId++,
      name: data.name,
      description: data.description,
      order: this.categories.length,
      items: []
    };
    this.categories.push(cat);
    return cat;
  }

  updateCategory(id: number, data: { name: string; description: string }): void {
    const cat = this.categories.find(c => c.id === id);
    if (cat) {
      cat.name = data.name;
      cat.description = data.description;
    }
  }

  deleteCategory(id: number): void {
    this.categories = this.categories.filter(c => c.id !== id);
    this.categories.forEach((c, i) => c.order = i);
  }

  reorderCategories(ids: number[]): void {
    ids.forEach((id, index) => {
      const cat = this.categories.find(c => c.id === id);
      if (cat) cat.order = index;
    });
  }

  addItem(categoryId: number, data: Partial<MenuItem>): MenuItem | null {
    const cat = this.categories.find(c => c.id === categoryId);
    if (!cat) return null;
    const item: MenuItem = {
      id: this.nextItemId++,
      name: data.name || '',
      description: data.description || '',
      image: data.image || '',
      available: data.available !== undefined ? data.available : true,
      pricingType: data.pricingType || 'single',
      price: data.price || 0,
      sizes: data.sizes || [],
      order: cat.items.length
    };
    cat.items.push(item);
    return item;
  }

  updateItem(categoryId: number, itemId: number, data: Partial<MenuItem>): void {
    const cat = this.categories.find(c => c.id === categoryId);
    if (!cat) return;
    const item = cat.items.find(i => i.id === itemId);
    if (!item) return;
    Object.assign(item, data);
  }

  deleteItem(categoryId: number, itemId: number): void {
    const cat = this.categories.find(c => c.id === categoryId);
    if (!cat) return;
    cat.items = cat.items.filter(i => i.id !== itemId);
    cat.items.forEach((item, i) => item.order = i);
  }

  reorderItems(categoryId: number, itemIds: number[]): void {
    const cat = this.categories.find(c => c.id === categoryId);
    if (!cat) return;
    itemIds.forEach((id, index) => {
      const item = cat.items.find(i => i.id === id);
      if (item) item.order = index;
    });
  }

  searchItems(query: string): { category: MenuCategory; item: MenuItem }[] {
    const q = query.toLowerCase();
    const results: { category: MenuCategory; item: MenuItem }[] = [];
    for (const cat of this.categories) {
      for (const item of cat.items) {
        if (item.name.toLowerCase().includes(q) || item.description.toLowerCase().includes(q)) {
          results.push({ category: cat, item });
        }
      }
    }
    return results;
  }
}
