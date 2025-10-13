# AiCodeExplainer

An AI-powered code explanation service that uses Nebius AI to provide simple, understandable explanations of code snippets in various programming languages.

## Features

- Code explanation using AI (Nebius GPT model)
- Support for multiple programming languages
- Rate limiting for API protection
- CORS enabled for web applications
- Security middleware with Helmet
- Environment-based configuration

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Nebius API key

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd AiCodeExplainer
```

2. Install server dependencies:
```bash
cd server
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Configure your `.env` file:
```env
CLIENT_URL=http://localhost:5173
NEBIUS_API_KEY=your_nebius_api_key_here
PORT=3000
```

## Usage

1. Start the server:
```bash
cd server
npm run dev
```

2. The server will run on `http://localhost:3000`

## API Endpoints

### POST `/api/explain-code`

## Dependencies

- `express` - Web framework
- `cors` - Cross-origin resource sharing
- `helmet` - Security middleware
- `dotenv` - Environment variables
- `express-rate-limit` - Rate limiting
- `openai` - OpenAI client (used for Nebius API)
