import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://corelab:Socram190326@cluster0.gccpul1.mongodb.net/corelab-task?retryWrites=true&w=majority';
    
    await mongoose.connect(mongoURI);
    
    console.log('MongoDB conectado com sucesso');
  } catch (error) {
    console.error('Erro ao conectar com MongoDB:', error);
    process.exit(1);
  }
};

export default connectDB;

