interface BotaoProps {
    cor?: 'green' | 'blue' | 'gray',
    className?: string,
    children: any,
    onclick?: () => void
}

export default function Botao(props: BotaoProps) {
    const cor = props.cor ? props.cor : 'gray';
    return (
        <button className={`
            bg-gradient-to-r from-${cor}-50 to-${cor}-50
            text-white px-4 py-2 rounded-md
            ${props.className}
        `} onClick={props.onclick}>
            {props.children}
        </button>
    )
}