from rest_framework import serializers
from account.models import Account

class AccountSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    first_name =serializers.CharField(max_length=20)
    last_name = serializers.CharField(max_length=20)
    email = serializers.CharField(max_length=50)
    password = serializers.CharField(max_length=20)
    date_of_birth =  serializers.DateField()

class AvatarSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    account_id = serializers.IntegerField(read_only=True)
    avatar = serializers.CharField()