import mongoose from "mongoose";

const connectToMongo = handler => async (req, res) => {
  if (mongoose.connections[0].readyState) {
    return handler(req, res);
  }
  await mongoose.connect('mongodb+srv://luckysolanki902:n4N7yCNS0rwdm6lm@cluster0.iuo6lni.mongodb.net/easymola?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  return handler(req, res);
};

export default connectToMongo;
