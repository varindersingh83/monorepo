import React from 'react';

function IconText({ icon, text }) {
    return (
        <div className="icon-text">
            <img src={icon} alt={`${text} icon`} className="icon" />
            <p className="links">{text}</p>
        </div>
    );
}

export default IconText;
