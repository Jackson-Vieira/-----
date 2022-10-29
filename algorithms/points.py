from string import punctuation
class PointsHelper:
    def encrypt(message):
        exclude_list = punctuation+' '
        msg = ''
        for l in message:
            msg += '.' if l not in exclude_list else l
        return msg