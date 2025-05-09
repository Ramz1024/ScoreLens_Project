# Problem Statement: A Visualization of Student Scores Website - ScoreLens

## SDD:
[ScoreLens_13_SDD.pdf](#)

## SRS:
[13_SCORELENS_SRS.pdf](#)

## Demo Video:
[Watch Demo Video](https://mahindraecolecentrale-my.sharepoint.com/:v:/g/personal/se22ucse255_mahindrauniversity_edu_in/EaU1jNk7b_lGgw02Ds7IWHYBU4tlcPZw4whSqBVEa2JEeA)

## Test Plan:
[Download Test Plan](https://mahindraecolecentrale-my.sharepoint.com/:x:/g/personal/se22ucse052_mahindrauniversity_edu_in/EbUBqKVTG5JAmtWxOw4WFTkBtYrg0SxowZVs65OqmIRq9g?e=7aq7JY)

## Features

- **User Authentication**: Users can sign up, log in, and access data based on their role (e.g., professor, student).
- **Course Management**: Professors can create courses and view courses they are teaching.
- **Student Enrollment**: Students can enroll in courses.
- **Score Management**: Professors can upload scores for students in a course, and students can view their own scores and course statistics.
- **Statistics**: The system calculates average, minimum, maximum, and percentiles for student scores.

## Technologies

- **Flask**: A Python web framework for building the API.
- **Flask-SQLAlchemy**: An extension for Flask that adds support for SQLAlchemy, allowing the use of an SQLite database.
- **Flask-Bcrypt**: For hashing passwords securely.
- **Flask-CORS**: For enabling Cross-Origin Resource Sharing (CORS) in the API.
- **Pandas**: For processing and handling Excel files with student data.
- **SQLite**: Database used to store user data, courses, and scores.
- **NumPy**: For performing statistical calculations on the student scores.

## Setup Instructions

### Requirements

- Python 3.x
- Flask
- Flask-SQLAlchemy
- Flask-Bcrypt
- Flask-CORS
- Pandas
- SQLite (built-in with Python)

### Installation

Clone the repository to your local machine:

git clone <repository_url>
cd <project_directory>


Set up the SQLite database by running the app:

cd src
python app.py


**Notes**:
- The database is stored as `site.db` for general user information and `student_scores.db` for student scores.
- The Excel file for course creation should contain at least **Name** and **Email** columns for student enrollment.
- The scores file for uploading should have **Name** and **Marks** columns.
