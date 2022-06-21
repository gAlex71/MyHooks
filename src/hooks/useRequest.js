import { useEffect, useState } from "react";
//Хук запроса
export default function useRequest(request){
    //Результат запроса
    const [data, setData] = useState('')
    // Загрузка
    const [loading, setLoading] = useState(false)
    // Сообщение об ошибке
    const [error, setError] = useState('')

    useEffect(() => {
        setLoading(true)
        request()
            //Помещаем ответ от сервера в состояние
            .then(responce => setData(responce.data))
            .catch(error => setError(error))
            .finally(() => setLoading(false))
    }, [])

    return [data, loading, error]
}