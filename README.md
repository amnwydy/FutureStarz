# HoopStat Pro - Basketball Training Tracker

A simple, free basketball and strength training tracker with AI-powered insights.

## Features

- **Simple Authentication**: Just enter your name and a 4-digit PIN
- **Basketball Stats Tracking**: Field goal %, 3-point %, free throws, points, rebounds, assists, steals, blocks, vertical jump
- **Strength Training Logs**: Body weight, bench press, squat, deadlift, workout notes
- **Progress Charts**: Visual tracking of your improvement over time
- **AI Analysis**: Get insights and comparisons to help improve your game
- **100% Free**: No subscriptions, no limits, no credit card required

## How It Works

1. **Login/Signup**: Enter your name and choose a 4-digit PIN
2. **View Stats**: Anyone can search by name to view stats (read-only)
3. **Edit Data**: Only you can add/edit data using your PIN
4. **Track Progress**: View charts and AI analysis of your performance

## Data Storage

- All data is stored locally in your browser (localStorage)
- No external servers or databases required
- Your PIN protects editing access
- Data is not synced across devices

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
\`\`\`bash
git clone <repository-url>
cd basketball-tracker
\`\`\`

2. Install dependencies
\`\`\`bash
npm install
\`\`\`

3. Run the development server
\`\`\`bash
npm run dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

\`\`\`bash
npm run build
npm start
\`\`\`

## Deployment

This app can be deployed to any static hosting service since it uses localStorage:

- **Vercel**: Connect your GitHub repo and deploy automatically
- **Netlify**: Drag and drop the build folder or connect via Git
- **GitHub Pages**: Build and deploy the static files
- **Any web server**: Upload the build files to your hosting provider

### Environment Variables

No environment variables are required since the app uses localStorage.

## Technology Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS + shadcn/ui components
- **Charts**: Recharts
- **Icons**: Lucide React
- **Storage**: Browser localStorage
- **Authentication**: Simple name + PIN system

## Project Structure

\`\`\`
├── app/                    # Next.js app directory
│   ├── dashboard/         # Dashboard pages
│   ├── login/            # Login page
│   └── page.tsx          # Landing page
├── components/           # React components
│   ├── ui/              # shadcn/ui components
│   └── ...              # Custom components
├── lib/                 # Utility functions
│   ├── auth.ts         # Authentication logic
│   └── data.ts         # Data management
└── public/             # Static assets
\`\`\`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## Support

For questions or issues, please open a GitHub issue or contact the development team.
