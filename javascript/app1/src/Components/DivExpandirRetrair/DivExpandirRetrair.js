'use client';

import { useRef, useState } from "react";
import '@/Styles/ExpandirRetrair.css';
import Link from "next/link";

export default function ExpandirRetrair({titulo, descricao, url}){
    const [isExpanded, setIsExpanded] = useState(false);
    const contentRef = useRef(null);
    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    }
    return(
        <div className="containerER">
            <Link href={url}>
                <h2>{titulo}</h2>
            </Link>

            <div ref={contentRef} className={`description ${isExpanded? 'expanded' : 'collapsed'}`}>
                <p>{descricao}</p>
            </div>
            <button className="btnMaisMenos" onClick={toggleExpand}>{isExpanded? 'Mostrar menos' : 'Mostrar mais'} <span className="seta">{isExpanded ? ' ↑' : ' ↓'}</span> </button>
        </div>
    );
};
