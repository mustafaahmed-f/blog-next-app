interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function Page({ params }: PageProps) {
  const { slug } = await params;

  return <div>comments</div>;
}

export default Page;
