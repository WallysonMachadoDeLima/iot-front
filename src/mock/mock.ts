const JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30'

const USER = {
    sub: 'ec128e1a-2022-4a4e-a5fd-fa5628fd7548',
    update_profile: false,
    email_verified: true,
    complete_name: 'Fabrício Gustavo Wagomacker Rocha',
    cpf: '01284257258',
    data_nascimento: '1994-08-01',
    email: 'iot@email.com',
    codigo_cliente: null,
    phone: '69993557900',
    user_id: 1,
    userId: 1,
    update_password: true,
    address: {
        logradouro: 'Mock',
        numero: '2377',
        bairro: 'Bodanese',
        cep: '78870000',
        cidade_ibge: '1100304',
    },
    profile: {
        cod: 0,
        descricao: 'Master',
    },
    exp: 1760421877,
    iat: 1760385877,
    jti: '0a20324b-6b6b-463c-9044-b7f5bec75be6',
    aud: 'account',
    typ: 'Bearer',
    session_state: '7c74b135-1d7e-4f5a-8e8a-c3a33adf19e3',
    acr: '1',

    realm_access: {
        roles: [
            'supervisor',
        ],
    },
    resource_access: {
        account: {
            roles: ['manage-account', 'manage-account-links', 'view-profile'],
        },
    },
    scope: 'openid codigo phone profile authorities email unidades',
    sid: '7c74b135-1d7e-4f5a-8e8a-c3a33adf19e3',
    codigo: 1,
    unidades: ['0'],
    name: 'Desenvolvimento IOT',
    preferred_username: 'dev',
    given_name: 'Desenvolvimento',
};

export const MOCK = {
    JWT,
    USER
}