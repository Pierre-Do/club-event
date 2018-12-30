import { fireEvent } from 'react-testing-library';

export function mockGrecaptcha() {
  (window as any).grecaptcha = {
    getResponse: () => 'response',
    render: jest.fn(),
    reset: jest.fn(),
  };
}

export function mockResponse(response: any) {
  const mock = typeof response === 'string' ? { result: response } : response;

  // Mock the fetch data as JSDom doesn't implement fetch.
  window.fetch = jest.fn(() =>
    Promise.resolve({
      text: () =>
        new Promise(resolve => {
          const mockResult = JSON.stringify(mock);
          setTimeout(() => {
            resolve(mockResult);
          }, 50);
        }),
    })
  );
}

export function setValidInputData(
  validData: any,
  { getByTestId }: { getByTestId: any }
) {
  Object.keys(validData).forEach((key: string) => {
    fireEvent.change(getByTestId(key), {
      // @ts-ignore
      target: { value: validData[key] },
    });
  });
}

export const mockGlobalProperty = (globalObject: any) => (key: string) => (
  value: any
) => {
  const original = globalObject[key];
  Object.defineProperty(globalObject, key, { value, writable: true });
  return () => mockGlobalProperty(globalObject)(key)(original);
};
