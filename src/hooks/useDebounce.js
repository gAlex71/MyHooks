import { useCallback, useRef } from "react";

//Запрос на сервер с задержкой
//Чтобы во время ввода в инпут, каждый раз не происходили запросы на сервер, а только через какое то время, после ввода, мы создаем этот хук.
//Первым параметром принимаем callback, а вторым - задержку, после которой он должен вызываться
export default function useDebounce(callback, delay){
    const timer = useRef()

    //Функция будет пересоздаваться только в том случае, если callback - delay изменили
    //Пока пользователь вводит данные, таймаут перезаписывается, перезаписывается, а после остановки ввода вызывается callback
    const debouncedCallback = useCallback((...args) => {
        //Мы делаем таймаут, и в случае, если функция вызвалась еще раз, мы задаем таймаут заново
        if(timer.current){
            clearTimeout(timer.current)
        }
        timer.current = setTimeout(() => {
            callback(...args)
        }, delay)
    }, [callback, delay])

    return debouncedCallback
}