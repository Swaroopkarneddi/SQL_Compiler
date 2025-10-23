# sqlrunner/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
from . import utils

DB_PATH = getattr(settings, 'SAMPLE_DB_PATH', utils.SAMPLE_DB_PATH)

class ExecuteQueryView(APIView):
    """
    POST payload: { "query": "SELECT ..." }
    Response: { "columns": [...], "rows": [ {col: val}, ... ] }
    """
    def post(self, request):
        sql = request.data.get('query')
        if not sql:
            return Response({'error': 'Missing "query" in request body.'}, status=status.HTTP_400_BAD_REQUEST)

        allow_non_select = getattr(settings, 'ALLOW_NON_SELECT_QUERIES', False)
        if not allow_non_select and not utils.is_read_only_query(sql):
            return Response({'error': 'Only SELECT queries are allowed by default.'}, status=status.HTTP_403_FORBIDDEN)

        try:
            rows, cols = utils.execute_query(
                sql,
                db_path=DB_PATH,
                limit=getattr(settings, 'QUERY_ROW_LIMIT', 1000)
            )

            if utils.is_read_only_query(sql):
                return Response({'columns': cols, 'rows': rows}, status=status.HTTP_200_OK)
            else:
                return Response({'message': 'Query executed successfully'}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class ListTablesView(APIView):
    """GET /api/tables/ → Returns all tables"""
    def get(self, request):
        try:
            tables = utils.list_tables(db_path=DB_PATH)
            return Response({'tables': tables}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class TableDetailView(APIView):
    """GET /api/table/<table_name>/ → Returns schema and sample rows"""
    def get(self, request, table_name):
        try:
            sample_limit = int(request.query_params.get('limit', getattr(settings, 'TABLE_SAMPLE_LIMIT', 10)))
            data = utils.table_schema_and_samples(
                table_name,
                sample_limit=sample_limit,
                db_path=DB_PATH
            )
            return Response(data, status=status.HTTP_200_OK)
        except ValueError as ve:
            return Response({'error': str(ve)}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
