from typing import List, Dict

from psycopg2 import sql
from psycopg2.extras import RealDictCursor

import database_common

@database_common.connection_handler
def get_boards(cursor: RealDictCursor) -> list:
    query = """
            SELECT *
            FROM boards
            ORDER BY id"""
    cursor.execute(query)
    return cursor.fetchall()

@database_common.connection_handler
def create_board(cursor: RealDictCursor, title) -> list:
        query = """
                INSERT INTO boards (title) values (%s) RETURNING *
                """
        cursor.execute(query, (title,))
        result = cursor.fetchone()
        return result

@database_common.connection_handler
def get_cards(cursor: RealDictCursor) -> list:
    query = """
            SELECT *
            FROM cards"""
    cursor.execute(query)
    return cursor.fetchall()

@database_common.connection_handler
def create_card(cursor: RealDictCursor, board_id , title) -> list:
        query = """
                INSERT INTO cards (board_id ,title) values (%s, %s) RETURNING *
                """
        cursor.execute(query, (board_id ,title,))
        result = cursor.fetchone()
        return result
