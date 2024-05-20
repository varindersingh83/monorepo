import React from 'react';
import { Link } from 'react-router-dom';
import IconText from '../components/IconText';
import VisitorCounter from '../components/VisitorCounter';
import blogIcon from '../assets/blog-icon.png';
import projectsIcon from '../assets/projects-icon.png';
import amaIcon from '../assets/ama-icon.png';

function HomePage() {
    return (
        <div>
            <div className="top-section">
                <p className="name">VARINDER SINGH</p>
                <div className="visitor-wrapper">
                    <p className="visitor">Hello Visitor #</p>
                    <VisitorCounter />
                </div>
            </div>
            <div className="bottom-section">
                <Link to="/blog"><IconText icon={blogIcon} text="Blog" /></Link>
                <Link to="/projects"><IconText icon={projectsIcon} text="Projects" /></Link>
                <Link to="/contact"><IconText icon={amaIcon} text="Message" /></Link>
            </div>
        </div>
    );
}

export default HomePage;
