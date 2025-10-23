# sqlrunner/utils.py
import sqlite3
from typing import List, Dict, Any, Tuple

SAMPLE_DB_PATH = "sample.db"

ALLOWED_READ_ONLY_PREFIXES = ('select',)

def _connect(db_path: str = SAMPLE_DB_PATH) -> sqlite3.Connection:
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    return conn

def is_read_only_query(sql: str) -> bool:
    """Check if query starts with SELECT (case-insensitive)."""
    if not sql or not sql.strip():
        return False
    first = sql.strip().split()[0].lower()
    return first in ALLOWED_READ_ONLY_PREFIXES

def execute_query(sql: str, db_path: str = SAMPLE_DB_PATH, limit: int = 1000) -> Tuple[List[Dict[str, Any]], List[str]]:
    """
    Execute SQL query and return (rows, columns).
    For non-select queries, commit changes and return empty result.
    """
    conn = _connect(db_path)
    try:
        cur = conn.cursor()
        sql_to_run = sql.strip()

        # Add LIMIT for SELECT queries
        if is_read_only_query(sql_to_run):
            if 'limit' not in sql_to_run.lower():
                sql_to_run = f"{sql_to_run.rstrip(';')} LIMIT {limit};"

        cur.execute(sql_to_run)

        # If SELECT, fetch data
        if is_read_only_query(sql_to_run):
            rows = cur.fetchall()
            cols = [col[0] for col in cur.description] if cur.description else []
            result = [dict(row) for row in rows]
            return result, cols
        else:
            # Non-select queries (insert/update/delete/create)
            conn.commit()
            return [], []
    finally:
        conn.close()

def list_tables(db_path: str = SAMPLE_DB_PATH) -> List[str]:
    """Return a list of user-defined tables."""
    conn = _connect(db_path)
    try:
        cur = conn.cursor()
        cur.execute("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';")
        return [row['name'] for row in cur.fetchall()]
    finally:
        conn.close()

def table_schema_and_samples(table_name: str, sample_limit: int = 10, db_path: str = SAMPLE_DB_PATH) -> Dict[str, Any]:
    """Return schema details and a few sample rows for a given table."""
    conn = _connect(db_path)
    try:
        cur = conn.cursor()
        # Schema info
        cur.execute(f"PRAGMA table_info({table_name});")
        cols_info = cur.fetchall()
        if not cols_info:
            raise ValueError(f"Table '{table_name}' not found")

        schema = [
            {
                'cid': c['cid'],
                'name': c['name'],
                'type': c['type'],
                'notnull': bool(c['notnull']),
                'dflt_value': c['dflt_value'],
                'pk': bool(c['pk'])
            }
            for c in cols_info
        ]

        # Sample rows
        cur.execute(f"SELECT * FROM {table_name} LIMIT {sample_limit};")
        rows = [dict(r) for r in cur.fetchall()]
        return {'schema': schema, 'samples': rows}
    finally:
        conn.close()
