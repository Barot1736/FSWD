# 🍳 Recipe Sharing Platform

A full-stack MERN application for sharing and discovering delicious recipes.

## Features

- **Add Recipes**: Share your favorite recipes with ingredients and instructions
- **View Recipes**: Browse all shared recipes in a beautiful grid layout
- **Delete Recipes**: Remove recipes you no longer want to share
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Real-time Updates**: Instant updates when recipes are added or deleted

## Tech Stack

- **Frontend**: React.js with responsive CSS
- **Backend**: Node.js with Express.js
- **Database**: MongoDB with Mongoose
- **Styling**: Custom CSS with gradients and animations

## Installation

### Backend Setup
```bash
cd backend
npm install
npm start
```

### Frontend Setup
```bash
cd frontend
npm start
```

### Database Setup
Make sure MongoDB is running on your system:
```bash
mongod
```

## API Endpoints

- `GET /api/recipes` - Get all recipes
- `POST /api/recipes` - Add new recipe
- `DELETE /api/recipes/:id` - Delete recipe

## Firebase Deployment

1. Build the React app:
```bash
cd frontend
npm run build
```

2. Install Firebase CLI:
```bash
npm install -g firebase-tools
```

3. Initialize Firebase:
```bash
firebase init
```

4. Deploy:
```bash
firebase deploy
```

## GitHub Repository

This project is available on GitHub to showcase MERN stack development skills.

## Screenshots

- Modern gradient design
- Card-based recipe layout
- Responsive mobile interface
- Clean form design

## Future Enhancements

- User authentication
- Recipe categories
- Search functionality
- Recipe ratings
- Image uploads

---

Built with ❤️ using MERN Stack