# SportsPro Tracker

A comprehensive sports performance tracking application for basketball, football, and soccer athletes. Track your progress, analyze performance, and achieve your athletic goals with AI-powered insights.

## Features

- **Multi-Sport Support**: Track basketball, football, and soccer with sport-specific metrics
- **Performance Analytics**: Detailed charts and progress tracking
- **AI-Powered Insights**: Get personalized feedback and training recommendations
- **Strength Training**: Track gym progress with comprehensive metrics
- **Goal Setting**: Set and track personalized training goals
- **Data Export**: Export your data for external analysis
- **Responsive Design**: Works on all devices

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm or yarn

### Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/yourusername/sports-tracker.git
cd sports-tracker
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment to GitHub Pages

This app is configured for GitHub Pages deployment:

1. Update the `basePath` and `assetPrefix` in `next.config.mjs` with your repository name
2. Push to the main branch
3. GitHub Actions will automatically build and deploy to GitHub Pages

## Usage

1. **Sign Up**: Create an account with your name, 4-digit PIN, and primary sport
2. **Track Performance**: Log your game stats and training sessions
3. **View Progress**: Analyze your performance with interactive charts
4. **Get Insights**: Receive AI-powered feedback and recommendations
5. **Set Goals**: Create and track personalized training objectives

## Sports Supported

### Basketball
- Field goal percentage
- Three-point percentage
- Free throw percentage
- Points, rebounds, assists
- Steals, blocks
- Vertical jump

### Football
- Passing yards and touchdowns
- Completion percentage
- Rushing yards and touchdowns
- Tackles, sacks, interceptions
- 40-yard dash time

### Soccer
- Goals and assists
- Shots and shots on target
- Pass accuracy
- Tackles and saves
- Sprint speed

### Strength Training (All Sports)
- Body weight tracking
- Bench press, squat, deadlift
- Workout notes

## Technology Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Charts**: Recharts
- **Storage**: localStorage (client-side)
- **Deployment**: GitHub Pages

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.
