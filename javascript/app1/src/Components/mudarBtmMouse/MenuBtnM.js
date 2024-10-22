'use client';
import { useState } from "react"
import '@/Styles/mouseOptions.css';

export default function MenuBtnMouse(){

    const [menuPosition, setMenuPosition] = useState({x: 0, y: 0});
    const [showMenu, setShowMenu] = useState(false);
    const [menuVisible, setMenuVisible] = useState(false);

    const handleContextMenu = e => {
        e.preventDefault();
        setMenuPosition({x: e.pageX, y: e.pageY,});

        setShowMenu(true);
        setTimeout(() => setMenuVisible(true), 10);
    };
    const handleClick = () =>{
        setMenuVisible(false);
        setTimeout(() => setShowMenu(false), 200);
    }

    return(
        <div onContextMenu={handleContextMenu} onClick={handleClick} style={{height: '100vh', width: '100vw'}}>
            <p>teste clique btn direito do mouse</p>
            {showMenu && (
                <ul className={`menuMouse ${menuVisible ? 'visible' : ''}`}
                    style={{
                        position: 'absolute',
                        top: `${menuPosition.y}px`,
                        left: `${menuPosition.x}px`,
                        backgroundColor: 'white',
                        padding: '5px',
                        listStyle: 'none',
                        border: '1px solid black',
                        borderRadius: '5px'
                    }}
                >
                    <li onClick={() => alert('Opção 1 selecionada')}>Opção 1</li>
                    <li onClick={() => alert('Opção 2 selecionada')}>Opção 2</li>
                    <li onClick={() => alert('Opção 3 selecionada')}>Opção 3</li>
                </ul>
            )}
        </div>
    )
}