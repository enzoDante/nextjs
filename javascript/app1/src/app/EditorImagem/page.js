'use client';
import '@/Styles/mainDefault.css';
import '@/Styles/EditorImagem.css';
import { useEffect, useRef, useState } from "react";
import { fabric } from 'fabric';


export default function Editor(){
    const canvasRef = useRef(null);
    const [canvas, setCanvas] = useState(null);
    const [addingText, setAddingText] = useState(false);
    const [textColor, setTextColor] = useState('#000000');

    useEffect(() => {
        const fabricCanvas = new fabric.Canvas(canvasRef.current);
        setCanvas(fabricCanvas);

        return () => {
            fabricCanvas.dispose();
        };
    }, []);
    useEffect(() => {
        if(!canvas) return;

        //adicionar texto ao clicar no canvas
        const handleCanvasClick = (e) => {
            if(!addingText) return;

            const pointer = canvas.getPointer(e.e);
            const textBox = new fabric.Textbox('Digite Aqui', {
                left: pointer.x,
                top: pointer.y,
                width: 200,
                fontSize: 20,
                fill: textColor,
            });
            canvas.add(textBox).setActiveObject(textBox);
            canvas.renderAll();
            setAddingText(false);
        };
        //evento de clicar no canvas
        canvas.on('mouse:down', handleCanvasClick);

        return () => {
            canvas.off('mouse:down', handleCanvasClick);
        }
    }, [addingText, canvas, textColor]);

    //carregar imagem de fundo/base
    const handleBackgroundUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = function (even) {
            fabric.Image.fromURL(even.target.result, (img) => {
                canvas.clear();
                img.scaleToWidth(canvas.width);
                canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
            });
        };
        if(file){
            reader.readAsDataURL(file);
        }
    };

    //carregar imagens sobre a imagem base
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = function (event) {
            fabric.Image.fromURL(event.target.result, (img) => {
                img.scaleToWidth(200);
                img.set({
                    left: 100,
                    top: 100,
                });
                canvas.add(img);
                canvas.renderAll();
            });
        };
        if(file){
            reader.readAsDataURL(file);
        }
    };
    const handleKeyDown = (e) => {
        if (e.key === 'Delete' || e.key === 'Backspace' || e.target.id == 'btnDel') {
            const activeObject = canvas.getActiveObject();
            if (activeObject) {
                canvas.remove(activeObject);
                canvas.renderAll(); // Re-renderiza o canvas
            }
        }
    };
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [canvas]);

    //baixar imagem finalizada
    const downloadImage = (format='png') => {
        const fileName = `image.${format}`;
        const dataURL = canvas.toDataURL({
            format: format,
            quality: 1,
        });
        //link temporário para baixar imagem
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = fileName;
        link.click();
    };

    return(
        <main className='mainHome'>
            <h2>Editor de imagem</h2>
            <div>
                <input type="file" accept='image/*' onChange={handleBackgroundUpload} name="" id="addImgBase" />
                <label htmlFor="addImgBase" id='addImgBaseLabel'>Adicionar imagem de fundo</label>
            </div>
            {/* imagens para sobrepor */}
            <div>
                <input type="file" accept='image/*' onChange={handleImageUpload} name="" id="addImgs" />
                <label htmlFor="addImgs" id='addImgsLabel'>Adicionar imagens</label>
            </div>
            {/* adicionar texto */}
            <div id='canvaOptions'>
                <input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} name="" id="" />
                <button onClick={() => setAddingText(true)}>Adicionar texto</button>
                <button id='btnDel' onClick={(e) => handleKeyDown(e)}>Deletar objeto selecionado</button>

                <div id='downloads'>
                    <button onClick={() => downloadImage('png')}>Baixar como PNG</button>
                    <button onClick={() => downloadImage('jpeg')}>Baixar como JPEG</button>
                    <button onClick={() => downloadImage('jpg')}>Baixar como JPG</button>
                </div>
            </div>

            <div id='canva'>
                <canvas ref={canvasRef} width={800} height={800} style={{border: '1px solid #000'}}></canvas>
            </div>
        </main>
    )
}