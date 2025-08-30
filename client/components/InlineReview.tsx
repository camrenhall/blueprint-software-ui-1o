import Review from "./Review";

interface InlineReviewProps {
  onClose?: () => void;
  initialCaseId?: string;
}

export default function InlineReview({ onClose, initialCaseId }: InlineReviewProps) {
  return <Review onClose={onClose} initialCaseId={initialCaseId} />;
}
