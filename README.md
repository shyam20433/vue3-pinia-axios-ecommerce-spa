# E-Commerce Single Page Application (SPA)
live~ https://shyampiniaoptionstore.vercel.app/

A modern, responsive E-Commerce web application built using **Vue 3 (Composition API)**, **Vite**, **Vue Router**, and **Pinia** for centralized state management. This project was developed as part of the NGP Internship program.

---

## 🚀 Features

### 👤 Role-Based Authentication & Navigation
- **Dual Role System**: Supports both **User** and **Admin** profiles.
- **Dynamic Views**: The system updates the UI and navigation options based on the currently logged-in user's role.
- **Protected UI Elements**: The "Manage" tab is restricted to Admins and remains hidden from standard Users.

### 🛍️ Product Catalog
- Interactive grids displaying available products (phones, laptops, accessories, etc.).
- Product information presented in neat, structured tables.
- Access control that prompts users to log in before adding items to the shopping cart.

### 🛒 Cart Management
- Real-time cart state management with Pinia.
- Option to review selected items, display dynamic prices, and delete specific products.
- Router integration that prevents checkout navigation if the cart is empty.

### ⚙️ Admin Operations Dashboard (`/manage`)
- Full **CRUD** (Create, Read, Update, Delete) capability for products:
  - **Add Products**: Introduce new items with an ID, name, price, and image URL.
  - **Edit Products**: Update existing items using pre-populated forms.
  - **Delete Products**: Remove single items or clear the entire catalog at once.
- Real-time catalog updates across all views.

### 🎨 Responsive Design & Micro-Animations
- **Mobile First**: Fully responsive layout optimized for mobile, tablet, and desktop screens.
- **Micro-Animations**: Hover-scale transitions, mechanical press effects on buttons, and smooth sliding underlines on navigation items.
- **Theme**: Crisp white cards, slate gray texts, and bright color-coded action buttons (Blue for primary/edit actions, Green for users, Red for deletes/admins).

---

## 🛠️ Technology Stack

- **Core**: Vue 3 (using `<script setup>` syntax)
- **Build Tool**: Vite
- **Routing**: Vue Router 5
- **State Management**: Pinia 3 (Centralized State)
- **Linting & Formatting**: ESLint, Oxlint, Prettier
- **Styles**: Custom Vanilla CSS (scoped within components for modularity)

---

## 📂 Directory Structure

```text
├── .vscode/               # VS Code project configurations
├── public/                # Static assets (favicons, etc.)
├── src/
│   ├── assets/            # CSS styling files & logos (main.css, base.css)
│   ├── components/        # Reusable global Vue components
│   │   ├── icons/         # SVG components
│   │   ├── AddToCartBtn.vue
│   │   ├── adminControlBtn.vue
│   │   ├── backBtn.vue
│   │   ├── NavBar.vue
│   │   ├── removeCrtBtn.vue
│   │   ├── toCartBtn.vue
│   │   └── WelcomeItem.vue/HelloWorld.vue/TheWelcome.vue
│   ├── router/            # Navigation configuration & guards
│   │   └── index.js
│   ├── stores/            # Pinia global state files
│   │   ├── auth.js        # Authentication & Role State
│   │   ├── carts.js       # Cart Item State
│   │   └── products.js    # Catalog Product State
│   ├── views/             # Main page layouts
│   │   ├── AboutView.vue
│   │   ├── cartsView.vue
│   │   ├── HomeView.vue
│   │   ├── manageProductView.vue
│   │   └── ProductView.vue
│   ├── App.vue            # Root Component
│   └── main.js            # App Entry point
├── package.json           # Scripts & package dependencies
├── vite.config.js         # Vite compilation options
└── eslint.config.js       # ESLint configurations
```

---

## ⚙️ State Management (Pinia Stores)

The application separates state into modular stores inside `src/stores/`:

1. **`auth.js`**: Manages login/logout status and stores the active user object.
   - **Getter**: `isAdmin` computes if the user has administrative privileges based on role flags.
2. **`products.js`**: Houses the initial mock database of products and handles adding or modifying items inside the collection.
3. **`carts.js`**: Controls the items added by the customer and triggers alert feedback upon additions.

---

## 🚦 Router & Guards

The application is structured into the following routes (`src/router/index.js`):
- `/` - **Home View**: Input name and select a profile (User or Admin).
- `/products` - **Product Catalog**: Show catalog grid and cart shortcut buttons.
- `/carts` - **Cart Page**: Review lists of added goods.
- `/manage` - **Management view**: Protected route accessible to Admins only.
- `/about` - **About page**: Informational lazy-loaded chunk.

### 🛡️ Navigation Guard
To provide a smooth user experience, the router has a global guard:
- **Empty Cart Guard**: Restricts navigation to the `/carts` page if the shopping cart is empty, displaying a warning notification and redirecting the client to `/products`.

---

## 🧩 Shared Components

To maintain consistent styling and behavior, the application relies on reusable UI components:
- [NavBar.vue](file:///src/components/NavBar.vue): Sticky, responsive navigation bar showing active states and welcome banners.
- [AddToCartBtn.vue](file:///src/components/AddToCartBtn.vue): Blue primary button highlighting product selection.
- [adminControlBtn.vue](file:///src/components/adminControlBtn.vue): Grouped Edit and Delete actions designed for management views.
- [backBtn.vue](file:///src/components/backBtn.vue): Slate-styled button with a sliding hover transition for going back.
- [toCartBtn.vue](file:///src/components/toCartBtn.vue): Deep slate action button directing users to the checkout view.
- [removeCrtBtn.vue](file:///src/components/removeCrtBtn.vue): Text-only button that turns red on hover for clean deletion prompts.

---

## 🏁 Getting Started

Follow these steps to run the project locally.

### 1. Installation
Clone the repository, navigate to the folder, and run:
```bash
npm install
```

### 2. Run Locally (Development Server)
Launch the Vite hot-reloading dev environment:
```bash
npm run dev
```
By default, the server runs on `http://localhost:5173`.

### 3. Build for Production
To bundle and optimize the application for deployment:
```bash
npm run build
```

### 4. Code Quality & Linting
Run the fast linters configured in the project:
- **Lint all files**: `npm run lint`
- **Lint using Oxlint**: `npm run lint:oxlint`
- **Lint using ESLint**: `npm run lint:eslint`
- **Auto-format code with Prettier**: `npm run format`
