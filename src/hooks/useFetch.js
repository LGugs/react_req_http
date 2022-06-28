import { useState, useEffect } from "react";

// 4 - custom hook
export const useFetch = (url) => {
    const[data,setData] = useState(null);

    // 5 - refatorando post
    const[config, setConfig] = useState(null); // recebe dados de configuração (cabeçalho)
    const[method,setMethod] = useState(null); // recebe a definição de metodo da requisição
    const[callFetch, setCallFetch] = useState(false);

    // 6 - Loading
    const[loading,setLoading] = useState(false);

    
    // para não ficar repetindo o código em todos os componentes
    const httpConfig = (data, method) => {
        if(method === "POST"){
            setConfig({
                method, // pode ser method: "POST", mas basta botar method pois ele ja é post
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(data)
            });
            setMethod(method);
        }
    };

    // toda vez que inserir um dado ele executara e atualizara a lista.
    useEffect(() => {

        const fetchData = async () => {
            // 6 - loading
            setLoading(true);

            const res = await fetch(url);

            const json = await res.json();

            setData(json);

            setLoading(false);
        }

        fetchData();

    },[url, callFetch]); // url na dependencia que caso a url mude ele executa novamente
    // toda vez que for adicionado algo no sistema utilizaremos o callFetch para sinalizar

    // 5 - refatorando post
    useEffect(() => {
        const httpRequest = async () => {
            if(method === "POST"){
                let fetchOptions = [url, config];

                const res = await fetch(...fetchOptions);

                const json = await res.json();

                setCallFetch(json);
            }
        }

        httpRequest();

    }, [config, method, url]); // toda vez que houver uma alteração na configuração ele executará

    return { data, httpConfig, loading };
}
