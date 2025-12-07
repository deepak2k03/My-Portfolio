# Deepak Singh - MERN Portfolio

A modern, minimalist, highly interactive personal portfolio website built with the MERN stack. Features dark/light mode toggle, smooth animations, interview experiences, and comprehensive project showcases.

## 🚀 Features

- **Modern Design**: Minimalist UI with glassmorphism effects and gradient backgrounds
- **Dark/Light Mode**: Seamless theme switching with localStorage persistence
- **Fully Responsive**: Optimized for mobile, tablet, and desktop devices
- **Interactive Animations**: Framer Motion powered animations and micro-interactions
- **Interview Experiences**: Detailed interview writeups with search and filtering
- **Project Showcase**: Interactive project cards with modal details
- **Contact Form**: Functional contact form with email notifications
- **Skills Display**: Categorized skills with proficiency indicators
- **Experience Timeline**: Professional experience timeline
- **SEO Optimized**: Meta tags and semantic HTML

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Hook Form** - Form handling
- **React Hot Toast** - Notification system
- **Lucide React** - Icon library
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **Nodemailer** - Email service
- **Express Validator** - Input validation
- **Helmet** - Security middleware
- **Rate Limiting** - API rate limiting

## 📦 Project Structure

```
My-Portfolio/
├── client/                     # React frontend
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   │   ├── common/        # Navbar, Footer, etc.
│   │   │   ├── layout/        # HeroSection, etc.
│   │   │   ├── skills/        # Skill components
│   │   │   ├── projects/      # Project components
│   │   │   ├── interviews/    # Interview components
│   │   │   └── contact/       # Contact components
│   │   ├── pages/             # Page components
│   │   ├── context/           # React context
│   │   ├── hooks/             # Custom hooks
│   │   ├── utils/             # Utility functions
│   │   ├── data/              # Static data
│   │   └── styles/            # CSS files
│   ├── public/                # Static files
│   └── package.json
├── server/                     # Express backend
│   ├── src/
│   │   ├── controllers/       # Route controllers
│   │   ├── models/           # Mongoose models
│   │   ├── routes/           # API routes
│   │   ├── middleware/       # Custom middleware
│   │   ├── utils/           # Utility functions
│   │   ├── config/          # Configuration files
│   │   └── server.js        # Server entry point
│   └── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local installation or MongoDB Atlas)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/deepak/My-Portfolio.git
   cd My-Portfolio
   ```

2. **Install root dependencies**
   ```bash
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd client
   npm install
   ```

4. **Install server dependencies**
   ```bash
   cd ../server
   npm install
   ```

### Environment Setup

1. **Set up server environment variables**
   ```bash
   # In server/.env
   cp server/.env.example server/.env
   ```

   Edit `server/.env` with your configuration:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/portfolio
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   ```

2. **Set up client environment variables**
   ```bash
   # In client/.env
   cp client/.env.example client/.env
   ```

   Edit `client/.env` with your configuration:
   ```env
   VITE_API_URL=http://localhost:5000/api
   VITE_EMAIL=deepak.singh@example.com
   VITE_LINKEDIN=https://linkedin.com/in/deepak
   VITE_GITHUB=https://github.com/deepak
   ```

### Running the Application

1. **Start MongoDB**
   - Make sure MongoDB is running on your system
   - Or use MongoDB Atlas connection string

2. **Start the application**
   ```bash
   # From the root directory
   npm run dev
   ```

   This will start both the frontend and backend concurrently:
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000

3. **Alternatively, run them separately**
   ```bash
   # Backend
   cd server && npm run dev

   # Frontend (in another terminal)
   cd client && npm run dev
   ```

## 📝 Available Scripts

### Root Directory
- `npm run dev` - Start both client and server
- `npm run client` - Start only the client
- `npm run server` - Start only the server
- `npm run build` - Build the client for production
- `npm start` - Start the production server

### Client Directory
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Server Directory
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm test` - Run tests

## 🎨 Customization

### Personal Information

Update the personal information in `client/src/data/staticData.js`:

```javascript
export const personalInfo = {
  name: "Your Name",
  title: "Your Title",
  description: "Your description",
  email: "your.email@example.com",
  location: "Your Location"
}
```

### Skills and Projects

- **Skills**: Update `client/src/data/skillsData.js`
- **Projects**: Update `client/src/data/projectsData.js`
- **Interviews**: Add through the API or MongoDB

### Styling

- **Colors**: Modify Tailwind configuration in `client/tailwind.config.js`
- **Animations**: Adjust Framer Motion animations in components
- **Typography**: Update font settings in CSS files

## 📧 Email Configuration

For the contact form to work, configure email settings:

1. **Gmail Configuration**:
   - Enable 2-factor authentication
   - Generate an app password
   - Use app password in `EMAIL_PASS` environment variable

2. **Alternative Email Services**:
   - Update `EMAIL_HOST` and `EMAIL_PORT` accordingly
   - Modify authentication in `server/src/utils/emailService.js`

## 🗄️ Database Setup

### Local MongoDB
```bash
# Install MongoDB
sudo apt-get install mongodb  # Ubuntu
brew install mongodb-community  # macOS

# Start MongoDB
sudo systemctl start mongod

# Create database (optional - auto-created on first connection)
```

### MongoDB Atlas
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get connection string
4. Update `MONGODB_URI` in server `.env`

## 🚀 Deployment

### Frontend Deployment (Vercel/Netlify)

1. **Build the application**:
   ```bash
   cd client
   npm run build
   ```

2. **Deploy to Vercel**:
   ```bash
   npm install -g vercel
   vercel --prod
   ```

3. **Deploy to Netlify**:
   - Drag and drop the `dist` folder to Netlify
   - Or use Netlify CLI

### Backend Deployment (Heroku/AWS)

1. **Prepare for production**:
   ```bash
   # Build client
   cd client && npm run build

   # Set production environment variables
   export NODE_ENV=production
   export PORT=8080
   ```

2. **Deploy to Heroku**:
   ```bash
   heroku create your-app-name
   git push heroku main
   heroku config:set NODE_ENV=production
   ```

3. **Deploy to AWS**:
   - Use AWS Elastic Beanstalk
   - Or EC2 with PM2

## 🧪 Testing

```bash
# Backend tests
cd server
npm test

# Frontend tests (if configured)
cd client
npm test
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Framer Motion for amazing animations
- Tailwind CSS for excellent styling
- React for the UI framework
- MongoDB for the database
- All the open source packages used

## 📞 Contact

- **Portfolio**: [https://your-portfolio-url.com](https://your-portfolio-url.com)
- **Email**: deepak.singh@example.com
- **LinkedIn**: [https://linkedin.com/in/deepak](https://linkedin.com/in/deepak)
- **GitHub**: [https://github.com/deepak](https://github.com/deepak)

---

Built with ❤️ using React, Node.js & MongoDB
