import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';

const RouterContext = createContext(null);

const getLocationSnapshot = () => ({
  pathname: typeof window !== 'undefined' ? window.location.pathname || '/' : '/',
  search: typeof window !== 'undefined' ? window.location.search : '',
  hash: typeof window !== 'undefined' ? window.location.hash : ''
});

const normalizePath = (path) => {
  if (!path) return '/';
  const normalized = path.replace(/\/+/g, '/');
  return normalized.length > 1 && normalized.endsWith('/')
    ? normalized.slice(0, -1)
    : normalized || '/';
};

const matchPath = (routePath, currentPathname, { end = true } = {}) => {
  if (!routePath) return false;
  if (routePath === '*') return true;

  const normalizedRoute = normalizePath(routePath);
  const normalizedCurrent = normalizePath(currentPathname);

  if (end) {
    return normalizedRoute === normalizedCurrent;
  }

  return normalizedCurrent === normalizedRoute || normalizedCurrent.startsWith(`${normalizedRoute}/`);
};

const useRouterContext = (componentName) => {
  const context = useContext(RouterContext);

  if (!context) {
    throw new Error(`${componentName} must be used within a <BrowserRouter>.`);
  }

  return context;
};

export const BrowserRouter = ({ children }) => {
  const [location, setLocation] = useState(() => getLocationSnapshot());

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const handlePopState = () => {
      setLocation(getLocationSnapshot());
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const navigate = useCallback((to, { replace = false } = {}) => {
    if (typeof window === 'undefined') {
      return;
    }

    const target = typeof to === 'string' ? to : to?.pathname || '/';

    if (replace) {
      window.history.replaceState({}, '', target);
    } else {
      window.history.pushState({}, '', target);
    }

    setLocation(getLocationSnapshot());
  }, []);

  const contextValue = useMemo(
    () => ({
      location,
      navigate
    }),
    [location, navigate]
  );

  return <RouterContext.Provider value={contextValue}>{children}</RouterContext.Provider>;
};

export const Routes = ({ children }) => {
  const { location } = useRouterContext('Routes');
  const childArray = React.Children.toArray(children);

  let elementToRender = null;

  childArray.some((child) => {
    if (!React.isValidElement(child)) {
      return false;
    }

    const { path = '*', element, index = false, end } = child.props;

    if (index && matchPath('/', location.pathname)) {
      elementToRender = element;
      return true;
    }

    if (matchPath(path, location.pathname, { end: end !== undefined ? end : true })) {
      elementToRender = element;
      return true;
    }

    return false;
  });

  return elementToRender;
};

export const Route = () => null;

const navigateEvent = (event, navigate, to, replace) => {
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.altKey || event.ctrlKey || event.shiftKey) {
    return;
  }

  event.preventDefault();
  navigate(to, { replace });
};

export const Link = React.forwardRef(({ to, replace = false, onClick, ...rest }, ref) => {
  const { navigate } = useRouterContext('Link');
  const target = typeof to === 'string' ? to : to?.pathname || '/';

  const handleClick = (event) => {
    if (onClick) {
      onClick(event);
    }

    if (!event.defaultPrevented) {
      navigateEvent(event, navigate, target, replace);
    }
  };

  return <a ref={ref} href={target} onClick={handleClick} {...rest} />;
});

Link.displayName = 'Link';

export const NavLink = React.forwardRef(({ to, className, replace = false, end = false, onClick, ...rest }, ref) => {
  const { navigate, location } = useRouterContext('NavLink');
  const target = typeof to === 'string' ? to : to?.pathname || '/';
  const isActive = matchPath(target, location.pathname, { end });

  const computedClassName =
    typeof className === 'function'
      ? className({ isActive, isPending: false })
      : className;

  const handleClick = (event) => {
    if (onClick) {
      onClick(event);
    }

    if (!event.defaultPrevented) {
      navigateEvent(event, navigate, target, replace);
    }
  };

  return (
    <a
      ref={ref}
      href={target}
      onClick={handleClick}
      className={computedClassName}
      aria-current={isActive ? 'page' : undefined}
      {...rest}
    />
  );
});

NavLink.displayName = 'NavLink';

export const useLocation = () => {
  const { location } = useRouterContext('useLocation');
  return location;
};

export const useNavigate = () => {
  const { navigate } = useRouterContext('useNavigate');
  return navigate;
};

export default {
  BrowserRouter,
  Routes,
  Route,
  Link,
  NavLink,
  useLocation,
  useNavigate
};
