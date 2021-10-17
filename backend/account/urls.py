from django.urls import path

from account import views

urlpatterns = [
    path('<int:id>/user', views.AccountViews.as_view()),
    path('user/', views.AccountViews.as_view()),
    path('login/',views.LoginViews.as_view()),
]