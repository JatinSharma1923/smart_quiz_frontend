# Smart Quiz Frontend Setup Guide

This project supports both **Next.js** and **React** frameworks. Choose the one that best fits your needs.

## 🚀 Quick Start

### Option 1: Next.js (Recommended)

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
npm start
```

### Option 2: React (Alternative)

```bash
# Install dependencies
npm install

# Start development server
npm run react-dev

# Build for production
npm run react-build
```

## 📁 Project Structure

### Next.js Structure (Primary)

```
app/
├── layout.tsx          # Root layout
├── page.tsx            # Landing page
└── globals.css         # Global styles

components/              # TypeScript components
├── Navbar.tsx
├── Hero.tsx
├── Features.tsx
├── Testimonials.tsx
├── CTA.tsx
└── Footer.tsx
```

### React Structure (Alternative)

```
src/
├── App.js              # Main React app
├── index.js            # Entry point
├── components/         # JavaScript components
│   ├── Navbar.js
│   └── QuizCard.js
├── pages/              # React pages
│   ├── Home.js
│   ├── Login.js
│   ├── Profile.js
│   └── Quiz.js
├── services/           # API services
│   ├── api.js
│   └── firebase.js
└── styles/
    └── tailwind.css
```

## 🎯 Framework Comparison

| Feature                | Next.js                     | React                       |
| ---------------------- | --------------------------- | --------------------------- |
| **SEO**                | ✅ Server-side rendering    | ❌ Client-side only         |
| **Performance**        | ✅ Optimized out of the box | ⚠️ Requires optimization    |
| **Learning Curve**     | ⚠️ Moderate                 | ✅ Easy                     |
| **Setup**              | ✅ Simple                   | ✅ Simple                   |
| **TypeScript**         | ✅ Built-in                 | ⚠️ Manual setup             |
| **File-based Routing** | ✅ Automatic                | ❌ Manual with React Router |

## 🔧 Configuration Files

### Shared Configuration

- `package.json` - Dependencies for both frameworks
- `tailwind.config.js` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration
- `.eslintrc.js` - Linting rules
- `.prettierrc` - Code formatting

### Next.js Specific

- `next.config.js` - Next.js configuration
- `app/` - App Router directory

### React Specific

- `public/index.html` - HTML template
- `src/` - Source code directory

## 🎨 Styling

Both frameworks use the same styling approach:

- **Tailwind CSS** for utility classes
- **Custom CSS** in `globals.css` (Next.js) or `src/styles/tailwind.css` (React)
- **Dark mode** support
- **Responsive design** with mobile-first approach

## 🚀 Deployment

### Next.js Deployment

```bash
# Vercel (Recommended)
npm run build
vercel --prod

# Netlify
npm run build
# Deploy .next folder

# Self-hosted
npm run build
npm start
```

### React Deployment

```bash
# Netlify (Recommended)
npm run react-build
# Deploy build folder

# Vercel
npm run react-build
vercel --prod

# Self-hosted
npm run react-build
# Serve build folder
```

## 🔄 Migration Guide

### From React to Next.js

1. Move components from `src/components/` to `components/`
2. Convert `.js` files to `.tsx`
3. Update imports to use Next.js conventions
4. Replace React Router with Next.js file-based routing

### From Next.js to React

1. Move components from `components/` to `src/components/`
2. Convert `.tsx` files to `.js`
3. Set up React Router for client-side routing
4. Update imports to use React conventions

## 🛠️ Development Tips

### Next.js Tips

- Use `'use client'` directive for client components
- Leverage server components for better performance
- Use Next.js Image component for optimization
- Take advantage of automatic code splitting

### React Tips

- Use React Router for navigation
- Implement lazy loading for better performance
- Use React.memo for component optimization
- Consider using React Query for data fetching

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://reactjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)

## 🆘 Troubleshooting

### Common Issues

1. **Port conflicts**: Change port in package.json scripts
2. **TypeScript errors**: Run `npm install` to ensure all types are installed
3. **Tailwind not working**: Check `tailwind.config.js` content paths
4. **Build errors**: Clear cache with `npm run build -- --no-cache`

### Getting Help

- Check the console for error messages
- Verify all dependencies are installed
- Ensure Node.js version is 18+
- Clear npm cache: `npm cache clean --force`
