import connectToMongo from '@/middleware/middleware';
import mongoose from 'mongoose';
import Cors from 'cors';

// Initialize the Cors middleware
const cors = Cors({
  origin: 'https://easymola.vercel.app', // Replace with your Vercel deployment URL
  methods: ['GET', 'POST'], // Specify the HTTP methods you want to allow
});

// Include the schema here
const submissionSchema = new mongoose.Schema({
  from: String,
  to: String,
  charges: Number,
  phoneNumber: String,
  createdAt: {
    type: Date,
    expires: '3h',
    default: Date.now,
  },
});

const Submission = mongoose.model('Submission', submissionSchema);

const handler = async (req, res) => {
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
};

export default connectToMongo(handler);
