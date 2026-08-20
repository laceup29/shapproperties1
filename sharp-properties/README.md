# Sharp Properties — Real Estate, Construction & Design

A complete full-stack website for Sharp Properties, built with Node.js, Express.js and vanilla HTML/CSS/JavaScript.

## Features

- Premium dark charcoal + gold design
- 10 fully functional pages
- Responsive design (mobile to 1920px+)
- Contact form with backend API
- Email notification via Nodemailer
- MongoDB integration (optional)
- Server-side validation
- Security middleware (Helmet, CORS, rate limiting)
- Scroll animations
- Project portfolio with filtering
- Dynamic project detail pages

## Technology Stack

### Frontend
- HTML5, CSS3, Vanilla JavaScript
- CSS Grid, Flexbox, CSS Variables
- IntersectionObserver animations
- Fetch API for backend communication

### Backend
- Node.js + Express.js
- MongoDB + Mongoose (optional)
- Nodemailer for email
- express-validator for validation
- Helmet for security
- CORS, rate limiting

## Installation

```bash
npm install
```

## Environment Variables

Copy `.env.example` to `.env` and configure:

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/sharp-properties
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
CONTACT_EMAIL=info.sharpproperrties@gmail.com
NODE_ENV=development
```

## Development

```bash
npm run dev
```

Opens at `http://localhost:3000`

## Production

```bash
npm start
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| POST | `/api/contact` | Submit contact inquiry |
| GET | `/api/projects` | Get all projects |
| GET | `/api/projects/:id` | Get project by ID |

## Pages

| Page | URL | Description |
|------|-----|-------------|
| Home | `/` | Full homepage with 9 sections |
| About | `/about` | Company overview |
| Services | `/services` | Service details |
| Projects | `/projects` | Project portfolio |
| Project Details | `/project-details?id=project-01` | Individual project page |
| Team | `/team` | Team members |
| Contact | `/contact` | Contact form |
| Privacy | `/privacy` | Privacy policy |
| Terms | `/terms` | Terms & conditions |
| 404 | Any invalid URL | Page not found |

## How to Add Projects

Edit `public/js/data/projects-data.js` and add a new object to the `PROJECTS` array:

```javascript
{
  id: 'project-05',
  title: 'New Project Title',
  category: 'Construction',
  location: 'Faisalabad, Pakistan',
  overview: 'Project overview text...',
  scope: ['Task 1', 'Task 2'],
  process: ['Step 1', 'Step 2'],
  details: {
    type: 'Residential',
    area: '1000 sq ft',
    status: 'Completed',
    duration: '6 Months'
  },
  image: 'project-05.jpg'
}
```

## How to Replace Images

Place your images in `public/assets/images/` with the recommended filenames:

- `hero-construction.jpg` — Homepage hero background
- `about-main.jpg` — About section image
- `service-contracting.jpg` — General Contracting service
- `service-renovation.jpg` — Renovation service
- `service-design-build.jpg` — Design & Build service
- `service-infrastructure.jpg` — Infrastructure service
- `service-safety.jpg` — Security & Safety service
- `project-01.jpg` through `project-04.jpg` — Project images
- `team-placeholder.jpg` — Team member photos
- `cta-background.jpg` — CTA section background

## Company Information

Edit the following files to update company information:

- `public/js/data/team-data.js` — Team members
- `public/js/data/projects-data.js` — Projects
- `public/js/data/services-data.js` — Services
- HTML files — Contact details, addresses, phone numbers

## Project Structure

```
sharp-properties/
├── server.js
├── package.json
├── .env
├── .env.example
├── .gitignore
├── config/
│   └── database.js
├── models/
│   └── Inquiry.js
├── routes/
│   ├── contactRoutes.js
│   └── apiRoutes.js
├── controllers/
│   └── contactController.js
├── middleware/
│   ├── errorHandler.js
│   └── validation.js
├── public/
│   ├── index.html
│   ├── about.html
│   ├── services.html
│   ├── projects.html
│   ├── project-details.html
│   ├── team.html
│   ├── contact.html
│   ├── privacy.html
│   ├── terms.html
│   ├── 404.html
│   ├── css/
│   │   ├── style.css
│   │   ├── responsive.css
│   │   └── animations.css
│   ├── js/
│   │   ├── main.js
│   │   ├── navigation.js
│   │   ├── animations.js
│   │   ├── projects.js
│   │   ├── contact.js
│   │   └── data/
│   │       ├── projects-data.js
│   │       ├── services-data.js
│   │       └── team-data.js
│   └── assets/
│       ├── images/
│       ├── logos/
│       └── icons/
└── uploads/
```

## License

UNLICENSED — Sharp Properties
