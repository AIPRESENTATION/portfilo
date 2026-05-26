import mongoose from 'mongoose';

const aboutContentSchema = new mongoose.Schema(
  {
    heroName: { type: String, default: 'Rakesh Koraganji' },
    heroTitles: [{ type: String }],
    heroBio: { type: String, default: '' },
    aboutTitle: { type: String, default: 'About Me' },
    aboutDescription: { type: String, default: '' },
    profileImageUrl: { type: String, default: '' },
    location: { type: String, default: '' },
    email: { type: String, default: '' },
    resumeUrl: { type: String, default: '' },
  },
  { timestamps: true }
);

const AboutContent = mongoose.model('AboutContent', aboutContentSchema);
export default AboutContent;
