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
        for(const div of divs){
            const rect1 = {
                top: parseInt(newDiv.style.top),
                left: parseInt(newDiv.style.left),
                right: parseInt(newDiv.style.left) + 450,
                bottom: parseInt(newDiv.style.top) + parseInt(newDiv.height),
            };
            const rect2 = {
                top: parseInt(div.style.top),
                left: parseInt(div.style.left),
                right: parseInt(div.style.left) + 450,
                bottom: parseInt(div.style.top) + parseInt(div.height),
            };

            if(
                rect1.left < rect2.right + padding &&
                rect1.right > rect2.left - padding &&
                rect1.top < rect2.bottom + padding &&
                rect1.bottom > rect2.top - padding &&
                div.id !== newDiv.id
            ){
                newDiv.style.top = `${parseInt(div.style.top) + parseInt(div.height) + padding}px`;
                newDiv.style.left = `${parseInt(div.style.left)}px`;
            }
        }
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
            // document.querySelectorAll('.blocoToDo').forEach(div => {
            //     div.classList.remove('dragging');
            //     div.classList.add('release');
            // });
        }, 100);

        setTimeout(() => {
            const draggedDivElement = document.querySelector(`.blocoToDo[data-id='${draggingDiv}']`);
            if(draggedDivElement)
                draggedDivElement.classList.remove('release');
            // document.querySelectorAll('.blocoToDo').forEach(div => {
            //     div.classList.remove('release'); //'dragging', 
            // });
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