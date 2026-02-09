import { registerComponent } from "@plasmicapp/react-web/lib/host";

// Import the components you want to use *inside Plasmic Studio*
import QuestionEntry from "../components/QuestionEntry";
import SubmissionEntry from "../components/SubmissionEntry";
import SearchBar from "../components/SearchBar";

// Provide sample objects so the components render nicely on the canvas.
// IMPORTANT: tailor these to whatever fields your components actually read.
const sampleQuestion = {
  id: "demo-question",
  question_text: "Is global average temperature rising?",
  discipline: "climate_science",
  is_approved: true,
  is_complete: false,
  created_at: new Date().toISOString(),
} as any;

const sampleSubmission = {
  id: "demo-submission",
  question_text: "Do vaccines cause autism in children?",
  discipline: "medicine",
  status: "pending",
  submitted_at: new Date().toISOString(),
} as any;

// Register components
registerComponent(QuestionEntry, {
  name: "QuestionEntry",
  props: {
    question: {
      type: "object",
      defaultValue: sampleQuestion,
      helpText: "Database row for a question (used to render the card).",
    },
  },
});

registerComponent(SubmissionEntry, {
  name: "SubmissionEntry",
  props: {
    submission: {
      type: "object",
      defaultValue: sampleSubmission,
      helpText: "Database row for a submission (used to render the card).",
    },
  },
});

registerComponent(SearchBar, {
  name: "SearchBar",
  props: {},
});

