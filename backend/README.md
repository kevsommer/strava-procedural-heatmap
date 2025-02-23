# Backend - Strava Procedural Heatmap

This is the backend for the Strava Procedural Heatmap, built using FastAPI.

## Prerequisites

Ensure you have the following installed:
- Python 3.9+
- [pip](https://pip.pypa.io/en/stable/)

## Installation

```sh
pip install pipenv
pipenv install --system --deploy
```

## Running in Development Mode

1. Ensure your environment variables are set up. Create a `.env` file if necessary:
   ```sh
   CLIENT_ID=...
   CLIENT_SECRET=...
   REDIRECT_URL=http://localhost:3001/auth/
   ```
   - `CLIENT_ID` and `CLIENT_SECRET` are provided when configuring the Strava API on your Strava account.
   - `REDIRECT_URL` should point to the frontend authentication endpoint.

2. Start the FastAPI server:
   ```sh
   uvicorn main:app --reload
   ```

## Running Tests

To run tests, execute:
```sh
pytest
```
