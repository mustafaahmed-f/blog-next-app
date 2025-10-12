"use client";

interface TagSectionProps {
  tags: { name: string }[];
}

function TagSection({ tags }: TagSectionProps) {
  if (!tags?.length) return null;

  return (
    <div className="mt-2 flex flex-wrap gap-2">
      {tags.map((tag, i) => (
        <span
          key={i}
          className="cursor-pointer rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-200"
        >
          # {tag.name}
        </span>
      ))}
    </div>
  );
}

export default TagSection;
