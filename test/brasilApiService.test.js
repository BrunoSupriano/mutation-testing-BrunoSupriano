const BrasilApiService = require("../src/brasilApiService");

function respostaFake(ok, dados) {
  return { ok, json: jest.fn().mockResolvedValue(dados) };
}

describe("BrasilApiService", () => {
  describe("constructor", () => {
    test("lança erro quando nenhum httpClient é informado", () => {
      expect(() => new BrasilApiService()).toThrow(
        "É necessário informar um httpClient",
      );
    });

    test("cria a instância quando o httpClient é informado", () => {
      const service = new BrasilApiService(jest.fn());
      expect(service).toBeInstanceOf(BrasilApiService);
    });
  });

  describe("consultarCep", () => {
    test("retorna os dados e chama a URL correta, limpando o CEP", async () => {
      const dados = { cep: "01001000", city: "São Paulo" };
      const httpClient = jest.fn().mockResolvedValue(respostaFake(true, dados));
      const service = new BrasilApiService(httpClient);

      const resultado = await service.consultarCep("01001-000");

      expect(resultado).toEqual(dados);
      expect(httpClient).toHaveBeenCalledWith(
        "https://brasilapi.com.br/api/cep/v1/01001000",
      );
    });

    test("lança erro quando o CEP não tem 8 dígitos", async () => {
      const httpClient = jest.fn();
      const service = new BrasilApiService(httpClient);

      await expect(service.consultarCep("123")).rejects.toThrow("CEP inválido");
      expect(httpClient).not.toHaveBeenCalled();
    });

    test("lança erro quando o CEP não é encontrado", async () => {
      const httpClient = jest.fn().mockResolvedValue(respostaFake(false, {}));
      const service = new BrasilApiService(httpClient);

      await expect(service.consultarCep("99999999")).rejects.toThrow(
        "CEP não encontrado",
      );
    });
  });

  describe("consultarCnpj", () => {
    test("retorna os dados e chama a URL correta, limpando o CNPJ", async () => {
      const dados = { cnpj: "19131243000197", razao_social: "Open Knowledge" };
      const httpClient = jest.fn().mockResolvedValue(respostaFake(true, dados));
      const service = new BrasilApiService(httpClient);

      const resultado = await service.consultarCnpj("19.131.243/0001-97");

      expect(resultado).toEqual(dados);
      expect(httpClient).toHaveBeenCalledWith(
        "https://brasilapi.com.br/api/cnpj/v1/19131243000197",
      );
    });

    test("lança erro quando o CNPJ não tem 14 dígitos", async () => {
      const httpClient = jest.fn();
      const service = new BrasilApiService(httpClient);

      await expect(service.consultarCnpj("123")).rejects.toThrow(
        "CNPJ inválido",
      );
      expect(httpClient).not.toHaveBeenCalled();
    });

    test("lança erro quando o CNPJ não é encontrado", async () => {
      const httpClient = jest.fn().mockResolvedValue(respostaFake(false, {}));
      const service = new BrasilApiService(httpClient);

      await expect(service.consultarCnpj("19131243000100")).rejects.toThrow(
        "CNPJ não encontrado",
      );
    });
  });

  describe("listarBancos", () => {
    test("retorna a lista de bancos e chama a URL correta", async () => {
      const bancos = [{ code: 1, name: "BANCO DO BRASIL S.A." }];
      const httpClient = jest.fn().mockResolvedValue(respostaFake(true, bancos));
      const service = new BrasilApiService(httpClient);

      const resultado = await service.listarBancos();

      expect(resultado).toEqual(bancos);
      expect(httpClient).toHaveBeenCalledWith(
        "https://brasilapi.com.br/api/banks/v1",
      );
    });

    test("lança erro quando a requisição falha", async () => {
      const httpClient = jest.fn().mockResolvedValue(respostaFake(false, {}));
      const service = new BrasilApiService(httpClient);

      await expect(service.listarBancos()).rejects.toThrow(
        "Não foi possível listar os bancos",
      );
    });
  });

  describe("consultarBanco", () => {
    test("retorna os dados do banco e chama a URL correta", async () => {
      const banco = { code: 1, name: "BANCO DO BRASIL S.A." };
      const httpClient = jest.fn().mockResolvedValue(respostaFake(true, banco));
      const service = new BrasilApiService(httpClient);

      const resultado = await service.consultarBanco(1);

      expect(resultado).toEqual(banco);
      expect(httpClient).toHaveBeenCalledWith(
        "https://brasilapi.com.br/api/banks/v1/1",
      );
    });

    test("lança erro quando o código não é informado", async () => {
      const httpClient = jest.fn();
      const service = new BrasilApiService(httpClient);

      await expect(service.consultarBanco()).rejects.toThrow(
        "Código do banco é obrigatório",
      );
      expect(httpClient).not.toHaveBeenCalled();
    });

    test("lança erro quando o banco não é encontrado", async () => {
      const httpClient = jest.fn().mockResolvedValue(respostaFake(false, {}));
      const service = new BrasilApiService(httpClient);

      await expect(service.consultarBanco(999)).rejects.toThrow(
        "Banco não encontrado",
      );
    });
  });
});
