from account.models import Account, Avatar
from account.serializers import AccountSerializer, AvatarSerializer
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
    def getData(self,account, avatar):
        data = {
            'first_name': account.first_name,
            'last_name': account.last_name,
            'date_of_birth': account.date_of_birth,
            'email': account.email,
            'password': account.password,
            'avatar': avatar.avatar,
        }

        return data
    def get(self,request, id):
            session = sqlalchemy_session()
            data = session.query(Account, Avatar).\
                filter(Account.id == Avatar.account_id).\
                filter_by(id=id).one_or_none()
            if data is not None:
                session.close()
                account, avatar = data

                return Response(self.getData(account, avatar))

            session.close()
            raise Http404
    
    def post(self, request):
        accountSerializer = AccountSerializer(data=request.data.get('account'))
        avatarSerializer = AvatarSerializer(data=request.data.get('avatar'))

        if accountSerializer.is_valid() and avatarSerializer.is_valid():
            session = sqlalchemy_session()
            account = Account(**accountSerializer.validated_data)
            account.avatars = Avatar(**avatarSerializer.validated_data)
            session.add(account)
            session.commit()
            id = account.id
            session.close()
            return Response({'id': id}, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, id):
        session = sqlalchemy_session()
        account = session.query(Account).\
            filter_by(id=id).one_or_none()
        
        if account is None:
            session.close()
            return Response(status=status.HTTP_404_NOT_FOUND)

        accountSerializer = AccountSerializer(data=request.data.get('account'))
        avatarSerializer = AvatarSerializer(data=request.data.get('avatar'))

        if accountSerializer.is_valid() and avatarSerializer.is_valid():
            for key, value in accountSerializer.validated_data.items():
                setattr(account, key, value)
    
            for key, value in avatarSerializer.validated_data.items():
                setattr(account.avatars, key, value)
    
            session.commit()
            id = account.id
            session.close()
            return Response({'id': id}, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)