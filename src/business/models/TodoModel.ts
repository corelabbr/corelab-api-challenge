import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type TodoDocument = HydratedDocument<Todo>

@Schema()
export class Todo {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: true })
  description: string;
  
  @Prop({ type: Boolean, required: true, default: false })
  isFavorite?: boolean

  @Prop({ type: String, required: true, default: '#fff' })
  color?: string
}

export const TodoSchema = SchemaFactory.createForClass(Todo)
