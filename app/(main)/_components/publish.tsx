'use client';

import { Doc } from '@/convex/_generated/dataModel';
import { useOrigin } from '@/hooks/use-origin';
import { useState } from 'react';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { CheckIcon, CopyIcon, GlobeIcon } from 'lucide-react';

interface PublishProps {
  initialData: Doc<'documents'>;
}

export const Publish = ({ initialData }: PublishProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const origin = useOrigin();
  const update = useMutation(api.documents.update);

  const url = `${origin}/preview/${initialData._id}`;

  const onPublish = () => {
    setIsSubmitting(true);

    const promise = update({
      id: initialData._id,
      isPublished: true,
    }).finally(() => setIsSubmitting(false));

    toast.promise(promise, {
      loading: 'Publishing...',
      success: 'Note published!',
      error: 'Failed to publish note.',
    });
  };

  const onUnPublish = () => {
    setIsSubmitting(true);

    const promise = update({
      id: initialData._id,
      isPublished: false,
    }).finally(() => setIsSubmitting(false));

    toast.promise(promise, {
      loading: 'Unpublishing...',
      success: 'Note unpublished!',
      error: 'Failed to unpublish note.',
    });
  };

  const onCopy = () => {
    navigator.clipboard.writeText(url);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size='sm' variant='ghost'>
          Publish
          {initialData.isPublished && (
            <GlobeIcon className='ml-2 h-4 w-4 text-sky-500' />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-72' align='end' alignOffset={8} forceMount>
        {initialData.isPublished ? (
          <div className='space-y-4'>
            <div className='flex items-center gap-x-2'>
              <GlobeIcon className='h-4 w-4 animate-pulse text-sky-500' />
              <p className='text-xs font-medium text-sky-500'>
                This note is live on web.
              </p>
            </div>
            <div className='flex items-center'>
              <input
                value={url}
                className='h-8 flex-1 truncate rounded-l-md border bg-muted px-2 text-xs'
                disabled
              />
              <Button
                onClick={onCopy}
                disabled={isCopied}
                className='h-8 rounded-l-none'
              >
                {isCopied ? (
                  <CheckIcon className='h-4 w-4' />
                ) : (
                  <CopyIcon className='h-4 w-4' />
                )}
              </Button>
            </div>
            <Button
              size='sm'
              className='w-full text-xs'
              disabled={isSubmitting}
              onClick={onUnPublish}
            >
              Unpublish
            </Button>
          </div>
        ) : (
          <div className='flex flex-col items-center justify-center'>
            <GlobeIcon className='mb-2 h-8 w-8 text-muted-foreground' />
            <p className='mb-2 text-sm font-medium'>Publish this note</p>
            <span className='mb-4 text-xs text-muted-foreground'>
              Share your work with others.
            </span>
            <Button
              disabled={isSubmitting}
              onClick={onPublish}
              className='w-full text-xs'
              size='sm'
            >
              Publish
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};
