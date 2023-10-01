import connectToMongo from '@/middleware/middleware';
import mongoose from 'mongoose';
import Cors from 'cors';

// Initialize the Cors middleware
const cors = Cors({
  origin: 'https://easymola.vercel.app', // Replace with your Vercel deployment URL
  methods: ['GET', 'POST'], // Specify the HTTP methods you want to allow
});

// Include the schema for the "Submission" collection
const submissionSchema = new mongoose.Schema({
  from: String,
  to: String,
  charges: Number,
  phoneNumber: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
submissionSchema.index({ createdAt: 1 }, { expireAfterSeconds: 108000 });

const Submission = mongoose.model('Submission', submissionSchema);

// Include the schema for the "permanentdata" collection
const permanentDataSchema = new mongoose.Schema({
  from: String,
  phoneNumber: String,
  timestamp: {
    type: Date,
    default: () => new Date(Date.now() + 5.5 * 60 * 60 * 1000),
  },
});

const PermanentData = mongoose.model('PermanentData', permanentDataSchema);

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

    // Create a new Submission document
    const submission = new Submission({
      from,
      to,
      charges,
      phoneNumber,
    });

    // Create a new PermanentData document
    const permanentData = new PermanentData({
      from,
      phoneNumber,
    });

    try {
      // Save the Submission document
      await submission.save();

      // Save the PermanentData document
      await permanentData.save();

      res.status(200).json({ message: 'Submission successful' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

export default connectToMongo(handler);
