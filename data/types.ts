interface PontoTuristicoCardProps {
    nome: string
    descricao: string
    imagem: string
}

interface DadosAdaptados {
    id: string
    nome: string
    descricao: string
    imagem: string

}

interface ApiResponseItem {
    id: number;
    title: string;
    body: string;
}

export { PontoTuristicoCardProps, DadosAdaptados, ApiResponseItem }