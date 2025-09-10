import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "The task name is needed"],
    trim: true,
    validate: {
      validator: function (value) {
        return value.trim().length > 0;
      },
      message: "O nome da tarefa não pode conter apenas espaços em branco",
    },
    maxLength: [50, "O nome não pode passar de 50 caracteres"],
  },

  description: {
    type: String,
    default: "",
    trim: true,
    maxLength: [500, "A descrição não pode passar 500 caracteres"],
  },

  color: {
    type: Number,
    min: [0, "o indice de cores não pode ser menor 0"],
    max: [5, "o indice de cores não pdoe ser maior que 5"],
  },

  favorite: {
    type: Boolean,
    default: false,
  },

  startDate: {
    type: Date,
    default: Date.now,
  },

  endDate: {
    type: Date,
    default: null,
  },

  complete: {
    type: Boolean,
    default: false,
  },
});

TaskSchema.pre("save", function (next) {
  if (this.name) {
    this.name = this.name.trim();
  }
  next();
});

TaskSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();

  if (update.complete !== undefined) {
    update.endDate = update.complete ? new Date() : null;
  }

  next();
});

export default mongoose.model("task", TaskSchema);
