class Sumarizador {
    constructor(vendas) {
        this.vendas = vendas;
    }

    agruparPor(chave) {
        return this.vendas.reduce((acc, venda) => {
            const valor = venda[chave];
            if (!acc[valor]) acc[valor] = [];
            acc[valor].push(venda);
            return acc;
        }, {});
    }

    calcularResumo(vendas) {
        const totalQtd = vendas.reduce((sum, v) => sum + v.quantidade, 0);
        const totalValor = vendas.reduce((sum, v) => sum + v.quantidade * v.precoUnitario, 0);
        const precoMedio = totalQtd > 0 ? totalValor / totalQtd : 0;

        return {
            quantidadeTotal: totalQtd,
            valorTotal: totalValor.toFixed(2),
            precoMedio: precoMedio.toFixed(2)
        };
    }

    sumarizarPor(chave) {
        const grupos = this.agruparPor(chave);
        const resultado = {};
        for (const chaveGrupo in grupos) {
            resultado[chaveGrupo] = this.calcularResumo(grupos[chaveGrupo]);
        }
        return resultado;
    }

    sumarizarGeral() {
        return this.calcularResumo(this.vendas);
    }
}

module.exports = { Sumarizador };
