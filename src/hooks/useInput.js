import { useState } from "react";

//Хук инпута
export default function useInput(initialValue){
    const [value, setValue] = useState(initialValue)

    const onChange = e => {
        setValue(e.target.value)
    }

    return{
        value, onChange
    }
}