# pip3 install -U PyCryptodome
# ord() formart(int, 'b'), encode('UTF-8') and decode('UTF-8')

import base64

from Crypto.Cipher import Salsa20

class SalsaHelper():
    def __init__(self, key):
        self.key = self.key(key)


    def key(key):
        if len(key) < 32:
            # make a better key
            pass

    def encrypt(self, message):
        cipher = Salsa20.new(key=self.key)
        message = cipher.nonce + cipher.encrypt(message.encode("utf-8"))
        return base64.b64encode( message ).decode("utf-8")

    def decrypt(self, message, k):
        message = base64.b64decode(message.encode("utf-8"))
        message_nonce = message[:8]
        message_crypt = message[8:]
        cipher = Salsa20.new(key=k, nonce=message_nonce)

        try:
            return cipher.decrypt( message_crypt).decode("utf-8");

        except UnicodeDecodeError:
            return "Algo inesperado aconteceu e não foi possivel concluir a operação!"