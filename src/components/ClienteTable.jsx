import { Edit3, Mail, MapPin, Phone, Trash2 } from 'lucide-react';

const statusClass = {
  Ativo: 'active',
  'Em negociacao': 'pending',
  Inativo: 'inactive'
};

export default function ClienteTable({ clientes, carregando, onEditar, onRemover }) {
  if (carregando) {
    return (
      <div className="empty-state">
        <strong>Carregando clientes...</strong>
      </div>
    );
  }

  if (clientes.length === 0) {
    return (
      <div className="empty-state">
        <strong>Nenhum cliente encontrado.</strong>
        <span>Ajuste os filtros ou cadastre um novo cliente.</span>
      </div>
    );
  }

  return (
    <div className="table-shell">
      <table>
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Contato</th>
            <th>Interesse</th>
            <th>Status</th>
            <th>Acoes</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente.id}>
              <td>
                <div className="client-name">{cliente.nome}</div>
                <div className="muted-line">
                  <MapPin size={15} />
                  {cliente.cidade}
                </div>
              </td>
              <td>
                <div className="muted-line">
                  <Mail size={15} />
                  {cliente.email}
                </div>
                <div className="muted-line">
                  <Phone size={15} />
                  {cliente.telefone}
                </div>
              </td>
              <td>
                <div className="interest">{cliente.interesse}</div>
                {cliente.observacoes && <div className="note">{cliente.observacoes}</div>}
              </td>
              <td>
                <span className={`status-pill ${statusClass[cliente.status] ?? 'inactive'}`}>{cliente.status}</span>
              </td>
              <td>
                <div className="row-actions">
                  <button className="icon-button" type="button" title="Editar cliente" onClick={() => onEditar(cliente)}>
                    <Edit3 size={18} />
                  </button>
                  <button className="icon-button danger" type="button" title="Remover cliente" onClick={() => onRemover(cliente)}>
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
