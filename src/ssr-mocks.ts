// ssr-mocks.ts
interface MinimalDocument {
    createElement: (tagName: string) => HTMLElement;
    head: {
      appendChild: (node: unknown) => void;
    };
  }
  
  interface MinimalWindow {
    document: MinimalDocument;
    // Add other window properties your app needs
  }
  
  export function setupSSRMocks() {
    if (typeof window === 'undefined') {
      const mockDocument: MinimalDocument = {
        createElement: () => ({
          setAttribute: () => {},
          // Add other required element methods
        }) as unknown as HTMLElement,
        head: {
          appendChild: () => null
        }
      };
  
      const mockWindow: MinimalWindow = {
        document: mockDocument
      };
  
      global.window = mockWindow as typeof window;
      global.document = mockDocument as unknown as Document;
    }
  }