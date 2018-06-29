import json

from rauth import OAuth1Service, OAuth2Service
from flask import current_app, url_for, request, redirect, session


class OAuthSignIn(object):
    providers = None

    def __init__(self, provider_name):
        self.provider_name = provider_name
        credentials = current_app.config['OAUTH_CREDENTIALS'][provider_name]
        self.consumer_id = credentials['id']
        self.consumer_secret = credentials['secret']

    def authorize(self):
        pass

    def callback(self):
        pass

    def get_callback_url(self):
        return url_for('oauth_callback', provider=self.provider_name,
                       _external=True)

    @classmethod
    def get_provider(self, provider_name):
        if self.providers is None:
            self.providers = {}
            for provider_class in self.__subclasses__():
                provider = provider_class()
                self.providers[provider.provider_name] = provider
        return self.providers[provider_name]


class FablabsSignin(OAuthSignIn):

    def __init__(self):
        super(FablabsSignin,self).__init__('fablabs')
        self.service = OAuth2Service(
            name='fablabs',
            client_id=self.consumer_id,
            client_secret=self.consumer_secret,
            authorize_url='http://www.fablabs.local:3000/oauth/authorize',
            access_token_url='http://www.fablabs.local:3000/oauth/token',
            base_url='http://api.fablabs.local:3000/2/'
        )
    def authorize(self):
        return redirect(self.service.get_authorize_url(
            response_type='code',
            redirect_uri=self.get_callback_url())
        )
    def callback(self):
        if 'code' not in request.args:
            return None
        print request.args['code']
        oauth_session = self.service.get_auth_session(
            data={'code': request.args['code'],
                  'grant_type': 'authorization_code',
                  'redirect_uri': self.get_callback_url()},
                  decoder=json.loads
        )
   
        me = oauth_session.get('users/me').json()
        return me