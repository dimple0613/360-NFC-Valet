import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  DriverLogin: undefined;
  DriverSelectLocation: undefined;
  DriverHome: undefined;
  DriverNfcTap: undefined;
  DriverCarDetails: undefined;
  DriverCardActivated: undefined;
  DriverPickupRequests: undefined;
  DriverUpdateParking: undefined;
  DriverReturnRequest: undefined;
  DriverRetrievalDetail: undefined;
  DriverHistory: undefined;
  DriverProfile: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;
