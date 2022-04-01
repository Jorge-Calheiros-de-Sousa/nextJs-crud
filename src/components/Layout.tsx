import Titulo from "./Titulo";


// interface só pode ser usada no typescript (lembrando que o typescript é só uma forma de escrevar javascript)
// typescript será convertido para js

interface LayoutProps {
    titulo: string,
    children: any
}

export default function Layout(props: LayoutProps) {
    return (
        <div className={`
            flex flex-col w-2/3
            bg-white text-gray-800 rounded-md
        `}>
            <Titulo>{props.titulo}</Titulo>
            <div className="p-6">
                {props.children}
            </div>
        </div>
    )
}