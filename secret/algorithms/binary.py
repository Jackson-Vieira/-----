class BinaryHelper:
    def encrypt(text):
        """Convert text to binary"""
        return ' '.join(format(char, 'b') for char in bytearray(text, 'utf-8'))

    def decrypt(text):
        """Convert binary to text"""
        return ''.join([chr(int(number,2)) for number in text.split()])