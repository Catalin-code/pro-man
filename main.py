from flask import Flask, render_template, url_for, jsonify
from util import json_response
import data_handler
import data_manager

app = Flask(__name__)


@app.route("/")
def index():
    """
    This is a one-pager which shows all the boards and cards
    """
    boards = data_manager.get_boards()
    return render_template('index.html', boards=boards)


@app.route("/get-boards")
@json_response
def get_boards():
    boards = data_manager.get_boards()
    return boards


@app.route("/add-board/<title>")
@json_response
def add_board(title):

    return data_manager.create_board(title)

@app.route("/get-cards")
@json_response
def get_cards():
    cards = data_manager.get_cards()
    return cards

@app.route("/add-card/<board_id>/<title>")
@json_response
def add_card(board_id,title):
    return data_manager.create_card(board_id,title)


def main():
    app.run(debug=True)

    # Serving the favicon
    with app.app_context():
        app.add_url_rule('/favicon.ico', redirect_to=url_for('static', filename='favicon/favicon.ico'))


if __name__ == '__main__':
    main()
