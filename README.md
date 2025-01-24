# nextjs-universal-api-demo

This is a demo application showcasing the Universal API for Real Estate CRMs from Rollout. The app is built using Next.js 13 and demonstrates how to integrate and use Rollout's Universal API to interact with various real estate CRM systems.

## Features

- Integration with Rollout's Universal API
- Authentication using Rollout Link
- Fetching and displaying people data from connected CRMs
- Adding new contacts to the CRM

## Tech Stack

- Next.js 13
- React
- TypeScript
- Tailwind CSS

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up your environment variables:
   - Copy `.env.example` to a new file called `.env`
   - Update the following variables in `.env`:
     - `ROLLOUT_ISSUER_ID`: Your Rollout issuer ID
     - `ROLLOUT_JWT_SECRET`: Your JWT signing secret
4. Run the development server: `npm run dev`

For more detailed instructions and API usage, please refer to the Rollout documentation.

## License

MIT License