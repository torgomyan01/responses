import { createSlice } from '@reduxjs/toolkit';

interface IConfigurationResponse {
  infoStore: {
    storeId: number;
    configuration: {
      replyConfiguration: {
        rates: {
          '1': IStoreRates;
          '2': IStoreRates;
          '3': IStoreRates;
          '4': IStoreRates;
          '5': IStoreRates;
        };
        version: string;
      };
    };
  };
}

const initialState: IConfigurationResponse = {
  infoStore: {
    storeId: 1,
    configuration: {
      replyConfiguration: {
        rates: {
          '1': {
            autoReply: true,
            reviewStyle: 'friendly',
            blacklistKeywords: ['word1', 'word2']
          },
          '2': {
            autoReply: true,
            reviewStyle: 'friendly',
            blacklistKeywords: ['word1', 'word2', 'ssss']
          },
          '3': {
            autoReply: true,
            reviewStyle: 'friendly',
            blacklistKeywords: ['word1', 'word2']
          },
          '4': {
            autoReply: true,
            reviewStyle: 'friendly',
            blacklistKeywords: ['word1', 'word2']
          },
          '5': {
            autoReply: true,
            reviewStyle: 'friendly',
            blacklistKeywords: ['word1', 'word2']
          }
        },
        version: '1.0'
      }
    }
  }
};

const ConfigurationResponse = createSlice({
  name: 'configuration-response',
  initialState,
  reducers: {
    setInfoStore(state, action) {
      state.infoStore = action.payload;
    },
    changeRate(state, action) {
      if (action.payload.keyNumber === 1) {
        state.infoStore.configuration.replyConfiguration.rates['1'] = action.payload.rate;
      } else if (action.payload.keyNumber === 2) {
        state.infoStore.configuration.replyConfiguration.rates['2'] = action.payload.rate;
      } else if (action.payload.keyNumber === 3) {
        state.infoStore.configuration.replyConfiguration.rates['3'] = action.payload.rate;
      } else if (action.payload.keyNumber === 4) {
        state.infoStore.configuration.replyConfiguration.rates['4'] = action.payload.rate;
      } else if (action.payload.keyNumber === 5) {
        state.infoStore.configuration.replyConfiguration.rates['5'] = action.payload.rate;
      }
    }
  }
});

export const { setInfoStore, changeRate } = ConfigurationResponse.actions;

export default ConfigurationResponse.reducer;
