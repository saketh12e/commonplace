import { NavLink } from 'react-router-dom';
import { Bookmark, Layers3, Footprints } from 'lucide-react';
export function LibraryNav() {
  return (
    <nav className="library-tabs" aria-label="Your library sections">
      <NavLink to="/shelf">
        <Bookmark size={16} />
        Saved tools
      </NavLink>
      <NavLink to="/stacks">
        <Layers3 size={16} />
        Your stacks
      </NavLink>
      <NavLink to="/trail">
        <Footprints size={16} />
        Discovery trail
      </NavLink>
    </nav>
  );
}
