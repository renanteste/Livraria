import api from '../api/api';
import type { AutorDto } from '../models/Autor';


export const autorService = {
async getAll(): Promise<AutorDto[]> {
const { data } = await api.get<AutorDto[]>('/Autor');
return data;
},
async getById(id: string): Promise<AutorDto> {
const { data } = await api.get<AutorDto>(`/Autor/${id}`);
return data;
},
async create(payload: Partial<AutorDto>): Promise<AutorDto> {
const { data } = await api.post<AutorDto>('/Autor', payload);
return data;
},
async update(id: string, payload: Partial<AutorDto>): Promise<AutorDto> {
const { data } = await api.put<AutorDto>(`/Autor/${id}`, payload);
return data;
},
async remove(id: string): Promise<void> {
await api.delete(`/Autor/${id}`);
}
};