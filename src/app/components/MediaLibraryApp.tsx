import { useState } from "react";
import { SuiteTopBar } from "./SuiteTopBar";
import { MediaLibrary } from "./MediaLibrary";
import { ActionItemsDrawer } from "./ActionItemsDrawer";

export function MediaLibraryApp() {
  const [isActionDrawerOpen, setIsActionDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <SuiteTopBar
        currentApp="Media Library"
        breadcrumb=""
        onOpenActionDrawer={() => setIsActionDrawerOpen(true)}
      />

      <div className="p-6">
        <MediaLibrary />
      </div>

      <ActionItemsDrawer
        isOpen={isActionDrawerOpen}
        onClose={() => setIsActionDrawerOpen(false)}
      />
    </div>
  );
}
