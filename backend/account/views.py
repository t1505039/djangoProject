from account.models import Account
from account.serializers import AccountSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from backend.sqlAlchemy.connection import sqlalchemy_session

class LoginViews(APIView):
    def post(self, request):
        session = sqlalchemy_session()

        account = session.query(Account).\
            filter_by(email=request.data.get('email')).\
            filter_by(password=request.data.get('password')).one_or_none()

        if(account is not None):
            serializer = AccountSerializer(account)
            session.close()
            return Response({'id': serializer.data.get('id')})
        else:
            session.close()
            return Response(status=status.HTTP_404_NOT_FOUND)

class AccountViews(APIView):
    def get(self,request, id):
            session = sqlalchemy_session()
            account = session.query(Account).\
                filter_by(id=id).one_or_none()
    
            if account is not None:
                serializer = AccountSerializer(account)
                session.close()
                return Response(serializer.data)

            session.close()
            raise Http404
    
    def post(self, request):
        serializer = AccountSerializer(data=request.data)

        if serializer.is_valid():
            session = sqlalchemy_session()
            account = Account(**serializer.validated_data)
            session.add(account)
            session.commit()
            id = account.id
            session.close()
            return Response({'id': id}, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, id):
        session = sqlalchemy_session()
        account = session.query(Account).\
            filter_by(id=id).one_or_none()
        
        if account is None:
            session.close()
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = AccountSerializer(account, data=request.data)

        if serializer.is_valid():
            for key, value in serializer.validated_data.items():
                setattr(account, key, value)

            session.commit()
            id = account.id
            session.close()
            return Response({'id': serializer.data.get('id')}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)