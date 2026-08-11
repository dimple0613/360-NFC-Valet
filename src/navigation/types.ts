import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  DriverLogin: undefined;
  DriverSelectLocation: undefined;
  DriverNfcTap: undefined;
  DriverCarDetails: undefined;
  DriverCardActivated: undefined;
  DriverPickupRequests: undefined;
  DriverUpdateParking: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;
