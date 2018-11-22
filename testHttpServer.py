import datetime
import tornado.ioloop
import tornado.web
import tornado.escape
import jwt

secret_str = 'asdasdasdxxxsa_-123123123009klskjlbl'


class MainHandler(tornado.web.RequestHandler):
    # def set_default_headers(self):
    #     print('set headers!!')
    #     self.set_header('Access-Control-Allow-Origin', '*')
    #     self.set_header('Access-Control-Allow-Headers', '*')
    #     self.set_header('Access-Control-Max-Age', 1000)
    #     self.set_header('Content-type', 'application/json')
    #     self.set_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
    #     self.set_header('Access-Control-Allow-Headers',
    #                     'Content-Type, Access-Control-Allow-Origin, Access-Control-Allow-Headers, X-Requested-By, Access-Control-Allow-Methods')
    def get(self):
        self.write("Hello, world")

    def OPTIONS(self):
        pass

    def post(self):
        data = tornado.escape.json_decode(self.request.body)
        encoded_jwt = jwt.encode(
            {'exp': datetime.datetime.utcnow() + datetime.timedelta(seconds=30), 'user_id': '100001'}, secret_str,
            algorithm='HS256')
        self.write({'message_type': 'SignIn', 'status': 'success', 'token': encoded_jwt.decode('utf8')})


def make_app():
    return tornado.web.Application([
        (r"/SignIn", MainHandler),
    ])


if __name__ == "__main__":
    app = make_app()
    app.listen(8888)
    tornado.ioloop.IOLoop.current().start()
