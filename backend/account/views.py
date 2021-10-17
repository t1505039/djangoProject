from account.models import Account
from account.serializers import AccountSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class LoginViews(APIView):
    def post(self, request):
        account = Account.objects.get(email=request.data.get('email'))
        if(account.password == request.data.get('password')):
            serializer = AccountSerializer(account)
            return Response({'id': serializer.data.get('id')})
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)

class AccountViews(APIView):
    def userList(self, request):
        accounts = Account.objects.all()
        serializer = AccountSerializer(accounts, many=True)
        return Response(serializer.data)

    def get(self,request, id):
        try:
            account = Account.objects.get(pk=id)
            serializer = AccountSerializer(account)
            return Response(serializer.data)
        except Account.DoesNotExist:
            raise Http404
    
    def post(self, request):
        serializer = AccountSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response({'id': serializer.data.get('id')}, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, id):
        try:
            account = Account.objects.get(pk=id)
        except Account.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = AccountSerializer(account, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response({'id': serializer.data.get('id')}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)