import Spinner from "./Spinner";

interface LoadingSectionProps {}

function LoadingSection({}: LoadingSectionProps) {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Spinner />
    </div>
  );
}

export default LoadingSection;
