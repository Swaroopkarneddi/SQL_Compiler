from django.urls import path
from .views import ExecuteQueryView, ListTablesView, TableDetailView

urlpatterns = [
    path('execute/', ExecuteQueryView.as_view(), name='execute-query'),
    path('tables/', ListTablesView.as_view(), name='list-tables'),
    path('table/<str:table_name>/', TableDetailView.as_view(), name='table-detail'),
]
