from rest_framework import serializers
from account.models import Account

class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['id', 'first_name', 'last_name', 'email', 'password', 'date_of_birth', 'avatar']

