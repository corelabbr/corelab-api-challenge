import { Type } from '@sinclair/typebox';

export const ItemSchema = Type.Object({
  id: Type.String({ format: 'uuid' }),
  name: Type.String(),
  description: Type.String(),
  favorite: Type.Boolean({ default: false }),
  color: Type.String({ default: '89CFF0' }),
  createdAt: Type.String({ format: 'date-time' }),
  updatedAt: Type.String({ format: 'date-time' }),
  deleted: Type.Boolean({ default: false }),
  deletedAt: Type.Optional(Type.String({ format: 'date-time' })),
});

export const CreateItemSchema = Type.Object({
  name: Type.String({ minLength: 1 }),
  description: Type.String({ minLength: 1 }),
  favorite: Type.Optional(Type.Boolean()),
  color: Type.Optional(Type.String()),
});

export const UpdateItemSchema = Type.Partial(CreateItemSchema);

export const ItemIdParams = Type.Object({
  id: Type.String({ format: 'uuid' }),
});

export const ErrorResponse = Type.Object({
  error: Type.String(),
  details: Type.Optional(Type.Array(Type.String())),
});