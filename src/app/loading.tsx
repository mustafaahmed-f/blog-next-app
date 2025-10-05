import Spinner from "@/_components/Spinner/Spinner";

const Loading: React.FC = ({}) => {
  return (
    <div className="flex h-full min-h-screen w-full items-center justify-center">
      <Spinner />
    </div>
  );
};

export default Loading;
