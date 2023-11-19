'use client';

import { useState } from 'react';

import { useParams, useRouter } from 'next/navigation';
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { toast } from 'sonner';
import { Spinner } from '@/components/core/spinner';
import { SearchIcon, TrashIcon, UndoIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ConfirmModal } from '@/components/modals/confirm-modal';

export const TrashBox = () => {
  const [isSearch, setIsSearch] = useState('');

  const router = useRouter();
  const params = useParams();
  const documents = useQuery(api.documents.getTrash);
  const restore = useMutation(api.documents.restore);
  const remove = useMutation(api.documents.remove);

  const filteredDocuments = documents?.filter((document) => {
    return document.title.toLowerCase().includes(isSearch.toLowerCase());
  });

  const onClick = (documentId: string) => {
    router.push(`/documents/${documentId}`);
  };

  const onRestore = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    documentId: Id<'documents'>
  ) => {
    e.stopPropagation();
    const promise = restore({ id: documentId });
    toast.promise(promise, {
      loading: 'Restoring note...',
      success: 'Note restored!',
      error: 'Failed to restore note.',
    });
  };

  const onRemove = (documentId: Id<'documents'>) => {
    const promise = remove({ id: documentId });
    toast.promise(promise, {
      loading: 'Removing note...',
      success: 'Note removed!',
      error: 'Failed to remove note.',
    });

    if (params.documentId === documentId) {
      router.push('/documents');
    }
  };

  if (documents === undefined) {
    return (
      <div className='flex h-full items-center justify-center p-4'>
        <Spinner size='lg' />
      </div>
    );
  }

  return (
    <div className='text-sm'>
      <div className='flex items-center gap-x-1 p-2'>
        <SearchIcon className='h-4 w-4' />
        <Input
          value={isSearch}
          onChange={(e) => setIsSearch(e.target.value)}
          className='h-7 bg-secondary px-2 focus-visible:ring-transparent'
          placeholder='Filter by page title...'
        />
      </div>
      <div className='mt-2 px-1 pb-1'>
        <p className='hidden pb-2 text-center text-xs text-muted-foreground last:block'>
          No documents found
        </p>
        {filteredDocuments?.map((document) => (
          <div
            key={document._id}
            role='button'
            onClick={() => onClick(document._id)}
            className='flex w-full items-center justify-between rounded-sm text-sm text-primary hover:bg-primary/5'
          >
            <span className='truncate pl-2'>{document.title}</span>
            <div className='flex items-center'>
              <div
                onClick={(e) => onRestore(e, document._id)}
                role='button'
                className='rounded-sm p-2 hover:bg-neutral-200'
              >
                <UndoIcon className='h-4 w-4 text-muted-foreground' />
              </div>
              <ConfirmModal onConfirm={() => onRemove(document._id)}>
                <div
                  role='button'
                  className='rounded-sm p-2 hover:bg-neutral-200'
                >
                  <TrashIcon className='h-4 w-4 text-muted-foreground' />
                </div>
              </ConfirmModal>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
