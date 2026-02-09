import { registerComponent } from "@plasmicapp/react-web/lib/host";

import QuestionEntry from "../components/QuestionEntry";
import SubmissionEntry from "../components/SubmissionEntry";
import SearchBar from "../components/SearchBar";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
import ConsensusIndicator from "../components/ConsensusIndicator";
import CitationCard from "../components/CitationCard";
import AnswerWithCitations from "../components/AnswerWithCitations";
import EditableSection from "../components/EditableSection";
import EditableAnswer from "../components/EditableAnswer";
import CitationsList from "../components/CitationsList";
import AddCitationModal from "../components/AddCitationModal";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../components/ui/card";
import { LoginForm } from "../components/login-form";
import { SignUpForm } from "../components/sign-up-form";
import { ForgotPasswordForm } from "../components/forgot-password-form";
import { UpdatePasswordForm } from "../components/update-password-form";
import { LogoutButton } from "../components/logout-button";

const sampleQuestion = {
  id: "demo-question",
  question_text: "Is global average temperature rising?",
  discipline: "climate_science",
  claim: "Global average temperature has risen significantly over the past century.",
  answer_paragraph:
    "Yes. Multiple independent datasets confirm that global average temperature has risen by approximately 1.1 degrees C since the pre-industrial era (Lenssen et al., 2019). This warming is primarily driven by anthropogenic greenhouse gas emissions (Haustein et al., 2017).",
  consensus_score: 9,
  citations: null,
  is_approved: true,
  is_complete: false,
  citation_count: 2,
  in_text_citation_count: 2,
  created_at: new Date().toISOString(),
} as any;

const sampleSubmission = {
  id: "demo-submission",
  question_text: "Do vaccines cause autism in children?",
  discipline: "medicine",
  submitter_email: "researcher@example.com",
  status: "pending",
  submitted_at: new Date().toISOString(),
} as any;

const sampleCitation = {
  id: "demo-citation-1",
  question_id: "demo-question",
  doi: "10.1029/2018JD029522",
  bibtex: "@article{lenssen2019,title={Improvements in the GISTEMP}}",
  title: "Improvements in the GISTEMP Uncertainty Model",
  authors: "Lenssen, N. J. L. et al.",
  journal: "Journal of Geophysical Research: Atmospheres",
  year: 2019,
  url: "https://doi.org/10.1029/2018JD029522",
  created_at: new Date().toISOString(),
} as any;

const sampleCitationArray = [
  sampleCitation,
  {
    id: "demo-citation-2",
    question_id: "demo-question",
    doi: "10.1038/s41561-017-0015-2",
    bibtex: "@article{haustein2017,title={A real-time Global Warming Index}}",
    title: "A real-time Global Warming Index",
    authors: "Haustein, K. et al.",
    journal: "Scientific Reports",
    year: 2017,
    url: "https://doi.org/10.1038/s41561-017-0015-2",
    created_at: new Date().toISOString(),
  } as any,
];

registerComponent(QuestionEntry, {
  name: "QuestionEntry",
  importPath: "./src/components/QuestionEntry",
  props: {
    question: {
      type: "object",
      defaultValue: sampleQuestion,
      helpText: "Database row for a question.",
    },
  },
});

registerComponent(SubmissionEntry, {
  name: "SubmissionEntry",
  importPath: "./src/components/SubmissionEntry",
  props: {
    submission: {
      type: "object",
      defaultValue: sampleSubmission,
      helpText: "Database row for a submission.",
    },
  },
});

registerComponent(SearchBar, {
  name: "SearchBar",
  importPath: "./src/components/SearchBar",
  props: {},
});

registerComponent(Footer, {
  name: "Footer",
  importPath: "./src/components/Footer",
  props: {},
});

registerComponent(Navigation, {
  name: "Navigation",
  importPath: "./src/components/Navigation",
  props: {},
});

registerComponent(ConsensusIndicator, {
  name: "ConsensusIndicator",
  importPath: "./src/components/ConsensusIndicator",
  props: {
    score: {
      type: "number",
      defaultValue: 7,
      helpText: "Consensus score from 0 to 10.",
    },
    showLabel: {
      type: "boolean",
      defaultValue: true,
      helpText: "Whether to show the consensus label badge.",
    },
    size: {
      type: "choice",
      options: ["sm", "md", "lg"],
      defaultValue: "md",
    },
  },
});

registerComponent(CitationCard, {
  name: "CitationCard",
  importPath: "./src/components/CitationCard",
  props: {
    citation: {
      type: "object",
      defaultValue: sampleCitation,
      helpText: "A single Citation object.",
    },
    index: {
      type: "number",
      defaultValue: 0,
      helpText: "Zero-based display index.",
    },
  },
});

registerComponent(AnswerWithCitations, {
  name: "AnswerWithCitations",
  importPath: "./src/components/AnswerWithCitations",
  props: {
    text: {
      type: "string",
      defaultValue: sampleQuestion.answer_paragraph,
      helpText: "Answer text containing in-text citations like (Author, Year).",
    },
    citations: {
      type: "object",
      defaultValue: sampleCitationArray,
      helpText: "Array of Citation objects to match against in-text references.",
    },
  },
});

registerComponent(EditableSection, {
  name: "EditableSection",
  importPath: "./src/components/EditableSection",
  props: {
    value: {
      type: "string",
      defaultValue: "Sample editable content",
    },
    placeholder: {
      type: "string",
      defaultValue: "Click Edit to add content...",
    },
    label: {
      type: "string",
      defaultValue: "Section",
    },
    multiline: {
      type: "boolean",
      defaultValue: false,
    },
    onSave: {
      type: "eventHandler",
      argTypes: [{ name: "newValue", type: "string" }],
    } as any,
  },
});

registerComponent(EditableAnswer, {
  name: "EditableAnswer",
  importPath: "./src/components/EditableAnswer",
  props: {
    value: {
      type: "string",
      defaultValue: sampleQuestion.answer_paragraph,
    },
    citations: {
      type: "object",
      defaultValue: sampleCitationArray,
    },
    onSave: {
      type: "eventHandler",
      argTypes: [{ name: "newValue", type: "string" }],
    } as any,
  },
});

registerComponent(CitationsList, {
  name: "CitationsList",
  importPath: "./src/components/CitationsList",
  props: {
    questionId: {
      type: "string",
      defaultValue: "demo-question",
    },
    citations: {
      type: "object",
      defaultValue: sampleCitationArray,
    },
    inTextCitationCount: {
      type: "number",
      defaultValue: 2,
    },
    onCitationsChange: {
      type: "eventHandler",
      argTypes: [],
    } as any,
  },
});

registerComponent(AddCitationModal, {
  name: "AddCitationModal",
  importPath: "./src/components/AddCitationModal",
  props: {
    questionId: {
      type: "string",
      defaultValue: "demo-question",
    },
    onClose: {
      type: "eventHandler",
      argTypes: [],
    } as any,
    onCitationAdded: {
      type: "eventHandler",
      argTypes: [],
    } as any,
  },
});

registerComponent(Button, {
  name: "Button",
  importPath: "./src/components/ui/button",
  props: {
    children: {
      type: "slot",
      defaultValue: "Button",
    },
    variant: {
      type: "choice",
      options: ["default", "destructive", "outline", "secondary", "ghost", "link"],
      defaultValue: "default",
    },
    size: {
      type: "choice",
      options: ["default", "sm", "lg", "icon"],
      defaultValue: "default",
    },
    disabled: {
      type: "boolean",
      defaultValue: false,
    },
  },
});

registerComponent(Input, {
  name: "Input",
  importPath: "./src/components/ui/input",
  props: {
    placeholder: {
      type: "string",
      defaultValue: "Type here...",
    },
    type: {
      type: "choice",
      options: ["text", "email", "password", "number", "search"],
      defaultValue: "text",
    },
    disabled: {
      type: "boolean",
      defaultValue: false,
    },
    value: {
      type: "string",
      defaultValue: "",
    },
  },
});

registerComponent(Label, {
  name: "Label",
  importPath: "./src/components/ui/label",
  props: {
    children: {
      type: "slot",
      defaultValue: "Label",
    },
    htmlFor: {
      type: "string",
    },
  },
});

registerComponent(Card, {
  name: "Card",
  importPath: "./src/components/ui/card",
  props: {
    children: {
      type: "slot",
    },
  },
});

registerComponent(CardHeader, {
  name: "CardHeader",
  importPath: "./src/components/ui/card",
  props: {
    children: {
      type: "slot",
    },
  },
});

registerComponent(CardTitle, {
  name: "CardTitle",
  importPath: "./src/components/ui/card",
  props: {
    children: {
      type: "slot",
      defaultValue: "Card Title",
    },
  },
});

registerComponent(CardDescription, {
  name: "CardDescription",
  importPath: "./src/components/ui/card",
  props: {
    children: {
      type: "slot",
      defaultValue: "Card description text",
    },
  },
});

registerComponent(CardContent, {
  name: "CardContent",
  importPath: "./src/components/ui/card",
  props: {
    children: {
      type: "slot",
    },
  },
});

registerComponent(CardFooter, {
  name: "CardFooter",
  importPath: "./src/components/ui/card",
  props: {
    children: {
      type: "slot",
    },
  },
});

registerComponent(LoginForm, {
  name: "LoginForm",
  importPath: "./src/components/login-form",
  props: {
    className: {
      type: "string",
    },
  },
});

registerComponent(SignUpForm, {
  name: "SignUpForm",
  importPath: "./src/components/sign-up-form",
  props: {
    className: {
      type: "string",
    },
  },
});

registerComponent(ForgotPasswordForm, {
  name: "ForgotPasswordForm",
  importPath: "./src/components/forgot-password-form",
  props: {
    className: {
      type: "string",
    },
  },
});

registerComponent(UpdatePasswordForm, {
  name: "UpdatePasswordForm",
  importPath: "./src/components/update-password-form",
  props: {
    className: {
      type: "string",
    },
  },
});

registerComponent(LogoutButton, {
  name: "LogoutButton",
  importPath: "./src/components/logout-button",
  props: {},
});
