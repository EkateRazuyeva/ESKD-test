type Props = {
    error?: string
}

export const ErrorMessage = ({error}: Props) => {
    return (
        <p className="absolute left-0 text-red-500 text-xs">{error}</p>
    )
}