import { useEffect, useState } from "react";
import ColecaoCliente from "../backend/db/ColecaoCliente";
import Botao from "../components/Botao";
import Formulario from "../components/Formulario";
import Layout from "../components/Layout";
import Tabela from "../components/Tabela";
import Cliente from "../core/Cliente";
import ClienteRepositorio from "../core/ClienteRepositorio";
import useClientes from "../hooks/useClientes";

export default function Home() {
  const {
    novoCliente,
    clienteSelecionado,
    salvarCliente,
    deletarCliente,
    cliente,
    clientes,
    tabelaVisivel,
    exibirTabela
  } = useClientes();

  return (
    <div>
      <h1 className={`
        flex
        h-screen
        justify-center
        text-white
        items-center
        bg-gradient-to-r from-purple-500 to-blue-600
      `}>
        <Layout titulo="Cadastro Simples">
          {tabelaVisivel ? (
            <>
              <div className="flex justify-end">
                <Botao className="mb-4" onclick={() => { novoCliente() }}>
                  Novo Cliente
                </Botao>
              </div>
              <Tabela clientes={clientes} clienteSelecionado={clienteSelecionado} deletarCliente={deletarCliente} />
            </>

          ) : (
            <Formulario clienteMudou={salvarCliente} cliente={cliente} cancelado={() => { exibirTabela() }} />
          )}
        </Layout>
      </h1>
    </div>
  )
}
