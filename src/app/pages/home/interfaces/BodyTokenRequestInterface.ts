export interface BodyTokenRequestInterface {
    grant_type: string;
    client_id: string;
    client_secret: string;
    // Index signature: Sirve para convertir a string clave:valor
    [key: string]: string;

}