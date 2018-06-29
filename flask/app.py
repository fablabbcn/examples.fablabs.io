from flask import Flask
from flask import render_template,flash,redirect,url_for
from oauth import OAuthSignIn
from user import User
from flask import Flask, session
from flask_session import Session

app = Flask(__name__)
app.secret_key = 'super secret key'
app.config['SESSION_TYPE'] = 'filesystem'
sess = Session()
sess.init_app(app)

app.debug = True

app.config['OAUTH_CREDENTIALS'] = {
    'fablabs': {
        'id': '62e374fc7ddf2bca5a417543f9906e2e4cc24236fb2a2b5a0b1a1f58ade07347',
        'secret': '7129e9792564fc8087b361531651f87a70c2826d017fc1d02edc17864f98ea1b'
    }
}

def login_user(data):
    curr = User()
    curr.set_attributes(data['attributes'])
    session['current_user']=curr

def logout_user():
    session['current_user']= User()

def current_user():
    curr = session.get('current_user', User())
    session['current_user']= curr
    return curr

@app.route('/')
def index():
    return render_template('index.html',current_user=current_user())

@app.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('index'))

@app.route('/auth/authorize')
def oauth_authorize():
    if not current_user().is_anonymous:
        return redirect(url_for('index'))
    oauth = OAuthSignIn.get_provider('fablabs')
    return oauth.authorize()

@app.route('/auth/callback')
def oauth_callback():
    if not current_user().is_anonymous:
        return redirect(url_for('index'))
    oauth = OAuthSignIn.get_provider('fablabs')
    try:
        result = oauth.callback()
    except:
        result = {}
    data = result.get('data',None)
    if data is None:
        flash('Authentication failed.')
        return redirect(url_for('index'))
    login_user(data)
    return redirect(url_for('index'))
    

@app.route('/login')
def login():
    return 'Login'

@app.route('/profile')
def profile():
    return 'Profile'



