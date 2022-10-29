import string
from random import choices as random_choices

class PasswordGenerator:
    def gen(length=32, symbols=True, uppercase=True, lowercase=True, digits=True):
        characters = ''
        if symbols:
            characters += string.punctuation
        if digits:
            characters += string.digits
        if uppercase:
            characters += string.ascii_uppercase
        if lowercase:
            characters += string.ascii_lowercase
        
        return ''.join(random_choices(list(characters), k=length))