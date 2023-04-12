from fastapi import FastAPI
from stravalib.client import Client
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()
client = Client()

# Environment Variables
CLIENT_ID = os.getenv('CLIENT_ID')
CLIENT_SECRET = os.getenv('CLIENT_SECRET')
REDIRECT_URL = os.getenv('REDIRECT_URL')


@app.get("/")
def read_root():
    authorize_url = client.authorization_url(
        client_id=CLIENT_ID, redirect_uri=REDIRECT_URL)
    return {"url": authorize_url}


@app.get("/authorised/")
def get_code(code=None):
    token_response = client.exchange_code_for_token(
        client_id=CLIENT_ID, client_secret=CLIENT_SECRET, code=code)
    access_token = token_response['access_token']
    refresh_token = token_response['refresh_token']
    expires_at = token_response['expires_at']

    return {"access_token": access_token, "refresh_token": refresh_token, "expires_at": expires_at}