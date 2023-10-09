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
            blacklistKeywords: []
          },
          '2': {
            autoReply: true,
            reviewStyle: 'friendly',
            blacklistKeywords: []
          },
          '3': {
            autoReply: true,
            reviewStyle: 'friendly',
            blacklistKeywords: []
          },
          '4': {
            autoReply: true,
            reviewStyle: 'friendly',
            blacklistKeywords: []
          },
          '5': {
            autoReply: true,
            reviewStyle: 'friendly',
            blacklistKeywords: []
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
    }
  }
});

export const { setInfoStore } = ConfigurationResponse.actions;

export default ConfigurationResponse.reducer;
