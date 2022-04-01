import { useState } from "react";
import Cliente from "../core/Cliente";
import Botao from "./Botao";
import Entrada from "./Entrada";

interface FormularioProps {
    cliente?: Cliente,
    clienteMudou?: (cliente: Cliente) => void,
    cancelado?: () => void
}

export default function Formulario(props: FormularioProps) {
    const id = props.cliente ? props.cliente.id : null;
    const [nome, setNome] = useState(props.cliente ? props.cliente.nome : '');
    const [idade, setIdade] = useState(props.cliente ? props.cliente.idade : 0)

    return (
        <div>
            {id ? (
                <Entrada texto="Código" valor={id} somenteLeitura={true} />
            ) : false}
            <Entrada texto="Nome" valor={nome} valorMuda={setNome} />
            <Entrada texto="Idade" tipo="number" valor={idade} valorMuda={setIdade} />
            <div className="mt-3 flex justify-end">
                <Botao cor="blue" className="mr-2" onclick={() => props.clienteMudou?.(new Cliente(nome, idade, id))}>
                    {id ? "Alterar" : "Salvar"}
                </Botao>
                <Botao cor="green" onclick={props.cancelado}>
                    Cancelar
                </Botao>
            </div>
        </div>
    )
}