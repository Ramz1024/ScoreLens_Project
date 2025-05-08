# from flask import Flask, request, jsonify
# from flask_sqlalchemy import SQLAlchemy
# from flask_bcrypt import Bcrypt
# from flask_cors import CORS

# app = Flask(__name__)
# CORS(app)
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# db = SQLAlchemy(app)
# bcrypt = Bcrypt(app)

# class User(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     email = db.Column(db.String(100), unique=True, nullable=False)
#     password = db.Column(db.String(200), nullable=False)
#     role = db.Column(db.String(20), nullable=False)

# with app.app_context():
#     db.create_all()

# @app.route('/api/auth', methods=['POST'])
# def auth():
#     print("Request headers:", request.headers)
#     print("Raw data:", request.get_data(as_text=True))
#     print("Parsed JSON:", request.json)

#     data = request.json
#     if not data or 'action' not in data or 'email' not in data or 'password' not in data or 'role' not in data:
#         return jsonify({"message": "Invalid request, missing required fields."}), 400

#     action = data['action']
#     email = data['email']
#     password = data['password']
#     role = data['role']

#     if action == 'signup':
#         user = User.query.filter_by(email=email).first()
#         if user:
#             return jsonify({"message": "Email already registered."}), 400

#         hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
#         new_user = User(email=email, password=hashed_password, role=role)
#         db.session.add(new_user)
#         db.session.commit()

#         return jsonify({"message": "User successfully signed up!"}), 201

#     elif action == 'login':
#         user = User.query.filter_by(email=email, role=role).first()
#         if user and bcrypt.check_password_hash(user.password, password):
#             return jsonify({"message": "Login successful!"}), 200

#         return jsonify({"message": "Invalid credentials"}), 401

#     return jsonify({"message": "Invalid action!"}), 400

# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=5000, debug=True)


from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# SQLite database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)

# User model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    role = db.Column(db.String(20), nullable=False)

# Create the tables
with app.app_context():
    db.create_all()

@app.route('/api/auth', methods=['POST'])
def auth():
    print("Request headers:", request.headers)
    print("Raw data:", request.get_data(as_text=True))
    print("Parsed JSON:", request.json)

    data = request.json
    if not data or 'action' not in data or 'email' not in data or 'password' not in data or 'role' not in data:
        return jsonify({"message": "Invalid request, missing required fields."}), 400

    action = data['action']
    email = data['email']
    password = data['password']
    role = data['role']

    if action == 'signup':
        # Check if user already exists
        user = User.query.filter_by(email=email).first()
        if user:
            return jsonify({"message": "Email already registered."}), 400

        # Create new user
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        new_user = User(email=email, password=hashed_password, role=role)
        db.session.add(new_user)
        db.session.commit()

        return jsonify({"message": "User successfully signed up!"}), 201

    elif action == 'login':
        # Find user with email and role
        user = User.query.filter_by(email=email, role=role).first()
        if user and bcrypt.check_password_hash(user.password, password):
            # ✅ Return user_id, email, role
            return jsonify({
                "message": "Login successful!",
                "user_id": user.id,
                "email": user.email,
                "role": user.role
            }), 200

        return jsonify({"message": "Invalid credentials"}), 401

    return jsonify({"message": "Invalid action!"}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
