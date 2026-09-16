import { Component, Suspense, lazy } from 'react';
import type { ReactNode } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { LibraryProvider } from './lib/library-context';
import { AppProvider } from './lib/app-context';
import { Shell } from './components/Shell';
import { Discover } from './pages/Discover';
import { TopicExplorer } from './components/TopicExplorer';
import { EmptyState } from './components/ui';
import { CommandDialog, ProfileDialog, SubmitDialog, ToolDialog } from './components/Dialogs';
const Collections = lazy(() =>
  import('./pages/Collections').then((module) => ({ default: module.Collections })),
);
const CollectionDetail = lazy(() =>
  import('./pages/Collections').then((module) => ({ default: module.CollectionDetail })),
);
const Compare = lazy(() =>
  import('./pages/Compare').then((module) => ({ default: module.Compare })),
);
const Alternatives = lazy(() =>
  import('./pages/Alternatives').then((module) => ({ default: module.Alternatives })),
);
const Stacks = lazy(() => import('./pages/Stacks').then((module) => ({ default: module.Stacks })));
const Trail = lazy(() => import('./pages/Trail').then((module) => ({ default: module.Trail })));
const Updates = lazy(() =>
  import('./pages/Updates').then((module) => ({ default: module.Updates })),
);
class ErrorBoundary extends Component<{ children: ReactNode }, { error: boolean }> {
  state = { error: false };
  static getDerivedStateFromError() {
    return { error: true };
  }
  render() {
    return this.state.error ? (
      <div className="page">
        <EmptyState
          title="Something needs a fresh start."
          description="Your saved tools are still on this device. Reload to try again."
          action={
            <button className="button" onClick={() => location.reload()}>
              Reload Commonplace
            </button>
          }
        />
      </div>
    ) : (
      this.props.children
    );
  }
}
export function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <LibraryProvider>
          <Shell>
            <Suspense
              fallback={
                <div className="page loading-state" role="status">
                  <span />
                  Finding your place…
                </div>
              }
            >
              <Routes>
                <Route path="/" element={<Discover />} />
                <Route path="/for-you" element={<Discover mode="personal" />} />
                <Route path="/shelf" element={<Discover mode="shelf" />} />
                <Route path="/collections" element={<Collections />} />
                <Route path="/collections/:id" element={<CollectionDetail />} />
                <Route path="/compare" element={<Compare />} />
                <Route path="/alternatives" element={<Alternatives />} />
                <Route path="/stacks" element={<Stacks />} />
                <Route path="/stacks/:id" element={<Stacks />} />
                <Route path="/trail" element={<Trail />} />
                <Route path="/updates" element={<Updates />} />
                <Route
                  path="*"
                  element={
                    <div className="page">
                      <EmptyState
                        title="A little off the beaten path."
                        description="This page doesn’t exist, but there are plenty of good tools to discover."
                        action={
                          <Link to="/" className="button button-dark">
                            Back to the library
                          </Link>
                        }
                      />
                    </div>
                  }
                />
              </Routes>
            </Suspense>
          </Shell>
          <ToolDialog />
          <ProfileDialog />
          <SubmitDialog />
          <CommandDialog />
          <TopicExplorer />
        </LibraryProvider>
      </AppProvider>
    </ErrorBoundary>
  );
}
