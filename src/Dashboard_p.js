import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
    BarElement,
    ArcElement,
    RadialLinearScale,
    Filler
} from 'chart.js';
import { useNavigate } from 'react-router-dom';
import './Dashboard_p.css';
import { Bar, Doughnut, Radar } from 'react-chartjs-2';


ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, BarElement, ArcElement, RadialLinearScale, Filler);

export default function Dashboard_p() {
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [courseData, setCourseData] = useState({});  // This will store data for each course
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [courses, setCourses] = useState([]);
    const [userId, setUserId] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [showCreateCourse, setShowCreateCourse] = useState(false);
    const navigate = useNavigate();

    // Load courses and user ID
    useEffect(() => {
        const storedUserId = localStorage.getItem('user_id');
        if (storedUserId) {
            setUserId(storedUserId);
            const fetchCourses = async () => {
                try {
                    const response = await fetch(`http://localhost:5000/api/courses?professor_id=${storedUserId}`);
                    const data = await response.json();
                    setCourses(data);
                } catch (error) {
                    console.error('Error fetching courses:', error);
                    setError('Failed to fetch courses.');
                }
            };
            fetchCourses();
        }
    }, []);

    // Load saved course data from localStorage whenever a course is selected
    useEffect(() => {
        if (selectedCourse) {
            const savedData = JSON.parse(localStorage.getItem('courseData')) || {};
            setCourseData(savedData);
        }
    }, [selectedCourse]);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleCreateCourse = async () => {
        if (!selectedFile) {
            setError('Please upload an Excel file.');
            return;
        }

        setLoading(true);
        setError(null);

        const courseName = document.getElementById('courseName').value;
        const professorId = parseInt(userId, 10);
        const formData = new FormData();
        formData.append('name', courseName);
        formData.append('professor_id', professorId);
        formData.append('file', selectedFile);

        try {
            const response = await fetch('http://localhost:5000/api/courses', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message);
                setCourses(prev => [...prev, { name: courseName, code: data.code, id: data.id }]);
                setSelectedCourse(null);
                setSelectedFile(null);
                setShowCreateCourse(false);
            } else {
                setError(data.error);
            }
        } catch (error) {
            console.error('Error creating course:', error);
            setError('Failed to create course.');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteCourse = async (courseId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/courses/${courseId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setCourses(prevCourses => prevCourses.filter(course => course.id !== courseId));
                setSelectedCourse(null);
                setCourseData({});
            } else {
                const data = await response.json();
                setError(data.message || 'Failed to delete course');
            }
        } catch (error) {
            console.error('Failed to delete course:', error);
            setError('Failed to delete course');
        }
    };

    const handleExcelUpload = async (e) => {
        const file = e.target.files[0];
        if (!file || !selectedCourse) return;

        setLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append('file', file);

        try {
            const course = courses.find(c => c.name === selectedCourse);
            if (!course) {
                setError("Course not found");
                setLoading(false);
                return;
            }
            const response = await fetch(`http://localhost:5000/api/upload_scores/${course.id}`, {
                method: 'POST',
                body: formData
            });
            const result = await response.json();

            if (response.ok) {
                const graphName = prompt('Please enter a name for this graph:');
                if (graphName) {
                    // Save to localStorage
                    const savedData = JSON.parse(localStorage.getItem('courseData')) || {};
                    const updatedData = {
                        ...savedData,
                        [selectedCourse]: {
                            ...(savedData[selectedCourse] || {}),
                            charts: [
                                ...(savedData[selectedCourse]?.charts || []),
                                { graphName, labels: result.labels, scores: result.scores }
                            ]
                        }
                    };
                    localStorage.setItem('courseData', JSON.stringify(updatedData));

                    setCourseData(updatedData);  // Update the state with the new data
                }
            } else {
                setError(result.error);
            }
        } catch (err) {
            setError(`Error uploading file: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    const selectedData = courseData[selectedCourse] || { charts: [] };

    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <h1>Professor Dashboard</h1>
                <div className="header-buttons">
                    <button onClick={() => setShowCreateCourse(!showCreateCourse)}>
                        {showCreateCourse ? 'Cancel' : 'Create Class'}
                    </button>
                    <button onClick={() => navigate('/login')}>Log Out</button>
                </div>
            </header>

            <div className="dashboard-body">
                <aside className="sidebar">
                    <h3>Enrolled Courses</h3>
                    <ul>
                        {courses.map(course => (
                            <li key={course.name}>
                                <div className="course-list-item">
                                    <a href="#" onClick={(e) => {
                                        e.preventDefault();
                                        setSelectedCourse(course.name);
                                    }}>
                                        {course.name}
                                    </a>
                                </div>
                            </li>
                        ))}
                    </ul>
                </aside>

                <main className="main-content">
                    <h2>{selectedCourse ? `${selectedCourse} Scores` : 'Select a Course'}</h2>

                    {showCreateCourse && (
                        <div className="create-course-form">
                            <input type="text" id="courseName" placeholder="Course Name" />
                            <input type="file" accept=".xlsx,.xls" onChange={handleFileChange} />
                            <button onClick={handleCreateCourse} disabled={loading}>
                                {loading ? 'Creating...' : 'Create Course'}
                            </button>
                            {error && <p className="error-message">{error}</p>}
                        </div>
                    )}

                    {!selectedCourse ? (
                        <div className="course-grid">
                            {courses.map(course => (
                                <div
                                    key={course.name}
                                    className="course-card"
                                    onClick={() => setSelectedCourse(course.name)}
                                >
                                    <h1>{course.name}</h1>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <>
                            <div className="upload-section">
                                <label className="upload-btn">
                                    📄 Upload Excel Sheet for {selectedCourse}
                                    <input type="file" accept=".xlsx, .xls" onChange={handleExcelUpload} hidden />
                                </label>
                                {loading && <p>Uploading...</p>}
                                {error && <p className="error-message">{error}</p>}
                            </div>

                            {selectedData.charts && selectedData.charts.map((chart, index) => {
                                const data = {
                                    labels: chart.labels,
                                    datasets: [{
                                        label: 'Marks',
                                        data: chart.scores,
                                        backgroundColor: 'rgba(0, 123, 255, 0.4)',
                                        borderColor: '#007BFF',
                                        borderWidth: 2,
                                        tension: 0.4
                                    }]
                                };

                                const options = {
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    plugins: {
                                        legend: {
                                            display: true,
                                            position: 'bottom'
                                        }
                                    }
                                };

                                return (
                                    <div key={index} className="chart-wrapper">
                                        <h3>{chart.graphName}</h3>
                                        <div className="multi-chart-grid">
                                            <div className="chart-box">
                                                <h4>Line Chart</h4>
                                                <div style={{ position: 'relative', width: '100%', height: '250px' }}>
                                                    <Line data={data} options={options} />
                                                </div>
                                            </div>
                                            <div className="chart-box">
                                                <h4>Bar Chart</h4>
                                                <div style={{ position: 'relative', width: '100%', height: '250px' }}>
                                                    <Bar data={data} options={options} />
                                                </div>
                                            </div>
                                            <div className="chart-box">
                                                <h4>Doughnut Chart</h4>
                                                <div style={{ position: 'relative', width: '100%', height: '250px' }}>
                                                    <Doughnut data={data} options={options} />
                                                </div>
                                            </div>
                                            <div className="chart-box">
                                                <h4>Radar Chart</h4>
                                                <div style={{ position: 'relative', width: '100%', height: '250px' }}>
                                                    <Radar data={data} options={options} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}

                        </>
                    )}
                </main>
            </div>
        </div>
    );
}
