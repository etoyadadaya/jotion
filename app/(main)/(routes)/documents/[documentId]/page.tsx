'use client';

import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';

import Editor from '@/components/core/editor';
import { Toolbar } from '@/components/core/toolbar';
import { Cover } from '@/components/core/cover';
import { Skeleton } from '@/components/ui/skeleton';

interface DocumentIdPageProps {
  params: {
    documentId: Id<'documents'>;
  };
}

const DocumentIdPage = ({ params }: DocumentIdPageProps) => {
  const update = useMutation(api.documents.update);
  const Editor = useMemo(
    () => dynamic(() => import('@/components/core/editor'), { ssr: false }),
    []
  );
  const document = useQuery(api.documents.getById, {
    documentId: params.documentId,
  });

  if (document === undefined) {
    return (
      <div>
        <Cover.Skeleton />
        <div className='mx-auto mt-10 md:max-w-3xl lg:max-w-4xl'>
          <div className='space-y-4 pl-8 pt-4'>
            <Skeleton className='h-14 w-[50%]' />
            <Skeleton className='h-4 w-[80%]' />
            <Skeleton className='h-4 w-[40%]' />
            <Skeleton className='w-[6 0%] h-4' />
          </div>
        </div>
      </div>
    );
  }

  if (document === null) {
    return <div>Not found</div>;
  }

  const onChange = (content: string) => {
    update({
      id: params.documentId,
      content,
    });
  };

  return (
    <div className='pb-40'>
      <Cover url={document.coverImage} />
      <div className='mx-auto md:max-w-3xl lg:max-w-4xl'>
        <Toolbar initialData={document} />
        <Editor onChange={onChange} initialContent={document.content} />
      </div>
    </div>
  );
};

export default DocumentIdPage;
