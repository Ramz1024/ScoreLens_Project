# 
Problem Statement: A Visualization of Student Scores Website - ScoreLens


SDD:
[ScoreLens_13_SDD.pdf](https://github.com/user-attachments/files/20113756/ScoreLens_13_SDD.pdf)


SRS:
[13_SCORELENS_SRS.pdf](https://github.com/user-attachments/files/20113772/13_SCORELENS_SRS.pdf)


Demo Video:
https://mahindraecolecentrale-my.sharepoint.com/:v:/g/personal/se22ucse255_mahindrauniversity_edu_in/EaU1jNk7b_lGgw02Ds7IWHYBU4tlcPZw4whSqBVEa2JEeA


Test Plan:
https://mahindraecolecentrale-my.sharepoint.com/:x:/g/personal/se22ucse052_mahindrauniversity_edu_in/EbUBqKVTG5JAmtWxOw4WFTkBtYrg0SxowZVs65OqmIRq9g?e=7aq7JY

It seems like you're asking for a README file for your Flask backend project. Below is a template that you can use for your project:

Student Management System API
This project is a RESTful API built with Flask for managing students, courses, enrollments, and scores. It uses an SQLite database to store user data, course information, and student scores. The backend allows for user authentication (signup/login), course creation, student enrollment, and uploading/viewing student scores.
Features
User Authentication: Users can sign up, log in, and access data based on their role (e.g., professor, student).


Course Management: Professors can create courses and view courses they are teaching.


Student Enrollment: Students can enroll in courses.


Score Management: Professors can upload scores for students in a course, and students can view their own scores and course statistics.


Statistics: The system calculates average, minimum, maximum, and percentiles for student scores.


Technologies
Flask: A Python web framework for building the API.


Flask-SQLAlchemy: An extension for Flask that adds support for SQLAlchemy, allowing the use of an SQLite database.


Flask-Bcrypt: For hashing passwords securely.


Flask-CORS: For enabling Cross-Origin Resource Sharing (CORS) in the API.


Pandas: For processing and handling Excel files with student data.


SQLite: Database used to store user data, courses, and scores.


NumPy: For performing statistical calculations on the student scores.


Setup Instructions
Requirements
Python 3.x


Flask


Flask-SQLAlchemy


Flask-Bcrypt


Flask-CORS


Pandas


SQLite (built-in with Python)


Installation
Clone the repository to your local machine:

 git clone <repository_url>
cd <project_directory>


Install the required dependencies:

 pip install -r requirements.txt


Set up the SQLite database by running the app:

 python app.py


The application will run on http://127.0.0.1:5000.


API Endpoints
1. User Authentication
POST /api/auth


Action: signup or login


Request body:

 {
  "action": "signup",  // or "login"
  "email": "user@example.com",
  "password": "user_password",
  "role": "professor" // or "student"
}


2. Course Management
GET /api/courses


Query parameters: professor_id or student_email


Retrieves courses based on the professor or student.


Example:


GET /api/courses?professor_id=1


GET /api/courses?student_email=student@example.com


POST /api/courses


Create a new course.


Form-data:

 {
  "name": "Course Name",
  "professor_id": "1",
  "file": <Excel file with student emails>
}


DELETE /api/courses/<course_id>


Delete a course by course_id.


3. Score Management
POST /api/upload_scores/<course_id>


Upload scores for a course. The Excel file should have "Name" and "Marks" columns.


Example:


POST /api/upload_scores/1


GET /api/scores/<course_id>


Get scores for a course.


Query parameter: student_email (optional) to filter scores for a specific student.


Example:


GET /api/scores/1?student_email=student@example.com


Database Models
1. User
id: Primary key, Integer


email: User's email, String


password: Hashed password, String


role: User's role (e.g., "professor" or "student"), String


created_courses: Relationship with Course


2. Course
id: Primary key, Integer


name: Course name, String


code: Unique course code, String


professor_id: Foreign key to the User model, Integer


enrolled_students: Relationship with Enrollment


3. Enrollment
id: Primary key, Integer


course_id: Foreign key to the Course model, Integer


student_email: Email of the enrolled student, String


4. Score Table
Each course will have a corresponding score table named course_{course_id}_scores.


Name: Student's name, Text


Marks: Student's marks, Integer


Notes
The database is stored as site.db for general user information and student_scores.db for student scores.


The Excel file for course creation should contain at least Name and Email columns for student enrollment.


The scores file for uploading should have Name and Marks columns.








