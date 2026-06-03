'use client';

import { Input } from '@/shared/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/components/ui/popover';
import EmojiPicker, { type EmojiClickData } from 'emoji-picker-react';
import { Smile } from 'lucide-react';
import { useState } from 'react';
import { useUpdatePage } from '../hooks/use-update-page';
import type { Page } from '../types/page.type';

type PageHeaderProps = {
  page: Page;
};

export function PageHeader({ page }: PageHeaderProps) {
  return <PageHeaderContent page={page} pageId={page.id} />;
}

function PageHeaderContent({ page, pageId }: { page: Page; pageId: string }) {
  const updatePageMutation = useUpdatePage(pageId);
  const [titleDraft, setTitleDraft] = useState<string | null>(null);
  const [openEmoji, setOpenEmoji] = useState(false);
  const title = titleDraft ?? page.title;

  const handleBlur = () => {
    const nextTitle = title.trim();

    if (!nextTitle || nextTitle === page.title) {
      setTitleDraft(null);
      return;
    }

    setTitleDraft(nextTitle);
    updatePageMutation.mutate(
      {
        title: nextTitle,
      },
      {
        onSuccess: () => setTitleDraft(null),
      },
    );
  };

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    const emoji = emojiData.emoji;

    setOpenEmoji(false);

    if (emoji === page.icon) return;

    updatePageMutation.mutate({
      icon: emoji,
    });
  };

  return (
    <div className="mb-10 flex items-center gap-4">
      <Popover open={openEmoji} onOpenChange={setOpenEmoji}>
        <PopoverTrigger
          render={
            <button
              type="button"
              className="
                flex size-14 shrink-0 items-center justify-center
                rounded-xl text-4xl transition-colors hover:bg-muted
              "
            />
          }
        >
          {page.icon ? (
            <span>{page.icon}</span>
          ) : (
            <Smile className="size-8 text-muted-foreground" />
          )}
        </PopoverTrigger>

        <PopoverContent align="start" className="w-auto border-none p-0">
          <EmojiPicker
            height={420}
            width={340}
            onEmojiClick={handleEmojiClick}
            previewConfig={{
              showPreview: false,
            }}
          />
        </PopoverContent>
      </Popover>

      <Input
        value={title}
        onChange={(e) => setTitleDraft(e.target.value)}
        onBlur={handleBlur}
        placeholder="Untitled"
        className="
          h-auto border-none px-0 text-5xl font-bold shadow-none
          md:text-6xl focus-visible:ring-0
        "
      />
    </div>
  );
}
