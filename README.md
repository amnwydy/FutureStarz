# SportsPro Tracker

A comprehensive athletic performance tracking application for basketball, football, and soccer players. Track your stats, monitor progress, and get AI-powered insights to improve your game.

## Features

- **Multi-Sport Support**: Track basketball, football, and soccer statistics
- **Strength Training**: Log strength and conditioning workouts
- **Progress Analytics**: Visualize your improvement with interactive charts
- **AI-Powered Feedback**: Get intelligent analysis and recommendations
- **Goal Setting**: Set and track personalized training goals
- **Data Export**: Export your data for backup or analysis

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm or yarn

### Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/yourusername/sportspro-tracker.git
cd sportspro-tracker
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

### Building for Production

To build the application for production:

\`\`\`bash
npm run build
\`\`\`

This will create an optimized build in the `out` directory, ready for deployment to GitHub Pages.

## Deployment

This application is configured for GitHub Pages deployment. To deploy:

1. Update the `basePath` and `assetPrefix` in `next.config.mjs` with your repository name
2. Push your code to the `main` branch
3. Enable GitHub Pages in your repository settings
4. The GitHub Action will automatically build and deploy your app

## Usage

1. **Sign Up**: Create an account with your name, 4-digit PIN, and primary sport
2. **Add Stats**: Log your game and training statistics
3. **Track Progress**: View charts and analytics of your performance
4. **Get Insights**: Receive AI-powered feedback and recommendations
5. **Set Goals**: Create and track training goals

## Technology Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Charts**: Recharts
- **Storage**: localStorage (client-side)
- **Deployment**: GitHub Pages

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have questions, please open an issue on GitHub.
