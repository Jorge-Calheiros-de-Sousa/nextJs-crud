import Cliente from "../core/Cliente"
import { IconeEdicao, IconeLixo } from "./Icones"

interface TabelaProps {
    clientes: Cliente[],
    clienteSelecionado?(cliente: Cliente),
    deletarCliente?(cliente: Cliente)
}


export default function Tabela(props: TabelaProps) {

    const exibirBotoes = props.clienteSelecionado || props.deletarCliente;

    function renderizarAcoes(cliente: Cliente) {
        return (
            <td className="flex justify-center align-center">
                {props.clienteSelecionado &&
                    <button onClick={() => props.clienteSelecionado?.(cliente)} className={`
                                flex justify-center items-center
                                text-green-600 rounded-full
                                hover:bg-purple-50 p-2 m-1
            
                            `}>
                        {IconeEdicao}
                    </button>
                }
                {props.deletarCliente &&
                    <button onClick={() => props.deletarCliente?.(cliente)} className={`
                            flex justify-center items-center
                            text-red-500 rounded-full
                            hover:bg-purple-50 p-2 m-1
                    `}>
                        {IconeLixo}
                    </button>
                }
            </td >
        )
    }

    function renderizarDados() {
        return props.clientes?.map((cliente, indice) => {
            return (
                <tr key={cliente.id} className={`
                    ${indice % 2 === 0 ? 'bg-purple-200' : 'bg-purple-100'}
                `}>
                    <td className="text-left p-4">{cliente.id}</td>
                    <td className="text-left p-4">{cliente.nome}</td>
                    <td className="text-left p-4">{cliente.idade}</td>
                    {exibirBotoes && renderizarAcoes(cliente)}
                </tr>
            )
        })
    }


    return (
        <table className="w-full rounded-xl overflow-hidden">
            <thead className={`
                bg-gradient-to-r from-purple-500 to-purple-800
                text-gray-100
            `}>
                <tr>
                    <th className="text-left p-4">Código</th>
                    <th className="text-left p-4">Nome</th>
                    <th className="text-left p-4">Idade</th>
                    <th className="text-center p-4">Ações</th>
                </tr>
            </thead>
            <tbody>
                {renderizarDados()}
            </tbody>
        </table>
    )
}