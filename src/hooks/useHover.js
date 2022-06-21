import { useEffect, useState } from "react";

// const ref = useRef
//Добавляем в элемент ref={ref}
//И в ref.current хранится наш элемент

// Хук, следящий за наведением на элемент
//Параметром будет принимать reference - ссылку на какой-то элемент
export default function useHover(ref){
    const [isHovering, setHovering] = useState(false)

    const on = () => setHovering(true)
    const off = () => setHovering(false)

    useEffect(() => {
        if(!ref.current){
            return
        }

        const node = ref.current

        //Навели
        node.addEventListener('mouseenter', on)
        // Водим
        node.addEventListener('mousemove', on)
        // Убрали
        node.addEventListener('mouseleave', off)

        //Если возвращать функцию из callback, который мы передаем в useEffect, то она вызовется при демонтировании элемента
        return function(){
            //Навели
            node.removeEventListener('mouseenter', on)
            // Водим
            node.removeEventListener('mousemove', on)
            // Убрали
            node.removeEventListener('mouseleave', off)
        }
    }, [])

    //Этот хук возвращает состояние
    return isHovering
}