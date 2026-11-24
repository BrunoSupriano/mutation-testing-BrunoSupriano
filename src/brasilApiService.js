const URL_BASE = "https://brasilapi.com.br/api";

function somenteDigitos(valor) {
  return String(valor).replace(/\D/g, "");
}

class BrasilApiService {
  constructor(httpClient) {
    if (!httpClient) {
      throw new Error("É necessário informar um httpClient");
    }
    this.httpClient = httpClient;
  }

  async buscar(caminho, mensagemErro) {
    const resposta = await this.httpClient(`${URL_BASE}${caminho}`);
    if (!resposta.ok) {
      throw new Error(mensagemErro);
    }
    return resposta.json();
  }

  async consultarCep(cep) {
    const cepLimpo = somenteDigitos(cep);
    if (cepLimpo.length !== 8) {
      throw new Error("CEP inválido");
    }
    return this.buscar(`/cep/v1/${cepLimpo}`, "CEP não encontrado");
  }

  async consultarCnpj(cnpj) {
    const cnpjLimpo = somenteDigitos(cnpj);
    if (cnpjLimpo.length !== 14) {
      throw new Error("CNPJ inválido");
    }
    return this.buscar(`/cnpj/v1/${cnpjLimpo}`, "CNPJ não encontrado");
  }

  async listarBancos() {
    return this.buscar("/banks/v1", "Não foi possível listar os bancos");
  }

  async consultarBanco(codigo) {
    if (!codigo) {
      throw new Error("Código do banco é obrigatório");
    }
    return this.buscar(`/banks/v1/${codigo}`, "Banco não encontrado");
  }
}

module.exports = BrasilApiService;
