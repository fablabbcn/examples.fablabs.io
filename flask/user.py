class User:

    def __init__(self):
        self.username = None
        self.email = None
        self.id = None
        self.first_name=None
        self.last_name=None
        self.avatar_url=None

    def is_anonymous(self):
        return self.id == None

    def is_authenticated(self):
        return self.id != None
    
    def set_attributes(self,data):
        self.username = data['username']
        self.email = data['email']
        self.id = data['id']
        self.first_name = data['first_name']
        self.last_name = data['last_name']
        self.avatar_url = data['avatar_url']