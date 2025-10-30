# Setup Guide

This guide will help you set up the Prism Agent project on your local machine.

## Prerequisites

- **Python 3.12** - [Download Python](https://www.python.org/downloads/)
- **Node.js 20** (LTS version recommended) - [Download Node.js](https://nodejs.org/)
- **pnpm**

## Installation

### 1. Clone the Repository

```sh
git clone https://github.com/<username>/prism-agent.git
cd prism-agent
```

### 2. Server Setup (FastAPI)

Navigate to the server directory:

```sh
cd server
```

Create and activate a virtual environment:

**Windows:**
```sh
python -m venv venv
venv\Scripts\activate
```

**macOS/Linux:**
```sh
python3 -m venv venv
source venv/bin/activate
```

Install required packages:

```sh
pip install -r requirements.txt
```

Configure environment variables (optional):

```sh
# Create a .env file if needed
# The server will work with default settings
```

### 3. Client Setup (Next.js)

Navigate to the client directory:

```sh
cd ..\client
```

Install dependencies:

```sh
npm install
```

Or if using yarn:

```sh
yarn install
```

Configure environment variables (optional):

```sh
# Create .env.local file if you need custom API endpoints
# Example: NEXT_PUBLIC_API_URL=http://localhost:8000
```