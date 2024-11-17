import { create } from "zustand";
import { GiftState } from "./_props";

const useGiftsStore = create<GiftState>((set) => ({
  giftsNumber: undefined,

  setGiftsNumber: (giftsNumber: number) => {
    set(() => ({
      giftsNumber,
    }));
  },
}));

export default useGiftsStore;
