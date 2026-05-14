import { AlertCircle, CheckCircle2, Database, RefreshCw, Search, Users } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import ClienteForm from './components/ClienteForm.jsx';
import ClienteTable from './components/ClienteTable.jsx';
import { atualizarCliente, criarCliente, listarClientes, removerCliente } from './services/clientesApi.js';

const filtrosStatus = ['Todos', 'Ativo', 'Em negociacao', 'Inativo'];

function normalizar(valor) {
  return valor.toLocaleLowerCase('pt-BR');
}

export default function App() {
  const [clientes, setClientes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState('');
  const [aviso, setAviso] = useState('');
  const [clienteEditando, setClienteEditando] = useState(null);
  const [busca, setBusca] = useState('');
  const [statusFiltro, setStatusFiltro] = useState('Todos');

  async function carregarClientes() {
    setCarregando(true);
    setErro('');

    try {
      setClientes(await listarClientes());
    } catch (error) {
      setErro('Nao foi possivel conectar com a API. Verifique se o JSON Server esta rodando na porta 3333.');
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarClientes();
  }, []);

  const clientesFiltrados = useMemo(() => {
    const termo = normalizar(busca.trim());

    return clientes.filter((cliente) => {
      const combinaStatus = statusFiltro === 'Todos' || cliente.status === statusFiltro;
      const conteudo = normalizar(`${cliente.nome} ${cliente.email} ${cliente.cidade} ${cliente.interesse}`);
      return combinaStatus && (!termo || conteudo.includes(termo));
    });
  }, [clientes, busca, statusFiltro]);

  const totais = useMemo(() => {
    return clientes.reduce(
      (acc, cliente) => {
        acc.total += 1;
        acc[cliente.status] = (acc[cliente.status] ?? 0) + 1;
        return acc;
      },
      { total: 0, Ativo: 0, 'Em negociacao': 0, Inativo: 0 }
    );
  }, [clientes]);

  async function salvarCliente(dados) {
    setSalvando(true);
    setErro('');
    setAviso('');

    try {
      if (clienteEditando) {
        await atualizarCliente(clienteEditando.id, dados);
        setAviso('Cliente atualizado com sucesso.');
      } else {
        await criarCliente(dados);
        setAviso('Cliente cadastrado com sucesso.');
      }

      setClienteEditando(null);
      await carregarClientes();
    } catch (error) {
      setErro('Nao foi possivel salvar o cliente. Confira a API e tente novamente.');
    } finally {
      setSalvando(false);
    }
  }

  async function remover(cliente) {
    const confirmar = window.confirm(`Remover ${cliente.nome} do cadastro?`);

    if (!confirmar) {
      return;
    }

    setErro('');
    setAviso('');

    try {
      await removerCliente(cliente.id);
      setAviso('Cliente removido com sucesso.');
      await carregarClientes();
    } catch (error) {
      setErro('Nao foi possivel remover o cliente.');
    }
  }

  return (
    <main className="app-shell">
      <section className="topbar">
        <div>
          <span className="eyebrow">React + API REST</span>
          <h1>Cadastro de Clientes</h1>
        </div>

        <button className="secondary-button" type="button" onClick={carregarClientes}>
          <RefreshCw size={18} />
          Atualizar
        </button>
      </section>

      <section className="summary-grid" aria-label="Resumo dos clientes">
        <article className="summary-card">
          <Users size={24} />
          <div>
            <span>Total</span>
            <strong>{totais.total}</strong>
          </div>
        </article>
        <article className="summary-card">
          <CheckCircle2 size={24} />
          <div>
            <span>Ativos</span>
            <strong>{totais.Ativo}</strong>
          </div>
        </article>
        <article className="summary-card">
          <Database size={24} />
          <div>
            <span>Negociacao</span>
            <strong>{totais['Em negociacao']}</strong>
          </div>
        </article>
      </section>

      {erro && (
        <div className="alert error" role="alert">
          <AlertCircle size={18} />
          {erro}
        </div>
      )}

      {aviso && (
        <div className="alert success" role="status">
          <CheckCircle2 size={18} />
          {aviso}
        </div>
      )}

      <section className="content-grid">
        <ClienteForm
          clienteEditando={clienteEditando}
          onSalvar={salvarCliente}
          onCancelar={() => setClienteEditando(null)}
          salvando={salvando}
        />

        <section className="list-panel">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">Listagem</span>
              <h2>Clientes cadastrados</h2>
            </div>
            <span className="result-count">{clientesFiltrados.length} resultado(s)</span>
          </div>

          <div className="filters">
            <label className="search-field">
              <Search size={18} />
              <input
                value={busca}
                onChange={(event) => setBusca(event.target.value)}
                placeholder="Buscar por nome, e-mail, cidade ou interesse"
              />
            </label>

            <div className="segmented-control" aria-label="Filtrar por status">
              {filtrosStatus.map((status) => (
                <button
                  key={status}
                  type="button"
                  className={statusFiltro === status ? 'selected' : ''}
                  onClick={() => setStatusFiltro(status)}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          <ClienteTable
            clientes={clientesFiltrados}
            carregando={carregando}
            onEditar={setClienteEditando}
            onRemover={remover}
          />
        </section>
      </section>
    </main>
  );
}
