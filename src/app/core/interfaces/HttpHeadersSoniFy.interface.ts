export interface HttpHeadersSoniFy {
    // Asegura que solo se puedan usar métodos HTTP válidos
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    headers: {
        Authorization: string;
        [key: string]: string;
    };
}