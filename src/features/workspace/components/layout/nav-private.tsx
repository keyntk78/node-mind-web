import * as React from 'react';
import {
  ArrowUpRight,
  ChevronRight,
  FileText,
  Link as LinkIcon,
  MoreHorizontal,
  Plus,
  StarOff,
  Trash2,
} from 'lucide-react';
import NextLink from 'next/link';
import { useQueryClient } from '@tanstack/react-query';

import {
  pageQueryKeys,
  useCreatePageMutation,
  usePageChildrenQuery,
} from '@/features/workspace/api/pages.query';
import type { PageTreeItem } from '@/features/workspace/types/page.type';
import { Button } from '@/shared/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/shared/components/ui/collapsible';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from '@/shared/components/ui/sidebar';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { Spinner } from '@/shared/components/ui/spinner';

const MAX_PAGE_DEPTH = 5;
const HOVER_ACTION_VISIBILITY =
  'opacity-0 hover:opacity-100 focus-visible:opacity-100 peer-hover/menu-button:opacity-100 peer-focus-visible/menu-button:opacity-100 aria-expanded:opacity-100';

type CreatePageDialogState = {
  open: boolean;
  parentId: string | null;
  parentTitle?: string;
};

export function NavPrivate({
  workspaceId,
  workspaceSlug,
}: {
  workspaceId?: string;
  workspaceSlug?: string;
}) {
  const { isMobile } = useSidebar();
  const [createDialog, setCreateDialog] = React.useState<CreatePageDialogState>(
    {
      open: false,
      parentId: null,
    },
  );
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isError,
    isFetchingNextPage,
    isLoading,
  } = usePageChildrenQuery({
    workspaceId,
    parentId: 'root',
    enabled: Boolean(workspaceId),
  });
  const pages = data?.pages.flatMap((page) => page.data) ?? [];

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Private</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {!workspaceId ? (
            <SidebarMenuItem>
              <SidebarMenuButton disabled>
                <FileText />
                <span>No workspace</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ) : null}
          {isLoading ? <PageTreeLoading level={1} /> : null}
          {isError ? (
            <SidebarMenuItem>
              <SidebarMenuButton disabled>
                <FileText />
                <span>{error.message}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ) : null}
          {pages.map((page) => (
            <PrivatePageItem
              isMobile={isMobile}
              key={page.id}
              onCreateChild={(selectedPage) =>
                setCreateDialog({
                  open: true,
                  parentId: selectedPage.id,
                  parentTitle: selectedPage.title,
                })
              }
              page={page}
              workspaceId={workspaceId}
              workspaceSlug={workspaceSlug}
              level={1}
            />
          ))}
          {hasNextPage ? (
            <SidebarMenuItem>
              <SidebarMenuButton
                className="text-sidebar-foreground/70"
                disabled={isFetchingNextPage}
                onClick={() => void fetchNextPage()}
              >
                {isFetchingNextPage ? <Spinner /> : <MoreHorizontal />}
                <span>{isFetchingNextPage ? 'Loading' : 'More'}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ) : null}
          <SidebarMenuItem>
            <SidebarMenuButton
              className="text-sidebar-foreground/70"
              disabled={!workspaceId}
              onClick={() =>
                setCreateDialog({
                  open: true,
                  parentId: null,
                })
              }
            >
              <Plus />
              <span>New page</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
      <CreatePageDialog
        onOpenChange={(open) =>
          setCreateDialog((current) => ({
            ...current,
            open,
          }))
        }
        open={createDialog.open}
        parentId={createDialog.parentId}
        parentTitle={createDialog.parentTitle}
        workspaceId={workspaceId}
      />
    </SidebarGroup>
  );
}

function PrivatePageItem({
  isMobile,
  page,
  workspaceId,
  workspaceSlug,
  level,
  onCreateChild,
}: {
  isMobile: boolean;
  page: PageTreeItem;
  workspaceId?: string;
  workspaceSlug?: string;
  level: number;
  onCreateChild?: (page: PageTreeItem) => void;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const pageHref = workspaceSlug
    ? `/${encodeURIComponent(workspaceSlug)}/page/${encodeURIComponent(page.id)}`
    : '#';
  const hasChildren = level < MAX_PAGE_DEPTH && page.hasChildren;
  const canAddChild = level < MAX_PAGE_DEPTH;
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isError,
    isFetchingNextPage,
    isLoading,
  } = usePageChildrenQuery({
    workspaceId,
    parentId: page.id,
    enabled: isOpen && hasChildren,
  });
  const childPages = data?.pages.flatMap((pageData) => pageData.data) ?? [];
  const actionsRightPadding = canAddChild ? 'pr-14' : 'pr-8';
  const actionOffset = `${(level - 1) * 1.5}rem`;
  const menuActionRight = canAddChild ? '1.5rem' : '0.25rem';
  const menuActionStyle = {
    right: `calc(${menuActionRight} - ${actionOffset})`,
  };
  const addActionStyle = {
    right: `calc(0.25rem - ${actionOffset})`,
  };
  const buttonStyle =
    level > 1
      ? {
          width: `calc(100% + ${actionOffset})`,
        }
      : undefined;
  const label = (
    <>
      <span>{page.icon || '📄'}</span>
      <span>{page.title}</span>
    </>
  );
  const actions = (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <SidebarMenuAction
              className={HOVER_ACTION_VISIBILITY}
              style={menuActionStyle}
            />
          }
        >
          <>
            <MoreHorizontal />
            <span className="sr-only">More</span>
          </>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-56 rounded-lg"
          side={isMobile ? 'bottom' : 'right'}
          align={isMobile ? 'end' : 'start'}
        >
          <DropdownMenuItem>
            <StarOff className="text-muted-foreground" />
            <span>Remove from Favorites</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <LinkIcon className="text-muted-foreground" />
            <span>Copy Link</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <ArrowUpRight className="text-muted-foreground" />
            <span>Open in New Tab</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Trash2 className="text-muted-foreground" />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {canAddChild ? (
        <SidebarMenuAction
          className={HOVER_ACTION_VISIBILITY}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            onCreateChild?.(page);
          }}
          style={addActionStyle}
        >
          <Plus />
          <span className="sr-only">Add page</span>
        </SidebarMenuAction>
      ) : null}
    </>
  );

  if (level === 1) {
    const item = (
      <SidebarMenuItem>
        <SidebarMenuButton
          className={actionsRightPadding}
          render={<NextLink href={pageHref} />}
          style={buttonStyle}
        >
          {label}
        </SidebarMenuButton>
        {hasChildren ? (
          <CollapsibleTrigger
            render={
              <SidebarMenuAction
                className="left-2 bg-sidebar-accent text-sidebar-accent-foreground data-[state=open]:rotate-90"
                showOnHover
              />
            }
          >
            <ChevronRight />
          </CollapsibleTrigger>
        ) : null}
        {actions}
        {hasChildren ? (
          <CollapsibleContent>
            <SidebarMenuSub>
              {isLoading ? <PageTreeLoading level={level + 1} /> : null}
              {isError ? <PageTreeError message={error.message} /> : null}
              {childPages.map((subPage) => (
                <PrivatePageItem
                  isMobile={isMobile}
                  key={subPage.id}
                  page={subPage}
                  workspaceId={workspaceId}
                  workspaceSlug={workspaceSlug}
                  level={level + 1}
                  onCreateChild={onCreateChild}
                />
              ))}
              {hasNextPage ? (
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton
                    aria-disabled={isFetchingNextPage}
                    onClick={() => void fetchNextPage()}
                    render={<button type="button" />}
                  >
                    {isFetchingNextPage ? <Spinner /> : <MoreHorizontal />}
                    <span>{isFetchingNextPage ? 'Loading' : 'More'}</span>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              ) : null}
            </SidebarMenuSub>
          </CollapsibleContent>
        ) : null}
      </SidebarMenuItem>
    );

    return hasChildren ? (
      <Collapsible key={page.id} open={isOpen} onOpenChange={setIsOpen}>
        {item}
      </Collapsible>
    ) : (
      item
    );
  }

  const item = (
    <SidebarMenuSubItem className="group/menu-item">
      <SidebarMenuSubButton
        className={actionsRightPadding}
        render={<NextLink href={pageHref} />}
        style={buttonStyle}
      >
        {label}
      </SidebarMenuSubButton>
      {hasChildren ? (
        <CollapsibleTrigger
          render={
            <SidebarMenuAction
              className="left-0 bg-sidebar-accent text-sidebar-accent-foreground data-[state=open]:rotate-90"
              showOnHover
            />
          }
        >
          <ChevronRight />
        </CollapsibleTrigger>
      ) : null}
      {actions}
      {hasChildren ? (
        <CollapsibleContent>
          <SidebarMenuSub>
            {isLoading ? <PageTreeLoading level={level + 1} /> : null}
            {isError ? <PageTreeError message={error.message} /> : null}
            {childPages.map((subPage) => (
              <PrivatePageItem
                isMobile={isMobile}
                key={subPage.id}
                page={subPage}
                workspaceId={workspaceId}
                workspaceSlug={workspaceSlug}
                level={level + 1}
                onCreateChild={onCreateChild}
              />
            ))}
            {hasNextPage ? (
              <SidebarMenuSubItem>
                <SidebarMenuSubButton
                  aria-disabled={isFetchingNextPage}
                  onClick={() => void fetchNextPage()}
                  render={<button type="button" />}
                >
                  {isFetchingNextPage ? <Spinner /> : <MoreHorizontal />}
                  <span>{isFetchingNextPage ? 'Loading' : 'More'}</span>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ) : null}
          </SidebarMenuSub>
        </CollapsibleContent>
      ) : null}
    </SidebarMenuSubItem>
  );

  return hasChildren ? (
    <Collapsible key={page.id} open={isOpen} onOpenChange={setIsOpen}>
      {item}
    </Collapsible>
  ) : (
    item
  );
}

function CreatePageDialog({
  open,
  parentId,
  parentTitle,
  workspaceId,
  onOpenChange,
}: {
  open: boolean;
  parentId: string | null;
  parentTitle?: string;
  workspaceId?: string;
  onOpenChange: (open: boolean) => void;
}) {
  const queryClient = useQueryClient();
  const createPageMutation = useCreatePageMutation();
  const [title, setTitle] = React.useState('');
  const [icon, setIcon] = React.useState('');
  const trimmedTitle = title.trim();
  const trimmedIcon = icon.trim();
  const errorMessage =
    createPageMutation.error instanceof Error
      ? createPageMutation.error.message
      : null;

  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen) {
      setTitle('');
      setIcon('');
      createPageMutation.reset();
    }

    onOpenChange(nextOpen);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!workspaceId || !trimmedTitle) {
      return;
    }

    try {
      await createPageMutation.mutateAsync(
        {
          workspaceId,
          parentId,
          title: trimmedTitle,
          icon: trimmedIcon || null,
        },
        {
          onSuccess: () => {
            void queryClient.invalidateQueries({
              queryKey: pageQueryKeys.workspace(workspaceId),
            });
            handleOpenChange(false);
          },
        },
      );
    } catch {
      // React Query exposes the error state in the dialog.
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New page</DialogTitle>
          <DialogDescription>
            {parentTitle ? `Create inside ${parentTitle}` : 'Create root page'}
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <Label htmlFor="page-title">Title</Label>
            <Input
              autoFocus
              id="page-title"
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Untitled"
              value={title}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="page-icon">Icon</Label>
            <Input
              id="page-icon"
              maxLength={8}
              onChange={(event) => setIcon(event.target.value)}
              placeholder="Optional"
              value={icon}
            />
          </div>
          {errorMessage ? (
            <p className="text-sm text-destructive">{errorMessage}</p>
          ) : null}
          <DialogFooter>
            <DialogClose render={<Button type="button" variant="outline" />}>
              Cancel
            </DialogClose>
            <Button
              disabled={
                !workspaceId || !trimmedTitle || createPageMutation.isPending
              }
              type="submit"
            >
              {createPageMutation.isPending ? <Spinner /> : <Plus />}
              <span>Create</span>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function PageTreeLoading({ level }: { level: number }) {
  const item = (
    <>
      <Spinner className="text-muted-foreground" />
      <span>Loading</span>
    </>
  );

  if (level === 1) {
    return (
      <SidebarMenuItem>
        <SidebarMenuButton disabled>{item}</SidebarMenuButton>
      </SidebarMenuItem>
    );
  }

  return (
    <SidebarMenuSubItem>
      <SidebarMenuSubButton aria-disabled render={<button type="button" />}>
        {item}
      </SidebarMenuSubButton>
    </SidebarMenuSubItem>
  );
}

function PageTreeError({ message }: { message: string }) {
  return (
    <SidebarMenuSubItem>
      <SidebarMenuSubButton aria-disabled render={<button type="button" />}>
        <FileText />
        <span>{message}</span>
      </SidebarMenuSubButton>
    </SidebarMenuSubItem>
  );
}
