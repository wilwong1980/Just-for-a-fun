import asyncio
import json
import logging
import websockets

logging.basicConfig()

STATE = {'value': 0}
USERS = set()

logging.error(STATE)
logging.error(USERS)

def state_event():
    return json.dumps({'type': 'state', **STATE})


def user_event():
    return json.dumps({'type': 'users', 'count': len(USERS)})


async def notify_state():
    if USERS:
        message = state_event()
        print(message)
        await asyncio.wait([user.send(message) for user in USERS])


async def notify_users():
    if USERS:
        message = user_event()
        print(message)
        await asyncio.wait([user.send(message) for user in USERS])


async def register(websocket):
    print('Register',websocket)
    USERS.add(websocket)
    await notify_users()


async def unregister(websocket):
    print('Unregister',websocket)
    USERS.remove(websocket)
    await notify_users()


async def counter(websocket, path):
    print('Ccounter',websocket)
    await register(websocket)
    try:
        await websocket.send(state_event())
        async for message in websocket:
            data = json.loads(message)
            if data['action'] == 'minus':
                STATE['value'] -= 1
                await notify_state()
            elif data['action'] == 'plus':
                STATE['value'] += 1
                await notify_state()
            else:
                logging.error("unsupported event: {}", data)
    finally:
        await unregister(websocket)


start_server = websockets.serve(counter, '127.0.0.1', 5678)
asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
