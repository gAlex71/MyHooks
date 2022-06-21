import { useEffect, useRef } from "react";

// Хук скролла страницы
//Параметрами будет принимать референс родителя, ребенка, и callback, который будет вызываться, когда мы дошли до края страницы
export default function useScroll(parentRef, childRef, callback){
    //Отслеживает появление элемента в зоне видимости браузера
    const observer = useRef()

    useEffect(() => {
        const optios = {
            root: parentRef.current,
            rootMargin: '0px',
            //Сообщает о том, на сколько мы должны пересечь элемент
            // 0 - только показался, 1 - показался полностью
            threshold: 0
        }

        observer.current = new IntersectionObserver(([target]) => {
            if(target.isIntersecting){
                console.log('intersecting')
                callback()
            }
        }, optios)

        //Элемент, за которым мы следим
        observer.current.observe(childRef.current)

        //Вызываем функцию при демонтировании элемента
        return function(){
            observer.current.unobserve(childRef.current)
        }
    }, callback)
}