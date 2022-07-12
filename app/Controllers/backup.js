import {schema,rules} from '@ioc:Adonis/Core/Validator'
const vehicleSchema = schema.create({
  name:schema.string({},[
    rules.maxLength(30),
    rules.minLength(4),
    rules.unique({table:"vehicle",column:"name"}),
    rules.regex(/^[a-zA-Z0-9_.-]*$/),
  ]), 
  description:schema.string({},[
    rules.maxLength(100),
    rules.minLength(5),
    rules.regex(/^[a-zA-Z0-9_.-]*$/),
  ]),
  plate:schema.string({},[
    rules.maxLength(100),
    rules.minLength(5),
    rules.regex(/^[a-zA-Z0-9_.-]*$/),
  ]),
  is_favorite:schema.boolean({},[
    
  ),
  ]),
  year:schema.number({},[
    
  ]),
  color:schema.string({},[
    rules.maxLength(100),
    rules.minLength(5),
    rules.regex(/^[a-zA-Z0-9_.-]*$/),
  ]),
  price:schema.number({},[
 
  ]),
})