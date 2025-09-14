import api from '../api/api';
import type { GeneroDto } from '../models/Genero';


export const generoService = {
async getAll(): Promise<GeneroDto[]> {
const { data } = await api.get<GeneroDto[]>('/Genero');
return data;
},
async getById(id: string): Promise<GeneroDto> {
const { data } = await api.get<GeneroDto>(`/Genero/${id}`);
return data;
},
async create(payload: Partial<GeneroDto>): Promise<GeneroDto> {
const { data } = await api.post<GeneroDto>('/Genero', payload);
return data;
},
async update(id: string, payload: Partial<GeneroDto>): Promise<GeneroDto> {
const { data } = await api.put<GeneroDto>(`/Genero/${id}`, payload);
return data;
},
async remove(id: string): Promise<void> {
await api.delete(`/Genero/${id}`);
}
};