type StoreType = 'WB' | 'Ozon';

type RateType = '1' | '2' | '3' | '4' | '5';

interface PromptsConfiguration {
  readonly version: string;
  storeType: StoreType;
  templates: {
    promptTemplates: {
      rates: {
        [key in RateType]: {
          temperature: number;
          promptTemplate: string;
          feedbackTemplate: string;
        };
      };
      placeholders: {
        reviewStyle: {
          formal: string;
          friendly: string;
        };
      };
    };
  };
}

export type { PromptsConfiguration, RateType };
