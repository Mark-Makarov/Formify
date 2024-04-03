import { Skeleton } from "@/components/ui/skeleton";

const FormCardSkeleton = ({ count = 1 }) => {
  const emptyCards = Array.from({ length: count }, (_, index) => index);

  return (
    <>
      {emptyCards.map((number) => (
        <Skeleton
          key={number}
          className='border-primary-/20 h-[190px] w-full border-2'
        />
      ))}
    </>
  );
};

export default FormCardSkeleton;
