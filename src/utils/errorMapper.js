export default function mapErrors(err) {
    switch (err.path[0]) {
        case "name":
            return { text: "Nome Inválido", label: err.path[0] };
        case "description":
            return { text: "Descrição Inválida", label: err.path[0] };
        case "price":
            return { text: "Preço Inválido", label: err.path[0] };
        case "brandId":
            return { text: "Marca Inválida", label: err.path[0] };
        default:
            return { text: "Campo Inválido", label: err.path[0] };
    }
}