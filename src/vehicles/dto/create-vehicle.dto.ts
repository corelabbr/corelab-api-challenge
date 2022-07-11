import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';


export class CreateVehicleDto {

    @MaxLength(80, {
        message: 'O nome do veículo deve ter no máximo 80 caracteres',
    })
    @IsNotEmpty({ message: 'Nome do veículo não informado'})
    name: string;

    
    @IsNotEmpty({ message: 'Marca do veículo não informada'})
    brand: string;


    @IsNotEmpty({ message: 'Cor do veículo não informada'})
    color: string;


    @MaxLength(4, { message: 'O ano do veículo deve ter no máximo 4 números'})
    @IsNotEmpty({ message: 'Ano do veículo não informado'})
    year: string;


    @MaxLength(7,{message: 'A placa deve ter 7 dígitos'})
    @MinLength(7,{message: 'A placa deve ter 7 dígitos'})
    @IsNotEmpty({ message: 'Placa do veículo não informada'})
    plate: string;


    @IsNotEmpty({ message: 'Preço não informado'})
    price: string


    isFavorite: boolean;


    @MaxLength(60,{message: 'A descrição deve ter 60 dígitos'})
    description: string
}
