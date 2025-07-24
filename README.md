<<<<<<< HEAD
# 🍷 LiquorLink - Premium Liquor Marketplace

A modern, responsive web application for discovering and purchasing premium liquors from local retailers. Built with React, Vite, and Tailwind CSS.

## ✨ Features

### 🔍 **Advanced Search**
- Real-time search with instant results
- Search by product name, type, or category
- Beautiful search overlay with backdrop blur
- Mobile-responsive search interface

### 🏪 **Store Discovery**
- Browse local liquor stores
- Store ratings and reviews
- Location-based filtering
- Store profiles with detailed information

### 🛒 **Product Catalog**
- Extensive liquor collection (whisky, wine, beer, vodka, etc.)
- Product filtering and sorting
- Detailed product information
- Price comparison across stores

### 👤 **User Experience**
- Modern, premium UI design
- Responsive design for all devices
- User authentication system
- Personal account management
- Shopping cart functionality

### 🎨 **Design System**
- Glassmorphism effects with backdrop blur
- Gradient color schemes
- Smooth animations and transitions
- Dark mode support
- Accessibility-compliant design

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd liquorlink
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.jsx          # App layout wrapper
│   └── pages/              # Page components
│       ├── HomePage.jsx
│       ├── ProductListingPage.jsx
│       └── StoreListingPage.jsx
├── components/
│   ├── layout/             # Layout components
│   │   └── Header.jsx      # Main navigation header
│   └── icons/              # SVG icon components
├── features/
│   ├── categories/         # Category-related components
│   ├── homepage/           # Homepage sections
│   └── stores/             # Store-related components
├── lib/
│   └── placeholder-data.js # Sample data for development
└── assets/                 # Static assets
```

## 🛠️ Built With

- **[React](https://reactjs.org/)** - Frontend framework
- **[Vite](https://vitejs.dev/)** - Build tool and dev server
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[React Router](https://reactrouter.com/)** - Client-side routing
- **[PostCSS](https://postcss.org/)** - CSS processing

## 🎯 Key Components

### Header Component
- **Search Functionality**: Advanced search with real-time results
- **Navigation**: Responsive navigation with mobile menu
- **User Account**: Account dropdown with user management
- **Shopping Cart**: Cart with item counter

### Search System
- **Desktop Search**: Overlay search with backdrop blur
- **Mobile Search**: Slide-down search interface
- **Search Results**: Instant product suggestions
- **Search Submit**: Multiple ways to execute search

### Responsive Design
- **Mobile-First**: Optimized for mobile devices
- **Tablet Support**: Perfect tablet experience
- **Desktop Enhanced**: Rich desktop features

## 🎨 Styling

The project uses a modern design system with:

- **Color Palette**: Purple/indigo gradients with professional grays
- **Typography**: Clean, readable font hierarchy
- **Spacing**: Consistent spacing scale
- **Animations**: Smooth transitions and micro-interactions
- **Glassmorphism**: Modern glass-like effects

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔧 Development Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 🌟 Features in Detail

### Search Functionality
- **Real-time Search**: Instant results as you type
- **Category Filtering**: Search within specific product categories
- **Smart Suggestions**: Intelligent product recommendations
- **Search History**: Remember recent searches

### User Interface
- **Modern Design**: Clean, professional appearance
- **Smooth Animations**: Engaging micro-interactions
- **Accessibility**: WCAG compliant design
- **Performance**: Optimized for fast loading

### Mobile Experience
- **Touch Optimized**: Perfect touch interactions
- **Responsive Layout**: Adapts to all screen sizes
- **Mobile Navigation**: Intuitive mobile menu
- **Fast Performance**: Optimized for mobile networks

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy to Netlify
1. Build the project: `npm run build`
2. Upload the `dist/` folder to Netlify
3. Configure redirects for SPA routing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Design inspiration from modern e-commerce platforms
- Icons from Heroicons and custom SVG designs
- Color palette inspired by premium brand aesthetics

## 📞 Support

For support, email support@liquorlink.com or join our Slack channel.

---

**Made with ❤️ by the LiquorLink Team**
=======
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
>>>>>>> 7f37fea (new design)
