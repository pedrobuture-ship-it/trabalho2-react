import { Save, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const valoresIniciais = {
  nome: '',
  email: '',
  telefone: '',
  cidade: '',
  interesse: '',
  status: 'Ativo',
  observacoes: ''
};

const statusDisponiveis = ['Ativo', 'Em negociacao', 'Inativo'];

export default function ClienteForm({ clienteEditando, onSalvar, onCancelar, salvando }) {
  const [formulario, setFormulario] = useState(valoresIniciais);
  const [erros, setErros] = useState({});

  useEffect(() => {
    if (clienteEditando) {
      setFormulario({
        nome: clienteEditando.nome ?? '',
        email: clienteEditando.email ?? '',
        telefone: clienteEditando.telefone ?? '',
        cidade: clienteEditando.cidade ?? '',
        interesse: clienteEditando.interesse ?? '',
        status: clienteEditando.status ?? 'Ativo',
        observacoes: clienteEditando.observacoes ?? ''
      });
      setErros({});
      return;
    }

    setFormulario(valoresIniciais);
    setErros({});
  }, [clienteEditando]);

  function atualizarCampo(event) {
    const { name, value } = event.target;
    setFormulario((atual) => ({ ...atual, [name]: value }));
    setErros((atuais) => ({ ...atuais, [name]: '' }));
  }

  function validar() {
    const proximosErros = {};

    if (!formulario.nome.trim()) {
      proximosErros.nome = 'Informe o nome.';
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formulario.email)) {
      proximosErros.email = 'Informe um e-mail valido.';
    }

    if (formulario.telefone.replace(/\D/g, '').length < 10) {
      proximosErros.telefone = 'Informe um telefone com DDD.';
    }

    if (!formulario.cidade.trim()) {
      proximosErros.cidade = 'Informe a cidade.';
    }

    if (!formulario.interesse.trim()) {
      proximosErros.interesse = 'Informe o interesse.';
    }

    setErros(proximosErros);
    return Object.keys(proximosErros).length === 0;
  }

  async function enviar(event) {
    event.preventDefault();

    if (!validar()) {
      return;
    }

    await onSalvar({
      nome: formulario.nome.trim(),
      email: formulario.email.trim().toLowerCase(),
      telefone: formulario.telefone.trim(),
      cidade: formulario.cidade.trim(),
      interesse: formulario.interesse.trim(),
      status: formulario.status,
      observacoes: formulario.observacoes.trim()
    });

    if (!clienteEditando) {
      setFormulario(valoresIniciais);
    }
  }

  return (
    <form className="form-panel" onSubmit={enviar}>
      <div className="panel-heading">
        <div>
          <span className="eyebrow">Cadastro</span>
          <h2>{clienteEditando ? 'Editar cliente' : 'Novo cliente'}</h2>
        </div>

        {clienteEditando && (
          <button className="icon-button" type="button" onClick={onCancelar} title="Cancelar edicao">
            <X size={18} />
          </button>
        )}
      </div>

      <div className="form-grid">
        <label>
          Nome
          <input name="nome" value={formulario.nome} onChange={atualizarCampo} placeholder="Nome completo" />
          {erros.nome && <small>{erros.nome}</small>}
        </label>

        <label>
          E-mail
          <input name="email" type="email" value={formulario.email} onChange={atualizarCampo} placeholder="cliente@email.com" />
          {erros.email && <small>{erros.email}</small>}
        </label>

        <label>
          Telefone
          <input name="telefone" value={formulario.telefone} onChange={atualizarCampo} placeholder="(00) 90000-0000" />
          {erros.telefone && <small>{erros.telefone}</small>}
        </label>

        <label>
          Cidade
          <input name="cidade" value={formulario.cidade} onChange={atualizarCampo} placeholder="Cidade/UF" />
          {erros.cidade && <small>{erros.cidade}</small>}
        </label>

        <label>
          Interesse
          <input name="interesse" value={formulario.interesse} onChange={atualizarCampo} placeholder="Produto ou plano" />
          {erros.interesse && <small>{erros.interesse}</small>}
        </label>

        <label>
          Status
          <select name="status" value={formulario.status} onChange={atualizarCampo}>
            {statusDisponiveis.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>

        <label className="full-field">
          Observacoes
          <textarea
            name="observacoes"
            rows="4"
            value={formulario.observacoes}
            onChange={atualizarCampo}
            placeholder="Historico de contato, preferencias ou proximos passos"
          />
        </label>
      </div>

      <button className="primary-button" type="submit" disabled={salvando}>
        <Save size={18} />
        {salvando ? 'Salvando...' : clienteEditando ? 'Atualizar cliente' : 'Cadastrar cliente'}
      </button>
    </form>
  );
}
