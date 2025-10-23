# SQL Compiler Frontend

A modern, responsive React application for executing SQL queries and exploring database structures. Built with Vite, React, and styled with modern CSS.

## 🚀 Features

- **SQL Query Execution**: Execute SQL queries with real-time results
- **Database Browser**: Interactive sidebar to explore database tables
- **Table Schema Viewer**: View table structures, column types, and primary keys
- **Sample Data Preview**: Preview table data with sample rows
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI**: Glassmorphism design with smooth animations
- **Auto-selection**: Automatically selects the first table on load
- **Error Handling**: Comprehensive error messages and loading states

## 🛠️ Tech Stack

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and development server
- **Axios** - HTTP client for API communication
- **CSS3** - Modern styling with flexbox and grid
- **ESLint** - Code linting and formatting

## 📦 Installation

1. **Navigate to the frontend directory:**

   ```bash
   cd Frontend/SqlCompilr
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**

   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:5173` (or the port shown in terminal)

## 🏗️ Project Structure

```
Frontend/SqlCompilr/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   └── react.svg
│   ├── App.css          # Main application styles
│   ├── App.jsx          # Main application component
│   ├── index.css        # Global styles
│   └── main.jsx         # Application entry point
├── package.json
├── vite.config.js
└── README.md
```

## 🎨 UI Components

### Main Layout

- **Header**: Application title and description
- **Sidebar**: Two-box layout for database exploration
- **Main Content**: SQL query editor and results

### Sidebar Components

- **Tables Box**: List of available database tables
- **Selected Table Box**: Schema and sample data for selected table

### Query Interface

- **Query Editor**: Multi-line textarea for SQL input
- **Action Buttons**: Execute and Clear buttons
- **Results Display**: Formatted table results or success messages

## 🔧 Configuration

### API Configuration

The application connects to the backend API at:

```javascript
const API_BASE = "http://127.0.0.1:8000/api";
```

### Available Endpoints

- `GET /api/tables/` - Fetch all database tables
- `GET /api/table/{tableName}/` - Get table schema and sample data
- `POST /api/execute/` - Execute SQL queries

## 📱 Responsive Design

### Desktop (1024px+)

- Sidebar: 450px width with two stacked boxes
- Main content: Flexible width
- Full feature set available

### Tablet (768px - 1024px)

- Sidebar: Full width with horizontal layout
- Main content: Below sidebar
- Optimized touch interactions

### Mobile (768px and below)

- Sidebar: Full width, stacked vertically
- Main content: Full width below sidebar
- Touch-optimized buttons and inputs

## 🎯 Key Features

### Database Browser

- **Auto-selection**: First table selected automatically
- **Interactive Tables**: Click to view table details
- **Schema Information**: Column names, types, and primary keys
- **Sample Data**: Preview of table contents

### Query Execution

- **Syntax Highlighting**: Monospace font for SQL
- **Error Handling**: Clear error messages
- **Loading States**: Visual feedback during execution
- **Results Display**: Formatted table output

### User Experience

- **Smooth Animations**: Hover effects and transitions
- **Glassmorphism Design**: Modern translucent UI
- **Hidden Scrollbars**: Clean appearance with maintained functionality
- **Keyboard Navigation**: Full keyboard accessibility

## 🚀 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Development Server

- **Hot Reload**: Automatic refresh on file changes
- **Fast HMR**: Instant updates without page reload
- **Error Overlay**: Clear error messages in browser

## 🎨 Styling

### Design System

- **Color Palette**: Purple gradient theme (#667eea to #764ba2)
- **Typography**: Segoe UI for text, Monaco for code
- **Spacing**: Consistent 1rem base unit
- **Border Radius**: 8px-16px for modern look

### CSS Architecture

- **Global Styles**: `index.css` for base styles
- **Component Styles**: `App.css` for application-specific styles
- **Responsive**: Mobile-first approach with media queries
- **Animations**: CSS transitions and keyframes

## 🔗 Backend Integration

The frontend communicates with a Django REST API backend:

### Required Backend Endpoints

```python
# Django views needed:
- TablesView: GET /api/tables/
- TableDetailView: GET /api/table/{tableName}/
- ExecuteQueryView: POST /api/execute/
```

### API Response Formats

```javascript
// Tables response
{
  "tables": ["table1", "table2", "table3"]
}

// Table details response
{
  "schema": [
    {"name": "id", "type": "INTEGER", "pk": true},
    {"name": "name", "type": "TEXT", "pk": false}
  ],
  "samples": [
    {"id": 1, "name": "Sample"},
    {"id": 2, "name": "Data"}
  ]
}

// Query execution response
{
  "columns": ["id", "name"],
  "rows": [
    {"id": 1, "name": "Sample"},
    {"id": 2, "name": "Data"}
  ]
}
```

## 🐛 Troubleshooting

### Common Issues

1. **API Connection Error**: Ensure backend server is running on port 8000
2. **CORS Issues**: Check backend CORS configuration
3. **Build Errors**: Clear node_modules and reinstall dependencies

### Development Tips

- Use browser dev tools for debugging
- Check network tab for API requests
- Use React DevTools for component inspection

## 📄 License

This project is part of the SQL Compiler application. See the main project README for license information.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For issues and questions:

- Check the troubleshooting section
- Review the backend API documentation
- Ensure all dependencies are installed correctly
