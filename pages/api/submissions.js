import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

const submissionSchema = new mongoose.Schema({
  from: String,
  to: String,
  charges: Number,
  phoneNumber: String,
  createdAt: {
    type: Date,
    expires: '30m',
    default: Date.now,
  },
});

mongoose.models = {}
const Submission = mongoose.model('Submission', submissionSchema);

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const submissions = await Submission.find({});
      res.status(200).json(submissions);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else if (req.method === 'POST') {
    const { from, to, charges, phoneNumber } = req.body;
    const submission = new Submission({
      from,
      to,
      charges,
      phoneNumber,
    });

    try {
      await submission.save();
      res.status(200).json({ message: 'Submission successful' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}
