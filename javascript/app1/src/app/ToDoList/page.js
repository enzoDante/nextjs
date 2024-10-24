'use client';

import { useState } from "react";
import '@/Styles/ToDoStyle.css';

export default function ToDo(){

    const [divs, setDivs] = useState([]);
    const [draggingDiv, setDraggingDiv] = useState(null);
    const [offset, setOffset] = useState({x: 0, y: 0});

    const addDiv = () => {
        let newDiv = {id: Date.now(), style: { top: '50px', left: '50px'}, height: `${300}px`};
        newDiv = checkCollision(newDiv);
        setDivs((div) => [...div, newDiv]);

    }
    const checkCollision = (newDiv) => {
        const padding = 10;
        const blockWidth = 450;
        const blockHeight = parseInt(newDiv.height);
        // Verifique os limites da janela e ajuste a posição se necessário
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        // Verificação de limites
        if (parseInt(newDiv.style.left) < 0) {
            newDiv.style.left = '0px'; // Não deixar mover para a esquerda
        } else if (parseInt(newDiv.style.left) + blockWidth > windowWidth) {
            newDiv.style.left = `${windowWidth - blockWidth}px`; // Não deixar mover para a direita
        }

        if (parseInt(newDiv.style.top) < 0) {
            newDiv.style.top = '0px'; // Não deixar mover para cima
        } else if (parseInt(newDiv.style.top) + blockHeight > windowHeight) {
            newDiv.style.top = `${windowHeight - blockHeight}px`; // Não deixar mover para baixo
        }

        // Verificação de colisão com outros blocos
        let collisionDetected;
        
        do {
            collisionDetected = false; // Resetar a colisão a cada iteração

            for (const div of divs) {
                if (div.id !== newDiv.id) { // Não verificar colisão consigo mesmo
                    const rect1 = {
                        top: parseInt(newDiv.style.top),
                        left: parseInt(newDiv.style.left),
                        right: parseInt(newDiv.style.left) + blockWidth,
                        bottom: parseInt(newDiv.style.top) + blockHeight,
                    };
                    const rect2 = {
                        top: parseInt(div.style.top),
                        left: parseInt(div.style.left),
                        right: parseInt(div.style.left) + blockWidth,
                        bottom: parseInt(div.style.top) + parseInt(div.height),
                    };

                    // Verificar se os blocos estão colidindo
                    if (
                        rect1.left < rect2.right + padding &&
                        rect1.right > rect2.left - padding &&
                        rect1.top < rect2.bottom + padding &&
                        rect1.bottom > rect2.top - padding
                    ) {
                        collisionDetected = true; // Uma colisão foi detectada

                        // Decidir a direção de deslocamento com base na colisão
                        const deltaX = rect1.left - rect2.left;
                        const deltaY = rect1.top - rect2.top;

                        // Mover o novo bloco para evitar colisão
                        if (Math.abs(deltaX) > Math.abs(deltaY)) {
                            // Colisão horizontal
                            if (deltaX > 0) {
                                newDiv.style.left = `${rect2.right + padding}px`; // Mover para a direita
                            } else {
                                newDiv.style.left = `${rect2.left - blockWidth - padding}px`; // Mover para a esquerda
                            }
                        } else {
                            // Colisão vertical
                            if (deltaY > 0) {
                                newDiv.style.top = `${rect2.bottom + padding}px`; // Mover para baixo
                            } else {
                                newDiv.style.top = `${rect2.top - blockHeight - padding}px`; // Mover para cima
                            }
                        }
                    }
                }
            }
        } while (collisionDetected); // Continue até que não haja mais colisões
        return newDiv;
    }

    const removeDiv = (idD) => {
        setDivs((div) => div.filter((prev) => prev.id !== idD));
    }

    const onMouseDown = (id, e) => {
        setDraggingDiv(id);
        //calcula a diferença entre a posição do mouse e a posição da div
        const divElement = e.target;
        const rect = divElement.getBoundingClientRect();
        setOffset({x: e.clientX - rect.left, y: e.clientY - rect.top,});

        //desabilitar seleção do mouse
        document.body.classList.add('no-select');
        //adiciona classe de animação ao segurar
        // console.log(divElement.parentChild);
        if(divElement.classList.contains('blocoToDo')){
            divElement.classList.add('dragging');

        }else if(divElement.parentElement && divElement.parentElement.classList.contains('blocoToDo')){
            divElement.parentElement.classList.add('dragging');
        }
    }
    const onMouseMove = (e) => {
        if(draggingDiv !== null){
            const divElement = e.target;
            const rect = divElement.getBoundingClientRect();

            let newDivs = divs.map(div => div.id === draggingDiv ? {
                ...div, style: {top: `${e.clientY - offset.y - 80}px`, left: `${e.clientX - offset.x}px`,},
            } : div);
            //80 por causa do tamanho do header, onde o bloco não atravessa
            setDivs(newDivs);
        }
    }
    const onMouseUp = () => {
        if(draggingDiv !== null){
            //verificar colisão ao soltar a div
            const draggedDivIndex = divs.findIndex(div => div.id === draggingDiv);
            if(draggedDivIndex !== -1){
                let draggedDiv = {...divs[draggedDivIndex]};
                draggedDiv.style = {...draggedDiv.style}; //garantir estilo atualizado
                //draggedDiv.className += ' release';
                draggedDiv = checkCollision(draggedDiv);

                //atualizar posição da div arrastada
                const newDivs = [...divs];
                newDivs[draggedDivIndex] = draggedDiv;
                setDivs(newDivs);
            }

        }
        //remove a classe de desabilitar seleção do mouse
        document.body.classList.remove('no-select');
        //remove classe de animação
        setTimeout(() => {
            const draggedDivElement = document.querySelector(`.blocoToDo[data-id='${draggingDiv}']`)
            if(draggedDivElement){
                draggedDivElement.classList.remove('dragging');
                draggedDivElement.classList.add('release');
            }
        }, 100);

        setTimeout(() => {
            const draggedDivElement = document.querySelector(`.blocoToDo[data-id='${draggingDiv}']`);
            if(draggedDivElement)
                draggedDivElement.classList.remove('release');
        }, 300);
        setDraggingDiv(null);
        

    }

    return(
        <main onMouseMove={onMouseMove} onMouseUp={onMouseUp} style={{height: '100vh', position: 'relative'}}>
            <button className="btnAddDiv" onClick={addDiv}>Adicionar bloco de tarefas</button>
            {divs.map((div) => (
                <Lista key={div.id} id={div.id} removeDi={removeDiv} divStyle={div} funcMove={onMouseDown} />
            ))}
        </main>
    )
}

const Lista = ({id, removeDi, divStyle, funcMove}) => {
    const [def, setDefault] = useState({titulo: '', elemento: ''})
    const [tarefas, setTarefas] = useState([]);

    const handleDefault = (e) => {
        setDefault((prev) => ({...prev, [e.target.name]: e.target.value}));
    }
    const addTarefas = () => {
        if(def.elemento != '')
            setTarefas(prev => [...prev, {id: Date.now(), check: false, desc: def.elemento}]);
        setDefault(padrao => ({...padrao, ['elemento']: ''}));
    }
    const handleTarefa = (idT, e) => {
        
        setTarefas(tarefas.map((tarefa) => (tarefa.id === idT? {...tarefa, [e.target.name]: (e.target.name == 'desc'? e.target.value : !tarefa.check)}: tarefa))); //e.target.Checked
    }
    const removeTarefa = (idT) => {
        setTarefas((prev) => prev.filter((tarefa) => tarefa.id !== idT));
    }

    return(
        <div className="blocoToDo" style={{...divStyle.style, minHeight: divStyle.height, width: '450px'}}
            data-id={id}
        >
            <span onMouseDown={(e)=> funcMove(id, e)} style={{cursor: 'move'}} className="a"></span>
            <div className="input-group">
                <input type="text" value={def.titulo} onChange={handleDefault} className="titulo" name="titulo" id="" placeholder="Titulo" />
                <button className="addRemove" onClick={() => removeDi(id)}>Remover</button>
            </div>

            <div className="input-group">
                <input type="text" value={def.elemento} onChange={handleDefault} className="titulo" name="elemento" id="" placeholder="Tarefa" />
                <button className="addRemove add" onClick={addTarefas}>Adicionar</button>
            </div>
            <hr />
            <div className="tarefasBloc">
                {tarefas.map((taref, index) => (
                    <div className="elementosTarefa" key={index}>
                        <div className="check-container">
                            <input type="checkbox" value={taref.check} onChange={(e) => handleTarefa(taref.id, e)} name="check" id={index} className="checkb" />
                            <label htmlFor={index} ></label>
                        </div>

                        <input type="text" className={taref.check ? 'finalizado': 'normal'} value={taref.desc} onChange={(e) => handleTarefa(taref.id, e)} name="desc" id="" />
                        <button className="btnRTarefa" onClick={() => removeTarefa(taref.id)}>x</button>
                        
                    </div>
                ))}
            </div>
        </div>
    )
}