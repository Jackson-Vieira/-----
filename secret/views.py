from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from algorithms.binary import BinaryHelper
from algorithms.cesar import CesarHelper
from algorithms.gen import PasswordGenerator
from algorithms.salsa20 import SalsaHelper
from algorithms.points import PointsHelper

# HELPERS
binary_helper = BinaryHelper
cesar_helper = CesarHelper
password_helper = PasswordGenerator
salsa_helper = SalsaHelper
points_helper = PointsHelper

class PasswordAPIView(APIView): # Gen password
    def get(self, request):
        data = {
            'password':password_helper.gen()
        }
        return Response(data=data)

class BinaryAPIView(APIView): # Binario
    def post(self, request):
        query_params = request.query_params
        type = query_params.get("type")
        data = {}
        if type:
            if type == 'encode':
                data = {
                    'message': binary_helper.encrypt(request.data.get("message"))
                }
            elif type == 'decode':
                data = {
                    'message': binary_helper.decrypt(request.data.get("message"))
                }
        return Response(data=data, status=status.HTTP_200_OK)

class CifraAPIVIew(APIView): # Cifra de Cesar
    def post(self, request):
        query_params = request.query_params
        type = query_params.get("type")
        data = {}

        if type:
            if type == 'encode':
                data = {
                    'message': cesar_helper.encrypt(request.data.get("message"))
                }
            elif type  == 'decode':
                data = {
                    'message': cesar_helper.decrypt(request.data.get("message"))
                }
        return Response(data=data, status=status.HTTP_200_OK)

class PointsAPIView(APIView): # Points
    def post(self, request):
        query_params = request.query_params
        type = query_params.get("type")
        data = {}
        if type == 'encode':
            data = {
                'message' : points_helper.encrypt(request.data.get("message"))
            }

        return Response(data=data, status=status.HTTP_200_OK)
        
class CSAPIView(APIView): # Chave simétrica
    def post(self, request):
        query_params = request.query_params
        type = query_params.get("type")
        data = {}

        if type == "encode":
            key = password_helper.gen(length=32)
            data = {
                "message": salsa_helper.encrypt(request.data.get("message"), key),
                "key": key,
            }
        elif type == "decode":
            key = request.data.get("key")
            message = request.data.get("message")
            data = {
                "message": salsa_helper.decrypt(message, key)
            }
       
        return Response(data=data, status=status.HTTP_200_OK)