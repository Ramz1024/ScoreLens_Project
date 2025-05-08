import sqlite3

# Connect to the SQLite database
conn = sqlite3.connect('site.db')  # Replace 'site.db' if your database has a different name
cursor = conn.cursor()

# Execute the SQL query
cursor.execute("SELECT id, name, code, professor_id FROM Course;")

# Fetch all the results
results = cursor.fetchall()

# Print the results
for row in results:
    print(row)

# Close the connection
conn.close()
