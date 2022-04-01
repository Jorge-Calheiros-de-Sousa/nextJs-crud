import { useEffect, useState } from "react";
import ColecaoCliente from "../backend/db/ColecaoCliente";
import Cliente from "../core/Cliente";
import ClienteRepositorio from "../core/ClienteRepositorio";
import useTabelaOrForm from "./useTabelaOrForm";

export default function useClientes() {
    const repositorio: ClienteRepositorio = new ColecaoCliente()
    const [cliente, setCliente] = useState<Cliente>(Cliente.vazio());
    const [clientes, setClientes] = useState<Cliente[]>([]);  // a variavel clientes vai receber um array vazio do tipo cliente 

    const { tabelaVisivel, formularioVisivel, exibirForm, exibirTabela } = useTabelaOrForm();

    useEffect(() => {
        repositorio.obterTodos().then(setClientes);
    }, [])

    useEffect(obterTodos, []);

    function obterTodos() {
        repositorio.obterTodos().then(clientes => {
            setClientes(clientes)
            exibirTabela();
        })
    }

    function clienteSelecionado(cliente: Cliente) {
        setCliente(cliente);
        exibirForm()
    }

    function novoCliente() {
        setCliente(Cliente.vazio());
        exibirForm()
    }

    async function deletarCliente(cliente: Cliente) {
        await repositorio.excluir(cliente);
        obterTodos();
    }

    async function salvarCliente(cliente: Cliente) {
        await repositorio.salvar(cliente);
        obterTodos();
    }

    return {
        cliente,
        clientes,
        tabelaVisivel,
        exibirTabela,
        obterTodos,
        clienteSelecionado,
        deletarCliente,
        novoCliente,
        salvarCliente,
    }
}