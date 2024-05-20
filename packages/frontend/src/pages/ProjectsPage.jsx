import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_ALL_PROJECTS } from '../queries';
import '../styles/projectsPage.css';

const ProjectsPage = () => {
    const { loading, error, data } = useQuery(GET_ALL_PROJECTS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="projects-page">
            <nav className="project-nav">
                <Link to="/" className="home-link">@VarinderSingh</Link>
            </nav>
            <h1>Projects</h1>
            <div className="projects-grid">
                {data.getAllProjects.map(project => (
                    <div key={project.id} className="project-card">
                        <a href={project.projectUrl} target="_blank" rel="noopener noreferrer">
                            <img src={project.imageUrl} alt={project.title} />
                            <h2>{project.title}</h2>
                        </a>
                        <p>{project.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProjectsPage;
