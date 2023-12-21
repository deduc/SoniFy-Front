export interface AuthParamsInterface
{
    response_type: string,
    client_id: string,
    scope: string,
    code_challenge_method: string,
    code_challenge: string,
    redirect_uri: string,

    // Index signature: Sirve para convertir a string clave:valor
    [key: string]: string;
}