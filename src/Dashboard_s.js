import React, { useState, useEffect } from 'react';
import {
    Chart as ChartJS,
    LineElement,
    BarElement,
    ArcElement,
    PointElement,
    CategoryScale,
    LinearScale,
    RadialLinearScale,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import { Line, Bar, Doughnut, Scatter, Radar } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';
import './Dashboard_s.css';

ChartJS.register(
    LineElement,
    BarElement,
    ArcElement,
    PointElement,
    RadialLinearScale,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    Filler
);

export default function Dashboard_s() {
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [customScores, setCustomScores] = useState([]);
    const [classAvgScores, setClassAvgScores] = useState([]);
    const [labels, setLabels] = useState([]);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userEmail, setUserEmail] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedEmail = localStorage.getItem('email');
        if (storedEmail) {
            setUserEmail(storedEmail);
        }

        const fetchCourses = async () => {
            if (!storedEmail) {
                setError("Email not found in local storage. Please log in again.");
                setLoading(false);
                return;
            }
            try {
                const response = await fetch(`http://localhost:5000/api/courses?student_email=${storedEmail}`);
                if (!response.ok) throw new Error(`Failed to fetch courses: ${response.status}`);
                const data = await response.json();
                setCourses(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (storedEmail) {
            fetchCourses();
        }
    }, [userEmail]);

    useEffect(() => {
        const fetchScores = async () => {
            if (selectedCourse && selectedCourse.id) {
                try {
                    const response = await fetch(`http://localhost:5000/api/scores/${selectedCourse.id}?student_email=${userEmail}`);
                    if (!response.ok) throw new Error(`Failed to fetch scores: ${response.status}`);
                    
                    const data = await response.json();
                    
                    // Set labels if they exist
                    if (data.labels && Array.isArray(data.labels)) {
                        setLabels(data.labels);
                    } else {
                        setLabels([]);
                    }
                    
                    // Set student scores
                    if (data.scores && Array.isArray(data.scores)) {
                        setCustomScores(data.scores);
                    } else {
                        setCustomScores([]);
                    }
                    
                    // Generate class average scores if statistics exist
                    if (data.statistics && data.statistics.average) {
                        // Create an array of the same length as scores, filled with the average value
                        const avgArray = data.labels ? Array(data.labels.length).fill(data.statistics.average) : [];
                        setClassAvgScores(avgArray);
                    } else if (data.class_avg && Array.isArray(data.class_avg)) {
                        setClassAvgScores(data.class_avg);
                    } else {
                        setClassAvgScores([]);
                    }
                } catch (err) {
                    console.error('Failed to fetch scores:', err);
                    setLabels([]);
                    setCustomScores([]);
                    setClassAvgScores([]);
                }
            }
        };

        fetchScores();
    }, [selectedCourse, userEmail]);

    const lineChart = {
        labels: labels,
        datasets: [
            {
                label: 'Your Scores',
                data: customScores,
                borderColor: '#007BFF',
                backgroundColor: 'rgba(0, 123, 255, 0.2)',
                borderWidth: 2,
                tension: 0.3
            }
        ]
    };

    const barChart = {
        labels: labels,
        datasets: [
            {
                label: 'Your Scores',
                data: customScores,
                backgroundColor: 'rgba(54, 162, 235, 0.6)'
            },
            {
                label: 'Class Average',
                data: classAvgScores,
                backgroundColor: 'rgba(255, 99, 132, 0.6)'
            }
        ]
    };

    const doughnutChart = {
        labels: labels,
        datasets: [
            {
                label: 'Score Distribution',
                data: customScores,
                backgroundColor: ['#007BFF', '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
            }
        ]
    };

    const radarChart = {
        labels: labels,
        datasets: [
            {
                label: 'Marks',
                data: customScores,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgb(54, 162, 235)',
                pointBackgroundColor: 'rgb(54, 162, 235)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(54, 162, 235)',
                fill: true
            }
        ]
    };

    if (loading) {
        return <div>Loading courses...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <h1>Student Dashboard</h1>
                <div className="header-buttons">
                    <button onClick={() => navigate('/login')}>Log Out</button>
                </div>
            </header>

            <div className="dashboard-body">
                <aside className="sidebar">
                    <h3>Enrolled Courses</h3>
                    <ul>
                        {courses.map(course => (
                            <li key={course.id}>
                                <a href="#" onClick={(e) => {
                                    e.preventDefault();
                                    setSelectedCourse(course);
                                    setCustomScores([]);
                                    setLabels([]);
                                    setClassAvgScores([]);
                                }}>
                                    {course.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </aside>

                <main className="main-content">
                    <h2>{selectedCourse ? `${selectedCourse.name} Scores` : 'Select a Course'}</h2>

                    {!selectedCourse ? (
                        <div className="course-grid">
                            {courses.map(course => (
                                <div
                                    key={course.id}
                                    className="course-card"
                                    onClick={() => {
                                        setSelectedCourse(course);
                                        setCustomScores([]);
                                        setLabels([]);
                                        setClassAvgScores([]);
                                    }}
                                >
                                    <h3>{course.name}</h3>
                                    <p>Course Code: {course.code}</p>
                                    <p>Professor ID: {course.professor_id}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <>
                            {labels.length > 0 && customScores.length > 0 ? (
                                <div className="charts-container">
                                    <div className="chart-wrapper">
                                        <h3>Line Chart</h3>
                                        <Line data={lineChart} options={{ responsive: true, maintainAspectRatio: false }} />
                                    </div>

                                    <div className="chart-wrapper">
                                        <h3>Bar Chart: You vs Class Avg</h3>
                                        <Bar data={barChart} options={{ responsive: true, maintainAspectRatio: false }} />
                                    </div>

                                    <div className="chart-wrapper doughnut-container">
                                        <h3>Doughnut Chart: Your Score Distribution</h3>
                                        <Doughnut 
                                            data={doughnutChart} 
                                            options={{ 
                                                responsive: true, 
                                                maintainAspectRatio: true,
                                                plugins: {
                                                    legend: {
                                                        position: 'bottom'
                                                    }
                                                }
                                            }} 
                                        />
                                    </div>

                                    <div className="chart-wrapper">
                                        <h3>Radar Chart</h3>
                                        <Radar 
                                            data={radarChart} 
                                            options={{ 
                                                responsive: true, 
                                                maintainAspectRatio: false,
                                                scales: {
                                                    r: {
                                                        beginAtZero: true,
                                                        suggestedMin: 0,
                                                        suggestedMax: 50
                                                    }
                                                }
                                            }} 
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div className="no-data-message">
                                    <p>No score data available for this course yet.</p>
                                </div>
                            )}
                        </>
                    )}
                </main>
            </div>
        </div>
    );
}