class CesarHelper:
    def encrypt(text, jump=1):
        text = text.upper()
        result = ''
        alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        for char in text:
            if char in alpha:
                char_index = (alpha.find(char)+jump)%26
                result += alpha[char_index]
            else:
                result += char

        return result

    def decrypt(text, jump=1):
        text = text.upper()
        result = ''
        alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        for char in text:
            if char in alpha:
                char_index = (alpha.find(char)-jump)%26
                result += alpha[char_index]
            else:
                result += char
            
        return result