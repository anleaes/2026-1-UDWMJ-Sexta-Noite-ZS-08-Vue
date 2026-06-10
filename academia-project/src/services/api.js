const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export async function apiFetch(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  
  // 1. fetch() dispara a requisição para o endpoint do Django
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers, 
    },
    ...options,
  });

  // 2. verifica response.ok para saber se o servidor retornou 200
  if (!response.ok) {
    throw new Error(`Erro na requisição: Status ${response.status} - ${response.statusText}`);
  }

  if (response.status === 204) {
    return null;
  }

  return await response.json();
}