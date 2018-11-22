import asyncio
import datetime
import random
import json
import uuid
import websockets

USERS = set()

async def register(websocket):
    print('Register',websocket)
    USERS.add(websocket)
    await asyncio.wait([websocket.send('Nice to meet you')])



async def time(websocket, path):
    await register(websocket)
    async for message in websocket:
        data = json.loads(message)
        print(data)
    # while True:
    #     now = datetime.datetime.utcnow().isoformat() + 'Z'
    #     await websocket.send(now)
    #     await asyncio.sleep(random.random() * 3)

start_server = websockets.serve(time, '127.0.0.1', 5678)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()