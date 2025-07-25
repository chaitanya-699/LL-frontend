import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import './ScrollNavigation.css';

const ScrollNavigation = ({ onNavigate, activeSection, sectionCount }) => {
    return (
        <div className="scroll-navigation">
            <button onClick={() => onNavigate(activeSection - 1)} disabled={activeSection === 0}>
                <ChevronUp size={24} />
            </button>
            <div className="dots">
                {[...Array(sectionCount)].map((_, index) => (
                    <span 
                        key={index} 
                        className={`dot ${index === activeSection ? 'active' : ''}`} 
                        onClick={() => onNavigate(index)}
                    />
                ))}
            </div>
            <button onClick={() => onNavigate(activeSection + 1)} disabled={activeSection === sectionCount - 1}>
                <ChevronDown size={24} />
            </button>
        </div>
    );
};

export default ScrollNavigation;
