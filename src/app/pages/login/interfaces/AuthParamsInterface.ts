export interface AuthParamsInterface
{
    response_type: string,
    client_id: string,
    scope: string,
    redirect_uri: string,

    // Index signature: Sirve para convertir a string clave:valor
    [key: string]: string;
}