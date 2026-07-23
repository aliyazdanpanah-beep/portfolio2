from fastapi import FastAPI

app = FastAPI()

@app.get('/')
async def say_wellcom():
   return {'masseg':"wellcomen"}