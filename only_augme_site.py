from flask import Flask,render_template,request,redirect,send_from_directory
import os
import ssl

ctx = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER) # use TLS to avoid POODLE https://stackoverflow.com/questions/72306332/python3-deprecationwarning-ssl-protocol-tlsv1-2-is-deprecated-sslcontext-ssl
ctx.load_cert_chain( 'test.crt','testkey.pem')

app = Flask(__name__,static_url_path='/static')
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
app.config['TEMPLATES_AUTO_RELOAD'] = True

root = os.path.join(os.path.dirname(os.path.abspath(__file__)), "", "")

@app.route('/index')
@app.route('/INDEX')
@app.route('/')
def index():
        return send_from_directory( root, 'static/Augme/AugmeHomePage.html')

@app.route('/mindar')
def mindar():
        return send_from_directory( root, 'static/Augme/iframe_mindAR_production.html')


@app.route('/mindarcompiler')
def mindarcompiler():
        return send_from_directory( root, 'static/Augme/compiler_to_product_oneshot.html')


@app.route('/memo<info>')
def memoHandler(info):
     return str(info).strip()

@app.route('/call<info>')
def callHandler(info):
     return str(info).strip()


if __name__ == '__main__':  # pragma: no cover
    app.run(host='0.0.0.0',port=80,  ssl_context=ctx)

