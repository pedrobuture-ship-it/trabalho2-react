const API_URL = import.meta.env.VITE_API_URL ?? 'http://127.0.0.1:3333';

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    ...options
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || 'Nao foi possivel concluir a requisicao.');
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export async function listarClientes() {
  const clientes = await request('/clientes');
  return clientes.sort((a, b) => new Date(b.criadoEm) - new Date(a.criadoEm));
}

export function criarCliente(cliente) {
  return request('/clientes', {
    method: 'POST',
    body: JSON.stringify({
      id: crypto.randomUUID(),
      ...cliente,
      criadoEm: new Date().toISOString()
    })
  });
}

export function atualizarCliente(id, cliente) {
  return request(`/clientes/${encodeURIComponent(id)}`, {
    method: 'PATCH',
    body: JSON.stringify(cliente)
  });
}

export function removerCliente(id) {
  return request(`/clientes/${encodeURIComponent(id)}`, {
    method: 'DELETE'
  });
}
