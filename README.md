# Basketball Training Progress Tracker

A full-stack web application for tracking basketball and strength training progress with AI-powered analysis and personalized feedback.

## Features

- User authentication with secure JWT tokens
- Basketball stats tracking (shooting percentages, points, rebounds, etc.)
- Strength training logs (weight, bench press, squat, deadlift)
- Progress visualization with charts
- AI-powered analysis and comparisons to NBA players
- Personalized training goals and recommendations
- Responsive design for mobile and desktop

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API routes
- **Database**: SQLite with Prisma ORM
- **Authentication**: Custom JWT-based auth with HTTP-only cookies
- **AI**: OpenAI integration via AI SDK

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/yourusername/basketball-tracker.git
   cd basketball-tracker
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   \`\`\`

3. Set up the database and seed with demo data:
   \`\`\`bash
   npm run setup
   # or
   yarn setup
   # or
   pnpm setup
   \`\`\`

4. Start the development server:
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   \`\`\`

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Demo Account

After running the setup script, you can log in with these credentials:
- Email: demo@example.com
- Password: password123

## Deployment

### Deploying to Vercel

1. Push your code to a GitHub repository.

2. Connect your repository to Vercel.

3. Add the following environment variable in the Vercel dashboard:
   - `JWT_SECRET`: A strong random string for JWT token signing

4. Deploy your application.

## Security Considerations

For production use:
- Change the JWT_SECRET to a strong random string
- Implement proper password hashing with bcrypt
- Set up a more robust database like PostgreSQL
- Enable HTTPS
- Implement rate limiting for API routes

## License

This project is licensed under the MIT License - see the LICENSE file for details.
