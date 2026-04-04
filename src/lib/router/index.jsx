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

const shallowEqualObject = (left, right) => {
  const leftKeys = Object.keys(left);
  const rightKeys = Object.keys(right);

  if (leftKeys.length !== rightKeys.length) {
    return false;
  }

  return leftKeys.every((key) => left[key] === right[key]);
};

const getPathMatch = (routePath, currentPathname, { end = true } = {}) => {
  if (!routePath) return null;
  if (routePath === '*') {
    return { params: {} };
  }

  const normalizedRoute = normalizePath(routePath);
  const normalizedCurrent = normalizePath(currentPathname);
  const routeSegments = normalizedRoute.split('/').filter(Boolean);
  const currentSegments = normalizedCurrent.split('/').filter(Boolean);

  if (!routeSegments.some((segment) => segment.startsWith(':'))) {
    if (end) {
      return normalizedRoute === normalizedCurrent ? { params: {} } : null;
    }

    return normalizedCurrent === normalizedRoute || normalizedCurrent.startsWith(`${normalizedRoute}/`)
      ? { params: {} }
      : null;
  }

  if (end && routeSegments.length !== currentSegments.length) {
    return null;
  }

  if (!end && routeSegments.length > currentSegments.length) {
    return null;
  }

  const params = {};

  for (let index = 0; index < routeSegments.length; index += 1) {
    const routeSegment = routeSegments[index];
    const currentSegment = currentSegments[index];

    if (routeSegment?.startsWith(':')) {
      if (!currentSegment) {
        return null;
      }

      params[routeSegment.slice(1)] = decodeURIComponent(currentSegment);
      continue;
    }

    if (routeSegment !== currentSegment) {
      return null;
    }
  }

  return { params };
};

const matchPath = (routePath, currentPathname, options) => {
  return Boolean(getPathMatch(routePath, currentPathname, options));
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
  const [params, setParams] = useState({});

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

  const syncParams = useCallback((nextParams) => {
    setParams((currentParams) => (
      shallowEqualObject(currentParams, nextParams) ? currentParams : nextParams
    ));
  }, []);

  const contextValue = useMemo(
    () => ({
      location,
      navigate,
      params,
      setParams: syncParams
    }),
    [location, navigate, params, syncParams]
  );

  return <RouterContext.Provider value={contextValue}>{children}</RouterContext.Provider>;
};

export const Routes = ({ children }) => {
  const { location, setParams } = useRouterContext('Routes');
  const childArray = React.Children.toArray(children);

  let elementToRender = null;
  let matchedParams = {};

  childArray.some((child) => {
    if (!React.isValidElement(child)) {
      return false;
    }

    const { path = '*', element, index = false, end } = child.props;

    if (index && matchPath('/', location.pathname)) {
      elementToRender = element;
      matchedParams = {};
      return true;
    }

    const matchedRoute = getPathMatch(path, location.pathname, { end: end !== undefined ? end : true });

    if (matchedRoute) {
      elementToRender = element;
      matchedParams = matchedRoute.params;
      return true;
    }

    return false;
  });

  useEffect(() => {
    setParams(matchedParams);
  }, [matchedParams, setParams]);

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

export const useParams = () => {
  const { params } = useRouterContext('useParams');
  return params;
};

export default {
  BrowserRouter,
  Routes,
  Route,
  Link,
  NavLink,
  useLocation,
  useNavigate,
  useParams
};
