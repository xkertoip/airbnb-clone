import { ReactNode } from "react";

interface InputProps {
    header: string | null,
    description: string | null,
    children: ReactNode
}
export default function FormFiled({header, description, children, }: InputProps) {
    return(
        <>
            {header ? (<h2 className={'text-2xl mt-4'}>{header}</h2>) : null}
            {description ? (<p className={'text-gray-500 text-sm'}>{description}</p>) : null}
            {children}
        </>
    )
}