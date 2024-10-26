'use client';

import React, { useState } from "react";

type Def = {
    dono: string,
    titulo: string,
    colab: string[]
}

export default function Post(){
    const [def, setDef] = useState<Def>({dono:'', titulo:'', colab: []});
    const [colab, setColab] = useState<string>('');

    const handleDef = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        // setDef(prev => ({...prev, [name]: value}));
        setDef(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const handleColab = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target;
        setColab(value);

        if(value.includes(',')){
            const newColabs = value.split(',').map(colab => colab.trim()).filter(Boolean); // Split and trim values
            if(Array.isArray(newColabs) && newColabs.length > 0)
                //verificar se a pessoa digitada existe!!! para então adicionar em setDef
                setDef(prev => ({...prev, colab: [...prev.colab, ...newColabs]}));
            setColab(''); // Clear the input field
        }
    }
    const removeColab = (index: number) => {
        setDef(prev => ({...prev, colab: prev.colab.filter((_, i) => i!== index)}));
    }


    return(
        <div>
            <input type="text" onChange={handleDef} value={def.titulo} name="titulo" id="" />
            <input type="text" onChange={handleColab} value={colab} name="colab" id="" />
            {def.colab.map((c, index) => (
                <div key={index}>
                    <p>{c} </p> <button onClick={() => removeColab(index)}>Delete</button>
                </div>
            ))}

            {/* post em si, fotos textos etc */}
            
        </div>
    )
}