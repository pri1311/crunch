from flask import Blueprint, render_template
from flask_login import login_required, current_user
views = Blueprint('views', __name__)


@views.route('/')
def main_page():
    return render_template("/auth/login-register.html")


@views.route('/chat')
@login_required
def chat():
    return render_template('/views/chat.html')
