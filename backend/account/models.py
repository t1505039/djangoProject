from django.db import models


class Account(models.Model):
    first_name = models.CharField(max_length=20)
    last_name = models.CharField(max_length=20)
    email = models.CharField(max_length=50, unique=True)
    password = models.CharField(max_length=20)
    date_of_birth = models.DateField(null=True)
    avatar = models.TextField(null=True)
