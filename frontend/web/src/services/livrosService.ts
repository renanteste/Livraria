import api from '../api/api';
import { type LivroDto } from '../models/Livro';


export const livroService = {
async getAll(): Promise<LivroDto[]> {
const { data } = await api.get<LivroDto[]>('/Livro');
return data;
},
async getById(id: string): Promise<LivroDto> {
const { data } = await api.get<LivroDto>(`/Livro/${id}`);
return data;
},
async create(payload: Partial<LivroDto>): Promise<LivroDto> {
const { data } = await api.post<LivroDto>('/Livro', payload);
return data;
},
async update(id: string, payload: Partial<LivroDto>): Promise<LivroDto> {
const { data } = await api.put<LivroDto>(`/Livro/${id}`, payload);
return data;
},
async remove(id: string): Promise<void> {
await api.delete(`/Livro/${id}`);
}
};