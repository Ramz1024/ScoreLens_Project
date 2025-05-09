It looks like you're trying to format a document, but you're facing issues with spaces and bold formatting not being applied. From what you’ve shared, it seems like you're writing up a report or documentation (e.g., problem statement, demo, features, technologies, etc.). To help you properly format this content, I’ll provide some pointers for using formatting options like spaces and bold text.

### Formatting for Bold and Spaces in Markdown

If you're writing in Markdown (for README files, documentation, or web platforms that support Markdown), here's how you can format the text correctly:

1. **Bold Text**: You can use double asterisks `**` or double underscores `__` to make text bold.

   * Example: `**Bold Text**` or `__Bold Text__` → **Bold Text**

2. **Spaces**: Make sure to add proper line breaks. In Markdown, a line break can be created by adding two spaces at the end of a line or using `<br>` in HTML.

---

### Example Formatted in Markdown:

```markdown
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

```

git clone \<repository\_url>
cd \<project\_directory>

```

Set up the SQLite database by running the app:

```

cd src
python app.py

```

**Notes**:
- The database is stored as `site.db` for general user information and `student_scores.db` for student scores.
- The Excel file for course creation should contain at least **Name** and **Email** columns for student enrollment.
- The scores file for uploading should have **Name** and **Marks** columns.
```

---

### Key Things to Keep in Mind:

* **Spaces**: Markdown automatically adds a line break when you leave a blank line between text. Ensure your paragraphs are separated by an empty line to maintain proper spacing.
* **Bold**: To apply bold text in Markdown, wrap the text in `**` or `__`.

Let me know if you're working with a different format (HTML, LaTeX, etc.) and I'll guide you accordingly!
