import { IDispositivoCreateEdit, IDispositivoFindAll } from '@/models';
import axios from 'axios';

const BASE_URL = '/api/dispositivo';

export async function getAllDispositivos(): Promise<IDispositivoFindAll[]> {
    const response = await axios.get(BASE_URL);
    return response.data;
}

export async function getDispositivoById(id: number): Promise<IDispositivoFindAll> {
    const response = await axios.get(`${BASE_URL}?id=${id}`);
    return response.data;
}

export async function createDispositivo(data: IDispositivoCreateEdit): Promise<IDispositivoFindAll> {
    const response = await axios.post(BASE_URL, data);
    return response.data;
}

export async function updateDispositivo(id: number, data: Partial<IDispositivoCreateEdit>): Promise<IDispositivoFindAll> {
    const response = await axios.put(`${BASE_URL}?id=${id}`, data);
    return response.data;
}

export async function deleteDispositivo(id: number): Promise<{ ok: boolean }> {
    const response = await axios.delete(`${BASE_URL}?id=${id}`);
    return response.data;
}

// Service object for named exports
export const dispositivoService = {
    getAll: getAllDispositivos,
    getById: getDispositivoById,
    create: createDispositivo,
    update: updateDispositivo,
    delete: deleteDispositivo,
};