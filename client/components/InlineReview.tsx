import Review from './Review';

interface InlineReviewProps {
  onClose?: () => void;
}

export default function InlineReview({ onClose }: InlineReviewProps) {
  return <Review onClose={onClose} />;
}
