import { useEffect, useState } from 'react';
import { setPageLanguage } from '../page.lib';
import { importLanguage } from './importLanguage';
import { IntlType } from './intl.type';

const INITIAL_STATE: IntlType = {
  confirmation: '',
  information: '',
  messages: {},
};

const changeLanguage = (
  language: string,
  setState: (cb: (previousState: IntlType) => IntlType) => void
) => {
  // For a11y reasons
  setPageLanguage(language);

  // Code splitting
  importLanguage(language).then(module => {
    const { messages, confirmation, information } = module.default;
    const newState: IntlType = {
      confirmation,
      information,
      language,
      messages,
    };
    setState(previousState => ({ ...previousState, ...newState }));
  });
};

export function useTranslations(targetLanguage: string): IntlType {
  const [
    { language, messages, information, confirmation },
    setState,
  ] = useState<IntlType>(INITIAL_STATE);

  useEffect(() => {
    // Only reload the language it it's different than tht target one.
    // This avoids to have this effect ran more than needed.
    if (language !== targetLanguage) {
      // Read the value from the route, always. This is the source of truth.
      changeLanguage(targetLanguage, setState);
    }
  });

  return {
    confirmation,
    information,
    language,
    messages,
  };
}