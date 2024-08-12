import mongoose from "mongoose";

export interface INote {
  title: string;
  text: string;
  isFavorite?: boolean;
  color?: String;
  createdAt: Date;
}

const examSchema = new mongoose.Schema<INote>({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  isFavorite: {
    type: Boolean,
    default: false,
  },
  color: {
    type: String,
    default: "#fff",
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
});

export default mongoose.model<INote>("Note", examSchema);
