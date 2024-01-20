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