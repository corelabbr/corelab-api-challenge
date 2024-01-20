import * as yup from "yup";
import { NextFunction, Request, Response } from "express"; 

export const validation = (schema: yup.AnyObject) => async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    try {
        await schema.validate(
            {
                body: req.body
            },
            { strict: true, abortEarly: false }
        ); 

        next();

    } catch (error) {
        const { name, message, errors } = error as yup.ValidationError;
        res.status(406).send({ name, message, errors, code: 406 });
    }
};

export const postValidation = yup.object({
    body: yup.object({
        title: yup.string().required().min(3),
        desc: yup.string().required().min(3),
        color: yup.string().required(),
        favorite: yup.boolean().required()
      }),
})

export const putValidation = yup.object({
    body: yup.object({
        title: yup.string().min(3),
        desc: yup.string().min(3),
        color: yup.string(),
        favorite: yup.boolean()
      }),
})
