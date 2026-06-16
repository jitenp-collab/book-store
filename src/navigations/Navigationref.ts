import { createNavigationContainerRef } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';

export const navigationref = createNavigationContainerRef<any>()

export const navigate = (name: string, params: any) => {
  if (navigationref.isReady()) {
    navigationref.navigate(name, params)
  }
}

export const replace = (name: string, params?: any) => {
  if (navigationref.isReady()) {
    navigationref.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name,
            params,
          },
        ],
      })
    );
  }
};

export function getCurrentRoute() {
  if (navigationref.isReady()) {
    return navigationref.getCurrentRoute();
  }
  return null;
}