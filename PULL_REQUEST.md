Back End:

Em back foi bastante desafiador por que eu realmente não sabia nada de AdonisJS e typescript, mas atravás da documentação do Adonis e do typescript eu consegui desenvolver.

Primeiro eu criei um banco de dados com o PostgreSQL onde eu crio ali a tabela vehicles com um id-primary-key,name-varchar,plate-text,isfavorite-boolean,color-text,price-int, createdat-date

Em vehiclesController index, eu faço a chamada de todos os veiculos do banco de dados através do .all() e retorno status(200) de bem sucedido e .json(vehicles)
Em vehiclesController store, eu crio um novo veiculo no banco de dados através do create e das propriedades quem do body através do req.only
Em vehiclesController update, eu procuro o veiculo no banco de dados através do find, se o veiculo existir eu faço o merge/update do veiculo com as propriedades que vem do body. e salvo com vehicle.save()
Em vehiclesController destroy, eu procuro o veiculo no banco de dados e se ele existir eu dou um veiuclo.delete() e retorno um status 200

Em models eu seto o tipo de cada coluna:
id: number  
name:string
description:string
plate:string
isfavorite:boolean
year:number
color:string  
price:number
createdate: eu coloquei como autocreate do tipo DateTime

Em routes eu usei o Route.resource para pegar todas as rotas de VehiclesController
