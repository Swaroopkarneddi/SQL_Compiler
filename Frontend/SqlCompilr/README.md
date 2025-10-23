# SQL Compiler Frontend

A professional, responsive SQL compiler frontend built with React and CSS.

## Features

- **Interactive SQL Query Editor**: Write and execute SQL queries with syntax highlighting
- **Database Browser**: Explore database tables, view schemas, and sample data
- **Real-time Results**: View query results in a beautiful, responsive table format
- **Error Handling**: Comprehensive error messages and loading states
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Professional UI**: Modern glassmorphism design with smooth animations

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- Your Django backend running on `http://localhost:8000`

### Installation

1. Navigate to the frontend directory:

   ```bash
   cd Frontend/SqlCompilr
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## API Integration

The frontend integrates with your Django backend API endpoints:

- `POST /api/sqlrunner/execute/` - Execute SQL queries
- `GET /api/sqlrunner/tables/` - Get list of database tables
- `GET /api/sqlrunner/table/<table_name>/` - Get table schema and sample data

## Features Overview

### Database Browser

- View all available tables in your database
- Click on any table to see its schema and sample data
- Primary keys are highlighted for easy identification

### SQL Query Editor

- Write SQL queries with a clean, monospace font
- Execute queries with a single click
- View results in a professional table format
- Clear error messages for debugging

### Responsive Design

- Desktop: Side-by-side layout with sidebar and main content
- Tablet: Stacked layout with full-width components
- Mobile: Optimized for touch interaction

## Styling

The application uses pure CSS with:

- CSS Grid and Flexbox for layouts
- CSS Custom Properties for theming
- Smooth transitions and animations
- Glassmorphism design elements
- Responsive breakpoints

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Development

To build for production:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```
