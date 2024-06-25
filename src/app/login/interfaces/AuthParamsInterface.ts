export interface AuthParamsInterface
{
    response_type: string,
    client_id: string,
    scope: string,
    redirect_uri: string,

    // Index signature: Sirve para construir el objeto siguiendo el estilo "clave:valor"
    [key: string]: string;
}