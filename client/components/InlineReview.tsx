import Review from "./Review";

interface InlineReviewProps {
  onClose?: () => void;
  initialCaseId?: string;
  onNavigateToCommunications?: (clientId?: string) => void;
}

export default function InlineReview({
  onClose,
  initialCaseId,
  onNavigateToCommunications,
}: InlineReviewProps) {
  return (
    <Review
      onClose={onClose}
      initialCaseId={initialCaseId}
      onNavigateToCommunications={onNavigateToCommunications}
    />
  );
}
