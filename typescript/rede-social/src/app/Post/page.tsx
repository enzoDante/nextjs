'use client';

import React, { useState } from "react";

type Def = {
    dono: string,
    titulo: string,
    colab: []
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
            setDef(prev => ({
                ...prev, colab: [...prev.colab, ...newColabs] // Append new collaborators
            }));
            setColab(''); // Clear the input field
        }
    }


    return(
        <div>

        </div>
    )
}